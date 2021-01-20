import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritasPage } from './favoritas';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //FavoritasPage,
  ],
  imports: [
    //IonicPageModule.forChild(FavoritasPage),
  ],
  entryComponents: [
    FavoritasPage
  ],
})
export class FavoritasPageModule { }
