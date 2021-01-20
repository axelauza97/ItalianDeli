import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    //LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    //LoginPage
  ],
})
export class LoginPageModule { }
