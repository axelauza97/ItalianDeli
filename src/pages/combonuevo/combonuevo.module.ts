import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComboNuevoPage } from './combonuevo';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    //ComboPage,
  ],
  imports: [
    IonicPageModule.forChild(ComboNuevoPage),
  ],
  entryComponents: [
    //ComboPage
  ],
})
export class ComboNuevoPageModule { }
