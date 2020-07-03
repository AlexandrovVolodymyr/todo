import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface TodoItem {
  name: string;
  email: string;
  description: string;
  phoneNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  createTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.baseUrl}/create`, todo, {
      headers: this.headers
    }).pipe(
      catchError(this.errorMsg)
    );
  }

  getTodo(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.baseUrl}`, {
      headers: this.headers
    }).pipe(
      catchError(this.errorMsg)
    );
  }

  getTodoItem(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.baseUrl}/read/${id}`, {
      headers: this.headers
    }).pipe(
      catchError(this.errorMsg)
    );
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {
      headers: this.headers
    }).pipe(
      catchError(this.errorMsg)
    );
  }

  editTodo(id: number, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data, {
      headers: this.headers
    }).pipe(
      catchError(this.errorMsg)
    );
  }

  // Error handling
  private errorMsg(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
