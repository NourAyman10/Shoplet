import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CustomImageComponent } from '../../components/custom-image/custom-image.component';
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomImageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  images = signal<string[]>([
    'https://picsum.photos/seed/sports1/600/400',
    'assets/slides/1.png',
    'assets/slides/2.png',
    'assets/slides/33.png',
  ]);
}
