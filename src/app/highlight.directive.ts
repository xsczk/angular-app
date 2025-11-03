import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input
} from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {
  public el = inject<ElementRef<HTMLElement>>(ElementRef)
  appHighlight = input('')
  constructor() {
    this.el.nativeElement.style.color = 'red'
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight() || 'yellow')
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('')
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
