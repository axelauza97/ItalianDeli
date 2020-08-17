import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { Constantes } from '../../util/constantes';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { HomePage } from '../home/home';
import { Token } from '@angular/compiler';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the ReclamosSugerenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamos-sugerencias',
  templateUrl: 'reclamos-sugerencias.html',
}) 
export class ReclamosSugerenciasPage {

  rosTexto: String;
  imagenPerfilBase64 : string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public httpRequest : HttpRequestProvider,
    public camera : Camera    ) {
      let loading = this.loadingCtrl .create({
        content: 'Cargando...'
        });
        loading.present(); 
        loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamosSugerenciasPage');
  }

  enviar(){

    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
      });
      loading.present(); 
      if(window.localStorage.getItem("userToken") != null){

        var postData = {
          "TOKEN": "",
          "CONTENIDO": "",
          "FECHA": "",
          "IMAGEN":""
        };
        if(this.imagenPerfilBase64 != null){ 
          console.log("imagen  detectada")
          postData.IMAGEN = this.imagenPerfilBase64;
        }
        else {
          postData.IMAGEN = ""
          //await this.convertToDataURLviaCanvas(this.datosUsuario.imagenUrl, "image/jpeg").then(base64 => postData.append("IMAGEN", ""+base64));//console.log(base64)
          //postData.append("IMAGEN", this.datosUsuario.imagenUrl);
        }

        var fecha = new Date().toJSON().split('T');
        console.log(fecha);
        postData.TOKEN = window.localStorage.getItem("userToken");
        postData.CONTENIDO = this.rosTexto.toString();
        postData.FECHA = fecha[0] + " " + fecha[1];
        
        console.log(postData);
        this.httpRequest.post(Constantes.RECLAMOS_SUGERENCIAS, postData).then((res : any)=>{
          var data = res.json();
          loading.dismiss();
          console.log(data);
          if(data.STATUS == "OK"){
            this.mostrarMensaje("",Constantes.RECLAMO_EXITOSO);
            this.navCtrl.setRoot(HomePage);
          }else{
            this.mostrarMensaje("", Constantes.ALGO_HA_SALIDO_MAL);
          }
        }, (err)=>{
          loading.dismiss();
         // this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
          this.mostrarMensaje("error",err);
        });
      }else{
        loading.dismiss();
        this.mostrarMensaje("", Constantes.ALGO_HA_SALIDO_MAL);
      }

  }

  abrirGaleria(){
    const opciones : CameraOptions = { 
       quality :  100,
       destinationType : this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType : this.camera.MediaType.PICTURE,
       sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
     
    }
    this.camera.getPicture(opciones).then((imagen) => {
       this.imagenPerfilBase64 =  "data:image/jpeg;base64,"+imagen;
       //this.datosUsuario.imagenUrl = "data:image/jpeg;base64,"+imagen;
    },(err) =>{
    }
    );
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
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();

   }



}
