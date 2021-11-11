import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import { AvatarDirective } from './directives/avatar/avatar.directive';

const components = [
  TableComponent,
  DeleteDialogComponent,
  CreateDialogComponent,
  AvatarDirective
];
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatChipsModule
];

@NgModule({
  declarations: [...components],
  imports: [
    ...modules,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[...components, ...modules]
})
export class SharedModule { }
