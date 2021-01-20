import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { notificacionPopUpPage } from './notificacionPopUp';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //DetallePromocionalPage,
  ],
  imports: [
    IonicPageModule.forChild(notificacionPopUpPage),
  ],
  entryComponents: [
    //DetallePromocionalPage
  ],
})
export class notificacionPopUpPageModule { }
