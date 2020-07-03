import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { TodoComponent } from './containers/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FormItemComponent } from "./shared/components/form-item/form-item.component";

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
      { path: 'edit/:id', component: TodoEditComponent },
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
    FormItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class TodoModule { }
