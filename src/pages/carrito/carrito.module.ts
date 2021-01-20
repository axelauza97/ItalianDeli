import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPage } from './carrito';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CarritoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPage),
  ],
  entryComponents: [
    //CarritoPage
  ],
})
export class CarritoPageModule { }
