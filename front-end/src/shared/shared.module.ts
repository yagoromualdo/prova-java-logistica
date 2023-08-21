import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldValidationComponent } from './components/field-validation/field-validation.component';

@NgModule({
  declarations: [
    FieldValidationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FieldValidationComponent]
})
export class SharedModule { }
