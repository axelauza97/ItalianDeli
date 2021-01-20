import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slide } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus} from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import * as firebase from 'firebase/app';
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
import { FCM } from '@ionic-native/fcm/ngx'

import { ApiServiceProvider } from '../providers/api-service/api-service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from 'ionic-angular';


import { enableProdMode } from '@angular/core';

import { SharedModule } from '../shared/shared.module'
import { TimeServiceProvider } from '../providers/time-service/time-service';

import { SecondFirebaseAppProvider } from '../providers/second-firebase-app/second-firebase-app';


enableProdMode();

/*
const firebaseConfig = {
  apiKey: "AIzaSyBxeO1AS36TObv6j9GY7t5Iqn30qaLTf9M",
  authDomain: "pizzeriaapp-f505e.firebaseapp.com",
  databaseURL: "https://pizzeriaapp-f505e.firebaseio.com",
  projectId: "pizzeriaapp-f505e",
  storageBucket: "pizzeriaapp-f505e.appspot.com",
  messagingSenderId: "320424180530"
}*/

const firebaseConfig = {
  apiKey: "AIzaSyDuPi_vtQj3bG-4pIxAWY4OgAqLlT1bFGI",
  authDomain: "italiandeliexpress-8df32.firebaseapp.com",
  databaseURL: "https://italiandeliexpress-8df32.firebaseio.com",
  projectId: "italiandeliexpress-8df32",
  storageBucket: "italiandeliexpress-8df32.appspot.com",
  messagingSenderId: "597411026712",
  appId: "1:597411026712:web:6dc4c2cfe147f04052b06d",
  measurementId: "G-9ZG79XXWS2"
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
    AngularFirestoreModule,
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
    FCM,
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
    TimeServiceProvider,
    SecondFirebaseAppProvider,
  ]
})
export class AppModule { }
