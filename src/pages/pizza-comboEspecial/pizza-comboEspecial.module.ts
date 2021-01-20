import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboEspecialPage } from './pizza-comboEspecial';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboEspecialPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboEspecialPageModule { }
