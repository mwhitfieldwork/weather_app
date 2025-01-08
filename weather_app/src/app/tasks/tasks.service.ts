import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Task } from '../_models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

apiUrl = 'https://localhost:7216/Product/';

  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]> {
    var response = this.http.get<Task[]>(this.apiUrl)
    .pipe(
      tap(items => {
        console.log(items)
      }),
    )
    return response
  }

  createTask(task:Task):Observable<Task>{
    let newTask = JSON.stringify(task);
    return this.http.post<Task>(this.apiUrl, newTask, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }


  private handleError(error: Response) {
    return error
  }
}
