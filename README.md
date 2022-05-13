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

### 練習1

- 安裝 `@ngrx/store, @ngrx/schematics, @ngrx/effects`
- 建立一個 feature: `ng add feature todos-list/state/todo-list`
- 確認 app.module.ts 下，有註冊 `StoreModule.forRoot(), EffectsModule.forRoot()`
- 確認 todo-list.module.ts 下，有註冊 `StoreModule.forFeature(todoListFeatureKey, reducer), EffectsModule.forFeature([TodoListEffects])`
- 在 todo-list.reducer.ts 內，設定 `State` 型別，並指定 `initialState`
- 在 todo-list.component.ts 內，注入 `Store`，並取得狀態資訊：`this.store.subscribe(console.log)`
- 使用預設建立好的 `selectTodoListState` Selector，取得指定 Feature 的內容：`this.store.select(selectTodoListState).subscribe(console.log)`
