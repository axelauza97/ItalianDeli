import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionalesPage } from './adicionales';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //AdicionalesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionalesPage),
  ],
  entryComponents: [
    // AdicionalesPage
  ],
})
export class AdicionalesPageModule { }
