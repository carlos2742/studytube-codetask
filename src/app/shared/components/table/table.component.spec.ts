import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {users} from "../../../models/data";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let compiled: any;
  let aux: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.config = {
      filterLabel: 'Search',
      total: users.length,
      pageSizeOptions: [2,4,6]
    };
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    aux = {};
  });

  it('Check Input', () => {
    const input = compiled.querySelector('input');
    const label = compiled.querySelector('mat-label');
    expect(input).toBeTruthy();
    expect(label.textContent).toEqual(component.config.filterLabel);
  });

  it('Check search', async() => {
    const pageEvent = {pageIndex:1, pageSize: 3};
    const filter = 'asdf';

    component.pageIndex = pageEvent.pageIndex;
    component.pageSize = pageEvent.pageSize;
    component.refreshAction.subscribe((value)=> aux = value);
    component.filter.setValue(filter);
    expect(aux).toEqual({...pageEvent, filter});
  });

  it('Check update paginator', () => {
    const pageEvent = {pageIndex:1, pageSize: 3};
    const filter = 'asd';
    component.filter.setValue(filter);
    component.refreshAction.subscribe((value)=> aux = value);
    component.updatePaginator(pageEvent);
    expect(aux).toEqual({...pageEvent, filter});
  });
});
