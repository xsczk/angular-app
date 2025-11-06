import {Directive, forwardRef, inject, Injectable} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import {catchError, map, Observable, of} from 'rxjs';
import {ZipCodeService} from '../mock-service/zip-code-service';

@Injectable({providedIn: 'root'})
export class ZipCodeValidator implements AsyncValidator {
  private readonly zipCodeService = inject(ZipCodeService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.zipCodeService.isValidZipCode(control.value.address.zip).pipe(
      map(({valid}) => (valid ? null : {validZipCode: true})),
      catchError(() => of(null)),
    );
  }
}

@Directive({
  selector: '[zipCode]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ZipCodeDirective),
      multi: true
    }
  ]
})

export class ZipCodeDirective {
  private readonly validator = inject(ZipCodeValidator)

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control)
  }
}
