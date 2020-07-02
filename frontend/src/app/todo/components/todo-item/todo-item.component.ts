import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from "../../services/todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TodoItem;
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() showEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  delete() {
    this.deleteEvent.emit(this.todo['_id']);
  }

  edit() {
    this.editEvent.emit(this.todo['_id']);
  }

  show() {
    this.showEvent.emit(this.todo['_id']);
  }
}
