import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEditarPage } from './perfil-editar';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //PerfilEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEditarPage),
  ],
  entryComponents: [
    //PerfilEditarPage
  ],
})
export class PerfilEditarPageModule { }
