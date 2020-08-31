import { Component, OnInit, Input } from "@angular/core";
import { saveAs } from "file-saver";
import { ProjectService } from "@app/core/services/project.service";
import { ParticipantService } from "@app/core/services/participant.service";

ProjectService;
@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.scss"],
})
export class DataComponent implements OnInit {
  @Input() project_id: string;
  csvString: any;
  parsedCsv: any;
  headers = [];

  constructor(
    private participantService: ParticipantService,
    private projectService: ProjectService
  ) {}
  data: any;
  changesPending: boolean = false;
  ngOnInit(): void {
    let post = { all: true, project_id: this.project_id };
    this.projectService.getSelection(post).subscribe((data) => {
      this.data = data.data;
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
          console.log(element, i);

          debugger;

          if (i == 0) {
            this.headers = element.split(csvSeparator);

            return;
          }
          let item = [];
          debugger;
          // let object = {
          //   ticker: element.split(csvSeparator)[0],
          // };
          element.split(csvSeparator).forEach((e) => {
            item.push(e);
            // console.log(element, e);
            // debugger;

            // object[this.headers[e]] = e;
          });

          csvArray.push(item);
        });
        // var output: string = "";
        // csvArray.forEach(row => {
        //   output += "\n";
        //   var colNo = 0;
        //   row.forEach(col => {
        //     output += col;
        //     colNo++;
        //   });
        // });
        // this.uploadArray = tempUploadArray;
        console.log(this.headers);
        this.parsedCsv = csvArray;
        console.log(this.parsedCsv);
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
        item[this.headers[i]] = element;
      });
      upload.push(item);
    });
    console.log(upload);
    console.log("commit changes");
    this.participantService.updateList(upload).subscribe((data) => {
      console.log("update data", data);
    });
  }

  /**
   * Read data from uploaded CSV
   */
  public import() {}

  /**
   * Download project participant data
   */
  public export() {
    this.downloadFile(this.data);
  }

  public downloadFile(data: any) {
    console.log("downloadFile", data);
    console.log("downloadFile", data[0]);

    const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    debugger;

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
        "-scifriends-project_" +
        this.project_id +
        "_participants" +
        ".csv"
    );
  }
}
