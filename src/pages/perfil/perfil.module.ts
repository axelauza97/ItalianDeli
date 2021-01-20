import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPage } from './perfil';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
  ],
  entryComponents: [
    //PerfilPage
  ],
})
export class PerfilPageModule { }
