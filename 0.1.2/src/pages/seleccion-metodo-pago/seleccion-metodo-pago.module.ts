import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionMetodoPagoPage } from './seleccion-metodo-pago';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //SeleccionMetodoPagoPage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionMetodoPagoPage),
  ],
  entryComponents: [
    //SeleccionMetodoPagoPage
  ],
})
export class SeleccionMetodoPagoPageModule { }
