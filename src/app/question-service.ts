import {Injectable} from '@angular/core';
import {QuestionBase} from './question-base';
import {DropdownQuestion} from './dynamic-form/question-dropdown';
import {TextboxQuestion} from './dynamic-form/question-textbox';
import {of} from 'rxjs';

@Injectable()

export class QuestionService {
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          {key: 'cat', value: 'Cat'},
          {key: 'dog', value: 'Dog'},
          {key: 'horse', value: 'Horse'},
          {key: 'capybara', value: 'Capybara'},
        ],
        value: 'horse',
        order: 3,
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];
    /** return an observable */
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
