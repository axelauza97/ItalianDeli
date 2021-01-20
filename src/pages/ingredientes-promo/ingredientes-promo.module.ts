import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientesPromoPage } from './ingredientes-promo';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //IngredientesPromoPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientesPromoPage),
  ],
  entryComponents: [
    //IngredientesPromoPage
  ],
})
export class IngredientesPromoPageModule { }
