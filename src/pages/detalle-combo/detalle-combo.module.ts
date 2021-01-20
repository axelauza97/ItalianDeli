import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleComboPage } from './detalle-combo';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //DetalleComboPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleComboPage),
  ],
  entryComponents: [
    //DetalleComboPage
  ],
})
export class DetalleComboPageModule { }
