import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, DateTime } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { InicioPage } from '../inicio/inicio';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { DatosUsuario } from '../../interfaces/IDatosUsuario';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
import {format} from "date-fns";

@IonicPage()
@Component({
  selector: 'page-registro-form',
  templateUrl: 'registro-form.html',
})
export class RegistroFormPage {

  validations_form: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  user : any;
  imagenPerfilBase64 : string;
  //myDate: String = new Date().toISOString();
  year = null;
  currentTime = null;

  
  passwordToggleIcon = 'eye';
  public showPass = false;
  acuerdoPass:boolean;
  
  respuesta: any;

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public httpRequest : HttpRequestProvider,
              private toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public camera : Camera) {
    

    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();
    this.datosUsuario.DoB=new Date().toISOString();
    loading.present();
    this.user =  Object.assign({}, this.navParams.data);
    if(this.user != null){
      this.datosUsuario.nombres = this.user.nombres;
      this.datosUsuario.apellidos = this.user.apellidos;
      this.datosUsuario.correo = this.user.correo;
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
      cedula:new FormControl('', Validators.compose([
        //Validators.minLength(10),
        //Validators.required,
        //Validators.pattern('^[0-9]*$')
      ])),
      direccion:new FormControl('', Validators.compose([
        //Validators.minLength(10),
        //Validators.required,
        //Validators.pattern('^[0-9]*$')
      ])),
      contrasena: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ])),

      });
      loading.dismiss();

  }

  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
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
      /*{ type: 'minlength', message: 'La cédula debe contener 10 dígitos'},
      { type: 'pattern', message: 'La cédula debe contener únicamente números'}*/
    ],

    'telefono': [
      { type: 'required', message: 'El Teléfono es obligatorio.' },
      { type: 'minlength', message: 'El Teléfono debe contener 10 dígitos'},
      { type: 'pattern', message: 'El Teléfono debe contener únicamente números'}
    ],
    'direccion': [
      { type: 'required', message: 'La dirección es obligatoria.' },
    ],
    'tel_fijo': [
      { type: 'minlength', message: 'El Teléfono debe contener 6 dígitos'},
      { type: 'pattern', message: 'El Teléfono debe contener únicamente números'}
    ],
    'contrasena': [
      { type: 'required', message: 'La contrasena es obligatoria' },
      { type: 'minlength', message: 'La contrasena debe tener minimo 5 caracteres' },
      { type: 'pattern', message: 'Su contrasena debe tener al menos una mayuscula, una minuscula y un numero.' }
    ],
  };


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
       this.datosUsuario.imagenUrl = "data:image/jpeg;base64,"+imagen;
    },(err) =>{
    }
    );
  }
  
  onSubmit(values){
    //console.log(this.datosUsuario);
    if(this.acuerdoPass){
      var datos = {
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

      
      datos.CORREO = this.datosUsuario.correo;
      datos.APELLIDOS = this.datosUsuario.apellidos;
      datos.CONTRASENA = this.datosUsuario.contrasena;
      datos.NOMBRES = this.datosUsuario.nombres;
      datos.TELEFONO = this.datosUsuario.telefono;
      datos.CEDULA = this.datosUsuario.cedula;
      datos.IMAGEN =  this.datosUsuario.imagenUrl;
      datos.TEL_FIJO = this.datosUsuario.tel_fijo;
      datos.DIRECCION = this.datosUsuario.direccion;
      datos.FECHA = format(new Date(this.datosUsuario.DoB), "yyyy-MM-dd");
      
      
      console.log(datos);
      
      let loading = this.loadingCtrl .create({
        content: 'Cargando...'
      });
      loading.present();
      //console.log(datos);
      this.httpRequest.post(Constantes.getRegistroFormUrl() , datos).then((res : any)=>{//datos
        //localStorage.setItem('dataUsuario', JSON.stringif(this.respuesta));
        //console.log(res);
        var resJ =  res.json();
        console.log(resJ);
        if (resJ.STATUS == "OK") {
          this.mostrarMensaje("", "Registro exitoso!!!");
          this.navCtrl.setRoot(LoginPage);
          //this.login();
        }else{
          if(resJ.DETALLE=="El json no cumple la estructura"){
            this.mostrarMensaje("", "Por favor llenar todos los campos");
          }else{
            this.mostrarMensaje("", resJ.DETALLE);
          }
          //console.log();
          //this.mostrarMensaje("", "Algo ha salido mal, por favor intenta nuevamente");
        }
      }, (err)=>{
        //Error
      });
      loading.dismiss();
    }else{
      this.mostrarMensaje("","Debe aceptar el acuerdo!!!");
      return;
    }
  }
  togglePasswordClick():void{
    this.showPass=!this.showPass;   
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
  login(){

    var datos = {
      "CORREO" : "",
      "CONTRASENA" : "",
      "NOMBRES" : "",
      "APELLIDOS" : "",
      "CEDULA" : "999999999",
      "TELEFONO" : ""
    };

    datos.CORREO = this.datosUsuario.correo;
    datos.APELLIDOS = this.datosUsuario.apellidos;
    datos.CONTRASENA = this.datosUsuario.contrasena;
    datos.NOMBRES = this.datosUsuario.nombres;
    datos.TELEFONO = this.datosUsuario.telefono;
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    console.log("datos registro---------------------------------------------------------------------->")
    console.log(datos)
    loading.present();
    this.httpRequest.post(Constantes.getLoginUrl() , datos).then((res : any)=>{
      console.log("respuesta registro---------------------------------------------------------------------->")
      console.log(res);
      var resJ = res.json();
      if (resJ.STATUS == "OK") {
        window.localStorage.setItem("userToken", resJ.TOKEN);
 
        this.navCtrl.setRoot(HomePage);
      }else{
        this.mostrarMensaje("", "Por favor, revise los datos");
      }
    }, (err)=>{
      //Mensaje de error
    });
    loading.dismiss();

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
          }
        }       
      ]
    });
    alert.present();
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

}