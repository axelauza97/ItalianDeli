import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboNuevoDosPage } from './pizza-combonuevoDos';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboNuevoDosPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboNuevoPageModule { }
