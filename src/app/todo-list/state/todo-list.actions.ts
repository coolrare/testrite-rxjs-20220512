import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../todo-item';

export const loadTodoLists = createAction(
  '[TodoList] Load TodoLists'
);

export const loadTodoListsSuccess = createAction(
  '[TodoList] Load TodoLists Success',
  props<{ data: any }>()
);

export const loadTodoListsFailure = createAction(
  '[TodoList] Load TodoLists Failure',
  props<{ error: any }>()
);

export const setTodoItems = createAction(
  '[TodoList] Set Todo Items',
  props<{ totalCount: number, items: TodoItem[] }>()
);

// export const setTodoItems2 = createAction(
//   '[TodoList] Set Todo Items',
//   props<{ payload: { totalCount: number, items: TodoItem[] } }>()
// );
