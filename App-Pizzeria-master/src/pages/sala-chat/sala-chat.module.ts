import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaChatPage } from './sala-chat';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    //SalaChatPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaChatPage),
  ],
  entryComponents: [
    //SalaChatPage
  ],
})
export class SalaChatPageModule { }
