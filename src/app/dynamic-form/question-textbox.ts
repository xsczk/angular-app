import {QuestionBase} from '../question-base';

export class TextboxQuestion extends QuestionBase<string> {
  override controlType: string = 'textbox';
}
