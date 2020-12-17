import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-project-status",
  templateUrl: "./project-status.component.html",
  styleUrls: ["./project-status.component.scss"],
})
export class ProjectStatusComponent implements OnInit {
  @Input() project: any;
  @Input() participants: number;
  @Input() totalParticipants: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.project);
  }

  public parseInt(string) {
    return parseInt(string);
  }
}
