import { Component, input, signal } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { PLACEHOLDER_IMAGE } from '../../constants/constants';

@Component({
  selector: 'app-custom-image',
  standalone: true,
  imports: [SpinnerComponent, ImageFallbackDirective],
  templateUrl: './custom-image.component.html',
  styleUrl: './custom-image.component.scss',
})
export class CustomImageComponent {
  imageSrc = input<string>('');
  altText = input<string>('');
  fallbackImage = input<string>(PLACEHOLDER_IMAGE);
  isLoading = signal(true);
  hasError = signal(false);

  onLoad() {
    this.isLoading.set(false);
  }

  onError() {
    this.isLoading.set(false);
    this.hasError.set(true);
  }
}
