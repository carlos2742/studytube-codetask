import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

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
  exports: [...modules,...components]
})
export class CoreModule { }
