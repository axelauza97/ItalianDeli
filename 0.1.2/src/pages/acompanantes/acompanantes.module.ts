import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcompanantesPage } from './acompanantes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //AcompanantesPage,
  ],
  imports: [
    IonicPageModule.forChild(AcompanantesPage),
  ],
  entryComponents: [
    //AcompanantesPage
  ],
})
export class AcompanantesPageModule { }
