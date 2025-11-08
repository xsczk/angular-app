import {Component, inject} from '@angular/core';
import {UserComponent} from './user.component';
import {HighlightDirective} from './highlight.directive';
import {KebabCasePipe} from './pipes/kebabCasePipe';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {Observable} from 'rxjs';
import {QuestionBase} from './question-base';
import {QuestionService} from './question-service';
import {
  DynamicFormComponent
} from './dynamic-form/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UserComponent, HighlightDirective, KebabCasePipe, NgTemplateOutlet,
    AsyncPipe, DynamicFormComponent
  ],
  template: `
    @defer (on interaction) {
      <div>This is a large element that is needed to lazy load</div>
    } @placeholder (minimum 200) {
      <p>Click this line to defer the large element</p>
    }
    @defer (on hover) {
      <div>This is a large element that is needed to lazy load</div>
    } @placeholder {
      <span>Hover this line to defer the large element</span>
    }
    <app-dynamic-form [questions]="question$ | async"/>
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
      <p>total: {{ count }}</p>
    </ng-template>

    <ng-container
      [ngTemplateOutlet]="card"
      [ngTemplateOutletContext]="{ title: 'Summary', count: total }">
    </ng-container>
    <button (click)="increaseTotal()">Click to increase total</button>
    @defer (when total > 10) {
      <div>This is a large element that is needed to lazy load</div>
    } @placeholder {
      <p>Wait for total > 10 to show the large element</p>
    }
  `,
  providers: [QuestionService],
})
export class AppComponent {
  text = 'This text will be transformed into kebab case format';
  total = 3

  question$: Observable<QuestionBase<string>[]> = inject(QuestionService)
    .getQuestions()

  increaseTotal() {
    this.total += 1
  }
}
