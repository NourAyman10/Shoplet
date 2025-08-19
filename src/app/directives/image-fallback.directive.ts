import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appImageFallback]',
  standalone: true,
})
export class ImageFallbackDirective implements OnInit {
  appImageFallback = input('/assets/image-placeholder.svg');
  private originalSrc: string = '';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    this.originalSrc = this.el.nativeElement.src;
    this.setupErrorHandler();
  }

  private setupErrorHandler() {
    this.el.nativeElement.onerror = () => {
      // Only fallback if the error occurred on the original image
      if (this.el.nativeElement.src === this.originalSrc) {
        this.el.nativeElement.src = this.appImageFallback();
        // Remove error handler to prevent infinite loop
        this.el.nativeElement.onerror = null;
      }
    };
  }
}
