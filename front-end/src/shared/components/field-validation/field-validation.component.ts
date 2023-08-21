import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-field-validation',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.css']
})
export class FieldValidationComponent implements OnInit {

  @Input() required = false;

  @ContentChild(HTMLElement) label: any;
  @ContentChild(FormControlName) input: any;

  constructor() { }

  ngOnInit(): void {}

  hasSuccess(): any {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): any {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

  optionClass(): string {
    if(this.hasSuccess()){
      return 'has-success'
    }

    if(this.hasError()){
      return 'has-error'
    }

    return ''
  }

}
