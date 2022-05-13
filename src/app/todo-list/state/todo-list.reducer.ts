import { Action, createReducer, on } from '@ngrx/store';
import { TodoItem } from '../todo-item';
import * as TodoListActions from './todo-list.actions';

export const todoListFeatureKey = 'todoList';

export interface State {
  todoCount: number;
  todoList: TodoItem[];
}

export const initialState: State = {
  todoCount: 1000,
  todoList: []
};

export const reducer = createReducer(
  initialState,

  on(TodoListActions.loadTodoLists, state => state),
  on(TodoListActions.loadTodoListsSuccess, (state, action) => state),
  on(TodoListActions.loadTodoListsFailure, (state, action) => state),

);
