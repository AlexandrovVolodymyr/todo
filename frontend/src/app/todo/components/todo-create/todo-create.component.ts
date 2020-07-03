import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { TodoService } from "../../services/todo.service";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit, OnDestroy {

  subscription$$: Subject<void> = new Subject<void>();

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitForm(values: any) {
    console.log('created');
    this.todoService.createTodo(values)
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
