import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningDialogComponent } from './learning-dialog.component';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {users} from "../../../../models/data";
import {LearningService} from "../../../../core/services/learning/learning.service";
import {MockLearningService} from "../../../learning/components/assign-dialog/assign-dialog.component.spec";

describe('LearningDialogComponent', () => {
  let component: LearningDialogComponent;
  let fixture: ComponentFixture<LearningDialogComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningDialogComponent ],
      providers:[
        {provide:MAT_DIALOG_DATA, useValue: {...users[0]}},
        {provide:LearningService, useClass: MockLearningService},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Learning should have current user in the list of assigned', () => {
    expect(component).toBeTruthy();
    const user = component.user;
    const isIncluded = component.learnings[0].users.includes(user.id);
    expect(isIncluded).toBeTrue();
  });

  it('Should exist 1 mat-chip', () => {
    const chips = compiled.querySelectorAll('mat-chip');
    expect(chips.length).toBe(1);
  });
});
