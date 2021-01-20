import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboNuevoPage } from './pizza-combonuevo';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboNuevoPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboNuevoPageModule { }
