import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "@app/core/models/project.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "@app/core/services/project.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AlertService } from "../../_alert";
import { SelectionTableComponent } from "../../selection-table/selection-table.component";
import { ManageParticipantsComponent } from "../../manage-participants/manage-participants.component";

export interface updateForm {
  defaultend: string;
}

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {
  project: Project;
  editForm: FormGroup;
  project_id: number;
  participants = [];
  totalParticipants: number;
  selectedTabIndex: number = 0;
  @ViewChild(ManageParticipantsComponent)
  mpComponent: ManageParticipantsComponent;

  constructor(
    public alertService: AlertService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private pService: ProjectService
  ) {}

  testService(inc?) {
    var id = "motd";
    if (inc) id = "da";
    this.alertService.success(id, {
      id: id,
      autoClose: false,
      keepAfterRouteChange: true,
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("id");
      this.project_id = +id;
      if (!id) {
        this.router.navigate(["/"]);
        return;
      }
      this.pService
        .getSelection({ project_id: this.project_id })
        .subscribe((r) => {
          this.participants = r.data;
          this.totalParticipants = r.total;
        });

      this.pService.get(+id).subscribe((data: any) => {
        let d = data.data;
        this.project = d;
        let c = {
          project_title: d.project_title,
          description: d.description,
          responsible_person: d.responsible_person,
          link: d.link,
          link_method: d.link_method,
          payout_type: d.payout_type,
          max_payout: d.max_payout,
          exp_payout: d.exp_payout,
          desired_sample_size: d.desired_sample_size,
          desired_num_invitations: d.desired_num_invitations,
          name: d.name,
          id: d.id,
          defaultend: new Date(d.defaultend),
          defaultstart: new Date(d.defaultstart),
        };
        this.editForm.patchValue(c);
      });
    });
    this.editForm = this.formBuilder.group({
      id: [""],
      project_title: ["", Validators.required],
      description: [""],
      responsible_person: ["", Validators.required],
      link: ["", Validators.required],
      link_method: [""],
      max_payout: ["", Validators.required],
      exp_payout: ["", Validators.required],
      desired_sample_size: ["", Validators.required],
      desired_num_invitations: ["", Validators.required],
      payout_type: ["", Validators.required],
      defaultend: ["", Validators.required],
      defaultstart: ["", Validators.required],
    });
  }
  /**
   * Detect tab change
   * @param index
   */
  selectedIndexChange(index: number) {
    if (index == 2) {
      this.mpComponent.onRunTable();
    }
    setTimeout(() => (this.selectedTabIndex = index));
  }

  onTabClick(event: Event) {
    // console.log(event);
  }

  public parseInt(string) {
    return parseInt(string);
  }

  changeProjectState(status: string) {
    let post = this.editForm.value;
    post.state = status;
    this.pService
      .update(post)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.success) {
            this.alertService.success("Updated successfully", {
              autoClose: true,
            });
            // this.router.navigate(["list-user"]);
            this.project = data.data;
          } else {
            this.alertService.error(data.message.message);
            // alert(data.message);
          }
        },
        (error) => {
          // alert(error);s
        }
      );
  }

  public activateTab(tab) {}

  public startProject() {
    let post = this.editForm.value;
    post.state = "Started";
    this.pService
      .update(post)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.success) {
            this.alertService.success("Updated successfully", {
              autoClose: true,
            });
            // this.router.navigate(["list-user"]);
            this.project = data.data;
          } else {
            alert(data.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }

  onSubmit() {
    this.editForm.value.defaultend = new Date(this.editForm.value.defaultend);
    this.pService
      .update(this.editForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.success) {
            this.alertService.success("Updated successfully", {
              autoClose: true,
              id: "da",
            });
            // this.router.navigate(["list-user"]);
            this.project = data.data;
          } else {
            // alert(data.message);
            this.alertService.error(data.message.message);
          }
        },
        (error) => {
          // alert(error);
        }
      );
  }
}
