import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReclamosSugerenciasPage } from './reclamos-sugerencias';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //ReclamosSugerenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(ReclamosSugerenciasPage),
  ],
  entryComponents: [
    //ReclamosSugerenciasPage
  ],
})
export class ReclamosSugerenciasPageModule { }
