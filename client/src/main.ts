import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms'; //

import { routes } from './app/app.routes' 
import { App } from './app/app';
import { bootstrapApplication } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),    // Omogućava Dependency Injection za HttpClient
    importProvidersFrom(ReactiveFormsModule) 
  ]
};
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));