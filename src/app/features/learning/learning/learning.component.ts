import {Component, OnDestroy, OnInit} from '@angular/core';
import {Learning, LEARNING_STATUS} from "../../../models/models";
import {DataService} from "../../../core/services/data/data.service";
import {FormControl} from "@angular/forms";
import {tap} from "rxjs/operators";
import {DeleteDialogComponent, DeleteDialogData} from "../../../shared/components/delete-dialog/delete-dialog.component";
import {
  CreateDialogComponent,
  CreateDialogData
} from "../../../shared/components/create-dialog/create-dialog.component";
import {LearningFormComponent} from "../learning-form/learning-form.component";
import {MatDialog} from '@angular/material/dialog';
import {AssignDialogComponent} from "../assign-dialog/assign-dialog.component";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit, OnDestroy{

  public learnings: Learning[];
  public total: number;
  public cols: string[];
  public filter: FormControl;

  public page: number;
  public pageSize: number;

  private subscription: Subscription;

  constructor(private data:DataService, public dialog: MatDialog) {
    this.cols = ['name', 'archived', ''];
    this.page = 0;
    this.pageSize = 4;

    this.filter = new FormControl();
    this.subscription = this.filter.valueChanges.pipe(tap(value =>{
      if(value.length > 3 || value === ''){
        this.loadData();
      }
    })).subscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData(){
    const search = this.filter.value === "" ? undefined : this.filter.value;
    const {data, total} = this.data.learnings(this.page, this.pageSize, search);
    this.learnings = data;
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
      removeFn: this.delete.bind(this),
      param: learning.id
    };
    this.dialog.open(DeleteDialogComponent, {data});
  }

  public showCreateDialog(){
    const data: CreateDialogData = {
      title: 'Create Learning',
      saveFn: this.create.bind(this),
      formComponent: LearningFormComponent
    };
    this.dialog.open(CreateDialogComponent, {data});
  }

  public showAssignDialog(learning:Learning){
    this.dialog.open(AssignDialogComponent,{data:learning});
  }

  public updateStatus(id:number, checked:boolean){
    const status = checked ? LEARNING_STATUS.ARCHIVED : LEARNING_STATUS.UNARCHIVED;
    this.data.updateLearningStatus(id, status);
  }

  public isArchived(learning: Learning){
    return learning.status === LEARNING_STATUS.ARCHIVED;
  }

  private create(entity: Learning){
    this.data.createLearning(entity);
  }

  private delete(id:number){
    if(this.data.deleteLearning(id)){
      this.loadData();
    }
  }
}
