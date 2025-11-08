import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal
} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {QuestionBase} from '../../question-base';
import {
  DynamicFormQuestionComponent
} from '../dynamic-form-question/dynamic-form-question.component';
import {QuestionControlService} from '../../question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: 'dynamic-form.html',
  providers: [QuestionControlService],
  imports: [ReactiveFormsModule, DynamicFormQuestionComponent]
})
export class DynamicFormComponent {
  questions = input<QuestionBase<string>[] | null>([])
  payload = ''
  private readonly qcs = inject(QuestionControlService)
  form: Signal<FormGroup> = computed(() => this.qcs.toFormGroup(this.questions() as QuestionBase<string>[]))

  onSubmit() {
    this.payload = JSON.stringify(this.form().getRawValue());
  }
}
