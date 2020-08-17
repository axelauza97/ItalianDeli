import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarteraTarjetasPage } from './cartera-tarjetas';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CarteraTarjetasPage,
  ],
  imports: [
    IonicPageModule.forChild(CarteraTarjetasPage),
  ],
  entryComponents: [
    //CarteraTarjetasPage
  ],
})
export class CarteraTarjetasPageModule { }
