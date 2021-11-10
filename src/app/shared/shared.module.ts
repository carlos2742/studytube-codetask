import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModalModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
const components = [
  TableComponent,
  DeleteDialogComponent,
  CreateDialogComponent
];
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgbPaginationModule,
  NgbModalModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports:[...components, ...modules]
})
export class SharedModule { }
