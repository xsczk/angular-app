import {
  AfterContentInit,
  Component,
  contentChild,
  ViewEncapsulation
} from '@angular/core';
import {HighlightDirective} from './highlight.directive'

@Component({
  selector: 'app-user',
  template: `
    <div class="card">
      <header>
        <ng-content select="[card-title]"></ng-content>
      </header>
      <section>
        <ng-content></ng-content>
      </section>
      <footer>
        <button (click)="toggle()">Toggle highlight</button>
      </footer>
    </div>
  `,
  styles: [
    `.highlight {
      background-color: yellow;
    }`
  ],
  imports: [],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements AfterContentInit {
  // explicitly read ElementRef, ensure query runs after content init
  // @ts-ignore
  p = contentChild(HighlightDirective)

  on = false;

  ngAfterContentInit(): void {
    // Debug logging to confirm the ContentChild is found at lifecycle time
    console.log('ContentChild p in ngAfterContentInit:', this.p);
  }

  toggle() {
    this.on = !this.on;
    const pref = this.p()
    console.log(pref)
    if (pref && pref.el) {
      pref.el.nativeElement.classList.toggle('highlight', this.on);
    } else {
      console.warn('p is not available when toggle called:', this.p);
    }
  }
}
