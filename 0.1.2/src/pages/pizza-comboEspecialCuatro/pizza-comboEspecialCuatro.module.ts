import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaComboEspecialCuatroPage } from './pizza-comboEspecialCuatro';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaUnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaComboEspecialCuatroPage),
  ],
  entryComponents: [
    //PizzaUnoPage
  ],
})
export class PizzaComboEspecialCuatroPageModule { }
