import {Component, Inject, OnInit} from '@angular/core';
import {Learning, User} from "../../../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";
import {LearningService} from "../../../../core/services/learning/learning.service";
import {UserService} from "../../../../core/services/user/user.service";

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss']
})
export class AssignDialogComponent implements OnInit {

  public userAssigned: User[];
  public users: User[];

  constructor(
    public dialogRef: MatDialogRef<AssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public learning: Learning,
    private _learning: LearningService,
    private _user: UserService) {

    this.userAssigned = this._user.findManyById(learning.users);
    this.users = this._user.all;
  }

  ngOnInit(): void {}

  get userAssignedIds(){
    return this.userAssigned.map(user => user.id);
  }

  public isOptionSelected(userId: string){
    return this.userAssignedIds.includes(userId);
  }

  public assign(event:any){
    const {source, value} = event;
    this.userAssigned.push(value);
    (source as MatSelect).value = null
  }

  public remove(index:number){
    this.userAssigned.splice(index,1);
  }

  public save(){
    this._learning.assignUsers(this.learning.id, this.userAssignedIds);
    this.dialogRef.close();
  }
}
