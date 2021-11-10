import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, Inject,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";

export interface IFormComponent{
  isValid(): boolean;
  getValues(): any;
}

export type CreateDialogData = {
  title:string;
  saveFn:Function;
  formComponent:Type<IFormComponent>;
}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnDestroy{

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private componentRef: ComponentRef<IFormComponent>;
  private subscription: Subscription;
  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData,
    private componentFactoryResolver: ComponentFactoryResolver)
  {
    this.subscription = this.dialogRef.afterOpened().subscribe(()=>{
      const {formComponent} = this.data;
      this.addFormComponent(formComponent);
    });
  }

  ngOnDestroy(): void {
    this.removeFormComponent();
    this.subscription.unsubscribe();
  }

  private addFormComponent(componentClass: Type<IFormComponent>){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.componentRef = this.container.createComponent(componentFactory);
  }

  private removeFormComponent(){
    const index = this.container.indexOf(this.componentRef.hostView);
    this.container.remove(index);
  }

  get form(): IFormComponent | undefined{
    return this.componentRef ? this.componentRef.instance : undefined;
  }

  public execSaveFn(){
    if(this.form?.isValid()){
      const formValue = this.form?.getValues();
      const {saveFn} = this.data;
      saveFn(formValue);
      this.dialogRef.close();
    }
  }
}
