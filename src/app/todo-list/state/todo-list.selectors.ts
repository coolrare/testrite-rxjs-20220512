import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTodoList from './todo-list.reducer';

export const selectTodoListState = createFeatureSelector<fromTodoList.State>(
  fromTodoList.todoListFeatureKey
);

export const selectTodoItems = createSelector(
  selectTodoListState,
  (todoState) => todoState.todoList
);

export const selectTodoCount = createSelector(
  selectTodoListState,
  (todoState) => todoState.totalCount
);

