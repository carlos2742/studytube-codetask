import { Component } from '@angular/core';
import {IFormComponent} from "../../../shared/components/create-dialog/create-dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LEARNING_STATUS} from "../../../models/models";

@Component({
  selector: 'app-learning-form',
  templateUrl: './learning-form.component.html',
  styleUrls: ['./learning-form.component.scss']
})
export class LearningFormComponent implements IFormComponent {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('',[Validators.required]),
      status: new FormControl(LEARNING_STATUS.ARCHIVED),
    });
  }

  get name(){
    return this.form.get('name');
  }

  isValid(): boolean {
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach(
        field => {
          const control = this.form.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      return false;
    }
    return true;
  }

  getValues(): any {
    return this.form.value;
  }

}
