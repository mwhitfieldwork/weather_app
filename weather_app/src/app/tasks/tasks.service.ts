import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Task } from '../_models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

apiUrl = 'https://task-manager-app-production-db8e.up.railway.app';

  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]> {
    var response = this.http.get<Task[]>(`${this.apiUrl}`)
    .pipe(
      tap(items => {
        console.log(items)
      }),
    )
    return response
  }

  createTask(task:Task):Observable<Task>{
    let newTask = JSON.stringify(task);
    return this.http.post<Task>(`${this.apiUrl}/Tasks`, newTask, httpOptions)
    .pipe(
      catchError((error)=> {
        console.log(error)
        return throwError(
          () => new Error('Something went wrong with sending the task')
        )
      }
    )
    );
  }

  updateTask(task:Task, taskId:string): Observable<Task> {
    let newTask = JSON.stringify(task)
    return this.http.put<Task>(`${this.apiUrl}/Product/${taskId}`, newTask, httpOptions)
    .pipe(
      catchError((error)=> {
        console.log(error)
        return throwError(
          () => new Error('Something went wrong with the update')
        )
      }
    )
    );
  }

  private handleError(error: Response) {
    return error
  }
}
