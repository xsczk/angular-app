import {
  Directive,
  inject,
  input, model,
  OnInit, output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

export interface DataSource<T> {
  load: () => Promise<T>;
}

@Directive({
  selector: '[choose]',
  standalone: true,
})
export class SelectDirective<T = unknown> implements OnInit {
  /** structural directives will have inputs that are all prefixed
   * with the structural directive's selector. */
  chooseFrom = input.required<DataSource<T>>()
  private templateRef = inject(TemplateRef)
  private viewContainerRef = inject(ViewContainerRef)

  async ngOnInit() {
    const data = await this.chooseFrom().load()
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: data
    })
  }
}
