import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CreateDialogComponent, CreateDialogData, IFormComponent} from './create-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Component} from "@angular/core";

@Component({
  selector:'mock-form',
  template:'<p>Mock Form</p>'
})
class MockFormComponent implements IFormComponent{
  public static auxProperty: string = 'auxiliar value';
  isValid():boolean{return true};
  getValues():any{ return 'auxiliar value'};
}

export class MockMatDialogRef{
  afterOpened(): Observable<void> {return new Observable<void>(observer => observer.next())};
  close(): void {}
}

describe('CreateDialogComponent', () => {
  let component: CreateDialogComponent;
  let fixture: ComponentFixture<CreateDialogComponent>;
  let compiled:any;
  let aux: any;
  const dataDialog: CreateDialogData = {
    title: 'Create Entity',
    formComponent: MockFormComponent,
    saveFn: (value:string) => {aux = value},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDialogComponent ],
      providers:[
        {provide:MAT_DIALOG_DATA, useValue: dataDialog},
        {provide:MatDialogRef, useClass: MockMatDialogRef},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDialogComponent);
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
  });

  it('should execute save action', () => {
    const buttons = compiled.querySelectorAll('button');
    const saveBtn = buttons[1];
    saveBtn.click();
    expect(aux).toEqual(MockFormComponent.auxProperty);
  });

  it('should execute close action', () => {
    const buttons = compiled.querySelectorAll('button');
    const closeBtn = buttons[0];
    closeBtn.click();
    expect(aux).toEqual('');
  });
});
