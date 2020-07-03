import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() formEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.form && this.form.get('name') ? this.form.get('name') : null, [Validators.required]],
      email: [this.form && this.form.get('email') ? this.form.get('email') : null, [Validators.required]],
      description: [this.form && this.form.get('description') ? this.form.get('description') : null],
      phoneNumber: [this.form && this.form.get('phoneNumber') ? this.form.get('phoneNumber') : null]
    });
  }

  get requiredName() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  get requiredEmail() {
    return (
      this.form.get('email').hasError('required') &&
      this.form.get('email').touched
    )
  }

  get patternPhone() {
    // pattern("[0-9 ]{12}") убрал, добавил ngx-mask
    return (
      this.form.get('phoneNumber').hasError('pattern') &&
      this.form.get('phoneNumber').touched
    )
  }

  submit() {
    if (this.form.valid) {
      this.formEvent.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.form.reset();
    this.router.navigate(['/todo/list']);
  }

}
