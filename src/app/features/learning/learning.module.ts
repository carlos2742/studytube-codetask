import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './components/learning/learning.component';
import { LearningFormComponent } from './components/learning-form/learning-form.component';
import {AssignDialogComponent} from "./components/assign-dialog/assign-dialog.component";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [
    LearningComponent,
    LearningFormComponent,
    AssignDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LearningRoutingModule,
    MatCheckboxModule
  ]
})
export class LearningModule { }
