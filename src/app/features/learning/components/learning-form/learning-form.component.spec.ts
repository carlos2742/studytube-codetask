import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningFormComponent } from './learning-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LEARNING_STATUS} from "../../../../models/models";

describe('LearningFormComponent', () => {
  let component: LearningFormComponent;
  let fixture: ComponentFixture<LearningFormComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [ LearningFormComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Form Group count element should be 2', () => {
    const controlKeys = Object.keys(component.form.controls);
    expect(controlKeys.length).toEqual(2);
  });

  it('Should exist an input and select', () => {
    const inputElement = compiled.querySelector('input');
    const selectElement = compiled.querySelector('mat-select');
    expect(inputElement).toBeTruthy();
    expect(selectElement).toBeTruthy();
  });

  it('Check form group initial values', () => {
    const learningFormValues = component.form.value;
    const learningFormDefaultValues = {
      name:'',
      status:LEARNING_STATUS.ARCHIVED
    };
    expect(learningFormValues).toEqual(learningFormDefaultValues);
  });

  it('Check name value and required validation', () => {
    const inputElement = compiled.querySelector('input');
    const name = component.name;
    const errors = name?.errors;
    expect(name?.value).toEqual(inputElement?.value);
    expect(errors).toEqual({required: true});
  });
});
