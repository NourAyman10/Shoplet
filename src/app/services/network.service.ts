import { Injectable, DestroyRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { fromEvent, interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private offlineToastRef: ActiveToast<any> | null = null;
  private warningToastRef: ActiveToast<any> | null = null;
  private readonly isBrowser: boolean;
  private consecutiveHighLatencyCount = 0;
  private static readonly HIGH_LATENCY_MS = 1200;

  constructor(
    private readonly toastr: ToastrService,
    private readonly destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (!this.isBrowser) return;

    // Show initial state
    if (!navigator.onLine) {
      this.showOfflineToast();
    }

    // Listen for connectivity changes
    fromEvent(window, 'offline')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.showOfflineToast());

    fromEvent(window, 'online')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.handleOnline());

    // Monitor network quality periodically
    interval(15000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.checkLatency());
  }

  private showOfflineToast(): void {
    if (this.offlineToastRef) return; // already visible
    this.offlineToastRef = this.toastr.error(
      'No internet connection',
      undefined,
      {
        timeOut: 0,
        extendedTimeOut: 0,
        progressBar: true,
        closeButton: true,
        tapToDismiss: false,
      }
    );
  }

  private handleOnline(): void {
    if (this.offlineToastRef) {
      this.toastr.clear(this.offlineToastRef.toastId);
      this.offlineToastRef = null;
    }
    this.toastr.success('Back online');

    // Clear any existing warning on restore
    if (this.warningToastRef) {
      this.toastr.clear(this.warningToastRef.toastId);
      this.warningToastRef = null;
    }
  }

  private async checkLatency(): Promise<void> {
    if (!this.isBrowser) return;
    if (!navigator.onLine) return; // offline handled separately
    if (this.offlineToastRef) return; // do not show low-speed warning when offline

    const url = `/assets/logo.svg?t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const start = performance.now();
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        // Treat as a failed sample; skip
        return;
      }
      const durationMs = performance.now() - start;

      if (durationMs >= NetworkService.HIGH_LATENCY_MS) {
        this.consecutiveHighLatencyCount += 1;
      } else {
        this.consecutiveHighLatencyCount = 0;
      }

      if (this.consecutiveHighLatencyCount >= 2) {
        this.showLowSpeedWarning();
      } else if (this.consecutiveHighLatencyCount === 0) {
        this.clearLowSpeedWarning();
      }
    } catch {
      // Fetch aborted or failed; ignore here, offline handler will manage if needed
      clearTimeout(timeoutId);
    }
  }

  private showLowSpeedWarning(): void {
    if (this.warningToastRef || this.offlineToastRef) return;
    this.warningToastRef = this.toastr.warning(
      'Internet connection is slow',
      undefined,
      {
        timeOut: 0,
        extendedTimeOut: 0,
        progressBar: true,
        closeButton: true,
        tapToDismiss: false,
      }
    );
  }

  private clearLowSpeedWarning(): void {
    if (!this.warningToastRef) return;
    this.toastr.clear(this.warningToastRef.toastId);
    this.warningToastRef = null;
  }
}


