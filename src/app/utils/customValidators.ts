import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static invalidNumberValue(): ValidatorFn {
    return (control: AbstractControl<number>): ValidationErrors | null => {
      if (control.value < 1901 || control.value > 2155) {
        return {
          invalidNumberValue: `${control.value} is not between 1901 and 2155`,
        };
      }
      return null;
    };
  }

  static confirmPassword(): ValidatorFn {
    return (
      control: AbstractControl<{
        password: FormControl<String>;
        confirmPassword: FormControl<String>;
      }>
    ): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        return {
          confirmPassword: 'Password and confirm password must be same',
        };
      }

      return null;
    };
  }
}
