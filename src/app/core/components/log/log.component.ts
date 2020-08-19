import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { AdminService } from "@app/core/services/admin.service";
import { HttpClient } from "@angular/common/http";
import {
  merge,
  Observable,
  of as observableOf,
  BehaviorSubject,
  of,
  fromEvent,
} from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { Sort } from "@angular/material/sort";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
tap;
DataSource;
@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
})
export class LogComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  log = [];
  dataSource: LogDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input") input: ElementRef;

  data: any;
  sortedData: any[];
  resultsLength = 0;

  logColumns = ["record_datetime", "message"];

  ngOnInit(): void {
    this.dataSource = new LogDataSource(this.adminService);
    this.dataSource.loadlogs("", "", "asc", 0, 3);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // server-side search
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
      // console.log(this.sort);
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
        // console.log(logs);
        this.resultsLength = logs.total;
        this.logSubject.next(logs.data);
      });
  }
}
