import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuponesPage } from './cupones';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //BebidasPage,
  ],
  imports: [
    IonicPageModule.forChild(CuponesPage),
  ],
  entryComponents: [
    //BebidasPage
  ],
})
export class CuponesPageModule { }
