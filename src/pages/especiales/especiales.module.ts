import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspecialesPage } from './especiales';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CrearPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(EspecialesPage),
  ],
  entryComponents: [
    //CrearPizzaPage
  ],
})
export class EspecialesPageModule { }
