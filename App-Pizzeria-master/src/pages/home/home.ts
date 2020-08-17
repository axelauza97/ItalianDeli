import { Component, ViewChild } from '@angular/core';
import { NavController , Platform, NavParams, LoadingController, ToastController, AlertController, Slides, App} from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { CarritoPage } from '../carrito/carrito';
import { FcmProvider } from '../../providers/fcm/fcm';
import { CrearPizzaPage } from '../crear-pizza/crear-pizza';
import { TradicionalesPage } from '../tradicionales/tradicionales';
import { FavoritasPage } from '../favoritas/favoritas';
import { ComboPage } from '../combo/combo';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constantes } from '../../util/constantes';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { ListaPedidosPage } from '../lista-pedidos/lista-pedidos';
import { ComboNuevoPage } from '../combonuevo/combonuevo';
import { ListLocalesPage } from '../list-locales/list-locales';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  oneTime =true;
  public alertShown: boolean = false;
  tiempobanner:Number = 0;
  tiempoOp1:Number = 0;
  tiempoOp2:Number = 0;
  tiempoOp3:Number = 0;
  tiempoOp4:Number = 0;
  tiempoOp5:Number = 0;
  tiempoOp6:Number = 0;
  grupos = [];
  grupoImgOp = [];
  grupoImg2Op = [];
  grupoImg3Op = [];
  grupoImg4Op = [];
  grupoImg5Op = [];
  grupoImg6Op = [];/*[  
    "assets/imgs/recursobanner.png",
  "assets/imgs/banneride.png"
  ];*/
  //@ViewChild('slides', { read: Slides }) slides: Slides;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              private gplus: GooglePlus, 
              private afAuth: AngularFireAuth ,
              private http: HttpClient,
              public app: App, 
              public httpRequest: HttpRequestProvider,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public fcm : FcmProvider,
              public splashScreen: SplashScreen,
              public platform: Platform,
              public statusBar: StatusBar,
              public toastCtrl : ToastController,
              public alertCtrl: AlertController) {
                this.cargarImagenes();  
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    //this.grupos.push("assets/imgs/recursobanner.png");
    //this.grupoImgOp.push("assets/imgs/boton1.png");
    //this.grupoImg2Op.push("assets/imgs/boton2.png");
    //this.grupoImg3Op.push("assets/imgs/boton3.png");
    //this.grupoImg4Op.push("assets/imgs/boton4.png");
    
    //this.cargarOpcionImgs("1",this.grupoImgOp);
    //this.cargarOpcionImgs("2",this.grupoImg2Op);
    //this.cargarOpcionImgs("3",this.grupoImg3Op);
    //this.cargarOpcionImgs("4",this.grupoImg4Op);

    this.user =  Object.assign({}, this.navParams.data);
    //console.log(this.navParams.data);  
    
    //console.log("Aca esta los opciones imgs------------------------------------>");  
    //console.log(this.grupoImg2Op);
  }
  ionViewDidEnter(){
    console.log("Regresamos------------------------------------------------------------->");
    /*if(this.oneTime){
      this.navCtrl.setRoot(HomePage);
      this.oneTime=false;
    }*///para reload y permitir slider operar
    /*setTimeout(()=>{

      if(this.grupos && this.grupos.length && this.grupoImgOp && this.grupoImgOp.length && this.grupoImg2Op && this.grupoImg2Op.length && this.grupoImg3Op && this.grupoImg3Op.length && this.grupoImg4Op && this.grupoImg4Op.length){
        console.log("Vlvemos a reproducir------------------------------------------------------------->"); 
        //this.slides.freeMode = true;
           //this.slides.autoplay = 2000;
           //this.slides.speed = 500;
           //this.slides.loop = true;
           this.slides.startAutoplay()
       }
       },1000)*/
  }
  /*afterslidesLoad(slides) {
    slides.startAutoplay();
  }*/
  ionViewDidLeave(){
    //this.slides.stopAutoplay();
  }
  async cargarImagenes() {
    try {
      let token = window.localStorage.getItem("userToken");
      await this.httpRequest.get(Constantes.getBannerImgs(token)).then((data: any) => {
        var response = data.json();
        //let banner = response.PAQUETE;
        if(response.PAQUETE[0] != undefined && response.PAQUETE[1] != undefined && response.PAQUETE[2] != undefined  && response.PAQUETE[3] != undefined && response.PAQUETE[4] != undefined){
          console.log("Aca esta los banner------------------------------------>");
          console.log(response["PAQUETE"]);
          let banners  = Object.keys(response.PAQUETE[0]).map(function(index) {
            let banner = response.PAQUETE[0][index];
            return banner;
          });
          let imgs1s  = Object.keys(response.PAQUETE[1]).map(function(index) {
            let banner = response.PAQUETE[1][index];
            return banner;
          });
          let imgs2s  = Object.keys(response.PAQUETE[2]).map(function(index) {
            let banner = response.PAQUETE[2][index];
            return banner;
          });
          let imgs3s  = Object.keys(response.PAQUETE[3]).map(function(index) {
            let banner = response.PAQUETE[3][index];
            return banner;
          });
          let imgs4s  = Object.keys(response.PAQUETE[4]).map(function(index) {
            let banner = response.PAQUETE[4][index];
            return banner;
          });
          let imgs5s  = Object.keys(response.PAQUETE[5]).map(function(index) {
            let banner = response.PAQUETE[5][index];
            return banner;
          });
          let imgs6s  = Object.keys(response.PAQUETE[6]).map(function(index) {
            let banner = response.PAQUETE[6][index];
            return banner;
          });
          //console.log(banners[0]);
          //console.log(imgs1s[0]);
          /*response.PAQUETE[0].forEach((banner : any )=> {
            let bannerObj = {"img_url" : banner["img_url"] , "segundos": (Number(banner["segundos"])*1000)}
            banners.push(bannerObj);
          });
          let img1s  = [];
          response.PAQUETE[1].forEach((imagen1 : any )=> {
            let imagenObj = {"img_url" : imagen1["img_url"] , "segundos": (Number(imagen1["segundos"])*1000)}
            img1s.push(imagenObj);
          });
          let img2s  = [];
          response.PAQUETE[2].forEach((imagen2 : any )=> {
            let imagenObj = {"img_url" : imagen2["img_url"] , "segundos": (Number(imagen2["segundos"])*1000)}
            img2s.push(imagenObj);
          });
          let img3s  = [];
          response.PAQUETE[3].forEach((imagen3 : any )=> {
            let imagenObj = {"img_url" : imagen3["img_url"] , "segundos": (Number(imagen3["segundos"])*1000)}
            img3s.push(imagenObj);
          });
          let img4s  = [];
          response.PAQUETE[4].forEach((imagen4 : any )=> {
            let imagenObj = {"img_url" : imagen4["img_url"] , "segundos": (Number(imagen4["segundos"])*1000)}
            img4s.push(imagenObj);
          });*/
          this.tiempobanner = Number(banners[0][0]["segundos"]) *1000;
          this.tiempoOp1 = Number(imgs1s[0][0]["segundos"]) *1000;
          this.tiempoOp2 = Number(imgs2s[0][0]["segundos"]) *1000;
          this.tiempoOp3 = Number(imgs3s[0][0]["segundos"]) *1000;
          this.tiempoOp4 = Number(imgs4s[0][0]["segundos"]) *1000;
          this.tiempoOp5 = Number(imgs5s[0][0]["segundos"]) *1000;
          this.tiempoOp6 = Number(imgs6s[0][0]["segundos"]) *1000;
          this.grupos=banners[0];
          this.grupoImgOp=imgs1s[0];
          this.grupoImg2Op=imgs2s[0];
          this.grupoImg3Op=imgs3s[0];
          this.grupoImg4Op=imgs4s[0];
          this.grupoImg5Op=imgs5s[0];
          this.grupoImg6Op=imgs6s[0];
        }
        
        //console.log(this.grupos);
        /*let lista = [];
        if (response["TAMANOS"] != undefined) {
          
        } else {
          if (response["STATUS"] != 'OK') {
            //this.cerrarPagina();
            this.grupos.push("assets/imgs/recursobanner.png");
          }
        }*/
      }, (err) => {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION, "cerrar");
      });
    }
    catch (err) {
      console.log('Error: ', err.message);
    }
  }
  async cargarOpcionImgs(id: string,array: any) {
    try {
      //let token = window.localStorage.getItem("userToken");
      await this.httpRequest.get(Constantes.getOpcionImgs(id)).then((data: any) => {
        var response = data.json();
        if(response!=null){
          //console.log("Aca esta los opciones imgs------------------------------------>");
          //console.log(response);
          for(let img in response){
            //console.log(response[img]);
            array.push(response[img]);
          }
          //console.log(this.grupoImgOp);
        }
        //console.log(this.grupoImgOp);
        /*let lista = [];
        if (response["TAMANOS"] != undefined) {
          
        } else {
          if (response["STATUS"] != 'OK') {
            //this.cerrarPagina();
            this.grupos.push("assets/imgs/recursobanner.png");
          }
        }*/
      }, (err) => {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION, "cerrar");
      });
    }
    catch (err) {
      console.log('Error: ', err.message);
    }
  }
  mostrarMensaje(titulo: string, mensaje: string, cerrar?) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            if (cerrar != undefined)
              this.app.getRootNavs()[0].setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.gplus.logout();
  }

  carrito(){
    this.navCtrl.push(CarritoPage);
  }


  ionViewDidLoad(){
    let firebaseToken = window.localStorage.getItem("firebaseToken");
    console.log("token "+firebaseToken);
    
    //this.cargarBanner();
    //this.slides.startAutoplay();
  }
  
  ordenarPizza(event: Event){
    event.preventDefault;
    this.navCtrl.push(CrearPizzaPage);
  }

  tradicionales(event: Event){
    event.preventDefault;
    this.navCtrl.push(TradicionalesPage);
  }

  favoritas(event: Event){
    event.preventDefault;
    this.navCtrl.push(FavoritasPage);
  }

  combos(event: Event){
    event.preventDefault;
    //this.mostrarMensaje2("ATENCIÓN!!" ,"PRUEBA" , "ok")
    //aca se agrega como componente???--- debe agregarse como pagina
    this.navCtrl.push(ComboPage)
    //this.navCtrl.setRoot(ComboPage)
    //console.log("vistassss Afterr......",this.navCtrl.getViews());
  }
  combosnuevos(event: Event){
    event.preventDefault;
    //this.mostrarMensaje2("ATENCIÓN!!" ,"PRUEBA" , "ok")
    //aca se agrega como componente???--- debe agregarse como pagina
    this.navCtrl.push(ComboNuevoPage)
    //this.navCtrl.setRoot(ComboPage)
    //console.log("vistassss Afterr......",this.navCtrl.getViews());
  }
  status(event: Event){ 
    event.preventDefault;
    //this.mostrarMensaje2("ATENCIÓN!!" ,"PRUEBA" , "ok")
    //aca se agrega como componente???--- debe agregarse como pagina
    this.navCtrl.push(ListaPedidosPage,{
      type: "FromMain"
    });
    //this.navCtrl.setRoot(ComboPage)
    //console.log("vistassss Afterr......",this.navCtrl.getViews());
  }
  mostrarMensaje2(titulo: string ,mensaje: string , objetivo: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: "<br><div><span class='mensajeFinal'>"+mensaje+"</span></div><div><span class='mensajeFinal'>SU ORDEN ESTÁ EN PROCESO</span></div>",
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
