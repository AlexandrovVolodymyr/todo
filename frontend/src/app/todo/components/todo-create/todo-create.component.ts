import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TodoItem, TodoService } from "../../services/todo.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      description: [null],
      phoneNumber: [null, [Validators.pattern("[0-9 ]{12}")]]
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
    return (
      this.form.get('phoneNumber').hasError('pattern') &&
      this.form.get('phoneNumber').touched
    )
  }

  submit() {
    if (this.form.valid) {
      this.todoService.createTodo(this.form.value)
        .subscribe(res => this.router.navigate(['/todo/list']));
    }
  }

  cancel() {
    this.form.reset();
    this.router.navigate(['/todo/list']);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
