import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

const components = [NavbarComponent];
const modules =  [
  CoreRoutingModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [...modules],
  exports: [...modules, ...components]
})
export class CoreModule { }
