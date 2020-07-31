import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "@app/core/services/auth.service";
import { User } from "@app/core/models/user";
import { Sort } from "@angular/material/sort";
import { HttpClient } from "@angular/common/http";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap, delay } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ProjectService } from "@app/core/services/project.service";
import { ParticipantService } from "@app/core/services/participant.service";
import { AlertService } from "../_alert";
import { Router, Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-selection-table",
  templateUrl: "./selection-table.component.html",
  styleUrls: ["./selection-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class SelectionTableComponent implements OnInit {
  USERS: any;
  project_id: number;
  selectedUSERS = [];

  selectedStatus: any;
  data: any;

  categories = [
    { name: "GM", value: "gm" },
    { name: "Vac", value: "vac" },
    { name: "", value: "gm" },
  ];

  selectedStatusOptions = [
    { name: "Any", value: "any" },

    { name: "Eligible Seed", value: "eligible-seed" },
    { name: "Eligible Peer", value: "eligible-peer" },
  ];

  displayedColumns: string[] = [
    "select",
    "id",
    "name",
    "birthyear",
    "qualification_parents",
    "qualification_friends",
    "qualification_gm",
    "qualification_vac",
    "qualification_us",
    "email",
    "created_at",
    "last_login",
    "last_update",
    "banned",
    "banned_reason",
    "banned_date",
    "activated",
    "registration_key",
    "is_seed",

    // TODO switch for nickname
  ];
  participantColumns: string[] = [
    "id",
    "is_seed",
    "peers",
    "friends",
    "birthyear",
    "paypal_id_status",

    "qualification_gm",
    "qualification_vac",
  ];

  sortedData: any[];

  dataSource = new MatTableDataSource<User>(this.USERS);
  selection = new SelectionModel<User>(true, []);

  filterYear: string;
  maxYear: number = 2010;
  minYear: number = 1930;
  users = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private participantService: ParticipantService,
    private projectService: ProjectService,
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private _httpClient: HttpClient
  ) {}

  update(event) {
    // console.log(event, "childiupdate");
    this.projectService
      .getAdvancedSelection({
        project_id: this.project_id,
        categoryForm: event.gm,
        eligible_peer: event.eligible_peer,
        eligible_seed: event.eligible_seed,
        paypal_status_ok: event.paypal_status_ok,
      })
      .subscribe((r) => {
        this.data = r.data;
        // console.log(r);
        // this.selectedUSERS = r.data;
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.project_id = params.get("id");
      if (this.project_id) {
        // this.projectService
        //   .getSelection({ project_id: this.project_id })
        //   .subscribe((r) => {
        //     console.log(r);
        //     this.selectedUSERS = r.data;
        //   });
      }
    });

    // this.participantService.getAll().subscribe((r: any) => {
    //   console.log(r);
    //   this.users = r.data;
    //   this.sortedData = this.users.slice();
    //   this.dataSource.data = r.data;
    // });
  }

  public changeSelection(value) {
    console.log("change sel", value);
  }

  public saveSelection() {
    let r = window.confirm(
      "Are you sure you wish to save the selection?  It will overwrite the previous selection"
    );
    if (r !== true) {
      return false;
    }
    let ids = [];
    this.selectedUSERS.forEach((element) => {
      ids.push(element.id);
    });

    let post = { project_id: this.project_id, users: ids };
    // console.log(post);
    this.projectService.createSelection(post).subscribe((r) => {
      // console.log(r);
      this.alertService.success(r.data, { autoClose: true });
    });
  }

  public makeSafeID() {
    return (
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 4)
    );
  }

  sortData(sort: Sort) {
    // console.log("sortdata", sort);
    const data = this.users.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "qualification_gm":
          return compare(a.qualification_gm, b.qualification_gm, isAsc);
        case "qualification_vac":
          return compare(a.qualification_vac, b.qualification_vac, isAsc);
        case "family_name":
          return compare(a.family_name, b.family_name, isAsc);
        case "birthyear":
          return compare(a.birthyear, b.birthyear, isAsc);
        default:
          return 0;
      }
    });
    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelectionSelected() {
    const numSelected = this.selectedUSERS.length;
    const numRows = this.dataSource.data.length;
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
      this.dataSource.data.forEach((row) => {
        this.selection.select(row);
      });
      this.dataSource.data.forEach((row) => this.addToSelection(row, true));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }
  resultsLength = 0;

  clearSelectedUsers() {
    this.selectedUSERS = [];
  }
  isLoadingResults = true;

  addToSelection(row?, checked?) {
    if (this.selectedUSERS.indexOf(row) < 0 && checked) {
      this.selectedUSERS.push(row);
    } else {
      this.remove(row);
    }
  }
  selectionService;

  ngAfterViewInit(): void {
    // this.onS
    // //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // //Add 'implements AfterViewInit' to the class.
    // this.selectionService = new SelectionService(this._httpClient);
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // console.log("paginator2", this.paginator);
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     delay(0),
    //     switchMap(() => {
    //       console.log("switchmap");
    //       this.isLoadingResults = true;
    //       return this.selectionService!.getSelection(
    //         this.sort.active,
    //         this.sort.direction,
    //         this.paginator.pageIndex,
    //         this.project_id
    //       );
    //     }),
    //     map((data: any) => {
    //       console.log(data);
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       // this.isRateLimitReached = false;
    //       this.resultsLength = data.data.total_count;
    //       return data.data;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       // Catch if the GitHub API has reached its rate limit. Return empty data.
    //       // this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.data = data;
    //   });
  }

  filterData(filterValue?, position?) {
    this.dataSource.filterPredicate = function customFilter(
      data,
      filter: string
    ): boolean {
      console.log(data.birthyear, this.maxYear, this.minYear);
      return data.birthyear < this.maxYear && this.birthyear > this.minYear;
    };
    console.log(filterValue);
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue.toString();
  }

  remove(participant) {
    //remove participant from table in UI

    this.dataSource.data.forEach((row) => {
      if (row.id === participant.id) {
        this.selection.deselect(row);
      }
    });

    this.selectedUSERS.splice(this.selectedUSERS.indexOf(participant), 1);
  }
}
import { environment } from "../../../../environments/environment";
import { FormGroup } from "@angular/forms";

export class SelectionService {
  constructor(private _httpClient: HttpClient) {}

  getSelection(
    sort: string,
    order: string,
    page: number,
    project_id: number
  ): Observable<any> {
    const href = environment.apiUrl;
    const requestUrl = `${href}/participants?project_id=${project_id}&sort=${sort}&order=${order}&page=${
      // const requestUrl = `${href}/participants?project_id=${project_id}&sort=${sort}&order=${order}&page=${
      page + 1
    }`;
    console.log("get part", requestUrl);
    return this._httpClient.get<any>(requestUrl);
  }
}
