import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CustomImageComponent } from '../../components/custom-image/custom-image.component';
import { SkeletonComponent } from "../../components/skeleton/skeleton.component";
import { SectionHeaderComponent } from "../../components/section-header/section-header.component";
import { RouterLink } from "@angular/router";
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomImageComponent, SkeletonComponent, SectionHeaderComponent, RouterLink],
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

  isLoading = signal<boolean>(false);
}
