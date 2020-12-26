import { Component, OnInit, Input } from "@angular/core";
import { saveAs } from "file-saver";
import { ProjectService } from "@app/core/services/project.service";
import { ParticipantService } from "@app/core/services/participant.service";
import { Project } from "@app/core/models/project.model";
import { AlertService } from "../_alert";

ProjectService;
@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.scss"],
})
export class DataComponent implements OnInit {
  @Input() project_id: string;
  @Input() project: Project;

  csvString: any;
  parsedCsv: any;
  headers = [];
  exportData: any;
  data: any;
  changesPending: boolean = false;

  constructor(
    private participantService: ParticipantService,
    private projectService: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let post = { all: true, project_id: this.project_id };
    this.projectService.getSelection(post).subscribe((data) => {
      this.data = data.data.projectparticipants;
      this.exportData = data.data.csv;
    });
  }

  /**
   * Read data from CSV upload
   * @param files
   */
  public changeListener(files: FileList) {
    this.changesPending = true;
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.csvString = csv;
        let csvArray = [];
        let lines = csv.split("\n");
        let csvSeparator = ",";
        let tempUploadArray = [];
        lines.forEach((element, i) => {
          if (i == 0) {
            this.headers = element.split(csvSeparator);
            return;
          }
          let item = [];
          element.split(csvSeparator).forEach((e) => {
            item.push(e);
          });
          if (item[0] && item[0] !== "") {
            csvArray.push(item);
          }
        });
        this.parsedCsv = csvArray;
      };
    }
  }

  /**
   * Save the changed participant data to the server
   */
  public commitChanges() {
    let upload = [];
    this.parsedCsv.forEach((element) => {
      let item = {};
      element.forEach((element, i) => {
        if (element !== "") {
        }
        item[this.headers[i]] = element;
      });
      upload.push(item);
    });
    this.participantService.updateList(upload).subscribe((data) => {
      this.getData();
      this.alertService.success("Data Committed");
    });
  }

  /**
   * Read data from uploaded CSV
   */
  public import() {}

  /**
   * Download project participant data
   */

  public export(flag?: any) {
    var data = this.data;
    if (flag) {
      data = this.exportData;
    }
    if (!data.length) {
      return this.alertService.error("No data on project completion");
    }

    const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);

    let csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    let csvArray = csv.join("\r\n");
    var blob = new Blob([csvArray], { type: "text/csv" });
    saveAs(
      blob,
      new Date() +
        "-mysurvey-project_" +
        this.project_id +
        "_participants" +
        ".csv"
    );
  }
}
