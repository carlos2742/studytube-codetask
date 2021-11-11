import {Component, OnDestroy, OnInit} from '@angular/core';
import {Learning, LEARNING_STATUS} from "../../../../models/models";
import {FormControl} from "@angular/forms";
import {tap} from "rxjs/operators";
import {DeleteDialogComponent, DeleteDialogData} from "../../../../shared/components/delete-dialog/delete-dialog.component";
import {
  CreateDialogComponent,
  CreateDialogData
} from "../../../../shared/components/create-dialog/create-dialog.component";
import {LearningFormComponent} from "../learning-form/learning-form.component";
import {MatDialog} from '@angular/material/dialog';
import {AssignDialogComponent} from "../assign-dialog/assign-dialog.component";
import {Subscription} from "rxjs";
import {LearningService} from "../../../../core/services/learning/learning.service";
@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit, OnDestroy{

  public entities: Learning[];
  public total: number;
  public cols: string[];
  public filter: FormControl;

  public page: number;
  public pageSize: number;

  private _subscription: Subscription;

  constructor(private _learning: LearningService, public dialog: MatDialog) {
    this.cols = ['name', 'archived', ''];
    this.page = 0;
    this.pageSize = 4;

    this.filter = new FormControl();
    this._subscription = this.filter.valueChanges.pipe(tap(value =>{
      if(!this.filter.disabled && (value.length > 3 || value === '')){
        this.loadData();
      }
    })).subscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public loadData(){
    const search = this.filter.value === "" ? undefined : this.filter.value;
    const {data, total} = this._learning.list(this.page, this.pageSize, search);
    this.entities = data;
    this.total = total;
  }

  public updatePagination(pagination:{pageIndex: number, pageSize: number}){
    this.page = pagination.pageIndex;
    this.pageSize = pagination.pageSize;
    this.loadData();
  }

  public showDeleteDialog(learning:Learning){
    const data:DeleteDialogData = {
      title: 'Remove Learning',
      message: `Do you want to remove the ${learning.name} learning?`,
      removeFn: this._delete.bind(this),
      param: learning.id
    };
    this.dialog.open(DeleteDialogComponent, {data});
  }

  public showCreateDialog(){
    const data: CreateDialogData = {
      title: 'Create Learning',
      saveFn: this._create.bind(this),
      formComponent: LearningFormComponent
    };
    this.dialog.open(CreateDialogComponent, {data});
  }

  public showAssignDialog(learning:Learning){
    this.dialog.open(AssignDialogComponent,{data:learning});
  }

  public updateStatus(id:number, checked:boolean){
    const status = checked ? LEARNING_STATUS.ARCHIVED : LEARNING_STATUS.UNARCHIVED;
    this._learning.updateStatus(id, status);
  }

  public isArchived(learning: Learning){
    return learning.status === LEARNING_STATUS.ARCHIVED;
  }

  private _create(entity: Learning){
    if(this._learning.create(entity)){
      this.loadData();
    }
  }

  private _delete(id:number){
    if(this._learning.remove(id)){
      this.loadData();
    }
  }
}
