import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ UserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Form Group count element should be 2', () => {
    const controlKeys = Object.keys(component.form.controls);
    expect(controlKeys.length).toEqual(3);
  });

  it('Form should have 2 inputs', () => {
    const inputElements = compiled.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });

  it('Check form group initial values', () => {
    const formValues = component.form.value;
    const formDefaultValues = {
      avatar:component.avatars[0],
      name:'',
      email:''
    };
    expect(formValues).toEqual(formDefaultValues);
  });

  it('Check name value and required validation', () => {
    const inputElement = compiled.querySelector('input[formcontrolname="name"]');
    const name = component.name;
    const errors = name?.errors;
    expect(name?.value).toEqual(inputElement?.value);
    expect(errors).toEqual({required: true});
  });

  it('Check email value and required validation', () => {
    const inputElement = compiled.querySelector('input[formcontrolname="email"]');
    const email = component.email;
    const errors = email?.errors;
    expect(email?.value).toEqual(inputElement?.value);
    expect(errors).toEqual({required: true});
  });

  it('Check email value and email validation', () => {
    const email = component.email;
    email?.setValue('qwerty');
    const errors = email?.errors;
    expect(errors).toEqual({email: true});
  });

});
