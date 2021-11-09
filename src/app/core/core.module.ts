import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';

const modules =  [
  CommonModule,
  CoreRoutingModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class CoreModule { }
