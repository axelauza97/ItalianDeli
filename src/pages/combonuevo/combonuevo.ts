import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Platform, Events, ModalController, ViewController } from 'ionic-angular';
import { Http} from '@angular/http';
import { DetalleComboPage } from '../detalle-combo/detalle-combo';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { DetallePromocionalPage } from '../detalle-promocional/detalle-promocional';
import { PizzaComboNuevoPage } from '../pizza-combonuevo/pizza-combonuevo';

@IonicPage()
@Component({
  selector: 'page-combonuevo',
  templateUrl: 'combonuevo.html',
})
export class ComboNuevoPage {

  public combos = [];
  public pizzaCombo = [];
  public lista = [];
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
                //prueba ini------------------------------------------------------>
    
    //lista.push({ "id": response["TAMANOS"][0].ID, "nombre": response["TAMANOS"][0].NOMBRE, "nombreBase": response["TAMANOS"][0].NOMBRE_BASE });
    //this.lista.push({ "id": 29 , "nombre": "Nono Pizza", "img_url": "http://navi.pythonanywhere.com/media/103031128_2666100626964594_4331367444488383198_o.jpg", "costo":"7.50", "descripcion": "¡LUNES DE TODITO! Hoy tu pizza favorita desde $7,50 y la Segunda a Mitad de precio además por tu segunda a mitad de precio Gratis JUEGO DE CARTAS UNO. Promo de Locura:da a Mitad de precio JUEGO DE CARTAS DOS"});
    //this.lista.push({ "id": 30 , "nombre": "Little Pack", "img_url": "http://navi.pythonanywhere.com/media/103031128_2666100626964594_4331367444488383198_o.jpg", "costo":"7.50", "descripcion": "¡LUNES DE TODITO! Hoy tu pizza favorita desde $7,50 y la Segunda a Mitad de precio además por tu segunda a mitad de precio Gratis JUEGO DE CARTAS UNO. Promo de Locura:da a Mitad de precio JUEGO DE CARTAS DOS"});
    //prueba fin------------------------------------------------------>
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
    this.abrirVentanaDetalle(this.combos[0].NOMBRE, this.combos[0].COSTO, this.combos[0]);
  }
  promoMartes() {
    this.abrirVentanaDetalle(this.combos[1].NOMBRE, this.combos[1].COSTO, this.combos[1]);
  }
  promoMiercoles() {
    this.abrirVentanaDetalle(this.combos[2].NOMBRE, this.combos[2].COSTO, this.combos[2]);
  }
  promoJueves() {
    this.abrirVentanaDetalle(this.combos[3].NOMBRE, this.combos[3].COSTO, this.combos[3]);
  }
  
  promoSabado() {
    this.abrirVentanaDetalle(this.combos[4].NOMBRE, this.combos[4].COSTO, this.combos[4]);
  }
  promoDomingo() {
    this.abrirVentanaDetalle(this.combos[5].NOMBRE, this.combos[5].COSTO, this.combos[5]);
  }
  promoNono() {
    this.abrirVentanaDetalle(this.combos[6].NOMBRE, this.combos[6].COSTO, this.combos[6]);
  }
  
  promoLittle() {
    this.abrirVentanaDetalle(this.combos[7].NOMBRE, this.combos[7].COSTO, this.combos[7]);
  }
  promoLasa() {
    this.abrirVentanaDetalle(this.combos[8].NOMBRE, this.combos[8].COSTO, this.combos[8]);
  }
  crear(nombre, costo, combo) {
    this.abrirVentanaDetalle(nombre, costo, combo);
  }


  abrirVentanaDetalle(promo, costo, combo){
    let comboTemp = {"ID":combo.ID ,"NOMBRE" :combo.NOMBRE , "DESCRIPCION":combo.DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(combo.COSTO), "IMAGEN_URL": combo.IMAGEN_URL, "PIZZAS": combo.PIZZAS}
    this.navCtrl.push(DetallePromocionalPage, {
      costo : costo,
      promo : promo,
      combo : comboTemp, 
    })
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
  cerrarPage(){
    
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }
  abrirModalNono(event: Event){
    event.preventDefault;
    /*this.app.getRootNav().push(PizzaComboNuevoPage, {
      combos : this.lista,
      costo : "17.50",
      promo : this.lista,
      combo : this.lista[0], 
    });*/
    if(this.objetivo=="nuevo-combo"){
      console.log("NONO COMBO-------------------------------------------------------------->");
      console.log(this.combos[6]);
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[6].COSTO,
        promo : this.combos[6].NOMBRE,
        id: this.combos[6].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[6].ID ,"NOMBRE": this.combos[6].NOMBRE , "DESCRIPCION":this.combos[6].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[6].COSTO), "IMAGEN_URL": this.combos[6].IMAGEN_URL, "PIZZAS": [] }
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[6].COSTO,
        promo : this.combos[6].NOMBRE,
        id: this.combos[6].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[6].ID ,"NOMBRE": this.combos[6].NOMBRE , "DESCRIPCION":this.combos[6].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[6].COSTO), "IMAGEN_URL": this.combos[6].IMAGEN_URL, "PIZZAS": [] }
      });
      modal.present();
    }
    console.log("vista post-Detail",this.navCtrl.getViews());
  }
  abrirModalLittle(event: Event){
    event.preventDefault;
    /*this.app.getRootNav().push(PizzaComboNuevoPage, {
      combos : this.lista,
      costo : "17.50",
      promo : this.lista,
      combo : this.lista[1], 
    });*/
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[7].COSTO,
        promo : this.combos[7].NOMBRE,
        id: this.combos[7].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[7].ID ,"NOMBRE": this.combos[7].NOMBRE , "DESCRIPCION":this.combos[7].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[7].COSTO), "IMAGEN_URL": this.combos[7].IMAGEN_URL, "PIZZAS": [] }
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[7].COSTO,
        promo : this.combos[7].NOMBRE,
        id: this.combos[7].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[7].ID ,"NOMBRE": this.combos[7].NOMBRE , "DESCRIPCION":this.combos[7].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[7].COSTO), "IMAGEN_URL": this.combos[7].IMAGEN_URL, "PIZZAS": [] }
      });
      modal.present();
    }
    console.log("vista post-Detail",this.navCtrl.getViews());
  }
  abrirModalLasa(event: Event){
    event.preventDefault;
    /*this.app.getRootNav().push(PizzaComboNuevoPage, {
      combos : this.lista,
      costo : "17.50",
      promo : this.lista,
      combo : this.lista[1], 
    });*/
    if(this.objetivo=="nuevo-combo"){
      console.log("NUEVO COMBO-------------------------------------------------------------->");
      this.navCtrl.pop();
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        objetivo : "nuevo-combo",
        combos : this.combos,
        costo : this.combos[8].COSTO,
        promo : this.combos[8].NOMBRE,
        id: this.combos[8].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[8].ID ,"NOMBRE": this.combos[8].NOMBRE , "DESCRIPCION":this.combos[8].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[8].COSTO), "IMAGEN_URL": this.combos[8].IMAGEN_URL, "PIZZAS": [] }
      })
      modal.present();
    }else{
      let modal = this.modalCtrl.create(DetallePromocionalPage, {
        combos : this.combos,
        costo : this.combos[8].COSTO,
        promo : this.combos[8].NOMBRE,
        id: this.combos[8].ID,
        //combo : this.combos[0],
        combo : {"ID":this.combos[8].ID ,"NOMBRE": this.combos[8].NOMBRE , "DESCRIPCION":this.combos[8].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[8].COSTO), "IMAGEN_URL": this.combos[8].IMAGEN_URL, "PIZZAS": [] }
      });
      modal.present();
    }
    console.log("vista post-Detail",this.navCtrl.getViews());
  }
  abrirModalLunes(event: Event){
    event.preventDefault;
    console.log("vista pre-Detail",this.navCtrl.getViews());
    let modal = this.modalCtrl.create(DetallePromocionalPage, {
      combos : this.combos,
      costo : this.combos[0].COSTO,
      promo : this.combos[0].NOMBRE,
      //combo : this.combos[0],
      combo : {"ID":this.combos[0].ID ,"NOMBRE": this.combos[0].NOMBRE , "DESCRIPCION":this.combos[0].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[0].COSTO), "IMAGEN_URL": this.combos[0].IMAGEN_URL, "PIZZAS": [] }
    });
    modal.present();
    console.log("vista post-Detail",this.navCtrl.getViews());
  }
  abrirModalMartes(event: Event){
    event.preventDefault;
    console.log("vista pre-Detail",this.navCtrl.getViews());
    let modal = this.modalCtrl.create(DetallePromocionalPage, {
      combos : this.combos,
      costo : this.combos[1].COSTO,
      promo : this.combos[1].NOMBRE,
      //combo : this.combos[0],
      combo : {"ID":this.combos[1].ID ,"NOMBRE": this.combos[1].NOMBRE , "DESCRIPCION":this.combos[1].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[1].COSTO), "IMAGEN_URL": this.combos[1].IMAGEN_URL, "PIZZAS": [] }
    });
    modal.present();
    console.log("vista post-Detail",this.navCtrl.getViews());
  }

  abrirModalMiercoles(event: Event){
    event.preventDefault;
    console.log("Combo actual------------------------------------------>")
    console.log(this.combos[2]);
    let modal = this.modalCtrl.create(DetallePromocionalPage, {
      combos : this.combos,
      costo : this.combos[2].COSTO,
      promo : this.combos[2].NOMBRE,
      combo : {"ID":this.combos[2].ID ,"NOMBRE": this.combos[2].NOMBRE , "DESCRIPCION":this.combos[2].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[2].COSTO), "IMAGEN_URL": this.combos[2].IMAGEN_URL, "PIZZAS": [] }

    });
    modal.present();
  }

  abrirModalJueves(event: Event){
    event.preventDefault;
    let modal = this.modalCtrl.create(DetallePromocionalPage, {
      combos : this.combos,
      costo : this.combos[3].COSTO,
      promo : this.combos[3].NOMBRE,
      combo : {"ID":this.combos[3].ID ,"NOMBRE": this.combos[3].NOMBRE , "DESCRIPCION":this.combos[3].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[3].COSTO), "IMAGEN_URL": this.combos[3].IMAGEN_URL, "PIZZAS": [] }//this.combos[2]
    });
    modal.present();
  }

  abrirModalSabado(event: Event){
    event.preventDefault;
    let modal = this.modalCtrl.create(DetallePromocionalPage, {
      combos : this.combos,
      costo : this.combos[4].COSTO,
      promo : this.combos[4].NOMBRE,
      combo : {"ID":this.combos[4].ID ,"NOMBRE": this.combos[4].NOMBRE , "DESCRIPCION":this.combos[4].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[4].COSTO), "IMAGEN_URL": this.combos[4].IMAGEN_URL, "PIZZAS": [] }//this.combos[3]
    });
    modal.present();
  }
  
  abrirModalDomingo(event: Event){
    event.preventDefault;
    let modal = this.modalCtrl.create(DetallePromocionalPage, {
      combos : this.combos,
      costo : this.combos[5].COSTO,
      promo : this.combos[5].NOMBRE,
      combo : {"ID":this.combos[5].ID ,"NOMBRE": this.combos[5].NOMBRE , "DESCRIPCION":this.combos[5].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combos[5].COSTO), "IMAGEN_URL": this.combos[5].IMAGEN_URL, "PIZZAS": [] }//this.combos[4]
    });
    modal.present();
  }
}
