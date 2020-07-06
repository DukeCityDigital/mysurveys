import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "@app/core/services/auth.service";
import { User } from "@app/core/models/user";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ProjectService } from "@app/core/services/project.service";
import { ParticipantService } from "@app/core/services/participant.service";
import { MatSort } from "@angular/material/sort";
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
  selectedUSERS = [
    {
      safeid: "4#$34",
      birthyear: 1977,
      qualification_gm: 3,
      qualification_vac: 3,
    },
  ];
  displayedColumns: string[] = [
    "select",
    "id",
    "name",
    "birthyear",
    "safeid",
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
    // TODO switch for nickname
  ];
  participantColumns: string[] = [
    "select",

    // "id",
    // "first_name",
    "family_name",
    "birthyear",
    // "qualification_parents",
    // "qualification_friends",
    "qualification_gm",
    "qualification_vac",
    // "qualification_us",

    // "safeid",
    // "year",

    // "email",
    // "created_at",
    // "last_login",
    // "last_update",
    // "banned",
    // "banned_reason",
    // "banned_date",
    // "activated",
    // "registration_key",
    // TODO switch for nickname
  ];

  // participantColumns: any[] = [
  // { name: "ID", value: "id", type: "" },
  // { name: "Safe ID", value: "safeid", type: "" },
  // { name: "Year", value: "year", type: "" },
  // { name: "Qualification-Parents", value: "qualification_parents", type: "" },
  // { name: "Qualification-Friends", value: "qualification_friends", type: "" },

  // "id",
  // "safeid",
  // "year",
  // "qualification_parents",
  // "qualification_friends",
  // "qualification_gm",
  // "qualification_vac",
  // "qualification_us",
  // ];

  dataSource = new MatTableDataSource<User>(this.USERS);
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private participantService: ParticipantService,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.projectService.users().subscribe((r: any) => {
    //   console.log(r);
    //   this.dataSource.data = r.users;
    // });
    this.participantService.getAll().subscribe((r: any) => {
      console.log(r);
      this.dataSource.data = r.data;
    });
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
      this.selection.clear();
      this.clearSelectedUsers();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
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

  clearSelectedUsers() {
    this.selectedUSERS = [];
  }

  addToSelection(row?, checked?) {
    if (this.selectedUSERS.indexOf(row) < 0 && checked) {
      this.selectedUSERS.push(row);
    } else {
      this.remove(row);
    }
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
