import {Component} from '@angular/core';
import {UserService, User} from "../../../../core/services/user/user.service";
import {
  DeleteDialogComponent,
  DeleteDialogData
} from "../../../../shared/components/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateDialogComponent,
  CreateDialogData
} from "../../../../shared/components/create-dialog/create-dialog.component";
import {UserFormComponent} from "../user-form/user-form.component";
import {LearningService} from "../../../../core/services/learning/learning.service";
import {LearningDialogComponent} from "../learning-dialog/learning-dialog.component";
import {TableConfig} from "../../../../shared/components/table/table.component";

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public entities: User[];
  public tableConfig: TableConfig;
  public cols: string[];

  private _pageIndex: number;
  private _pageSize: number;
  private _filter:string;

  constructor(private _learning:LearningService, private _user:UserService, public dialog: MatDialog) {
    this.cols = ['avatar', 'name', 'email', ''];
    this.tableConfig = {
      total: 0,
      pageSizeOptions: [2,4,6],
      filterLabel: 'Name/Email search'
    };
    this._pageIndex = 0;
    this._pageSize = 0;
    this._filter = '';
  }

  public loadData(){
    const {data, total} = this._user.list(this._pageIndex, this._pageSize, this._filter);
    this.entities = data;
    this.tableConfig.total = total;
  }

  public updateDataConfig(config:{pageIndex: number, pageSize: number, filter:string}){
    this._pageIndex = config.pageIndex;
    this._pageSize = config.pageSize;
    this._filter = config.filter;
    this.loadData();
  }

  public showDeleteDialog(entity:User){
    const data:DeleteDialogData = {
      title: 'Remove User',
      message: `Do you want to remove ${entity.name} account?`,
      removeFn: this._delete.bind(this),
      param: entity.id
    };
    this.dialog.open(DeleteDialogComponent, {data});
  }

  public showCreateDialog(){
    const data: CreateDialogData = {
      title: 'Create User',
      saveFn: this._create.bind(this),
      formComponent: UserFormComponent
    };
    this.dialog.open(CreateDialogComponent, {data});
  }

  public showLearningDialog(user: User){
    this.dialog.open(LearningDialogComponent, {data:user});
  }

  private _create(entity: User){
    if(this._user.create(entity)){
      this.loadData();
    }
  }

  private _delete(id:number){
    if(this._user.remove(id)){
      this._learning.removeUser(id);
      this.loadData();
    }
  }
}
