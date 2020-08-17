import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearPizzaPage } from './crear-pizza';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //CrearPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearPizzaPage),
  ],
  entryComponents: [
    //CrearPizzaPage
  ],
})
export class CrearPizzaPageModule { }
