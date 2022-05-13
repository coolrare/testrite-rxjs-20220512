import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, filter } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TodoListService } from '../todo-list.service';

import * as TodoListActions from './todo-list.actions';



@Injectable()
export class TodoListEffects {

  loadTodoLists$ = createEffect(() => {
    return this.actions$.pipe(
      // filter(action => action.type === TodoListActions.loadTodoLists.type),
      ofType(TodoListActions.loadTodoLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TodoListActions.loadTodoListsSuccess({ data })),
          catchError(error => of(TodoListActions.loadTodoListsFailure({ error }))))
      )
    );
  });

  queryTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListActions.queryTodoList),
      concatMap(action => {
        return this
          .todoListService
          .getTodoList(action.keyword, action.pagination, action.sort)
          .pipe(
            map(data => TodoListActions.setTodoItems({ totalCount: data.totalCount, items: data.data })),
            catchError(error => {
              console.error(error);
              return of(TodoListActions.setTodoItems({ totalCount: 0, items: [] }))
            })
          )
      }))
  });

  constructor(private actions$: Actions, private todoListService: TodoListService) {}

}
