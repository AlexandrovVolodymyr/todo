import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { TodoItem, TodoService } from "../../services/todo.service";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit, OnDestroy {

  todoItem: TodoItem;
  form: FormGroup;

  subscription$$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.todoService.getTodoItem(id)
      .pipe(
        takeUntil(this.subscription$$)
      )
      .subscribe(todo => {
        this.todoItem = todo;

        this.form = this.fb.group({
          name: [this.todoItem.name, [Validators.required]],
          email: [this.todoItem.email, [Validators.required]],
          description: [this.todoItem.description],
          phoneNumber: [this.todoItem.phoneNumber]
        });
      });
  }

  submitForm(values: any) {
    console.log('edited');
    this.todoService.editTodo(this.todoItem['_id'], values)
      .pipe(
        takeUntil(this.subscription$$)
      )
      .subscribe(res => this.router.navigate(['/todo/list']));
  }

  ngOnDestroy() {
    this.subscription$$.next();
    this.subscription$$.complete();
  }
}
