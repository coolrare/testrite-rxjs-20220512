import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, filter, concatAll } from 'rxjs/operators';
import { Observable, EMPTY, of, from } from 'rxjs';
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
        const loading$ = of(TodoListActions.todoListLoading());
        const loaded$ = of(TodoListActions.todoListLoaded());
        const query$ = this
          .todoListService
          .getTodoList(action.keyword, action.pagination, action.sort)
          .pipe(
            map(data => TodoListActions.setTodoItems({ totalCount: data.totalCount, items: data.data })),
            catchError(error => {
              console.error(error);
              return of(TodoListActions.setTodoItems({ totalCount: 0, items: [] }))
            })
          );
        return from([loading$, query$, loaded$]).pipe(concatAll());
      }))
  });

  constructor(private actions$: Actions, private todoListService: TodoListService) {}

}
