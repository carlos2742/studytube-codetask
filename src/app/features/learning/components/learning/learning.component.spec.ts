import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningComponent } from './learning.component';
import {LearningService} from "../../../../core/services/learning/learning.service";
import {MockLearningService} from "../assign-dialog/assign-dialog.component.spec";
import {MatDialogModule} from "@angular/material/dialog";

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;
  let compiled:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [LearningComponent],
      providers:[
        {provide:LearningService, useClass: MockLearningService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Check table config initialization', () => {
    const config = {
      total: 0,
      pageSizeOptions: [2,4,6],
      filterLabel: 'Name search'
    };
    expect(component.tableConfig).toEqual(config);
  });

  it('Check table col header initialization', () => {
    const cols = ['name', 'archived', ''];
    expect(component.cols).toEqual(cols);
  });

  it('Create button should exist',()=>{
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toEqual('Create');
  });

  it('Check Load Data', () => {
    const config = {
      pageIndex:0,
      pageSize: 4,
      filter: ''
    };
    component.updateDataConfig(config);
    expect(component.entities.length).toEqual(3);
  });
});
