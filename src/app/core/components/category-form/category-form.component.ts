import { Component, OnInit, EventEmitter, Output } from "@angular/core";
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

  constructor(private formBuilder: FormBuilder) {}

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
      include_seeds: [""],
      include_peers: [""],
      survey_complete: [""],
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

  /**
   * Add row to comparison panel
   * @param type
   */
  addRow(type?) {
    this.g.push(
      this.formBuilder.group({
        name: ["", Validators.required],

        value: ["", Validators.required],
        operator: ["", [Validators.required]],
      })
    );
  }

  /**
   * Submit selection form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }
    this.update();
  }
  /**
   * Emit form value to parent component
   */
  update() {
    this.formChange.emit(this.dynamicForm.value);
  }

  /**
   * Remove row from selection conditional table
   * @param item
   */
  removeRow(item) {
    if (this.g.controls.length < 2) {
      return false;
    }
    let i = this.g.controls.indexOf(item);
    this.g.removeAt(i);
  }

  /**
   * Reset form
   */
  onReset() {
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
}
