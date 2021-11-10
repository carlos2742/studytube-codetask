import {Component, OnInit} from '@angular/core';
import {Learning, LEARNING_STATUS} from "../../../models/models";
import {DataService} from "../../../core/services/data/data.service";
import {FormControl} from "@angular/forms";
import {tap} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteDialogComponent} from "../../../shared/components/delete-dialog/delete-dialog.component";
import {CreateDialogComponent} from "../../../shared/components/create-dialog/create-dialog.component";
import {LearningFormComponent} from "../learning-form/learning-form.component";

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit{

  public learnings: Learning[];
  public total: number;
  public cols: string[];
  public filter: FormControl;

  private page: number;
  private pageSize: number;

  constructor(private data:DataService, private modal: NgbModal) {
    this.cols = ['name', 'archived', ''];
    this.page = 1;
    this.pageSize = 2;

    this.filter = new FormControl();
    this.filter.valueChanges.pipe(tap(value =>{
      if(value.length > 3 || value === ''){
        this.loadData();
      }
    })).subscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    const search = this.filter.value === "" ? undefined : this.filter.value;
    this.data.learnings(this.page, this.pageSize, search).subscribe(({data, total}) =>{
      this.learnings = data;
      this.total = total
    });
  }

  public updatePagination(pagination:{page: number, pageSize: number}){
    this.page = pagination.page;
    this.pageSize = pagination.pageSize;
    this.loadData();
  }

  public showDeleteDialog(learning:Learning){
    const modalRef = this.modal.open(DeleteDialogComponent);
    modalRef.componentInstance.title = 'Remove Learning';
    modalRef.componentInstance.message = `Do you want to remove the ${learning.name} learning?`;
    modalRef.componentInstance.action = this.delete.bind(this);
    modalRef.componentInstance.param = learning.id;
  }

  public showCreateDialog(){
    const modalRef = this.modal.open(CreateDialogComponent);
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.addFormComponent(LearningFormComponent);
    });
    modalRef.componentInstance.title = 'Create Learning';
    modalRef.componentInstance.action = this.create.bind(this);
  }

  public updateStatus(id:number, value:any){
    const status = value.checked ? LEARNING_STATUS.ARCHIVED : LEARNING_STATUS.UNARCHIVED;
    this.data.updateLearningStatus(id, status).subscribe();
  }

  public isLearningArchived(learning: Learning){
    return learning.status === LEARNING_STATUS.ARCHIVED;
  }

  private create(entity: Learning){
    this.data.createLearning(entity).subscribe(
      res =>{
        if(res.created){
          this.loadData();
        }
      }
    );
  }

  private delete(id:number){
    this.data.deleteLearning(id).subscribe(
      res =>{
        if(res.deleted){
          this.loadData();
        }else{
          //todo show warning
        }
      },
      error => {
        //todo show error
      });
  }


}
