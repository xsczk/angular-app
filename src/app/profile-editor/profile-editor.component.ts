import {Component, inject} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'profile-editor',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()"
          style="margin-top: 10px">
      <section style="display: flex; gap: 10px">
        <label for="first-name">First Name: </label>
        <input id="first-name" type="text" formControlName="firstName"/>
        <label for="last-name">Last Name: </label>
        <input id="last-name" type="text" formControlName="lastName"/>
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
          <input id="zip" type="text" formControlName="zip"/>
        </section>
      </div>
      <div formArrayName="aliases">
        <h2>Aliases</h2>
        <button type="button" (click)="addAlias()">+ Add another alias</button>
        @for (alias of aliases.controls; track $index; let i = $index) {
          <div style="margin-top: 5px">
            <!-- The repeated alias template -->
            <label for="alias-{{i}}">Alias {{i}}: </label>
            <input id="alias-{{i}}" type="text" [formControlName]="i"/>
          </div>
        }
      </div>
      <p>Complete the form to enable button.</p>
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
    <p>Form Status: {{ profileForm.status }}</p>
    <p>Form Value: {{ profileForm.value | json }}</p>
    <button type="button" (click)="updateProfile()">Update Profile</button>
  `,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ], standalone: true
})

export class ProfileEditorComponent {
  private formBuilder = inject(FormBuilder)
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('', Validators.required)])
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
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
}
