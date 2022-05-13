# Angular 進階開發實戰 - 精通 RxJS 應用 - 範例程式

## 回家作業

- [回家練習-說明](homework.md)
- [回家練習-參考解答](https://stackblitz.com/edit/textwrite-rxjs-homework-ans)
- [上課時的實作範例](https://stackblitz.com/edit/testrite-rxjs-homework)

## 推薦套件

- [Code Metrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)

## 程式範例

- [課堂上提到的範例程式專案](https://github.com/coolrare/angular-advanced-rxjs-full)
- [RxJS 單元測試範例](https://github.com/coolrare/angular-advanced-rxjs-testing)

## NgRx 練習

### 練習 1

- 安裝 `@ngrx/store, @ngrx/schematics, @ngrx/effects`
- 建立一個 feature: `ng add feature todos-list/state/todo-list`
- 確認 app.module.ts 下，有註冊 `StoreModule.forRoot(), EffectsModule.forRoot()`
- 確認 todo-list.module.ts 下，有註冊 `StoreModule.forFeature(todoListFeatureKey, reducer), EffectsModule.forFeature([TodoListEffects])`
- 在 todo-list.reducer.ts 內，設定 `State` 型別，並指定 `initialState`
- 在 todo-list.component.ts 內，注入 `Store`，並取得狀態資訊：`this.store.subscribe(console.log)`
- 使用預設建立好的 `selectTodoListState` Selector，取得指定 Feature 的內容：`this.store.select(selectTodoListState).subscribe(console.log)`

### 練習 2

- 建立一個工作說明（Action）
  
  ```typescript
  export const setTodoItems = createAction(
    '[TodoList] Set Todo Items',
    props<{ totalCount: number, items: TodoItem[] }>()
  );
  ```
  
- 在 `todo-list.component.ts` 內分配此工作 （dispatch action）

  ```typescript
  this.store.dispatch(setTodoItems({ ... }))
  ```
  
- 在 `todo-list.reducer.ts` 內根據此工作改變狀態

  ```typescript
  on(TodoListActions.setTodoItems, (state, action) => ({
    ...state,
    totalCount: action.totalCount,
    todoList: action.items
  }))
  ```
  
- 建立狀態選取器（Selector）

  ```typescript
  export const selectTodoItems = createSelector(
    selectTodoListState,
    (todoState) => todoState.todoList
  );
  
  export const selectTodoCount = createSelector(
    selectTodoListState,
    (todoState) => todoState.totalCount
  );
  ```

- `todo-list.component.ts` 內使用這些 Selector 取得實際上的狀態資料

  ```typescript
  totalCount$ = this.store.select(selectTodoCount);
  todoList$ = this.store.select(selectTodoItems);
  ```

### 練習 3

- 建立一個給 Effect 使用的 Action

  ```typescript
  export const queryTodoList = createAction(
  '[TodoList] Query TodoList',
  props<{ keyword: string, pagination: PageChangeEvent, sort: SortChangeEvent}>()
  );
  ```

- 在 Effect 裡面建立處理 Action 的程式

  ```typescript
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
  ```

- todo-list.component.ts 派送 Action
  - `this.store.dispatch(queryTodoList({ keyword: this.keyword, pagination: this.pagination, sort: this.sort }));`

- 進階練習：將 todo-list.component.ts 內的屬性都移動到 Store 內的狀態
  - 變更狀態統一透過 Action -> Reducer
  - 取的狀態統一透過 Selector
  - todo-list.component.ts 下得子元件，也可以改成從 Store 存取資料，不再透過 @Input / @Output
