import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectService } from "@app/core/services/project.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public pService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      project_title: [""],
    });
  }
  submitForm() {
    this.pService.create(this.projectForm.value).subscribe((res) => {
      this.router.navigateByUrl("dashboard/projects");
    });
  }
}
