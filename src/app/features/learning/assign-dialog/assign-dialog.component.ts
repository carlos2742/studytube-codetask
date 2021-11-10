import {Component, Inject, OnInit} from '@angular/core';
import {Learning, User} from "../../../models/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../../core/services/data/data.service";
import {MatSelect} from "@angular/material/select";

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
    private data: DataService,
    @Inject(MAT_DIALOG_DATA) public learning: Learning) {

    this.userAssigned = this.data.getUserAssigned(learning.users);
    this.users = this.data.getAllUsers();
  }

  ngOnInit(): void {}

  get userAssignedIds(){
    return this.userAssigned.map(user => user.id);
  }

  public isOptionSelected(userId: number){
    return this.userAssignedIds.includes(userId);
  }

  public add(event:any){
    const {source, value} = event;
    this.userAssigned.push(value);
    (source as MatSelect).value = null
  }

  public remove(index:number){
    this.userAssigned.splice(index,1);
  }

  public assignFn(){
    this.data.assignLearning(this.learning.id, this.userAssignedIds);
    this.dialogRef.close();
  }
}
