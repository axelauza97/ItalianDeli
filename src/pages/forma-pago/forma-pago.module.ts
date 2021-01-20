import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagoPage } from './forma-pago';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //FormaPagoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaPagoPage),
  ],
  entryComponents: [
    //FormaPagoPage
  ],
})
export class FormaPagoPageModule { }
