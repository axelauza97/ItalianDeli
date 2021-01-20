import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BordesPage } from './bordes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //BordesPage,
  ],
  imports: [
    IonicPageModule.forChild(BordesPage),
  ],
  entryComponents: [
    //BordesPage
  ],
})
export class BordesPageModule { }
