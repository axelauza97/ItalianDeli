import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoPage } from './pedido';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoPage),
  ],
  entryComponents: [
    //PedidoPage
  ],
})
export class PedidoPageModule { }
