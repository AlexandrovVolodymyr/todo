import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from './containers/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TodoShowComponent } from './components/todo-show/todo-show.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/todo/list'
  },
  {
    path: '',
    component: TodoComponent,
    children: [
      { path: 'list', component: TodoListComponent},
      { path: 'create', component: TodoCreateComponent },
      { path: 'edit/:id', component: TodoShowComponent },
      { path: 'read/:id', component: TodoShowComponent },
    ]
  }
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoEditComponent,
    TodoCreateComponent,
    TodoItemComponent,
    TodoShowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class TodoModule { }
