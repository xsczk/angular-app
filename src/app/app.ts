import { Component } from '@angular/core';
import { UserComponent } from './user.component';
import {HighlightDirective} from './highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent, HighlightDirective],
  template: `
      <app-user>
          <h3 card-title>Profile</h3>

          <!-- IMPORTANT: plain element with template ref -->
          <p highlight>
              Ng content paragraph that can be highlighted.
          </p>
      </app-user>
  `
})
export class AppComponent {}
