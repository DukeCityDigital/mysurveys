import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  ControlValueAccessor,
  Validators,
  NG_VALIDATORS,
  FormControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { CustomValidators } from "@app/core/helpers/custom-validators";
import { matchingInputsValidator } from './validators';

export interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss', '../../../home/verification/verification.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    }
  ]
})
export class PasswordFormComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): PasswordFormValues {
    return this.form.value;
  }

  set value(value: PasswordFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        password: ['', Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true,
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          Validators.minLength(8),
        ]),
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: matchingInputsValidator('password', 'confirmPassword') }
    );

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { passwords: { valid: false } };
  }
}