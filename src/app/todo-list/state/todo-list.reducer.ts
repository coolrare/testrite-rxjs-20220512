import { Action, createReducer, on } from '@ngrx/store';
import { TodoItem } from '../todo-item';
import * as TodoListActions from './todo-list.actions';

export const todoListFeatureKey = 'todoList';

export interface State {
  totalCount: number;
  todoList: TodoItem[];
}

export const initialState: State = {
  totalCount: 1000,
  todoList: []
};

export const reducer = createReducer(
  initialState,

  on(TodoListActions.loadTodoLists, state => ({
    ...state,
    totalCount: 2,
    todoList: [
      {
        id: '1',
        text: 'Todo 1',
        done: true,
        created: new Date().getTime()
      },
      {
        id: '2',
        text: 'Todo 2',
        done: false,
        created: new Date().getTime()
      }
    ]
  })),
  on(TodoListActions.loadTodoListsSuccess, (state, action) => state),
  on(TodoListActions.loadTodoListsFailure, (state, action) => state),

  on(TodoListActions.setTodoItems, (state, action) => ({
    ...state,
    totalCount: action.totalCount,
    todoList: action.items
  }))

);
