import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
import { setTimeout } from "timers";

@Component({
  selector: "app-qualification",
  templateUrl: "./qualification.component.html",
  styleUrls: ["./qualification.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          height: "auto",
          opacity: 1,
          // backgroundColor: "yellow",
        })
      ),
      state(
        "closed",
        style({
          height: "0",
          opacity: 0,
          // backgroundColor: "green",
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("0.5s")]),
    ]),
  ],
})
export class QualificationComponent implements OnInit {
  accepted_short_consent: boolean = false;
  qualified: boolean;
  submitted: boolean = false;
  qualificationForm;
  isOpen = true;

  testOne() {
    // todo: remove
    this.qualificationForm.setValue({
      us: "true",
      parents: "true",
      friends: "true",
      gm: "4",
      vac: "4",
    });
  }

  possibleResponses = [
    { name: "Completely unsafe", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "Completely safe", value: 7 },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Show if a user is qualified
   *
   */
  isQualified(f) {
    f = f.value;
    if (!this.qualificationForm) {
      return false;
    }
    let qualified;
    this.isOpen = true;
    let gmOk = parseInt(f.gm) !== 1 && parseInt(f.gm) !== 7;
    let vacOk = parseInt(f.vac) !== 1 && parseInt(f.vac) !== 7;

    if (
      (f.us === "true" &&
        f.parents === "true" &&
        f.friends === "true" &&
        vacOk) ||
      gmOk
    ) {
      qualified = true;
    } else {
      qualified = false;
    }
    console.log(gmOk, vacOk, f, qualified);
    // debugger;
    this.qualified = qualified;
    // return qualified;
    // window.setTimeout(() => ChromeSamples.log(counterB.seconds), 1200);
    window.setTimeout(() => {
      window.scrollTo(0, 0);
      // window.scrollY = 0;
    }, 300);
  }

  constructor() {}

  ngOnInit(): void {
    this.qualificationForm = new FormGroup({
      parents: new FormControl("", [Validators.required]),
      gm: new FormControl("", [Validators.required]),
      vac: new FormControl("", [Validators.required]),
      us: new FormControl("", [Validators.required]),
      friends: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    this.isQualified(this.qualificationForm);
    this.submitted = true;
  }
}
