import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() total: number;
  @Output() refreshAction: EventEmitter<any>;

  @Input() pageSize: number;
  @Input() page: number;
  public pageSizeOptions: number[];

  constructor() {
    this.refreshAction = new EventEmitter<any>();
    this.page = 1;
    this.pageSize = 2;
    this.pageSizeOptions = [2,4,6];
  }

  ngOnInit(): void {}

  public refreshData(pageEvent:any){
    const {pageIndex, pageSize} = pageEvent;
    const paginationData = {
      pageIndex,
      pageSize
    };
    this.refreshAction.emit(paginationData);
  }

}
