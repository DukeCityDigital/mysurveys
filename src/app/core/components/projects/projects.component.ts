import { Component, OnInit } from "@angular/core";
import { ProjectService } from "@app/core/services/project.service";
import { Project } from "@app/core/models/project.model";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private pService: ProjectService) {}

  ngOnInit(): void {
    this.pService.getAll().subscribe((data: Project[]) => {
      console.log(data);
      this.projects = data;
    });
  }
}
