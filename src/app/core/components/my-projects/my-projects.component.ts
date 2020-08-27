import { Component, OnInit } from "@angular/core";
import { ProjectService } from "@app/core/services/project.service";
import { AlertService } from "../_alert";

@Component({
  selector: "app-my-projects",
  templateUrl: "./my-projects.component.html",
  styleUrls: ["./my-projects.component.scss"],
})
export class MyProjectsComponent implements OnInit {
  invitations = [];
  constructor(
    private alertService: AlertService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.my_projects().subscribe((data: any) => {
      console.log(data);
      this.invitations = data.data;
    });
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
