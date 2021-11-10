import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export type DeleteDialogData = {
  title:string;
  message:string;
  removeFn:Function;
  param:any;
}

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }

  ngOnInit(): void {}

  public execRemoveFn(){
    const {param, removeFn} = this.data;
    removeFn(param);
  }

}
