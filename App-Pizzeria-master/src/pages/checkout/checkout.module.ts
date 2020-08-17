import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
//import { BrMaskerModule } from 'brmasker-ionic-3';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CheckoutPage,
  ],
  imports: [
    //BrMaskerModule,
    IonicPageModule.forChild(CheckoutPage),
  ],
  entryComponents: [
    //CheckoutPage
  ],
})
export class CheckoutPageModule { }
