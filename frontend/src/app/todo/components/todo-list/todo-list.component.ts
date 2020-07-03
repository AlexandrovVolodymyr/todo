import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { TodoItem, TodoService } from "../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todoList: TodoItem[];

  subscription$$: Subject<void> = new Subject<void>();

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoService.getTodo()
      .pipe(
        takeUntil(this.subscription$$)
      ).subscribe(data => {
        this.todoList = data;
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id)
      .pipe(
        takeUntil(this.subscription$$)
      )
      .subscribe(() => this.todoList = this.todoList.filter(item => item['_id'] !== id));
  }

  editTodo(id: number) {
    this.router.navigate([`/todo/edit/${id}`]);
  }

  ngOnDestroy() {
    this.subscription$$.next();
    this.subscription$$.complete();
  }
}
