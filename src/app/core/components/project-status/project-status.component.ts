import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-project-status",
  templateUrl: "./project-status.component.html",
  styleUrls: ["./project-status.component.scss"],
})
export class ProjectStatusComponent implements OnInit {
  @Input() project: any;
  constructor() {}
  totalParticipants: number;

  ngOnInit(): void {
    console.log(this.project);
  }

  public parseInt(string) {
    return parseInt(string);
  }
}
