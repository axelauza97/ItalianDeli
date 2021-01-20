import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPedidosPage } from './lista-pedidos';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ListaPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPedidosPage),
  ],
  entryComponents: [
    //ListaPedidosPage
  ],
})
export class ListaPedidosPageModule { }
