import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning/learning.component';
import { LearningFormComponent } from './learning-form/learning-form.component';
import {AssignDialogComponent} from "./assign-dialog/assign-dialog.component";
import {MatChipsModule} from "@angular/material/chips";
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
    MatChipsModule,
    MatCheckboxModule
  ]
})
export class LearningModule { }
