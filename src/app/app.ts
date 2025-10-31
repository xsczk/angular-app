import {Component} from '@angular/core';
import {UserComponent} from './user.component';
import {HighlightDirective} from './highlight.directive';
import {KebabCasePipe} from './pipes/kebabCasePipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent, HighlightDirective, KebabCasePipe],
  template: `
    <app-user>
      <h3 card-title>Profile</h3>

      <!-- IMPORTANT: plain element with template ref -->
      <p highlight>
        Ng content paragraph that can be highlighted.
      </p>
      <!-- this-text-will-be-transformed-into-kebab-case-format-->
      {{ text | kebabCase }}
    </app-user>
  `
})
export class AppComponent {
  text = 'This text will be transformed into kebab case format';
}
