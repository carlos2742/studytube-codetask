import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input, OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

export interface IFormComponent{
  isValid(): boolean;
  getValues(): any;
}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnDestroy{

  @Input() title:string;
  @Input() action:Function;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private componentRef: ComponentRef<IFormComponent>;

  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnDestroy(): void {
    this.removeFormComponent();
  }

  public addFormComponent(componentClass: Type<IFormComponent>){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.componentRef = this.container.createComponent(componentFactory);
  }

  public removeFormComponent(){
    const index = this.container.indexOf(this.componentRef.hostView);
    this.container.remove(index);
  }

  get form(): IFormComponent | undefined{
    return this.componentRef ? this.componentRef.instance : undefined;
  }

  public execAction(){
    if(this.form?.isValid()){
      const formValue = this.form?.getValues();
      this.action(formValue);
      this.activeModal.close('Close click')
    }
  }
}
