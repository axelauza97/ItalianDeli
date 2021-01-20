import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboEspecialDosPage } from './pizza-comboEspecialDos';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboEspecialDosPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboEspecialDosPageModule { }
