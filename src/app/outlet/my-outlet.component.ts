import {
  Component,
  inject,
  input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'my-outlet',
  template: `
    <button (click)="showFragment()">Show</button>
  `,
  standalone: true
})

export class MyOutlet {
  fragment = input<TemplateRef<unknown>>()
  private viewContainer = inject(ViewContainerRef)


  showFragment() {
    try {
      this.viewContainer.createEmbeddedView(this.fragment() as TemplateRef<unknown>)
    } catch (e) {
      console.warn(`Could not create fragment from ${e}`)
    }
  }
}
