import { ComponentFixture, TestBed } from '@angular/core/testing';

import {DeleteDialogComponent, DeleteDialogData} from './delete-dialog.component';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let compiled:any;
  let aux: string;
  const dataDialog: DeleteDialogData = {
    title:'Remove Entity',
    message:'Do you want to remove the entity',
    removeFn: (value:string) => {aux = value},
    param:'qwerty',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      providers:[{provide:MAT_DIALOG_DATA, useValue: dataDialog}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    aux = '';
  });

  it('should have dialog params', () => {
    expect(component).toBeTruthy();
    expect(component.data.title).toEqual(dataDialog.title);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(compiled.querySelector('h1').textContent).toBe(dataDialog.title);
    expect(compiled.querySelector('p').textContent).toBe(dataDialog.message);
  });

  it('should execute remove action', () => {
    const buttons = compiled.querySelectorAll('button');
    const removeBtn = buttons[1];
    removeBtn.click();
    expect(aux).toEqual(dataDialog.param);
  });

  it('should execute close action', () => {
    const buttons = compiled.querySelectorAll('button');
    const closeBtn = buttons[0];
    closeBtn.click();
    expect(aux).toEqual('');
  });

});
