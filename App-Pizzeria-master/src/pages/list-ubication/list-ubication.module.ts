import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUbicationPage } from './list-ubication';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ListUbicationPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUbicationPage),
  ],
  entryComponents: [
    //ListUbicationPage
  ],
})
export class ListUbicationPageModule { }
