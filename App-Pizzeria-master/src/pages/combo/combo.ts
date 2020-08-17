import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Platform, Events, ModalController, ViewController } from 'ionic-angular';
import { Http} from '@angular/http';
import { DetalleComboPage } from '../detalle-combo/detalle-combo';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { DetallePromocionalPage } from '../detalle-promocional/detalle-promocional';

@IonicPage()
@Component({
  selector: 'page-combo',
  templateUrl: 'combo.html',
})
export class ComboPage {

  public combos = [];
  public pizzaCombo = [];
  public objetivo : string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public Http: Http, 
              public app: App, 
              public httpRequest : HttpRequestProvider, 
              public loadingCtrl: LoadingController, 
              public alertCtrl : AlertController,
              public platform: Platform, 
              public events : Events,
              private viewCtrl : ViewController,
              public modalCtrl: ModalController) {
                /*platform.backButton.subscribe(() => {
                  console.log("TEST1");
                  this.navCtrl.setRoot(HomePage);
                });*/
      /*platform.backButton.subscribe(() => {
        let view = this.navCtrl.getActive();
        let currentRootPage = view.component; 
        if (currentRootPage == ComboPage) {
          console.log("hey brother one time :C");
          navCtrl.setRoot(HomePage);
          //navCtrl.setRoot(HomePage);
          
        }*/
        //navCtrl.setRoot(HomePage);
        //navCtrl.setRoot(HomePage);
        /*let view = this.navCtrl.getActive();
        let currentRootPage = view.component; 
        if (currentRootPage == ComboPage) {
          console.log("hey brother one time :C");
          //navCtrl.setRoot(HomePage);
          //navCtrl.pop();
        }
        //this.navCtrl.setRoot(HomePage)//aquiiiii es donde falla quizas redirigiendolo al home como el menu pilas
        //console.log("hey aqui va homepage como component");
        //const index = this.viewCtrl.index;
        //this.navCtrl.remove(index);
        //console.log(this.navCtrl.getViews());
        //this.navCtrl.popToRoot();
        console.log("hey 1era page....",this.navCtrl.getViews());*/
      //},2);
    this.getLocalCombos();
    this.objetivo = navParams.get("objetivo");
    console.log("Hay combo(abajo)1------------------------------------------->");
    console.log(this.objetivo);  
  }
  cerrarPage(){
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }
  getLocalCombos() {
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present()
    var token =  window.localStorage.getItem("userToken");
    try{
      console.log(Constantes.getPromocionalesUrl(token))
      this.httpRequest.get(Constantes.getPromocionalesUrl(token)).then( (res: any) => {
          res = res.json();
          let data = res.COMBOS;
          if(data != null){
            console.log(Object.keys(data));
            this.combos = Object.keys(data).map(function(index) {
              let promo = data[index];
              return promo;
            });
            console.log("COMBOS AQUÍ...................................>");
            console.log(this.combos);
            // this.promociones = res.COMBOS;
            // console.log(this.promociones);
          }else{
            if(data.STATUS != 'OK'){
              this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
            }
          }
          loading.dismiss();
        }, (error : any)=>{
          console.log("Error")
          loading.dismiss();
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        });
    }catch(err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
    
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
            this.app.getRootNavs()[0].setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
   }

  detalle(combo) {
    console.log(this.navCtrl.getViews());
    this.navCtrl.push(DetalleComboPage, {
      data: combo
    })
  }

  promoLunes() {
    console.log("Entra modal")
    this.abrirVentanaDetalle(this.combos[0].NOMBRE, this.combos[0].COSTO, this.combos[0]);
  }
  promoMartes() {
    console.log("Entra modal")
    this.abrirVentanaDetalle(this.combos[1].NOMBRE, this.combos[1].COSTO, this.combos[1]);
  }
  promoMiercoles() {
    console.log("Entra modal")
    this.abrirVentanaDetalle(this.combos[2].NOMBRE, this.combos[2].COSTO, this.combos[2]);
  }
  promoJueves() {
    console.log("Entra modal")
    this.abrirVentanaDetalle(this.combos[3].NOMBRE, this.combos[3].COSTO, this.combos[3]);
  }
  
  promoSabado() {
    console.log("Entra modal")
    this.abrirVentanaDetalle(this.combos[4].NOMBRE, this.combos[4].COSTO, this.combos[4]);
  }
  promoDomingo() {
    console.log("Entra modal")
    this.abrirVentanaDetalle(this.combos[5].NOMBRE, this.combos[5].COSTO, this.combos[5]);
  }

  crear(nombre, costo, combo) {
    this.abrirVentanaDetalle(nombre, costo, combo);
  }


  abrirVentanaDetalle(promo, costo, combo){
    let comboTemp = {"ID":combo.ID ,"NOMBRE" :combo.NOMBRE , "DESCRIPCION":combo.DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(combo.COSTO), "IMAGEN_URL": combo.IMAGEN_URL, "PIZZAS": combo.PIZZAS}
    console.log("Hay combo(abajo)------------------------------------------->");
    console.log(this.objetivo);
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      this.navCtrl.push(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        costo : costo,
        promo : promo,
        combo : comboTemp, 
      })
    }else{  
      this.navCtrl.push(DetallePromocionalPage, {
        costo : costo,
        promo : promo,
        combo : comboTemp, 
      })
    }
    
  }
  
  ordenar(combo){
    let comboTemp = {"id":combo.ID ,"nombre" :combo.NOMBRE , "cantidad":1 , "costo":Number(combo.COSTO), "imagenUrl": combo.IMAGEN_URL}
    if(this.objetivo == "nuevo-combo"){//acaaaaa !=
      
      this.events.publish('nuevo-combo', comboTemp  );
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot(CombinacionesPage ,{combo: comboTemp})
    }
  }

  abrirModalLunes(event: Event){
    event.preventDefault;
    console.log("Entra modal")
    //console.log("vista pre-Detail",this.navCtrl.getViews());
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[0].COSTO,
        promo : this.combos[0].NOMBRE,
        id: this.combos[0].ID,
        //combo : this.combos[0],
        comboPrevio : {"ID":this.combos[0].ID ,"NOMBRE": this.combos[0].NOMBRE , "DESCRIPCION":this.combos[0].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[0].COSTO), "IMAGEN_URL": this.combos[0].IMAGEN_URL, "PIZZAS": [] } 
      })
      modal.present();
      
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[0].COSTO,
        promo : this.combos[0].NOMBRE,
        id: this.combos[0].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[0].ID ,"NOMBRE": this.combos[0].NOMBRE , "DESCRIPCION":this.combos[0].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[0].COSTO), "IMAGEN_URL": this.combos[0].IMAGEN_URL, "PIZZAS": [] }
      });
      modal.present();
      //modal.dismiss();
    }
    //console.log("vista post-Detail",this.navCtrl.getViews());
  }
  abrirModalMartes(event: Event){
    event.preventDefault;
    console.log("Entra modal")
    //console.log("vista pre-Detail",this.navCtrl.getViews());
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[1].COSTO,
        promo : this.combos[1].NOMBRE,
        id: this.combos[1].ID,
        //combo : this.combos[0],
        comboPrevio : {"ID":this.combos[1].ID ,"NOMBRE": this.combos[1].NOMBRE , "DESCRIPCION":this.combos[1].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[1].COSTO), "IMAGEN_URL": this.combos[1].IMAGEN_URL, "PIZZAS": [] }
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[1].COSTO,
        promo : this.combos[1].NOMBRE,
        id: this.combos[1].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[1].ID ,"NOMBRE": this.combos[1].NOMBRE , "DESCRIPCION":this.combos[1].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[1].COSTO), "IMAGEN_URL": this.combos[1].IMAGEN_URL, "PIZZAS": [] }
      });
      modal.present();
    }
    //console.log("vista post-Detail",this.navCtrl.getViews());
  }

  abrirModalMiercoles(event: Event){
    event.preventDefault;
    console.log("Combo actual------------------------------------------>")
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[2].COSTO,
        promo : this.combos[2].NOMBRE,
        id: this.combos[2].ID,
        comboPrevio : {"ID":this.combos[2].ID ,"NOMBRE": this.combos[2].NOMBRE , "DESCRIPCION":this.combos[2].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[2].COSTO), "IMAGEN_URL": this.combos[2].IMAGEN_URL, "PIZZAS": [] } 
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[2].COSTO,
        promo : this.combos[2].NOMBRE,
        id: this.combos[2].ID,
        combo : {"ID":this.combos[2].ID ,"NOMBRE": this.combos[2].NOMBRE , "DESCRIPCION":this.combos[2].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[2].COSTO), "IMAGEN_URL": this.combos[2].IMAGEN_URL, "PIZZAS": [] }
  
      });
      modal.present();
    }
  }

  abrirModalJueves(event: Event){
    event.preventDefault;
    console.log("Combo actual------------------------------------------>")
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[3].COSTO,
        promo : this.combos[3].NOMBRE,
        id: this.combos[3].ID,
        comboPrevio : {"ID":this.combos[3].ID ,"NOMBRE": this.combos[3].NOMBRE , "DESCRIPCION":this.combos[3].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[3].COSTO), "IMAGEN_URL": this.combos[3].IMAGEN_URL, "PIZZAS": [] } 
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[3].COSTO,
        promo : this.combos[3].NOMBRE,
        id: this.combos[3].ID,
        combo : {"ID":this.combos[3].ID ,"NOMBRE": this.combos[3].NOMBRE , "DESCRIPCION":this.combos[3].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[3].COSTO), "IMAGEN_URL": this.combos[3].IMAGEN_URL, "PIZZAS": [] }//this.combos[2]
      });
      modal.present();
    }
  }

  abrirModalSabado(event: Event){
    event.preventDefault;
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[4].COSTO,
        promo : this.combos[4].NOMBRE,
        id: this.combos[4].ID,
        comboPrevio : {"ID":this.combos[4].ID ,"NOMBRE": this.combos[4].NOMBRE , "DESCRIPCION":this.combos[4].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[4].COSTO), "IMAGEN_URL": this.combos[4].IMAGEN_URL, "PIZZAS": [] } 
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[4].COSTO,
        promo : this.combos[4].NOMBRE,
        id: this.combos[4].ID,
        combo : {"ID":this.combos[4].ID ,"NOMBRE": this.combos[4].NOMBRE , "DESCRIPCION":this.combos[4].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[4].COSTO), "IMAGEN_URL": this.combos[4].IMAGEN_URL, "PIZZAS": [] }//this.combos[3]
      });
      modal.present();
    }
  }
  
  abrirModalDomingo(event: Event){
    event.preventDefault;
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[5].COSTO,
        promo : this.combos[5].NOMBRE,
        id: this.combos[5].ID,
        comboPrevio : {"ID":this.combos[5].ID ,"NOMBRE": this.combos[5].NOMBRE , "DESCRIPCION":this.combos[5].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[5].COSTO), "IMAGEN_URL": this.combos[5].IMAGEN_URL, "PIZZAS": [] } 
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[5].COSTO,
        promo : this.combos[5].NOMBRE,
        id: this.combos[5].ID,
        combo : {"ID":this.combos[5].ID ,"NOMBRE": this.combos[5].NOMBRE , "DESCRIPCION":this.combos[5].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[5].COSTO), "IMAGEN_URL": this.combos[5].IMAGEN_URL, "PIZZAS": [] }//this.combos[4]
      });
      modal.present();
    }
  }
}
