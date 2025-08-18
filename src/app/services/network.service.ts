import { Injectable, DestroyRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private offlineToastRef: ActiveToast<any> | null = null;
  private readonly isBrowser: boolean;

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
  }
}


