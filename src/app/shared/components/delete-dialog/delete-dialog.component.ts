import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  @Input() title:string;
  @Input() message:string;
  @Input() action:Function;
  @Input() param:any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {}

  public execAction(){
    this.action(this.param);
    this.activeModal.close('Close click')
  }

}
