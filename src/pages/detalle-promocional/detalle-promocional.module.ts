import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePromocionalPage } from './detalle-promocional';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //DetallePromocionalPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePromocionalPage),
  ],
  entryComponents: [
    //DetallePromocionalPage
  ],
})
export class DetallePromocionalPageModule { }
