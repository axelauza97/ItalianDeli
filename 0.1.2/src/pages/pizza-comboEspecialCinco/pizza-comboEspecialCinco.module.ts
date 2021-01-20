import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboEspecialCincoPage } from './pizza-comboEspecialCinco';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboEspecialCincoPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboEspecialCincoPageModule { }
