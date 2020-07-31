import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  AfterViewInit,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit {
  inputArray: any[];
  myForm: FormGroup;

  @Output() formChange: EventEmitter<any> = new EventEmitter<any>();

  dynamicForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  operators = [
    { name: "Less Than", value: "<" },
    { name: "Greater Than", value: ">" },
    { name: "Equals", value: "=" },
  ];

  categories = [
    { name: "GM", value: "qualification_gm" },
    { name: "VAC", value: "qualification_vac" },
    { name: "AGE", value: "birthyear" },
  ];

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      gm: new FormArray([
        this.formBuilder.group({
          name: ["qualification_vac", Validators.required],
          operator: [">", [Validators.required]],

          value: ["0", Validators.required],
        }),
      ]),
      eligible_seed: [""],
      eligible_peers: [""],
      paypal_status_ok: [""],
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.update();
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.tickets as FormArray;
  }
  get g() {
    return this.f.gm as FormArray;
  }

  addRow(type?) {
    this.g.push(
      this.formBuilder.group({
        name: ["", Validators.required],

        value: ["", Validators.required],
        operator: ["", [Validators.required]],
      })
    );

    // const numberOfTickets = e.target.value || 0;

    // if (this.t.length < numberOfTickets) {
    //   for (let i = this.t.length; i < numberOfTickets; i++) {
    //     this.t.push(
    //       this.formBuilder.group({
    //         name: ["", Validators.required],
    //         email: ["", [Validators.required, Validators.email]],
    //       })
    //     );
    //   }
    // } else {
    //   for (let i = this.t.length; i >= numberOfTickets; i--) {
    //     this.t.removeAt(i);
    //   }
    // }
  }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(
          this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      console.log("invalidform");
      return;
    }
    this.update();
  }

  removeRow(item) {
    if (this.g.controls.length < 2) {
      return false;
    }
    let i = this.g.controls.indexOf(item);
    this.g.removeAt(i);
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

  update() {
    this.formChange.emit(this.dynamicForm.value);
  }
}
