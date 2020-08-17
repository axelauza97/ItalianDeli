import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientesPage } from './ingredientes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //IngredientesPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientesPage),
  ],
  entryComponents: [
    //IngredientesPage
  ],
})
export class IngredientesPageModule { }
