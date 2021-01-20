import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingPizzaPage } from './tracking-pizza';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //TrackingPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingPizzaPage),
  ],
  entryComponents: [
    //TrackingPizzaPage
  ],
})
export class TrackingPizzaPageModule { }
