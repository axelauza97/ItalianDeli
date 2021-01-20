import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioPage } from './inicio';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //InicioPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioPage),
  ],
  entryComponents: [
    //InicioPage
  ],
})
export class InicioPageModule { }
