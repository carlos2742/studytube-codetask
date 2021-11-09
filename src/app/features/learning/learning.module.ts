import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning/learning.component';



@NgModule({
  declarations: [
    LearningComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LearningRoutingModule
  ]
})
export class LearningModule { }