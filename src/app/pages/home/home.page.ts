import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  images = signal<string[]>(['assets/slides/1.png', 'assets/slides/2.png', 'assets/slides/3.png']);
}
