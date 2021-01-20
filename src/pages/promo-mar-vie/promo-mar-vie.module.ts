import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoMarViePage } from './promo-mar-vie';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PromoMarViePage,
  ],
  imports: [
    IonicPageModule.forChild(PromoMarViePage),
  ],
  entryComponents: [
    //PromoMarViePage
  ],
})
export class PromoMarViePageModule { }
