import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() total: number;
  @Output() refreshAction: EventEmitter<any>;

  public pageSize: number;
  public page: number;

  constructor() {
    this.refreshAction = new EventEmitter<any>();
    this.page = 1;
    this.pageSize = 2;
  }

  ngOnInit(): void {}

  public refreshData(){
    const paginationData = {
      page: this.page,
      pageSize: this.pageSize
    };
    this.refreshAction.emit(paginationData);
  }

}
