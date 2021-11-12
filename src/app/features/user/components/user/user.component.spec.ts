import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {LearningService} from "../../../../core/services/learning/learning.service";
import {
  MockLearningService,
  MockUserService
} from "../../../learning/components/assign-dialog/assign-dialog.component.spec";
import {UserService} from "../../../../core/services/user/user.service";
import {MatDialogModule} from "@angular/material/dialog";

describe('UsersComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let compiled:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ UserComponent ],
      providers:[
        {provide:LearningService, useClass: MockLearningService},
        {provide:UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('Check table config initialization', () => {
    const config = {
      total: 0,
      pageSizeOptions: [4,6,8],
      filterLabel: 'Name/Email search'
    };
    expect(component.tableConfig).toEqual(config);
  });

  it('Check table col header initialization', () => {
    const cols = ['avatar', 'name', 'email', ''];
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
