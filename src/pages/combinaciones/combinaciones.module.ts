import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombinacionesPage } from './combinaciones';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CombinacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(CombinacionesPage),
  ],
  entryComponents: [
    //CombinacionesPage
  ],
})
export class CombinacionesPageModule { }
