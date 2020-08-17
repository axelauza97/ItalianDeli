import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPPage } from './carritoP';
import { ValoresPage } from '../valores/valores'
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CarritoPPage,
    //ValoresPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPPage),
  ],
  entryComponents: [
    //CarritoPPage,
    //ValoresPage
  ],
})
export class CarritoPPageModule { }
