import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { HttpHeaders} from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

import { PerfilEditarPage}  from '../perfil-editar/perfil-editar';
import { HomePage } from '../home/home';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { DatosUsuario } from '../../interfaces/IDatosUsuario';



/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  datosUsuario: DatosUsuario = {
    apellidos : null,
    cedula : null,
    contrasena : "",
    correo : null,
    nombres : null,
    telefono : null,
    telefonoEntrega : null,
    imagenUrl : null,
    token : null,
    direccion: null,
    direccionEntrega: null,
    DoB: null,
    tel_fijo: null 
  }


  data : any;
  info : any;
  userId : string;
  isFacebook : string;
  notificacion: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public Http: Http,
    public httpRequest : HttpRequestProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform) {

      /*platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(HomePage)
      },2)*/

      if (window.localStorage.getItem("userToken") != null) {
          this.userId = window.localStorage.getItem("userToken");
      } else{
          this.navCtrl.setRoot(HomePage);
      }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PerfilPage');
    this.notificacion = this.navParams.get("notificacion");
    
  }

  ionViewWillEnter(){
    //if(window.localStorage.getItem("isFacebook") == "False"){
      this.cargarDatos();
    /*}else{
      this.datosUsuario.correo = window.localStorage.getItem("Facebookname");
      this.datosUsuario.nombres = window.localStorage.getItem("Facebooklastname");
      this.datosUsuario.apellidos = window.localStorage.getItem("Facebookemail");
      this.datosUsuario.imagenUrl = window.localStorage.getItem("Facebookprofileimage");
    }
    this.isFacebook = window.localStorage.getItem("isFacebook");*/
  }

  //npm install --save @angular/http
  //Imports en app.module
  cargarDatos(){
    var token = "";
    if(window.localStorage.getItem("userToken")!= null){
      token = window.localStorage.getItem("userToken");
      let loading = this.loadingCtrl .create({
        content: 'Cargando...'
      });
      loading.present();
      this.httpRequest.get(Constantes.getVerPefilUrl(token)).then((res : any)=>{
        this.info = res.json();
        console.log("datos del perfil recuperado del usuario registrado------------------------------>")
        console.log(res)
        if(this.info.STATUS == "OK"){
          this.datosUsuario.correo = this.info.CORREO;
          this.datosUsuario.nombres = this.info.NOMBRES;
          this.datosUsuario.apellidos = this.info.APELLIDOS;
          this.datosUsuario.cedula = this.info.CEDULA;
          this.datosUsuario.telefono = this.info.TELEFONO;
          this.datosUsuario.telefonoEntrega = this.info.TELEFONO_ENTREGA;
          this.datosUsuario.imagenUrl = this.info.IMAGEN;
          this.datosUsuario.tel_fijo = this.info.TEL_FIJO;
          this.datosUsuario.direccion = this.info.DIRECCION;
          this.datosUsuario.direccionEntrega = this.info.DIRECCION_ENTREGA;
          let dateString= "";
          dateString=this.info.FECHA_NACIMIENTO;
          console.log("fecha-------------------------------------------->");
          console.log(dateString);

          this.datosUsuario.DoB = new Date(dateString).toISOString();
          /*if( this.info.TEL_FIJO){
            this.datosUsuario.tel_fijo = this.info.TEL_FIJO;  
          }else{
            this.datosUsuario.tel_fijo = " ";
          }*/
          console.log(this.datosUsuario.imagenUrl);
        }
        loading.dismiss();
      },(err)=>{
        loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }

    
  }
   
  gotoEditarPefil(){
    this.navCtrl.push(PerfilEditarPage, {
      nombres: this.datosUsuario.nombres,
      apellidos: this.datosUsuario.apellidos,
      correo: this.datosUsuario.correo,
      cedula: this.datosUsuario.cedula,
      telefono: this.datosUsuario.telefono,
      imagenUrl : this.datosUsuario.imagenUrl,
      tel_fijo : this.datosUsuario.tel_fijo,
      telefonoEntrega : this.datosUsuario.telefonoEntrega,
      direccion: this.datosUsuario.direccion,
      direccionEntrega: this.datosUsuario.direccionEntrega,
      DoB: this.datosUsuario.DoB
    });
  } 

  mostrarMensaje(titulo: string ,mensaje: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }       
      ]
    });
    alert.present();
    
   }



}