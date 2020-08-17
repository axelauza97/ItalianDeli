import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPage } from './registro';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //RegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPage),
  ],
  entryComponents: [
    //RegistroPage
  ],
})
export class RegistroPageModule { }
