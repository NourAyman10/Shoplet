import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shoplet';

  constructor(private toastr: ToastrService, _network: NetworkService) {}

  showToast(): void {
    this.toastr.success('Toastr is working!');
    this.toastr.error('Toastr is working!');
  }
}
