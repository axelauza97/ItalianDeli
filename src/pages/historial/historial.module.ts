import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialPage } from './historial';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //HistorialPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialPage),
  ],
  entryComponents: [
    //HistorialPage
  ],
})
export class HistorialPageModule { }
