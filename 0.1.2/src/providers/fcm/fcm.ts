//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx'
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private fcm: FCM,
    private platform: Platform
  ) {}

  async getToken() {

    let token;
    let info;
    console.log("Aquí esta el token asignado a este telefono de firebase----------------->")
    if (this.platform.is('android')) {
     
      token = await this.firebaseNative.getToken();
      info = await this.firebaseNative.getInfo();
    } 

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      const perm = await this.firebaseNative.grantPermission();
    }
    console.log(token) 
    console.log("Fin--------------------------------------------------------------------->")
    // Is not cordova == web PWA
    if (!this.platform.is('cordova')) {
      // TODO add PWA support with angularfire2
    } 
    window.localStorage.setItem("firebaseToken",  token);
    return token
  }

 //private saveTokenToFirestore(token) {
 //  if (!token) return;
 //  const devicesRef = this.afs.collection('devices')

 //  const docData = { 
 //    token,
 //    userId: 'testUser',
 //  }

 //  return devicesRef.doc(token).set(docData)
 //}

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }


}