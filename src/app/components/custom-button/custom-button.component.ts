import { Component, HostBinding, input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'button[customButton]',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  primary = input<boolean>(true);
  loading = input<boolean>(false);

  @HostBinding('attr.data-variant')
  get variant() {
    return this.primary() ? 'primary' : 'secondary';
  }

  @HostBinding('attr.data-loading')
  get isLoading() {
    return this.loading() ? 'true' : null;
  }
}
