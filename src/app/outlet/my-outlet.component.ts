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
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'my-outlet',
  template: `
    <button (click)="showFragment()">Show</button>
    <ng-container [ngTemplateOutlet]="profileTemplate()"></ng-container>
  `,
  imports: [
    NgTemplateOutlet
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
}
