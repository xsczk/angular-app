import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ZipCodeService {
  inValidZipCode = [1000, 2000, 3000, 4000, 5000]

  isValidZipCode(zipCode: string): Observable<{ valid: boolean }> {
    if (this.inValidZipCode.includes(Number(zipCode)) || isNaN(+zipCode)) {
      console.log({zipCode})
      return of({valid: false}).pipe(delay(1000));
    } else {
      return of({valid: true}).pipe(delay(1000));
    }
  }
}
