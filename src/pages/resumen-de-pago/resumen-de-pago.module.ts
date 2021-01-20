import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumenDePagoPage } from './resumen-de-pago';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ResumenDePagoPage,
  ],
  imports: [
    IonicPageModule.forChild(ResumenDePagoPage),
  ],
  entryComponents: [
    //ResumenDePagoPage
  ],
})
export class ResumenDePagoPageModule { }
