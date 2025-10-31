import {
  AfterContentInit,
  Component,
  contentChild,
  ViewEncapsulation
} from '@angular/core';
import {HighlightDirective} from './highlight.directive'
import {MyOutlet} from './outlet/my-outlet.component';

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
    <ng-template #myFragment>
      <p>This is a fragment</p>
    </ng-template>
    <my-outlet [fragment]="myFragment"></my-outlet>
  `,
  styles: [
    `.highlight {
      background-color: yellow;
    }`
  ],
  imports: [MyOutlet],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements AfterContentInit {
  // explicitly read ElementRef, ensure query runs after content init
  // @ts-ignore
  p = contentChild.required(HighlightDirective)

  on = false;

  ngAfterContentInit(): void {
    // Debug logging to confirm the ContentChild is found at lifecycle time
    console.log('ContentChild p in ngAfterContentInit:', this.p);
  }

  toggle() {
    this.on = !this.on;
    const pref = this.p()
    if (pref && pref.el) {
      pref.el.nativeElement.classList.toggle('highlight', this.on);
    } else {
      console.warn('p is not available when toggle called:', this.p);
    }
  }
}
