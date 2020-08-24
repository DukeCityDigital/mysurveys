import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
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
import {
  catchError,
  map,
  finalize,
  debounce,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { element } from "protractor";
@Component({
  selector: "app-omni-table",
  templateUrl: "./omni-table.component.html",
  styleUrls: ["./omni-table.component.scss"],
})
export class OmniTableComponent implements OnInit {
  @Input() columns: any = ["id"];
  @Input() objectColumns: any[] = [
    { name: "ya", selectable: true, editable: true, inputType: "text" },
  ];

  @Input() title: string = "Omni Table";

  //can rows be selected generally
  @Input() selectableRows: boolean;
  dataSource: OmniDataSource;
  resultsLength = 0;
  displayedColumns: any[] = this.objectColumns.map((col) => col.name);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input") input: ElementRef;
  data: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.dataSource = new OmniDataSource(this.adminService);
    this.dataSource.loadomni(
      this.title.split(" ").join("").toLowerCase(),
      "",
      "",
      "asc",
      1,
      10
    );
    window.setTimeout(
      () => (this.resultsLength = this.dataSource.resultsLength),
      750
    );
    this.createObjectColumns();
  }

  onPaginateChange(event) {
    console.log(event);
    this.paginator.pageIndex = event.pageIndex;
  }

  /**
   * Transform input columns into objects if string
   * @param columns
   */
  createObjectColumns() {
    var objectColumns;
    var displayColumns = [];
    var returnColumns = [];
    if (typeof this.columns[0] == "string") {
      this.columns.forEach((element) => {
        displayColumns.push(element);
        var item = {
          name: element,
        };
        returnColumns.push(item);
      });
      // this.objectColumns.push({ name: element });
    }
    this.objectColumns = returnColumns;
    this.displayedColumns = this.objectColumns.map((col) => col.name);
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
          this.paginator.pageIndex = 1;
          this.loadOmniPage();
          console.log("datas", this.dataSource);
          // this.resultsLength = this.dataSource.resultsLength;
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      console.log(this.sort);
      this.paginator.pageIndex = 1;
      // this.resultsLength = this.dataSource.resultsLength;
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          console.log(this.paginator);
          this.loadOmniPage();

          // this.resultsLength = this.dataSource.resultsLength;
        })
      )
      .subscribe();
  }

  loadOmniPage() {
    this.dataSource.loadomni(
      this.title.toLowerCase(),
      this.sort.active,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
export class OmniDataSource implements DataSource<any> {
  private omniSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private adminService: AdminService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.omniSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.omniSubject.complete();
    this.loadingSubject.complete();
  }

  public resultsLength: number;

  loadomni(
    model: string,
    active: string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.adminService
      .findOmni(model, active, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((logs: any) => {
        console.log(logs);
        this.resultsLength = logs.total;
        this.omniSubject.next(logs.data);
      });
  }
}
