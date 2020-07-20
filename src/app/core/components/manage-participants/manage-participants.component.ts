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

  participantService;
  project_id: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get("id"));
      this.project_id = +params.get("id");
    });
    console.log("init");
    this.participantService = new ParticipantService(this._httpClient);

    // If the user changes the sort order, reset back to the first page.

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {
          console.log("switchmap");
          this.isLoadingResults = true;
          return this.participantService!.getParticipants(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.project_id
          );
        }),
        map((data: any) => {
          console.log(data);
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          // this.isRateLimitReached = false;
          this.resultsLength = data.data.total_count;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          // this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.data = data;
      });
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ParticipantService {
  constructor(private _httpClient: HttpClient) {}

  getParticipants(
    sort: string,
    order: string,
    page: number,
    project_id: number
  ): Observable<any> {
    const href = environment.apiUrl;
    const requestUrl = `${href}/project_participants?project_id=${project_id}&sort=${sort}&order=${order}&page=${
      page + 1
    }`;
    console.log("get part", requestUrl);
    return this._httpClient.get<any>(requestUrl);
  }
}
