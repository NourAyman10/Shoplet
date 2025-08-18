import { Component, signal } from '@angular/core';
import { LogoComponent } from '../../../components/logo/logo.component';
import { RouterLink } from '@angular/router';
import { CustomButtonComponent } from '../../../components/custom-button/custom-button.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RouterLink, CustomButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = signal<boolean>(false);

}
