import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(NgxSmartModalModule.forRoot()),
    provideToastr({
      timeOut: 4000,
      // extendedTimeOut: 0,
      positionClass: 'toast-top-center',
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
    })
  ]
};
