import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {learnings, users} from "../models/data";

export const USER_DATA = {provide:'USER_DATA', useValue: users};
export const LEARNING_DATA = {provide:'LEARNING_DATA', useValue: learnings};

const components = [NavbarComponent];
const modules =  [CoreRoutingModule];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [...modules,...components],
  providers:[USER_DATA, LEARNING_DATA]
})
export class CoreModule { }
