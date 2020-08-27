import { Component, OnInit } from "@angular/core";
import { ProjectService } from "@app/core/services/project.service";
import { AlertService } from "../_alert";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
map;
Observable;
@Component({
  selector: "app-my-projects",
  templateUrl: "./my-projects.component.html",
  styleUrls: ["./my-projects.component.scss"],
})
export class MyProjectsComponent implements OnInit {
  invitations = [];
  constructor(
    private alertService: AlertService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  lookup: string;

  verifyProjectCompletion(invitations) {
    const id = this.route.snapshot.params.id;

    this.route.queryParams.subscribe((data) => {
      let lookup = id || data.id;
      this.lookup = lookup;
    });

    invitations.forEach((element: any) => {
      console.log("scan invis", element, this.lookup);
      if (element.safeid == this.lookup) {
        element.verifying = true;
        console.log("match in invitations, mark as complete and test DB");
        this.verifyProjectCode(element.projects_projectid);
      }
    });
  }

  verifyProjectCode(project_id: string) {
    console.log(
      "TODO if project code doesn't match display message to contact researcher"
    );
    let post = { code: this.lookup, project_id: project_id };
    this.projectService.verify_project_code(post).subscribe((data: any) => {
      console.log("code data", data, data.projects_projectid);
      this.projectService.my_projects().subscribe((data: any) => {
        console.log(data);
        this.invitations = data.data;
        // this.verifyProjectCompletion(this.invitations);
      });
    });
  }

  ngOnInit(): void {
    this.projectService.my_projects().subscribe((data: any) => {
      console.log(data);
      this.invitations = data.data;
      this.verifyProjectCompletion(this.invitations);
    });
    console.log(this.route);

    console.log(this.route.snapshot.params.id);

    //project link-in TODO TBD what forms these can take

    // console.log(this.route.params);
    // const id: Observable<string> = this.route.params.pipe(
    //   map((p: any) => p.id)
    // );
    // console.log(id);
  }

  public startProject(project) {
    console.log("project", project);

    this.projectService
      .start_project(project.projects.id)
      .subscribe((data: any) => {
        console.log("startproje", data);
        this.alertService.success(data.message);
      });
  }
}
