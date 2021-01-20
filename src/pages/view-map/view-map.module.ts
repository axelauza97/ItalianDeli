import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMapPage } from './view-map';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ViewMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMapPage),
  ],
  entryComponents: [
    //ViewMapPage
  ],
})
export class ViewMapPageModule { }
