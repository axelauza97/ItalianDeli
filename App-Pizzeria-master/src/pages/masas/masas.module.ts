import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasasPage } from './masas';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //MasasPage,
  ],
  imports: [
    IonicPageModule.forChild(MasasPage),
  ],
  entryComponents: [
    //MasasPage
  ],
})
export class MasasPageModule { }
