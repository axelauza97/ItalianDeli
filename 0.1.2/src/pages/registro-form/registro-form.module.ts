import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroFormPage } from './registro-form';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //RegistroFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroFormPage),
  ],
  entryComponents: [
    //RegistroFormPage
  ],
})
export class RegistroFormPageModule { }
