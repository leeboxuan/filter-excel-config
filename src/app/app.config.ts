import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const APP_CONFIG = {
  operators: ['AND', 'OR'],
  fieldTypes: ['Text', 'Number', 'Date'],
  conditions: [
    'Greater Than',
    'Greater Than or Equal To',
    'Less Than',
    'Less Than or Equal To',
    'Containing',
    'Not Containing',
    'Beginning With',
    'Ending With',
    'Equal To',
    'Not Equal To',
  ],
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()],
};
