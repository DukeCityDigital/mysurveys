import { Component, OnInit } from "@angular/core";
import { ProjectService } from "@app/core/services/project.service";
import { AlertService } from "../_alert";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "@app/core/services/auth.service";

@Component({
  selector: "app-my-projects",
  templateUrl: "./my-projects.component.html",
  styleUrls: ["./my-projects.component.scss"],
})
export class MyProjectsComponent implements OnInit {
  invitations = [];
  readyToStart: boolean = false;
  lookup: string; //verification code
  startingProject = false;

  constructor(
    private alertService: AlertService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /**
     * Retrieve project invitations
     */
    // this.projectService.my_projects().subscribe((data: any) => {
    //   this.invitations = data.data;
    // });
    const id = this.route.snapshot.params.id;
    this.route.queryParams.subscribe((data) => {
      let lookup = id || data.id;
      this.lookup = lookup;
      if (this.lookup) {
        // this.checkProjectCompletionCode();
        this.verifyProjectCode(this.lookup);
      } else {
        this.projectService.my_projects().subscribe((data: any) => {
          this.invitations = data.data;
        });
      }
    });
  }

  /**
   * Begin the selected project
   * @param project
   */
  public startProject(invitation) {
    console.log("start", invitation.project.link);
    window.open(invitation.project.link);

    this.projectService.my_projects().subscribe((data: any) => {
      this.invitations = data.data;
    });

    // this.projectService
    //   .start_project(invitation.project.id)
    //   .subscribe((data: any) => {
    //     this.startingProject = true;
    //     // if success is true, show alert infoing user theyre about to be redirected,
    //     // then redirect to the survey link
    //     // this.alertService.success(data.message);
    //     window.open(invitation.project.link);

    //     // setTimeout(() => {
    //     //   this.startingProject = false;
    //     //   return false;
    //     // }, 3000);
    //     this.projectService.my_projects().subscribe((data: any) => {
    //       this.invitations = data.data;
    //     });
    //   });
    // }
  }

  /**
   * Verify project completion
   * @param invitations
   */
  verifyProjectCompletion(invitations) {
    const id = this.route.snapshot.params.id;
    this.route.queryParams.subscribe((data) => {
      let lookup = id || data.id;
      this.lookup = lookup;
    });
    console.log(this.lookup);
    if (invitations) {
      invitations.forEach((element: any) => {
        console.log(element.safeid.trim(), String(this.lookup).trim());
        console.log(
          String(element.safeid).trim() == String(this.lookup).trim()
        );
        if (String(element.safeid).trim() == String(this.lookup).trim()) {
          element.verifying = true;
          this.verifyProjectCode(element.projects_projectid);
        }
      });
    }
  }

  /**
   * Check single project code
   * @param project_id
   */
  verifyProjectCode(project_id: string) {
    let post = { code: this.lookup, project_id: project_id };
    this.projectService.verify_project_code(post).subscribe((data: any) => {
      console.log("chedk", data);
      if (data.data == false) {
        alert("Project code not found, redirecting");
        this.router.navigate(["home"]);
        return false;
      }
      this.authService.quickLogin(data);
      this.projectService.my_projects().subscribe((data: any) => {
        this.invitations = data.data;
      });
    });
  }
}
