import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "@app/core/services/loader.service";
import { ParticipantService as pService } from "@app/core/services/participant.service";
import { ProjectService } from "@app/core/services/project.service";
import { merge, Observable, of as observableOf, of, Subscription } from "rxjs";
import {
  catchError,
  concatMap,
  delay,
  first,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import { environment } from "../../../../environments/environment";
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
    "participants_userid",
    "safeid",
    "invited",
    "amount_to_pay",
    "finished",
    "finished_ip",
    "userparam1",
    "actions",
  ];
  showEmailSample = false;
  resultsLength = 0;
  isLoadingResults = true;
  data: any;
  //filter to require non invited etc. .
  filter: string = "undefined";
  public TEST_MODE: boolean = true;
  invitationErrors: any;

  PREVIEWING: boolean = false;
  PREVIEWDATA: any;
  showCustomEmailPanel: boolean = false;
  customEmailForm: FormGroup;
  testEmailForm: FormGroup;
  project_id: number;
  selectedIds = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  localParticipantService;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private _httpClient: HttpClient,
    // private localParticipantService: LocalParticipantService,
    private pService: pService,
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService
  ) {}
  private subscription: Subscription;
  public _LOADING: boolean = false;

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      this.project_id = +params.get("id");
    });
    // this.localParticipantService = new LocalParticipantService(
    //   this._httpClient
    // );

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.runTable();
  }

  ngOnInit(): void {
    this.customEmailForm = this.formBuilder.group({
      subject: ["", Validators.required],
      body: ["", Validators.required],
      link: [""],
    });
    this.testEmailForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
    this.subscription = this.loaderService.loaderState
      .pipe(concatMap((item) => of(item).pipe(delay(50))))
      .subscribe((state: any) => {
        this._LOADING = state.show;
      });
  }

  /**
   * Send custom notification
   * @param testEmail
   */
  onSubmitCustomEmail(testEmail?: boolean) {
    var post = this.customEmailForm.value;
    if (post.link === "" || !post.link) {
      delete post["link"];
    }
    console.log(post);
    if (testEmail) {
      post.test = true;
    }
    post.ids = [];
    this.data.forEach((element) => {
      var u = element.participants_userid;
      if (u !== null) post.ids.push(u);
    });
    this.projectService
      .send_custom_message(post)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.success) {
            this.alertService.success("Email sent successfully", {
              autoClose: true,
              id: "da",
            });
            this.project = data.data;
          } else {
            this.alertService.error(data.message.message);
          }
        },
        (error) => {}
      );
  }

  /**
   * Send standard notifications
   * @param post
   */
  public sendSelectedNotifications(post) {
    this.pService.sendProjectInvitations(post).subscribe(
      (data: any) => {
        //if preview (test mode) is selected, show preview table and any errors
        if (data.data.PREVIEW) {
          this.invitationErrors = data.data.ERRORS ? data.data.ERRORS : [];

          this.buildPreviewTable(data.data.PREVIEW);
        } else {
          this.alertService.success(data.data);
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
  /**
   * Get IDS for submittal
   * @param selectedIDs
   */
  prepareRequest(selectedIDs): any {
    // TODO confirmation
    let r = window.confirm(
      "Are you sure you wish to send email invitations to these participants?"
    );
    if (r !== true) {
      return false;
    }
    let ids = this.selectedIds;
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
    return post;
  }

  /**
   * Remind selected participantts
   * @param ids
   */
  public sendProjectReminders(selectedIDs?) {
    let post = this.prepareRequest(selectedIDs);
    post.reminder = true;
    this.sendSelectedNotifications(post);
  }

  /**
   * Invite selected participantts
   * @param ids
   */
  public sendProjectInvitations(selectedIDs?) {
    let post = this.prepareRequest(selectedIDs);

    this.sendSelectedNotifications(post);
  }

  /**
   * Display a preview of selected emails
   * TODO polish or remove for prod
   * @param children
   */
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

  public onRunTable(condition?: string) {
    this.filter = condition;
    this.runTable();
  }
  /**
   * Get filtered data from DB
   */
  runTable() {
    this.PREVIEWDATA = undefined;
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
          this.selectedIds = data.selected_ids;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
}

/**
 * Mini service for table results
 */
// export class LocalParticipantService {
//   constructor(private _httpClient: HttpClient) {}

//   getParticipants(
//     sort: string,
//     order: string,
//     page: number,
//     project_id: number,
//     filter?: string
//   ): Observable<any> {
//     const href = environment.apiUrl;
//     const requestUrl = `${href}/project_participants?project_id=${project_id}&sort=${sort}&filter=${filter}&order=${order}&page=${
//       page + 1
//     }`;
//     // console.log("get part", requestUrl);
//     return this._httpClient.get<any>(requestUrl);
//   }
// }
