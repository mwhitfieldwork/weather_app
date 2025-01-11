import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Task } from '../_models/task.model';
import { TasksService } from './tasks.service';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{
  @ViewChildren(FormControlName, { read: ElementRef })
  formControls!: ElementRef[];
  taskForm!: FormGroup
  isTaskAdded: boolean = false
  tasks: Task[] = [];

  constructor(private fb:FormBuilder, private tasksService: TasksService,
    private destroyRef: DestroyRef){

  }

  addTask(){
    this.isTaskAdded = true;
  }

  ngOnInit(): void {
   const subscription =  this.tasksService.getTasks().subscribe(
      (response) => {
        this.tasks = response
      }
    );

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    this.taskForm = this.fb.group({
      taskname: ['', Validators.required],
      completed: [false, Validators.nullValidator]
    })
  }

  CreateTask(taskForm: FormGroup){
    console.log(taskForm.value);

    const task: Task = {
      id: 0,
      taskname: taskForm.value.taskname,
      completed: taskForm.value.completed
    }

    //this.tasks.push(task);
    this.taskForm.reset();
    this.isTaskAdded = false

    this.tasksService.createTask(task).subscribe(
      (response) => {
        console.log(response);
      }
    );

  }


  UpdateTask(task: Task){

    var taskUpdate = {...task, 
      "taskId": task.id,
      "taskname": task.taskname,
      "completed": task.completed
    }
  
    this.tasksService.updateTask(taskUpdate, task.id.toString()).subscribe(task => {
      console.log(task);
    })
  }
}
