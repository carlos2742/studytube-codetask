import {Component} from '@angular/core';
import {Learning, LEARNING_STATUS} from "../../../../models/models";
import {DeleteDialogComponent, DeleteDialogData} from "../../../../shared/components/delete-dialog/delete-dialog.component";
import {
  CreateDialogComponent,
  CreateDialogData
} from "../../../../shared/components/create-dialog/create-dialog.component";
import {LearningFormComponent} from "../learning-form/learning-form.component";
import {MatDialog} from '@angular/material/dialog';
import {AssignDialogComponent} from "../assign-dialog/assign-dialog.component";
import {LearningService} from "../../../../core/services/learning/learning.service";
import {TableConfig} from "../../../../shared/components/table/table.component";
@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent{

  public entities: Learning[];
  public tableConfig: TableConfig;
  public cols: string[];

  private _pageIndex: number;
  private _pageSize: number;
  private _filter:string;

  constructor(private _learning: LearningService, public dialog: MatDialog) {
    this.cols = ['name', 'archived', ''];
    this.tableConfig = {
      total: 0,
      pageSizeOptions: [2,4,6],
      filterLabel: 'Name search'
    };
    this._pageIndex = 0;
    this._pageSize = 0;
    this._filter = '';
  }

  public loadData(){
    const {data, total} = this._learning.list(this._pageIndex, this._pageSize, this._filter);
    this.entities = data;
    this.tableConfig.total = total;
  }

  public updateDataConfig(config:{pageIndex: number, pageSize: number, filter:string}){
    this._pageIndex = config.pageIndex;
    this._pageSize = config.pageSize;
    this._filter = config.filter;
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
