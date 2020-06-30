import { Component, OnInit } from "@angular/core";
import { EmailTemplateService } from "@app/core/services/email-template.service";
import { Emailtemplate } from "@app/core/models/emailtemplate";

@Component({
  selector: "app-email-templates",
  templateUrl: "./email-templates.component.html",
  styleUrls: ["./email-templates.component.scss"],
})
export class EmailTemplatesComponent implements OnInit {
  constructor(private eTService: EmailTemplateService) {}

  templates = [];
  ngOnInit(): void {
    this.eTService.getAll().subscribe((data: any) => {
      console.log(data);
      this.templates = data.data;
    });
  }
}
