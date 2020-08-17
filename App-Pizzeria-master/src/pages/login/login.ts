
import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, ToastController, MenuController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoadingController } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { RegistroFormPage } from '../registro-form/registro-form';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constantes } from '../../util/constantes';
import {format} from "date-fns";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  apiUrl = 'http://navi.pythonanywhere.com/rest/';
  public alertShown: boolean = false;
  dataUsuario = { "CORREO": "", "CONTRASENA": "" };
  loginfb = { "code": "", "access_token": "" };
  //firebaseUser: Observable<firebase.User>;
  loader = this.loading.create({
    content: 'Cargando...',
  });

  public type = "password"; 
  passwordToggleIcon = 'eye';
  public showPass = false; 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public httpRequest: HttpRequestProvider,
              public fb: Facebook,
              private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              public loading: LoadingController,
              public forgotCtrl: AlertController,
              public menu: MenuController,
              public toastCtrl: ToastController,
              public splashScreen: SplashScreen,
              public platform: Platform,
              public statusBar: StatusBar,
              public alertCtrl: AlertController) {

    //   this.firebaseUser = this.afAuth.authState;
    this.menu.swipeEnable(false);
  }

  loginFacebook(event) {
    //this.loader.present();
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log("Entro");
        // The connection was successful
        if (res.status == "connected") {
          console.log(res);
          // Get user ID and Token
          var fb_id = res.authResponse.userID;
          var fb_token = res.authResponse.accessToken;
          console.log(fb_token);
          // Get user infos from the API
          this.fb.api("/me?fields=email,last_name,first_name", []).then((user) => {
            // Get the connected user details
            var nombres = user.first_name;
            var apellidos = user.last_name;
            var correo = user.email;
            var userId = user.id;
            console.log(user);
            console.log("=== USER INFOS ===");
            //this.loader.dismiss()
            this.loginSocialMedia(fb_token,
              nombres,
              apellidos,
              correo,
              userId,
              "");
            // => Open user session and redirect to the next page
          });
        }
        // An error occurred while loging-in
        else {
             //this.loader.dismiss();
          console.log("An error occurred...");
        }
      })
      .catch((e) => {
         this.loader.dismiss();
         this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intente más tarde");
        console.log('Error logging into Facebook', e);
      });
  }
  togglePasswordClick():void{
    this.showPass=!this.showPass;   
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
  showPassword() {
    this.showPass = !this.showPass;
          if(this.showPass){
              this.type = "text";
               } else {
         this.type = "password";
       }
     }

  loginGoogle(event) {
    this.loader.present();
    this.autenticarGoogle();
  }

  async autenticarGoogle() {
    try {
      var googleUser = await this.gplus.login({
        'webClientId': '320424180530-q7cirh7otkfal6v6c5ci2vlr83d71goo.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      console.log(googleUser);
      this.loginSocialMedia(googleUser.accessToken,
        googleUser.givenName,
        googleUser.familyName,
        googleUser.email,
        googleUser.userId,
        googleUser.imageUrl);
      this.loader.dismiss()
    } catch (err) {
      // this.loader.dismiss();
      console.log("error");
      console.log(err)
    }
  }

  loginSocialMedia(token, nombres, apellidos, correo, userId, imageUrl) {
    //this.loader.present();
    let loadingFb = this.loading.create({
      content: 'Cargando...'
    });
    loadingFb.present();
    //this.authService.postData(dataUsuario, "LoginSocialMedia").then((res : any)=>{
    //
    //  if (res.RESPUESTA == "EXITO") {
    //    this.navCtrl.push(HomePage, {
    //      token : token,
    //      nombres : nombres,
    //      apellidos : apellidos,
    //      correo:  correo,
    //      id : userId
    //    });
    //  }
    //}, (err)=>{
    //  //Mensaje de error
    //});
    // this.loader.dismiss();
    var datos = {
      "CORREO" : "",
      "CONTRASENA" : ""
    };
    datos.CONTRASENA = userId;
    var datosregistro = {
      "CORREO" : "",
      "CONTRASENA" : "",
      "NOMBRES" : "",
      "APELLIDOS" : "",
      "CEDULA" : "",
      "TELEFONO" : "",
      "IMAGEN" : "",
      "TEL_FIJO" : "",
      "DIRECCION":"",
      "FECHA":""
    };
    //datosregistro.CORREO = correo;
    datosregistro.APELLIDOS = apellidos;
    datosregistro.CONTRASENA = userId;
    datosregistro.NOMBRES = nombres;
    datosregistro.TELEFONO = "9999999999";
    datosregistro.CEDULA = "";
    datosregistro.IMAGEN =  "";//imageUrl;
    datosregistro.TEL_FIJO = "";
    datosregistro.DIRECCION = "";
    datosregistro.FECHA=format(new Date(), "yyyy-MM-dd");

    if(correo !=null || correo !=""){
      datos.CORREO= correo;
      datosregistro.CORREO = correo;
    }else{
      datos.CORREO= userId+"@gmail.com";
      datosregistro.CORREO = userId+"@gmail.com";
    }
    console.log("Aquí datos en registrooooooo.....................");
    console.log(datosregistro);
    this.httpRequest.post(Constantes.getRegistroFormUrl() , datosregistro).then((res : any)=>{//datos
      //localStorage.setItem('dataUsuario', JSON.stringif(this.respuesta));
      //console.log(res);
      var resJ =  res.json();
      console.log("Respuesta registrooooooo.....................");
      console.log(resJ);
      if (resJ.STATUS == "OK") {
        //this.mostrarMensaje("", "Registro exitoso!!!");
        //this.navCtrl.setRoot(LoginPage);
        //this.login();
      }else{
        /*if(resJ.DETALLE=="El json no cumple la estructura"){
          this.mostrarMensaje("", "Por favor llenar todos los campos");
        }else{
          this.mostrarMensaje("", resJ.DETALLE);
        }*/
        //console.log();
        //this.mostrarMensaje("", "Algo ha salido mal, por favor intenta nuevamente");
      }
    }, (err)=>{
      //Error
    });
    console.log("entra-----------------------------------------------------Pasa el err o la creacion satisfactoria");

    this.httpRequest.post(this.apiUrl + "login", datos).then((res: any) => {
      console.log(res);
      var data = res.json();
      if (data.STATUS == "OK") {
        loadingFb.dismiss();
        window.localStorage.setItem("userToken", data.TOKEN);
        window.localStorage.setItem("email", this.dataUsuario.CORREO);
        window.localStorage.setItem("isFacebook", "True");
        this.navCtrl.setRoot(HomePage);
      } else {
        loadingFb.dismiss();
        this.mostrarMensaje("", "Estamos teniendo inconvenientes, por favor intenta nuevamente");
        //this.mostrarMensaje("", data.DETALLE);
      }
    }, (err) => {
      loadingFb.dismiss();
      this.mostrarMensaje("", "Estamos teniendo inconvenientes, por favor intenta nuevamente");
    });
    /*console.log('Aquí codigo para token django------------------------------------------------------>');
    console.log(token);
    this.loginfb.access_token = token;
    console.log('Aquí esta objeto------------------------------------------------------>');
    console.log(this.loginfb);
    //this.loader.present();
    this.mostrarMensaje3(nombres+" "+apellidos ,"token :"+token+"\n"+"correo :"+correo+"\n"+"userid :"+userId+"\n"+"img_path :"+imageUrl+"\n" ,"ok")
    */
    /*this.httpRequest.post(this.apiUrl + "login_facebook", this.loginfb).then((res: any) => {
      //console.log(res);
      var data = res.json();
      console.log('Aquí token de django------------------------------------------------------>');
      console.log(data);
      if (data.key != null) {
        
        //this.loader.dismiss();
        //window.localStorage.setItem("userToken", data.key);
        //window.localStorage.setItem("email", correo);
        //window.localStorage.setItem("isFacebook", "True");
        //window.localStorage.setItem("Facebookname", nombres);
        //window.localStorage.setItem("Facebooklastname", apellidos);
        //window.localStorage.setItem("Facebookemail", correo);
        //window.localStorage.setItem("Facebookprofileimage", imageUrl);
        //this.navCtrl.setRoot(HomePage)
        
        //window.localStorage.setItem("userToken", data.TOKEN);
        //window.localStorage.setItem("email", this.dataUsuario.CORREO);
        //this.navCtrl.setRoot(HomePage);
      } else {
        this.loader.dismiss();
        this.mostrarMensaje("", data.DETALLE);
      }
    }, (err) => {
      this.loader.dismiss();
      this.mostrarMensaje("", "Estamos teniendo inconvenientes, por favor intenta nuevamente");
    });*/
  }

  signOut() {
    //   this.afAuth.auth.signOut();
    this.gplus.logout();
    this.fb.logout();
  }

  mostrarMensaje(titulo: string, mensaje: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }


  register() {
    this.navCtrl.push(RegistroFormPage);
  }

  login() {
    if (this.dataUsuario.CORREO == "") {
      this.mostrarMensaje("", "Por favor ingresa una direccion de correo electronico")
      return;
    } else if (this.dataUsuario.CONTRASENA == "") {
      this.mostrarMensaje("", "Por favor ingresa una contrasena")
      return;
    } else {
      this.loader.present();
      this.httpRequest.post(this.apiUrl + "login", this.dataUsuario).then((res: any) => {
        console.log(res);
        var data = res.json();
        if (data.STATUS == "OK") {
          this.loader.dismiss();
          window.localStorage.setItem("userToken", data.TOKEN);
          window.localStorage.setItem("email", this.dataUsuario.CORREO);
          window.localStorage.setItem("isFacebook", "False");
          this.navCtrl.setRoot(HomePage);
        } else {
          this.loader.dismiss();
          this.mostrarMensaje("", data.DETALLE);
        }
      }, (err) => {
        this.loader.dismiss();
        this.mostrarMensaje("", "Estamos teniendo inconvenientes, por favor intenta nuevamente");
      });
    }
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
  mostrarMensaje3(titulo: string ,mensaje: string , objetivo: string){
    let alert = this.alertCtrl.create({
      title: "<span class='mensajeFinal'>"+titulo+"</span>",
      message: "<br><div><span class='mensajeFinal'>"+mensaje+"</span></div>",
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            /*if(objetivo == "OK"){
              this.navCtrl.setRoot(ListaPedidosPage);
            } */       
          }
        }        
      ]
    });
    alert.present();
   }
}
