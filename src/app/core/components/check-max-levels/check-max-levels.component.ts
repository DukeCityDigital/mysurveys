import { Component, OnInit, Input } from "@angular/core";
import { Project } from "@app/core/models/project.model";
@Component({
  selector: "app-check-max-levels",
  templateUrl: "./check-max-levels.component.html",
  styleUrls: ["./check-max-levels.component.scss"],
})
export class CheckMaxLevelsComponent implements OnInit {
  @Input() project: Project;
  constructor() {}

  ngOnInit(): void {}
}
