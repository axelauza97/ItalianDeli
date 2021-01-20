import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoDetallesPage } from './pedido-detalles';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PedidoDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoDetallesPage),
  ],
  entryComponents: [
    //PedidoDetallesPage
  ],
})
export class PedidoDetallesPageModule { }
