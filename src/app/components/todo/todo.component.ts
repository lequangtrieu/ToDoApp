import {Component, OnInit} from '@angular/core';
import {Todo} from "../../models/Todo";
import {TodoFilter} from "../../enum/ToDoFilter";

let _id = 1;
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  newTodo: string = '';
  todos: Todo[] = [];
  filter: string = 'all';
  selectedFilter: string = 'all'; // Add this line to track the selected filter
  protected readonly TodoFilter = TodoFilter;

  ngOnInit(): void {
  }


  get remainingItems() {
    return this.todos.filter(todo => !todo.completed).length;
  } //method này lấy số lượng công việc chưa hoàn thành

  get filteredTodos() {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const todo = { id: _id++, task: this.newTodo.trim(), completed: false };
      this.todos.push(todo);
      this.newTodo = '';
    }
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.selectedFilter = filter; // cái này để active button nhóe :v
  }

  clearComplete(): void {
    console.log("day la nut clear completed")
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  onCheckboxChange(todo: Todo): void {
    console.log('Checkbox changed:', todo.completed);
  }
}
