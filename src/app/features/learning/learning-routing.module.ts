import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import {LearningComponent} from "./components/learning/learning.component";

const routes: Routes = [{ path: '', component: LearningComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LearningRoutingModule { }
