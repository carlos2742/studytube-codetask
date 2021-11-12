import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDialogComponent } from './assign-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MockMatDialogRef} from "../../../../shared/components/create-dialog/create-dialog.component.spec";
import {LearningService} from "../../../../core/services/learning/learning.service";
import {UserService} from "../../../../core/services/user/user.service";
import {Learning, LEARNING_STATUS, User} from "../../../../models/models";
import {learnings, users} from "../../../../models/data";
import {cloneData} from "../../../../core/services/learning/learning.service.spec";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export class MockLearningService{
  public assignUsers(id:string, usersId: string[]):boolean{
    return true;
  }
  public findByUserId(userId:string):Learning[]{
    return cloneData([learnings[0]]);
  }
  public list(ageIndex: number, pageSize: number, search?:string):{data: Learning[], total:number}{
    return {data: learnings, total:learnings.length};
  }
  public updateStatus(id: string, value: LEARNING_STATUS): boolean{
    return true;
  }
}

export class MockUserService{
  public findManyById(usersId: string[]): User[]{
    return [{...users[0]},{...users[1]}];
  };
  get all(): User[]{ return cloneData(users)};
  public list(pageIndex: number, pageSize: number, search?:string): {data: User[], total: number}{
    return { data: users, total: users.length}
  }
}

describe('AssignDialogComponent', () => {
  let component: AssignDialogComponent;
  let fixture: ComponentFixture<AssignDialogComponent>;
  let compiled:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatSelectModule,
        MatIconModule
      ],
      declarations: [ AssignDialogComponent ],
      providers:[
        {provide:MAT_DIALOG_DATA, useValue: {...learnings[0]}},
        {provide:MatDialogRef, useClass: MockMatDialogRef},
        {provide:LearningService, useClass: MockLearningService},
        {provide:UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.learning.id).toEqual(learnings[0].id);
    expect(component.userAssigned.length).toBe(2);
    expect(component.userAssigned[0].id).toEqual(component.learning.users[0]);
  });

  it('should have 2 user assigned', () => {
    const assigned = compiled.querySelectorAll('mat-chip');
    expect(assigned.length).toEqual(component.userAssigned.length);
  });

  it('Should deselect an assigned user',()=>{
    expect(component.userAssigned.length).toEqual(2);
    const assignedCancelBtn = compiled.querySelector('mat-chip button');
    assignedCancelBtn.click();
    expect(component.userAssigned.length).toEqual(1);
  });

});
