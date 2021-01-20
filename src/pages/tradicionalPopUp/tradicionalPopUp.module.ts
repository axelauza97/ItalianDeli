import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { tradicionalPopUpPage } from './tradicionalPopUp';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //DetallePromocionalPage,
  ],
  imports: [
    IonicPageModule.forChild(tradicionalPopUpPage),
  ],
  entryComponents: [
    //DetallePromocionalPage
  ],
})
export class tradicionalPopUpPageModule { }
