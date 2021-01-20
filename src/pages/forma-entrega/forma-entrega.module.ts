import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaEntregaPage } from './forma-entrega';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //FormaEntregaPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaEntregaPage),
  ],
  entryComponents: [
    //FormaEntregaPage
  ],
})
export class FormaEntregaPageModule { }
