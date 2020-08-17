import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slide } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Facebook } from '@ionic-native/facebook';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';

import { HttpRequestProvider } from '../providers/http-request/http-request';

import { Camera } from '@ionic-native/camera';

import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';

import { ApiServiceProvider } from '../providers/api-service/api-service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from 'ionic-angular';


import { enableProdMode } from '@angular/core';

import { SharedModule } from '../shared/shared.module'

enableProdMode();


const firebaseConfig = {
  apiKey: "AIzaSyBxeO1AS36TObv6j9GY7t5Iqn30qaLTf9M",
  authDomain: "pizzeriaapp-f505e.firebaseapp.com",
  databaseURL: "https://pizzeriaapp-f505e.firebaseio.com",
  projectId: "pizzeriaapp-f505e",
  storageBucket: "pizzeriaapp-f505e.appspot.com",
  messagingSenderId: "320424180530"
}


@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
      , tabsPlacement: 'top'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot({
      name: '__app_pizzeria',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireAuthModule,
    HttpModule
    //CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Camera,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Facebook,
    HttpRequestProvider,
    Firebase,
    FcmProvider,
    AngularFireAuth,

    HttpModule,
    HttpClientModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiServiceProvider,
    InAppBrowser,
    AlertController,
  ]
})
export class AppModule { }
