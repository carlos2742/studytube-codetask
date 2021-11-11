import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Subscription} from "rxjs";

export interface TableConfig {
  total:number;
  pageSizeOptions: number[];
  filterLabel: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() config: TableConfig;
  @Output() refreshAction: EventEmitter<any>;

  public pageSize: number;
  public pageIndex: number;
  public filter: FormControl;

  private _subscription: Subscription;

  constructor() {
    this.refreshAction = new EventEmitter<any>();
    this.pageIndex = 0;
    this.filter = new FormControl();
    this._initFilterControl();
  }

  ngOnInit(): void {
    this.pageSize = this.config.pageSizeOptions[0];
    this._refreshData();
  }

  ngOnDestroy(): void {
    if(this._subscription)
      this._subscription.unsubscribe();
  }

  public updatePaginator(pageEvent:any){
    const {pageIndex, pageSize} = pageEvent;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this._refreshData();
  }

  private _refreshData(){
    const config = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      filter: this.filter.value
    };
    this.refreshAction.emit(config);
  }

  private _initFilterControl(){
    this._subscription = this.filter.valueChanges.pipe(tap(value =>{
      if(value.length > 3 || value === ''){
        this._refreshData();
      }
    })).subscribe();
  }

}
