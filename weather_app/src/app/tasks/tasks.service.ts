import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
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

apiUrl = 'https://localhost:7216/';

  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]> {
    var response = this.http.get<Task[]>(`${this.apiUrl}/Tasks`)
    .pipe(
      tap(items => {
        console.log(items)
      }),
    )
    return response
  }

  createTask(task:Task):Observable<Task>{
    let newTask = JSON.stringify(task);
    return this.http.post<Task>(`${this.apiUrl}/Task/AddTask`, newTask, httpOptions);
  }

  updateTask(task:Task, taskId:string): Observable<Task> {
    let newTask = JSON.stringify(task)
    return this.http.put<Task>(`${this.apiUrl}/Product/${taskId}`, newTask, httpOptions);
  }

  private handleError(error: Response) {
    return error
  }
}
