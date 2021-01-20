import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaDosPage } from './pizza-dos';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaDosPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaDosPage),
  ],
  entryComponents: [
    //PizzaDosPage
  ],
})
export class PizzaDosPageModule { }
