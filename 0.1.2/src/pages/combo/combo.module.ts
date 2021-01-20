import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComboPage } from './combo';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    //ComboPage,
  ],
  imports: [
    IonicPageModule.forChild(ComboPage),
  ],
  entryComponents: [
    //ComboPage
  ],
})
export class ComboPageModule { }
