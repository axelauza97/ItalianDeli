import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatosUsuario } from '../../interfaces/IDatosUsuario';
import { Constantes } from '../../util/constantes';
import { Camera, CameraOptions} from "@ionic-native/camera";
import { PerfilPage } from '../perfil/perfil';
import { format } from 'date-fns/esm';


@IonicPage()
@Component({
  selector: 'page-perfil-editar',
  templateUrl: 'perfil-editar.html',
})
export class PerfilEditarPage {

  year = null;
  currentTime = null;
  imagenPerfilBase64 : string;
  imagenPerfilUrl : string;
  validations_form: FormGroup;
  apellidos : string;
  nombres : string;
  cedula : string;
  correo : string;
  telefono : string;
  direccion : string;
  tel_fijo : string;
  imagenUrl: string;
  token : string;
  img: any;

  datosUsuario: DatosUsuario = {
    apellidos : null,
    cedula : null,
    contrasena : "",
    correo : null,
    nombres : null,
    imagenUrl : null,
    telefono : null,
    direccion: null,
    DoB: null,
    token : null,
    tel_fijo : null
  }

  validation_messages = {
    'correo': [
      { type: 'required', message: 'El Correo es obligatorio' },
      { type: 'pattern', message: 'No cumple con la estructura de un correo.' }
    ],
    'nombres': [
      { type: 'required', message: 'Los nombres son obligatorios' },
      { type: 'pattern', message: 'El nombre debe contener únicamente letras'}

    ],
    'apellidos': [
      { type: 'required', message: 'Los apellidos son obligatorios' },
      { type: 'pattern', message: 'El apellido debe contener únicamente letras'}

    ],

    'cedula': [
      { type: 'required', message: 'La cédula es obligatoria' },
      //{ type: 'minlength', message: 'La cédula debe contener 10 dígitos'},
      //{ type: 'pattern', message: 'La cédula debe contener únicamente números'}

    ],
    'direccion': [
      { type: 'required', message: 'La dirección es obligatoria.' },
    ],

    'telefono': [
      { type: 'required', message: 'El Teléfono es obligatorio.' },
      { type: 'minlength', message: 'El Teléfono debe contener 10 dígitos'},
      { type: 'pattern', message: 'El Teléfono debe contener únicamente números'}
    ],
    /*'tel_fijo': [
      { type: 'minlength', message: 'El Teléfono debe contener 6 dígitos'},
      { type: 'pattern', message: 'El Teléfono debe contener únicamente números'}
    ],*/
    'contrasena': [
      { type: 'required', message: 'La contrasena es obligatoria' },
      { type: 'minlength', message: 'La contrasena debe tener minimo 5 caracteres' },
    ],


  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public Http: Http ,
              public httpRequest : HttpRequestProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public camera : Camera,
              public platform: Platform) {
        
              /*platform.registerBackButtonAction(() => {
                this.navCtrl.setRoot(PerfilPage)
              },2)*/
  

            let loading = this.loadingCtrl .create({
              content: 'Cargando...'
            });
            loading.present();
            this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();

           /* this.datosUsuario.correo = navParams.get("correo");
            this.datosUsuario.nombres = navParams.get("nombres");
            this.datosUsuario.apellidos = navParams.get("apellidos");
            this.datosUsuario.cedula = navParams.get("cedula");
            this.datosUsuario.telefono = navParams.get("telefono");
            this.datosUsuario.imagenUrl = navParams.get("imagenUrl");
            if (window.localStorage.getItem("userToken") != null) {
              this.datosUsuario.token = window.localStorage.getItem("userToken");
            }*/

            this.datosUsuario.correo = navParams.get("correo");
            this.datosUsuario.nombres = navParams.get("nombres");
            this.datosUsuario.apellidos = navParams.get("apellidos");
            this.datosUsuario.cedula = navParams.get("cedula");
            this.datosUsuario.telefono = navParams.get("telefono");
            this.datosUsuario.imagenUrl = navParams.get("imagenUrl");
            this.datosUsuario.tel_fijo = navParams.get("tel_fijo");
            this.datosUsuario.direccion = navParams.get("direccion");
            this.datosUsuario.DoB = navParams.get("DoB");

            if (window.localStorage.getItem("userToken") != null) {
              this.datosUsuario.token = window.localStorage.getItem("userToken");
            }

            this.validations_form = this.formBuilder.group({
              correo: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}'),
                Validators.required
              ])),
              nombres: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z_ ]+$'),
                Validators.required
              ])),
              apellidos: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z_ ]+$'),
                Validators.required
              ])),
              telefono:new FormControl('', Validators.compose([
                Validators.minLength(10),
                Validators.required,
                Validators.pattern('^[0-9]*$')
              ])),
              tel_fijo:new FormControl('', Validators.compose([
                Validators.minLength(6),
                Validators.pattern('^[0-9]*$')
              ])),
              direccion:new FormControl('', Validators.compose([
                //Validators.minLength(10),
                //Validators.required,
                //Validators.pattern('^[0-9]*$')
              ])),
              cedula: new FormControl('', Validators.compose([
                //Validators.minLength(10),
                //Validators.required,
                //Validators.pattern('^[0-9]*$')
              ])),

              });
              loading.dismiss();
  }

  /**
   *
   */
  async guardarPerfil(){
    console.log(this.datosUsuario);
  /** var datos =  {
      "CORREO" : "",
      "CONTRASENA" : "",
      "NOMBRES" : "",
      "APELLIDOS" : "",
      "CEDULA" : "",
      "TELEFONO" : "",
      "TOKEN": ""
    };

    datos.CORREO =     this.datosUsuario.correo;
    datos.APELLIDOS =  this.datosUsuario.apellidos;
    datos.CEDULA =     this.datosUsuario.cedula;
    datos.CONTRASENA = this.datosUsuario.contrasena;
    datos.NOMBRES =    this.datosUsuario.nombres;
    datos.TELEFONO =    this.datosUsuario.telefono;
    datos.TOKEN =      this.datosUsuario.token;
**/
  
  //if(this.validarCedula(this.cedula)){
      let postData  = new FormData();
    if(this.nombres != null){
      postData.append("NOMBRES",   this.nombres);
    } else {
      postData.append("NOMBRES",   this.datosUsuario.nombres);
    }

    if(this.apellidos != null){
      postData.append("APELLIDOS",   this.apellidos);
    } else {
      postData.append("APELLIDOS", this.datosUsuario.apellidos);
    }

    if(this.correo != null){
      postData.append("CORREO",   this.correo);
    } else {
      postData.append("CORREO",    this.datosUsuario.correo);
    } 

    if(this.cedula != null){
      postData.append("CEDULA",   this.cedula);
    } else {
      postData.append("CEDULA",    this.datosUsuario.cedula);
    }
    
    if(this.telefono != null){
      postData.append("TELEFONO",   this.telefono);
    } else {
      postData.append("TELEFONO",   this.datosUsuario.telefono);
    }
    if(this.tel_fijo != null){
      postData.append("TEL_FIJO",   this.tel_fijo);
    } else {
      postData.append("TEL_FIJO",   this.datosUsuario.tel_fijo);
    }
    if(this.direccion != null){
      postData.append("DIRECCION",   this.direccion);
    } else {
      postData.append("DIRECCION",   this.datosUsuario.direccion);
    }
    console.log("Fecha-------------------------------------------------------->");
    console.log(this.datosUsuario);
    var date=new Date(this.datosUsuario.DoB);
    date.setDate(date.getDate()+1);
    postData.append("FECHA", format(date, "yyyy-MM-dd"));
    postData.append("TOKEN",     this.datosUsuario.token);

    if(this.imagenPerfilBase64 != null){ 
      console.log("imagen  detectada")
      postData.append("IMAGEN", this.imagenPerfilBase64);
    }
    else {
      await this.convertToDataURLviaCanvas(this.datosUsuario.imagenUrl, "image/jpeg").then(base64 => postData.append("IMAGEN", ""+base64));//console.log(base64)
      //postData.append("IMAGEN", this.datosUsuario.imagenUrl);
    }
    console.log(postData)
      /*
    let regexp_telefono = new RegExp('^09[0-9]{8}$');
    let test_telefono = regexp_telefono.test(datos.TELEFONO);
    let regexp_correo = new RegExp('^\w+@\w+\.[a-z]+$');
    let regexp_correo = new RegExp('^\w+@\w+\.[a-z]{2,4}$');
    let test_correo = regexp_correo.test(datos.CORREO);
    console.log(test_correo);
    */
    let loading = this.loadingCtrl .create({
    content: 'Cargando...'
    });
    loading.present(); 
    //let data : Observable<any> =this.Http.post(Constantes.getEditarPerfilUrl() , postData);
    //data.subscribe((result)=>{
    //  loading.dismiss();
    //  console.log(result)
    //})\
    console.log(postData);
     this.httpRequest.post(Constantes.getEditarPerfilUrl(), postData).then((res : any)=>{
       var data = res.json();
       loading.dismiss();
       console.log(data);
       if(data.STATUS == "OK"){
         this.navCtrl.pop();
       }else{
         this.mostrarMensaje("", Constantes.ALGO_HA_SALIDO_MAL);
       }
     }, (err)=>{
       loading.dismiss();
      // this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
       this.mostrarMensaje("error",err);
     });
    /*}else{
      this.mostrarMensaje2("error","Cedula ecuatoriana no valida");
      return;
    }*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEditarPage');
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
            this.navCtrl.setRoot(PerfilPage);
          }
        }
      ]
    });
    alert.present();

   }
   mostrarMensaje2(titulo: string ,mensaje: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          
        }
      ]
    });
    alert.present();

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
       console.log("imagen get picture")
        this.imagenPerfilBase64 =  "data:image/jpeg;base64,"+imagen
     },(err) =>{
     }
     );
   }
   validarCedula(cedula: string) {
    // Créditos: Victor Diaz De La Gasca.
    // Autor: Adrián Egüez
    // Url autor: https://gist.github.com/vickoman/7800717
    // Preguntamos si la cedula consta de 10 digitos
    if (cedula.length === 10) {
  
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
  
  }

   convertToDataURLviaCanvas(url, outputFormat){
    return new Promise((resolve, reject) => {
    this.img = new Image();
    this.img.crossOrigin = 'Anonymous';
    this.img.onload = () => {
      let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = this.img.height;
      canvas.width = this.img.width;
      ctx.drawImage(this.img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
      canvas = null;
    };
    this.img.src = url;
    });
  }
}
