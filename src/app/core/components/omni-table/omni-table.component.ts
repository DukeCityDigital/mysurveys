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
import { CollectionViewer, SelectionModel } from "@angular/cdk/collections";

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
import { User } from "@app/core/models/user";
@Component({
  selector: "app-omni-table",
  templateUrl: "./omni-table.component.html",
  styleUrls: ["./omni-table.component.scss"],
})
export class OmniTableComponent implements OnInit {
  @Input() columns: any = ["id"];
  @Input() options: any = { selectable: false };
  @Input() actions: any;

  PROJECTPARTICIPANTS: any;

  @Input() objectColumns: any[] = [
    { name: "ya", selectable: true, editable: true, inputType: "text" },
  ];

  @Input() title: string = "Omni Table";

  //can rows be selected generally
  @Input() selectableRows: boolean;
  dataSource: OmniDataSource;
  resultsLength = 0;
  displayedColumns: any[] = this.objectColumns.map((col) => col.name);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input") input: ElementRef;
  data: any;

  searchField: any = "id";

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

  searchFields = [];

  public singleAction(actionString: string) {
    console.log("buttonAction", actionString);
  }
  public groupAction(actionString: string) {
    console.log("grp nAction", actionString);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.resultsLength;
    return numSelected === numRows;
  }

  isAllSelectionSelected() {
    const numSelected = this.PROJECTPARTICIPANTS.length;
    const numRows = this.dataSource.resultsLength;

    return numSelected === numRows;
  }

  isInSelection() {}

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(checked?: boolean) {
    console.log("mastertoggle", checked, this.isAllSelected());
    if (this.isAllSelected()) {
      // console.log("allselected");
      this.selection.clear();
      this.clearSelectedUsers();
    } else {
      // this.dataSource.data.forEach((row) => {
      //   this.selection.select(row);
      // });
      // this.dataSource.data.forEach((row) => this.addToSelection(row, true));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    // if (!row) {
    //   return `${this.isAllSelected() ? "select" : "deselect"} all`;
    // }
    // return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
    //   row.id + 1
    // }`;
    return "str";
  }
  // resultsLength = 0;

  clearSelectedUsers() {
    // this.selectedUSERS = [];
  }
  isLoadingResults = true;

  addToSelection(row?, checked?) {
    // if (this.selectedUSERS.indexOf(row) < 0 && checked) {
    //   this.selectedUSERS.push(row);
    // } else {
    //   this.remove(row);
    // }
  }

  /**
   * Transform input columns into objects if string
   * @param columns
   */
  createObjectColumns() {
    var objectColumns;
    var displayColumns = [];
    var returnColumns = [];
    var searchFields = [];
    let actionItem = this.actions
      ? typeof this.columns[0] == "string"
        ? "actions"
        : { name: "actions" }
      : null;
    if (typeof this.columns[0] == "string") {
      this.columns.forEach((element) => {
        displayColumns.push(element);
        var item = {
          name: element,
        };
        searchFields.push(element + "_search");
        returnColumns.push(item);
      });
      if (this.options.selectable) {
        this.objectColumns.unshift("select");
      }
    } else {
      this.objectColumns = this.columns;
      this.objectColumns.unshift({ name: "select" });
    }
    actionItem ? this.objectColumns.push(actionItem) : null;

    this.searchFields = searchFields;
    console.log(this.searchFields);
    // debugger;

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
