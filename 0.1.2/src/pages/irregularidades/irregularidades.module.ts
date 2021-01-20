import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IrregularidadesPage } from './irregularidades';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //IrregularidadesPage,
  ],
  imports: [
    IonicPageModule.forChild(IrregularidadesPage),
  ],
  entryComponents: [
    //IrregularidadesPage
  ],
})
export class IrregularidadesPageModule { }
