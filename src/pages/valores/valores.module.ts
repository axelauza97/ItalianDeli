import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValoresPage } from './valores';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ValoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ValoresPage),
  ],
})
export class ValoresPageModule { }
