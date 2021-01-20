import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboEspecialTresPage } from './pizza-comboEspecialTres';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboEspecialTresPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboEspecialTresPageModule { }
