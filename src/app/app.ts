import {Component} from '@angular/core';
import {UserComponent} from './user.component';
import {HighlightDirective} from './highlight.directive';
import {KebabCasePipe} from './pipes/kebabCasePipe';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent, HighlightDirective, KebabCasePipe, NgTemplateOutlet],
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
    <ng-template #card let-title="title" let-count="count">
      <h3>{{ title }}</h3>
      <p>Items: {{ count }}</p>
    </ng-template>

    <ng-container
      [ngTemplateOutlet]="card"
      [ngTemplateOutletContext]="{ title: 'Summary', count: total }">
    </ng-container>
  `
})
export class AppComponent {
  text = 'This text will be transformed into kebab case format';
  total = 3
}
