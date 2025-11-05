import {Directive, input} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export const forbiddenNameValidators =
  (control: AbstractControl): ReturnType<typeof ForbiddenNameDirective.prototype.validate> => {
    const firstName = control.get('firstName');
    const lastName = control.get('lastName');
    return firstName && lastName && firstName.value === lastName.value ?
      {forbiddenName: true} : null
  }

@Directive({
  selector: '[forbidden-name]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenNameDirective,
      multi: true
    }
  ]
})

export class ForbiddenNameDirective implements Validator {
  forbiddenName = input<string>('');

  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenNameValidators(control)
  }
}
