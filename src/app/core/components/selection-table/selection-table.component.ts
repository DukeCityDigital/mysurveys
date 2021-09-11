import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "@app/core/services/auth.service";
import { User } from "@app/core/models/user";
import { Sort } from "@angular/material/sort";
import { HttpClient } from "@angular/common/http";
import { merge, Observable, of as observableOf } from "rxjs";
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
    { name: "Vac", value: "vac_receive" },
    { name: "Vac Benefit", value: "vac_benefit" },
    { name: "Vac Effective", value: "vac_effective" },
    { name: "Vac Harmful", value: "vac_harmful" },
    { name: "Vac Pharma", value: "vac_pharma" },
    { name: "GM", value: "gm" },
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
    // "birthyear",
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
    "created_at",
    "currentProject",

    "is_seed",
    "friends",
    "paypal_id_status",
    'source',
    "peers",
    // "birthyear",
    "vac_benefit",
    "vac_effective",
    "vac_harmful",
    "vac_pharma",
    // "qualification_gm",
    // "qualification_vac",
    "add",
  ];

  sortedData: any[];

  dataSource = new MatTableDataSource<User>(this.USERS);
  selection = new SelectionModel<User>(true, []);
  c = [];
  invitedUsers = [];
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
  ) { }

  update(event) {
    this.projectService
      .getAdvancedSelection({
        project_id: this.project_id,
        categoryForm: event.gm,
        eligible_peers: event.eligible_peers,
        eligible_seed: event.eligible_seed,
        paypal_status_ok: event.paypal_status_ok,
        paypal_status: event.paypal_status,

        include_peers: event.include_peers,
        include_seeds: event.include_seeds,
        survey_complete: event.survey_complete,
      })
      .subscribe((r) => {

        r.data.forEach(element => {
          element.projects.forEach(element2 => {
            console.log('currentprojectest',element,element2);

            if (element2.projects_projectid ==this.project_id) {
              element.currentProject = element2;
              if (this.invitedUsers.indexOf(element) ==-1) {
                this.invitedUsers.push(element);

              }
              console.log('currentprojectmatch',element,element2);

            }
          });
        });
        this.data = r.data;
        console.log(this.data);
        //
        this.selectedUSERS = r.data;
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.project_id = params.get("id");
      if (this.project_id) {
        //
      }
    });
  }

  public changeSelection(value) {
    //
  }

  public saveSelection(incids?: any) {
    console.log(incids);
    let ids = [];
    let post = { project_id: this.project_id, users: ids };

    if (!incids) {
      let r = window.confirm(
        "Are you sure you wish to save the selection?  It will overwrite the previous selection"
      );
      if (r !== true) {
        return false;
      }

      this.selectedUSERS.forEach((element) => {
        post.users.push(element.user_id);
      });
    } else {
      post.users = incids;
      post["update"] = true;
    }

    this.projectService.createSelection(post).subscribe((r) => {
      this.alertService.success(r.data, { autoClose: true });
    });
  }

  // public makeSafeID() {
  //   return (
  //     Math.random().toString(36).substring(2, 4) +
  //     Math.random().toString(36).substring(2, 4)
  //   );
  // }

  sortData(sort: Sort) {
    console.log('sortdata', sort)
    // const data = this.users.slice();
    console.log(this.data);
    const data = this.data.slice();

    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      console.log(sort.active)
      switch (sort.active) {
        case "qualification_friends":
          return compare(a.qualification_friends, b.qualification_friends, isAsc);
        case "qualification_gm":
          return compare(a.qualification_gm, b.qualification_gm, isAsc);
        case "qualification_parents":
          return compare(a.qualification_parents, b.qualification_parents, isAsc);
        case "qualification_us":
          return compare(a.qualification_us, b.qualification_us, isAsc);
        case "qualification_vac":
          return compare(a.qualification_vac, b.qualification_vac, isAsc);
        case "vac_benefit":
          return compare(a.qualification_vac_benefit, b.qualification_vac_benefit, isAsc);
        case "vac_effective":
          return compare(a.qualification_vac_effective, b.qualification_vac_effective, isAsc);
        case "vac_harmful":
          return compare(a.qualification_vac_harmful, b.qualification_vac_harmful, isAsc);
        case "vac_pharma":
          return compare(a.qualification_vac_pharma, b.qualification_vac_pharma, isAsc);
        case "vac_receive":
          return compare(a.qualification_vac_receive, b.qualification_vac_receive, isAsc);
        case "id":
          return compare(a.id, b.id, isAsc);
        case "is_seed":
          return compare(a.is_seed, b.is_seed, isAsc);
        case "paypal_id_status":
          return compare(a.paypal_id_status, b.paypal_id_status, isAsc);
        case "source":
          var a = a.source ? a.source : '0';
          var b = b.source ? b.source : '0';
          return compare(a, b, isAsc);
        case "peers":
          return compare(a.verified_friends_count, b.verified_friends_count, isAsc);
        case "friends":
            return compare(a.friends, b.friends, isAsc);
        case "currentProject":
            return compare(a.currentProject.invited, b.currentProject.invited, isAsc);
        case "created_at":
          return compare(a.created_at, b.created_at, isAsc);
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

  isInSelection() { }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(checked?: boolean) {
    if (this.isAllSelected()) {
      //
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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.id + 1
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

  ngAfterViewInit(): void { }

  filterData(filterValue?, position?) {
    this.dataSource.filterPredicate = function customFilter(
      data,
      filter: string
    ): boolean {
      return data.birthyear < this.maxYear && this.birthyear > this.minYear;
    };
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

export class SelectionService {
  constructor(private _httpClient: HttpClient) { }

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
    //
    return this._httpClient.get<any>(requestUrl);
  }
}
