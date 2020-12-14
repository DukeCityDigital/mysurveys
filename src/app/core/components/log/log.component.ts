import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AdminService } from "@app/core/services/admin.service";
import {
  merge,
  Observable,
  of as observableOf,
  BehaviorSubject,
  of,
  fromEvent,
} from "rxjs";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
})
export class LogComponent implements OnInit {
  log = [];
  dataSource: LogDataSource;
  data: any;
  sortedData: any[];
  resultsLength = 0;
  logColumns = ["record_datetime", "message"];

  constructor(private adminService: AdminService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input") input: ElementRef;

  ngOnInit(): void {
    this.dataSource = new LogDataSource(this.adminService);
    this.dataSource.loadlogs("", "", "asc", 0, 30);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLogsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      //
      this.paginator.pageIndex = 0;
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadLogsPage();
          this.resultsLength = this.dataSource.resultsLength;
        })
      )
      .subscribe();
  }
  loadLogsPage() {
    this.dataSource.loadlogs(
      this.sort.active,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
import {
  catchError,
  map,
  finalize,
  debounce,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";

export class LogDataSource implements DataSource<any> {
  private logSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private adminService: AdminService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.logSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.logSubject.complete();
    this.loadingSubject.complete();
  }

  public resultsLength: number;

  loadlogs(
    active: string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.adminService
      .findLogs(active, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((logs: any) => {
        //
        this.resultsLength = logs.total;
        this.logSubject.next(logs.data);
      });
  }
}
