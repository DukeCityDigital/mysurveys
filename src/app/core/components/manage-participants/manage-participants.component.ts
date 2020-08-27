import { HttpClient } from "@angular/common/http";
import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap, delay } from "rxjs/operators";
import { ProjectService } from "@app/core/services/project.service";
import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { ParticipantService as pService } from "@app/core/services/participant.service";
import { AlertService } from "../_alert";

@Component({
  selector: "app-manage-participants",
  templateUrl: "./manage-participants.component.html",
  styleUrls: ["./manage-participants.component.scss"],
})
export class ManageParticipantsComponent implements OnInit {
  @Input("participants") participants: [];
  @Input("project") project: any;

  displayedColumns: string[] = [
    "created_at",
    "id",
    "safeid",
    "invited",
    "amount_to_pay",
    "finished",
    "finished_ip",
    "userparam1",
    "actions",
  ];

  resultsLength = 0;
  isLoadingResults = true;
  data: any;
  //filter to require non invited etc. .
  filter: string = "undefined";
  public TEST_MODE: boolean = true;
  invitationErrors: any;

  PREVIEWING: boolean = false;
  PREVIEWDATA: any;

  project_id: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  localParticipantService;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private _httpClient: HttpClient,
    // private localParticipantService: LocalParticipantService,
    private pService: pService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.alertService.success("Success on the left!!", { id: "alert-1" });
    this.route.paramMap.subscribe((params) => {
      this.project_id = +params.get("id");
    });
    this.localParticipantService = new LocalParticipantService(
      this._httpClient
    );

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.runTable();
  }

  public onRunTable(condition?: string) {
    this.filter = condition;
    this.runTable();
  }

  /**
   * Invite selected participantts
   * @param ids
   */
  public sendProjectInvitations(selectedIDs?) {
    this.alertService.success("Invitations sent", {
      autoClose: true,
    });
    this.alertService.success("Success on the left!!", { id: "alert-1" });
    // console.log("pj invites", this.data);
    // TODO confirmation
    // let r = window.confirm(
    //   "Are you sure you wish to send email invitations to these participants?"
    // );
    // if (r !== true) {
    //   return false;
    // }
    let ids = [];
    if (!selectedIDs) {
      this.data.forEach((element) => {
        // console.log(element);
        ids.push(element.participants_userid);
      });
    } else {
      ids = selectedIDs;
    }
    if (!ids.length) {
      return false;
    }
    var testMode = "DEVELOPMENT";
    if (this.TEST_MODE === false) {
      testMode = "PRODUCTION";
    }
    let post = {
      ids: ids,
      project_id: this.project_id,
      TEST_MODE: testMode,
    };

    this.pService.sendProjectInvitations(post).subscribe(
      (data: any) => {
        //if preview (test mode) is selected, show preview table and any errors
        if (data.data.PREVIEW) {
          this.invitationErrors = data.data.ERRORS ? data.data.ERRORS : [];

          this.buildPreviewTable(data.data.PREVIEW);
        }
      },
      (error) => {
        console.log("Error", error);
        if (error && error.error && error.error.email) {
          this.alertService.error(error.error.email, {
            autoClose: false,
            // id: "default-alert",
          });
        } else if (error) {
          this.alertService.error(error.error, {
            autoClose: true,
            // id: "default-alert",
          });
        }
        this.alertService.error("erea", {
          autoClose: false,
          id: "alert-1",
        });
      }
    );
  }

  buildPreviewTable(children) {
    function addHeaders(keys) {
      let headers = [];
      for (var i = 0; i < keys.length; i++) {
        headers.push(keys[i]);
      }
      return headers;
    }
    var rows = [];

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (i === 0) {
        var headers = addHeaders(Object.keys(child));
      }
      rows.push(children[i]);
    }
    this.PREVIEWDATA = { headers: headers, rows: rows };
  }

  runTable() {
    this.invitationErrors = [];
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.localParticipantService!.getParticipants(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.project_id,
            this.filter
          );
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        // console.log(data);
        this.data = data;
      });
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class LocalParticipantService {
  constructor(private _httpClient: HttpClient) {}

  getParticipants(
    sort: string,
    order: string,
    page: number,
    project_id: number,
    filter?: string
  ): Observable<any> {
    const href = environment.apiUrl;
    const requestUrl = `${href}/project_participants?project_id=${project_id}&sort=${sort}&filter=${filter}&order=${order}&page=${
      page + 1
    }`;
    // console.log("get part", requestUrl);
    return this._httpClient.get<any>(requestUrl);
  }
}
