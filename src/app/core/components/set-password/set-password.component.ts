import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CustomValidators } from "@app/core/helpers/custom-validators";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {


  submitted: boolean = false;
  setPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.setPasswordForm = this.createSetPasswordForm();
  }

  ngOnInit(): void {
  }


  createSetPasswordForm(): FormGroup {
    return this.formBuilder.group({
      password: [

      ],
      passwordConfirm: [
      ],
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }
}
