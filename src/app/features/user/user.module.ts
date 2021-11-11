import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { UserComponent } from './components/user/user.component';
import { UserRoutingModule } from './user-routing.module';
import {CommonModule} from "@angular/common";
import { UserFormComponent } from './components/user-form/user-form.component';
import { LearningDialogComponent } from './components/learning-dialog/learning-dialog.component';



@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    LearningDialogComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    CommonModule
  ]
})
export class UserModule { }
