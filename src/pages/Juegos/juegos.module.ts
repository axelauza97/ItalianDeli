import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuegosPage } from './juegos';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //BebidasPage,
  ],
  imports: [
    IonicPageModule.forChild(JuegosPage),
  ],
  entryComponents: [
    //BebidasPage
  ],
})
export class JuegosPageModule { }
