import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {mockItems} from '../mock/data';

@Component({
  selector: 'my-outlet',
  template: `
    <button (click)="showFragment()">Show</button>
    <ng-container [ngTemplateOutlet]="profileTemplate()"></ng-container>
    <!-- ngIf intent to remove in v22-->
    <ng-container *ngIf="isAdmin()">
      <h1>Admin dashboard</h1>
    </ng-container>
    <ng-container>
      @for (item of mockItems; track item.description; let idx = $index) {
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      }
    </ng-container>
  `,
  imports: [
    NgTemplateOutlet,
    NgIf,
  ],
  standalone: true
})

export class MyOutlet implements OnChanges {
  fragment = input<TemplateRef<unknown>>()
  isAdmin = input.required<boolean>()
  adminTemplate = input<TemplateRef<unknown>>()
  basicTemplate = input<TemplateRef<unknown>>()
  profileTemplate = computed(() =>
    this.isAdmin() ? this.adminTemplate() : this.basicTemplate())
  private viewContainer = inject(ViewContainerRef)

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes, this.profileTemplate())
  }


  showFragment() {
    try {
      this.viewContainer.createEmbeddedView(this.fragment() as TemplateRef<unknown>)
    } catch (e) {
      console.warn(`Could not create fragment from ${e}`)
    }
  }

  protected readonly mockItems = mockItems;
}
