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

  constructor(public pService: ProjectService) {}

  ngOnInit(): void {
    this.pService.getAll().subscribe((data: any) => {
      console.log(data);
      this.projects = data.data;
    });
  }

  delete(id) {
    let test = confirm("Are you sure you want to delete the project?");
    if (test) {
      return this.pService.delete(id).subscribe((response) => {
        var index = this.projects.findIndex((x) => x.id == id);
        this.projects.splice(index, 1);
      });
    }
  }
}
