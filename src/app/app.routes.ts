import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleConfigurationComponent } from './components/rule-configuration/rule-configuration.component';

export const routes: Routes = [
  { path: '', redirectTo: '/rules', pathMatch: 'full' },
  { path: 'rules', component: RuleConfigurationComponent },
  // Add additional routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
