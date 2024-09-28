import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import if you're using reactive forms
import { AppRoutingModule } from './app.routes'; // Adjust path as needed
import { AppComponent } from './app.component';
import { RuleConfigurationComponent } from './components/rule-configuration/rule-configuration.component';

import { UploadComponent } from './components/upload/upload.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [RuleConfigurationComponent, UploadComponent],
  imports: [
    AppComponent,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
})
export class AppModule {}
