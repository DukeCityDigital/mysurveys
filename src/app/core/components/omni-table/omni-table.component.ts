import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
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
import { CollectionViewer, SelectionModel } from "@angular/cdk/collections";
import { AdminService } from "@app/core/services/admin.service";
import {
  catchError,
  map,
  finalize,
  debounce,
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { User } from "@app/core/models/user";
@Component({
  selector: "app-omni-table",
  templateUrl: "./omni-table.component.html",
  styleUrls: ["./omni-table.component.scss"],
  styles: [
    `
      .mat-paginator-navigation-next {
        display: none;
      }
      .mat-button-wrapper {
        display: none !important;
      }
    `,
  ],
})
export class OmniTableComponent implements OnInit {
  @Input() columns: any = ["id"];
  @Input() options: any = { selectable: false };
  @Input() actions: any;
  @Input() objectColumns: any[] = [
    { name: "ya", selectable: true, editable: true, inputType: "text" },
  ];
  @Input() title: string = "Omni Table";
  //can rows be selected generally
  @Input() selectableRows: boolean;
  @Output() submitRowEmit: EventEmitter<any> = new EventEmitter();

  PROJECTPARTICIPANTS: any;
  dataSource: OmniDataSource;
  resultsLength = 0;
  displayedColumns: any[] = this.objectColumns.map((col) => col.name);
  selection = new SelectionModel<any>(true, []);
  data: any;
  searchField: any = "id";
  pageSize = 10;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input") input: ElementRef;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.dataSource = new OmniDataSource(this.adminService);
    this.dataSource.loadomni(
      this.title.split(" ").join("").toLowerCase(),
      "",
      "",
      "asc",
      0,
      this.pageSize
    );

    this.createObjectColumns();
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
          this.loadOmniPage();
          // this.resultsLength = this.dataSource.resultsLength;
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      // this.paginator.pageIndex = 1;
      // this.resultsLength = this.dataSource.resultsLength;
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadOmniPage();

          // this.resultsLength = this.dataSource.resultsLength;
        })
      )
      .subscribe();
    window.setTimeout(
      () => (this.resultsLength = this.dataSource.resultsLength),
      750
    );
  }
  public submitRow(row?: any) {
    let em = {
      id: row.element.id,
      model: row.title,
      name: row.name,
      value: row.value,
    };

    this.submitRowEmit.emit(em);
  }
  // public submitRow(row?: any) {
  //
  //   this.submitRow.emit(row);
  // }

  onPaginateChange(event) {
    if (event.previousPageIndex == 0) {
      // event.pageIndex = 1;
      // TODO / double first page on paging / maybe backend fix
    }
    //
    this.paginator.pageIndex = event.pageIndex;
  }

  searchFields = [];

  public singleAction(actionString: string) {}
  public groupAction(actionString: string) {}

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
    if (this.isAllSelected()) {
      //
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
   * todo move this to a helper
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
    // let selectItem = this.actions
    //   ? typeof this.columns[0] == "string"
    //     ? "select"
    //     : { name: "select" }
    //   : null;
    if (
      !this.options.forceColumns ||
      typeof this.columns[0] == "string" ||
      !this.columns[0].hasOwnProperty("type") ||
      !this.columns[0].hasOwnProperty("name")
    ) {
      this.columns.forEach((element) => {
        let name = element.hasOwnProperty("name") ? element.name : element;
        let intype = element.hasOwnProperty("type") ? element.type : element;
        let inEdit = element.hasOwnProperty("edit") ? element.type : false;
        let inOptions = element.hasOwnProperty("options")
          ? element.options
          : false;
        displayColumns.push(element);
        var item = {
          name: name,
          type: intype,
          edit: inEdit,
          options: inOptions,
        };
        // searchFields.push(element + "_search");
        returnColumns.push(item);
      });
      this.objectColumns = returnColumns;
    } else {
      this.objectColumns = this.columns;
    }
    actionItem ? this.objectColumns.push(actionItem) : null;
    // selectItem ? this.objectColumns.unshift(selectItem) : null;

    this.searchFields = searchFields;
    //
    // debugger;

    this.displayedColumns = this.objectColumns.map((col) => col.name);
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
      .findOmni(model, active, filter, sortDirection, pageIndex + 1, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((logs: any) => {
        this.resultsLength = logs.total;
        this.omniSubject.next(logs.data);
      });
  }
}
