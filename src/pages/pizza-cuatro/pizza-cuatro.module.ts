import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaCuatroPage } from './pizza-cuatro';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PizzaCuatroPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaCuatroPage),
  ],
  entryComponents: [
    //PizzaCuatroPage
  ],
})
export class PizzaCuatroPageModule { }
