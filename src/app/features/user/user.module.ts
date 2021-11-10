import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing.module';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    CommonModule
  ]
})
export class UserModule { }
