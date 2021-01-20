import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradicionalesPage } from './tradicionales';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //TradicionalesPage,
  ],
  imports: [
    IonicPageModule.forChild(TradicionalesPage),
  ],
  entryComponents: [
    //TradicionalesPage
  ],
})
export class TradicionalesPageModule { }
