import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLocalesPage } from './list-locales';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ListLocalesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListLocalesPage),
  ],
  entryComponents: [
    //ListLocalesPage
  ],
})
export class ListLocalesPageModule { }
