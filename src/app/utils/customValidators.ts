import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static invalidNumberValue(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value < 1901 || control.value > 2155) {
        return {
          invalidNumberValue: `${control.value} is not between 1901 and 2155`,
        };
      }
      return null;
    };
  }
}
