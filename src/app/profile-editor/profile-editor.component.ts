import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {forbiddenNameValidators} from '../directives/forbidden-name.directive';
import {ZipCodeValidator} from '../directives/zip-code.directive';

@Component({
  selector: 'profile-editor',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()"
          style="margin-top: 10px">
      <section style="display: flex; gap: 10px">
        <label for="first-name">First Name: </label>
        <input id="first-name" type="text" formControlName="firstName"/>
        <label for="last-name">Last Name: </label>
        <!-- binding class-->
        <input id="last-name" type="text" formControlName="lastName"
               [class.error]="profileForm.errors?.['forbiddenName']"/>
        @if (lastNameError) {
          <span
            style="color: red">Last name cannot be the same as first name</span>
        }
      </section>
      <div formGroupName="address">
        <h2>Address</h2>
        <section style="display: flex; gap: 10px">
          <label for="street">Street: </label>
          <input id="street" type="text" formControlName="street"/>
          <label for="city">City: </label>
          <input id="city" type="text" formControlName="city"/>
          <label for="state">State: </label>
          <input id="state" type="text" formControlName="state"/>
          <label for="zip">Zip Code: </label>
          <input id="zip" type="text" formControlName="zip"
                 [class.error]="zipCodeError"/>
        </section>
      </div>
      <div formArrayName="aliases">
        <h2>Aliases</h2>
        <button type="button" (click)="addAlias()">+ Add another alias</button>
        @for (alias of aliases.controls; track $index; let i = $index) {
          <div style="margin-top: 5px">
            <!-- The repeated alias template -->
            <label for="alias-{{i}}">Alias {{ i }}: </label>
            <input id="alias-{{i}}" type="text" [formControlName]="i"/>
          </div>
        }
      </div>
      <p>Complete the form to enable button.</p>
      <button type="submit" [disabled]="!profileForm.valid">
        {{ (profileForm.statusChanges | async) === 'PENDING' ? 'Checking valid zip code...' : 'Submit' }}
      </button>
    </form>
    <p>Form Status: {{ profileForm.status }}</p>
    <p>Form Value: {{ profileForm.value | json }}</p>
    <button type="button" (click)="updateProfile()">Update Profile</button>
    <button (click)="resetForm()">Reset profile</button>
  `,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    AsyncPipe
  ], standalone: true,
  styles: `
    .error {
      border: 2px solid red;
    }
  `
})

export class ProfileEditorComponent implements OnInit, OnDestroy {
  lastNameError: boolean = false;
  zipCodeError: boolean = false;
  private formBuilder = inject(NonNullableFormBuilder)
  private zipCodeValidator = inject(ZipCodeValidator)
  profileForm = this.formBuilder.group({
    firstName: ['Nghia', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('', Validators.required)])
  }, {
    validators: forbiddenNameValidators,
    /** bind this to zipCodeValidator to prevent from accessing property from undefined */
    asyncValidators: [this.zipCodeValidator.validate.bind(this.zipCodeValidator)]
  });
  private destroy$ = new Subject<void>();

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  ngOnInit() {
    /** automatically unsubscribe when destroy$ is emitted to prevent memory leaks */
    this.profileForm.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log({value})
      })
    this.profileForm.statusChanges.pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        console.log({status, errors: this.profileForm.errors});
        this.lastNameError = !!(this.profileForm.errors?.['forbiddenName']);
        this.zipCodeError = !!(this.profileForm.errors?.['validZipCode']);
      })
  }

  ngOnDestroy() {
    // emit when destroy the class
    this.destroy$.next()
    this.destroy$.complete()
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  onSubmit() {
    alert(JSON.stringify(this.profileForm.value))
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nghia',
      address: {
        state: 'Cau Giay',
        city: 'Hanoi'
      }
    })
  }

  resetForm() {
    this.profileForm.reset()
  }
}
