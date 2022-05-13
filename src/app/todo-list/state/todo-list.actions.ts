import { createAction, props } from '@ngrx/store';
import { PageChangeEvent } from '../page-change-event';
import { SortChangeEvent } from '../sort-change-event';
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

export const queryTodoList = createAction(
  '[TodoList] Query TodoList',
  props<{ keyword: string, pagination: PageChangeEvent, sort: SortChangeEvent}>()
);

// export const todoListLoading = createAction(
//   '[TodoList] Loading TodoList',
//   props<{ loading: boolean }>()
// );

export const todoListLoading = createAction(
  '[TodoList] Loading TodoList'
);

export const todoListLoaded = createAction(
  '[TodoList] TodoLists Loaded'
);

// export const setTodoItems2 = createAction(
//   '[TodoList] Set Todo Items',
//   props<{ payload: { totalCount: number, items: TodoItem[] } }>()
// );
