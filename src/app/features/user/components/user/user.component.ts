import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService, User} from "../../../../core/services/user/user.service";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {tap} from "rxjs/operators";
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

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public entities: User[];
  public total: number;
  public cols: string[];
  public filter: FormControl;

  public page: number;
  public pageSize: number;

  private _subscription: Subscription;

  constructor(private _learning:LearningService, private _user:UserService, public dialog: MatDialog) {
    this.cols = ['avatar', 'name', 'email', ''];
    this.page = 0;
    this.pageSize = 4;

    this.filter = new FormControl();
    this._subscription = this.filter.valueChanges.pipe(tap(value =>{
      if(this.filter.enabled && (value.length > 3 || value === '')){
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
    const {data, total} = this._user.list(this.page, this.pageSize,search);
    this.entities = data;
    this.total = total;
  }

  public updatePagination(pagination:{pageIndex: number, pageSize: number}){
    this.page = pagination.pageIndex;
    this.pageSize = pagination.pageSize;
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
