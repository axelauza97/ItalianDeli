import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { ContactanosPage } from './contactanos';

@NgModule({
  declarations: [
    //PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactanosPage),
  ],
  entryComponents: [
    //PerfilPage
  ],
})
export class ContactanosPageModule { }
