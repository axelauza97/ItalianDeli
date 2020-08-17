import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaTresPage } from './pizza-tres';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaTresPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaTresPage),
  ],
  entryComponents: [
    //PizzaTresPage
  ],
})
export class PizzaTresPageModule { }
