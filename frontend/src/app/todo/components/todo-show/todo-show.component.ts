import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { TodoItem, TodoService } from "../../services/todo.service";
import { Observable, of, Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.scss']
})
export class TodoShowComponent implements OnInit {

  todoItem: TodoItem;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      description: [null],
      phoneNumber: [null, [Validators.pattern("[0-9 ]{12}")]]
    });

    this.todoService.getTodoItem(id)
      .subscribe(todo => {
        this.todoItem = todo;

        this.form = this.fb.group({
          name: [this.todoItem.name, [Validators.required]],
          email: [this.todoItem.email, [Validators.required]],
          description: [this.todoItem.description],
          phoneNumber: [this.todoItem.phoneNumber, [Validators.pattern("[0-9 ]{12}")]]
        });
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
      this.todoService.editTodo(this.route.snapshot.params.id, this.form.value)
        .subscribe(res => this.router.navigate(['/todo/list']));
    }
  }

  cancel() {
    this.form.reset();
    this.router.navigate(['/todo/list']);
  }

}
