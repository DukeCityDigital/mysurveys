import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EmailTemplateService } from "@app/core/services/email-template.service";
import { AlertService } from "../_alert";

@Component({
  selector: "app-email-templates",
  templateUrl: "./email-templates.component.html",
  styleUrls: ["./email-templates.component.scss"],
})
export class EmailTemplatesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private eTService: EmailTemplateService,
    public fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}
  emailTemplateForm: FormGroup;

  project_id: any;

  templates = [];

  showReplacementCodes: boolean = false;

  ngOnInit(): void {
    this.emailTemplateForm = this.fb.group({
      subject: [""],
    });
    this.route.params.subscribe((params: Params) => {
      this.project_id = +params["id"];
    });
    this.getTemplates();
  }

  getTemplates() {
    this.eTService.getAllWithProject(this.project_id).subscribe((data: any) => {
      data.data.forEach((element) => {
        element.transformed.body = this.emailLines(element.body);
      });
      this.templates = data.data;
    });
  }

  emailLines(body: string) {
    let lines = [];
    body.split("*nl*").forEach((element) => {
      lines.push(element);
    });

    return lines;
  }

  submitForm() {
    this.emailTemplateForm.value.subject = this.emailTemplateForm.value.subject.trim();
    this.eTService
      .create(this.emailTemplateForm.value)
      .subscribe((res: any) => {
        if (res.success) {
          this.emailTemplateForm.reset();
          this.alertService.success("Created successfully", {
            autoClose: true,
          });
        }
        this.getTemplates();
      });
  }

  updateForm() {
    this.eTService.create(this.emailTemplateForm.value).subscribe((res) => {});
  }

  update(template) {
    let t = { ...template };

    this.eTService.update(t).subscribe(
      (data) => {
        if (data.success) {
          this.alertService.success("Updated successfully", {
            autoClose: true,
          });
          this.getTemplates();
          // this.eTService.getAll().subscribe((data: any) => {
          //
          //   this.templates = data.data;

          // });
        } else {
          alert(data.message);
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  delete(id) {
    let test = confirm("Are you sure you want to delete the template");
    if (test) {
      return this.eTService.delete(id).subscribe((response) => {
        // var index = this.projects.findIndex((x) => x.id == id);
        // this.projects.splice(index, 1);
      });
    }
  }
}
