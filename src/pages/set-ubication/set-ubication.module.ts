import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetUbicationPage } from './set-ubication';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //SetUbicationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetUbicationPage),
  ],
  entryComponents: [
    //SetUbicationPage
  ],
})
export class SetUbicationPageModule { }
