import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BebidasPage } from './bebidas';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //BebidasPage,
  ],
  imports: [
    IonicPageModule.forChild(BebidasPage),
  ],
  entryComponents: [
    //BebidasPage
  ],
})
export class BebidasPageModule { }
