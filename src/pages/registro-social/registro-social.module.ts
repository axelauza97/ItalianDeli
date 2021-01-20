import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroSocialPage } from './registro-social';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //RegistroSocialPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroSocialPage),
  ],
  entryComponents: [
    //RegistroSocialPage
  ],
})
export class RegistroSocialPageModule { }
