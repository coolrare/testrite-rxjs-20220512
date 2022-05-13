import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { PageChangeEvent } from './page-change-event';
import { SortChangeEvent } from './sort-change-event';
import { loadTodoLists, queryTodoList, setTodoItems, todoListLoaded, todoListLoading } from './state/todo-list.actions';
import {
  selectTodoCount,
  selectTodoItems,
  selectTodoListLoading,
  selectTodoListState
} from './state/todo-list.selectors';
import { TodoItem } from './todo-item';
import { TodoItemStatusChangeEvent } from './todo-item-status-change-event';
import { TodoListAddDialogComponent } from './todo-list-add-dialog/todo-list-add-dialog.component';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  suggestList: string[] = [];

  totalCount = 0;
  todoList: TodoItem[] = [];

  keyword = '';
  sort: SortChangeEvent = {
    sortColumn: 'created',
    sortDirection: 'desc'
  };
  pagination: PageChangeEvent = {
    pageNumber: 1,
    pageSize: 10
  };

  loading = false;

  totalCount$ = this.store.select(selectTodoCount);
  todoList$ = this.store.select(selectTodoItems)
  loading$ = this.store.select(selectTodoListLoading)

  constructor(
    private todoListService: TodoListService,
    private dialog: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit(): void {

    this.store
      .select(selectTodoListState)
      .subscribe(data => {
        console.log(data);
      });

    // this.store.dispatch(loadTodoLists());

    this.refreshTodoList();
  }

  setSuggestList(keyword: string) {
    this.todoListService.getSuggestList(keyword).subscribe((result) => {
      this.suggestList = result;
    });
  }

  refreshTodoList() {
    // this.loading = true;
    this.store.dispatch(queryTodoList({ keyword: this.keyword, pagination: this.pagination, sort: this.sort }));

    // this.todoListService.getTodoList(
    //   this.keyword,
    //   this.pagination,
    //   this.sort
    // ).subscribe(data => {
    //   this.store.dispatch(setTodoItems({
    //     totalCount: data.totalCount,
    //     items: data.data
    //   }));
    // })

    //
    // this.loading = true;
    // this.todoListService
    //   .getTodoList(
    //     this.keyword,
    //     this.pagination,
    //     this.sort
    //   )
    //   .subscribe({
    //     next: (result) => {
    //       this.totalCount = result.totalCount;
    //       this.todoList = result.data;
    //       this.loading = false;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       alert(error.error.message);
    //     },
    //   });
  }

  sortChange(event: SortChangeEvent) {
    this.sort = { ...event };
    this.refreshTodoList();
  }

  refresh() {
    this.refreshTodoList();
  }

  pageChange(event: PageChangeEvent) {
    this.pagination = {
      pageNumber: event.pageNumber + 1,
      pageSize: event.pageSize
    };
    this.refreshTodoList();
  }

  displayTodoDialog() {
    this.dialog
      .open(TodoListAddDialogComponent)
      .afterClosed()
      .subscribe((text) => {
        if (text !== '') {
          this.todoListService.addTodo(text).subscribe((item) => {
            this.refreshTodoList();
          });
        }
      });
  }

  resetSortAndPage() {
    this.sort = {
      sortColumn: 'created',
      sortDirection: 'desc'
    };

    this.pagination = {
      pageNumber: 1,
      pageSize: 10
    };
  }

  search(keyword: string) {
    this.keyword = keyword;
    this.resetSortAndPage();
    this.refreshTodoList();
  }

  todoItemStatusChange(status: TodoItemStatusChangeEvent) {
    this.todoListService
      .updateTodoDoneStatus(status.id, status.done)
      .subscribe((item) => {
        this.refreshTodoList();
      });
  }

  todoItemDelete(id: string) {
    this.todoListService.deleteTodoItem(id).subscribe(() => {
      this.refreshTodoList();
    });
  }
}
