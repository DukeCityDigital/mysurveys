import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordFormRoutingModule } from './password-form-routing.module';
import { PasswordFormComponent } from './password-form.component';
import { MaterialBaseModule } from '../material-base/material-base.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PasswordFormComponent],
  imports: [
    CommonModule,
    PasswordFormRoutingModule,
    MaterialBaseModule,
    MatInputModule
  ],
  exports: [PasswordFormComponent]
})
export class PasswordFormModule { }
