import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController, Platform, Events, ToastController, ViewController, ModalController } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { PizzaUnoPage } from '../pizza-uno/pizza-uno';
import { PromoMarViePage } from '../promo-mar-vie/promo-mar-vie';
import { ComboPage } from '../combo/combo';
import { TradicionalesPage } from '../tradicionales/tradicionales';
import { PizzaComboNuevoPage } from '../pizza-combonuevo/pizza-combonuevo';
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { TimeServiceProvider } from '../../providers/time-service/time-service';
import { PizzaComboEspecialPage } from '../pizza-comboEspecial/pizza-comboEspecial';
import { AvisoPage } from '../aviso/aviso';
import { CrearPizzaPage } from '../crear-pizza/crear-pizza';

@IonicPage()
@Component({
  selector: 'page-detalle-promocional',
  templateUrl: 'detalle-promocional.html',
})
export class DetallePromocionalPage {

  public combos = [];
  public combosprevios = [];
  public combosTemp = [];
  public objetivo : string;
  public currentDate: Date;
  public message1: string = "";
  public message2: string = "";
  public message3: string = "";
  public weekdays = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          public app: App,
          public httpRequest: HttpRequestProvider,
          public loadingCtrl: LoadingController,
          public alertCtrl: AlertController,
          public platform: Platform,
          public events: Events,
          public toastCtrl: ToastController,
          private viewCtrl : ViewController,
          public horaChecker: TimeServiceProvider,
          public horarioProvider: TimeServiceProvider,
              public modalCtrl: ModalController
  ) {
    this.currentDate= new Date();
    this.objetivo = this.navParams.get("objetivo");
    //console.log("Hay combo(abajo)------------------------------------------->");
    //console.log(this.objetivo);
    if(this.objetivo == "nuevo-combo"){
      console.log("Entra en un combo adicional------------------------------------------->");
      this.comboAdiccion();
    }else{
      this.getLocalCombos();
    }
  }

  ionViewDidLoad() {
    
    let arrayTemp = this.horaChecker.checkTime()
    if(arrayTemp[0] !== "OK!"){
      this.message1 = arrayTemp[0]
      this.message2 = arrayTemp[1]
      this.message3 = arrayTemp[2]
    }
    let combo = this.navParams.get("combo");
    //console.log(combo);
      
  }
  getLocalCombosToPreview() {
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present()
    var token =  window.localStorage.getItem("userToken");
    try{
      //console.log(Constantes.getPromocionalesUrl(token))
      let comboEspecial=this.navParams.get("combosEspeciales")
      if(comboEspecial!=null){
        //console.log("Entra a ComboEspecial----------------------------------->")
        this.httpRequest.get(Constantes.getComboEspecialUrl(token)).then((res: any) => {
          res = res.json();
          let data = res.COMBOS;
          if(data != null ){
            //data.forEach(element => {
              this.combos.push({"ID":0,"NOMBRE": data[0].NOMBRE , "DESCRIPCION":data[0].DESCRIPCION,"NUM_PIZZAS":data[0].NUM_PIZZAS, "COSTO":data[0].PRECIO_PIZZAS[0], "IMAGEN_URL": data[0].IMAGEN_SELECCION,"PRECIOS": data[0].PRECIO_PIZZAS,"TAMANOS":data[0].TAMANO_PIZZAS,"INGREDIENTES":data[0].INGREDIENTES_PIZZAS });
            //});
            // this.promociones = res.COMBOS;
            console.log("Combos especiales---------------------------------->") 
            console.log(this.combos);
          }else{
            if(data.STATUS != 'OK'){
              this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
            }
          }
          loading.dismiss();
        }, (error: any) => {
          loading.dismiss();
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        
        });
      }else{
        //console.log("Entra a Combo Normal----------------------------------->")
        this.httpRequest.get(Constantes.getPromocionalesUrl(token)).then( (res: any) => {
          res = res.json();
          let data = res.COMBOS;
          //console.log(data)
          //console.log("comboPrevio---------------------------------------->")
          let combos = (this.navParams.get("combo"));
          this.combosTemp = Object.keys(data).map(function(index) {
            let promo = data[index];
            return promo;
          });
          //this.combosTemp=res.COMBOS;
          //console.log(combos)
          for (var i in Object.keys(data)) {
            //this.combosTemp.push(data[j])
            if (Object.keys(data)[i] == combos.ID) {
              for (var j in data) {
                if (data[j].ID == combos.ID) {
                  data[j].PIZZAS=[]
                  this.combos.push(data[j])
                }
              }
            }
          }
          
          /**if(data != null){
            console.log(data);
            this.combosprevios = Object.keys(data).map(function(index) {
              let promo = data[index];
              return promo;
            });
            console.log(this.combosprevios);
            let comboPrevio= this.navParams.get("comboPrevio");
            console.log(comboPrevio.ID);
            if(comboPrevio.ID == 28 ){
              this.abrirVentanaPromo(this.combosprevios[1].NOMBRE, this.combosprevios[1].COSTO, this.combosprevios[1]);
            }
            else if(comboPrevio.ID == 29 ){
              this.abrirVentanaPromo(this.combosprevios[1].NOMBRE, this.combosprevios[1].COSTO, this.combosprevios[1]);
            }
            else if(comboPrevio.ID ==30 ){
              this.abrirVentanaUno(this.combosprevios[2].NOMBRE, this.combosprevios[2].COSTO, {"ID":this.combosprevios[2].ID ,"NOMBRE": this.combosprevios[2].NOMBRE , "DESCRIPCION":this.combosprevios[2].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[2].COSTO), "IMAGEN_URL": this.combosprevios[2].IMAGEN_URL, "PIZZAS": [] });
            } 
            else if(comboPrevio.ID ==31) {
              this.abrirVentanaUno(this.combosprevios[3].NOMBRE, this.combosprevios[3].COSTO, {"ID":this.combosprevios[3].ID ,"NOMBRE": this.combosprevios[3].NOMBRE , "DESCRIPCION":this.combosprevios[3].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[3].COSTO), "IMAGEN_URL": this.combosprevios[3].IMAGEN_URL, "PIZZAS": [] });
            }
            else if(comboPrevio.ID ==32) {
              this.abrirVentanaUno(this.combosprevios[4].NOMBRE, this.combosprevios[4].COSTO, {"ID":this.combosprevios[4].ID ,"NOMBRE": this.combosprevios[4].NOMBRE , "DESCRIPCION":this.combosprevios[4].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[4].COSTO), "IMAGEN_URL": this.combosprevios[4].IMAGEN_URL, "PIZZAS": [] });
            }
            else if(comboPrevio.ID ==33) {
              this.abrirVentanaUno(this.combosprevios[5].NOMBRE, this.combosprevios[5].COSTO, {"ID":this.combosprevios[5].ID ,"NOMBRE": this.combosprevios[5].NOMBRE , "DESCRIPCION":this.combosprevios[5].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[5].COSTO), "IMAGEN_URL": this.combosprevios[5].IMAGEN_URL, "PIZZAS": [] });
            }
            else if(comboPrevio.ID ==34) {
              this.abrirVentanaCombosNuevos(this.combosprevios[6].NOMBRE, this.combosprevios[6].COSTO, {"ID":this.combosprevios[6].ID ,"NOMBRE": this.combosprevios[6].NOMBRE , "DESCRIPCION":this.combosprevios[6].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[6].COSTO), "IMAGEN_URL": this.combosprevios[6].IMAGEN_URL, "PIZZAS": [] });
            }
            else if(comboPrevio.ID ==35) {
              this.abrirVentanaCombosNuevos(this.combosprevios[7].NOMBRE, this.combosprevios[7].COSTO, {"ID":this.combosprevios[7].ID ,"NOMBRE": this.combosprevios[7].NOMBRE , "DESCRIPCION":this.combosprevios[7].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[7].COSTO), "IMAGEN_URL": this.combosprevios[7].IMAGEN_URL, "PIZZAS": [] });
            }
            else if(comboPrevio.ID ==36) {
              this.abrirVentanaEspecial(this.combosprevios[8].NOMBRE, this.combosprevios[8].COSTO, {"ID":this.combosprevios[8].ID ,"NOMBRE": this.combosprevios[8].NOMBRE , "DESCRIPCION":this.combosprevios[8].DESCRIPCION, "CANTIDAD":1 , "COSTO":Number(this.combosprevios[8].COSTO), "IMAGEN_URL": this.combosprevios[8].IMAGEN_URL, "PIZZAS": [] });
            }
            // this.promociones = res.COMBOS;
            // console.log(this.promociones);
          }else{
            if(data.STATUS != 'OK'){
              this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
            }
          } */
          loading.dismiss();
        }, (error : any)=>{
          console.log("Error")
          loading.dismiss();
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        });
      }
    }catch(err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
    
  }
  getLocalCombos() {
    var token = window.localStorage.getItem("userToken");
    try {
      //console.log(Constantes.getPromocionalesUrl(token))
      let comboEspecial=this.navParams.get("combosEspeciales")
      if(comboEspecial!=null){
        this.httpRequest.get(Constantes.getComboEspecialUrl(token)).then((res: any) => {
          res = res.json();
          let data = res.COMBOS;
          if(data != null ){
            //data.forEach(element => {
              this.combos.push({"ID":0,"NOMBRE": data[0].NOMBRE , "DESCRIPCION":data[0].DESCRIPCION,"NUM_PIZZAS":data[0].NUM_PIZZAS, "COSTO":data[0].PRECIO_PIZZAS[0], "IMAGEN_URL": data[0].IMAGEN_SELECCION,"PRECIOS": data[0].PRECIO_PIZZAS,"TAMANOS":data[0].TAMANO_PIZZAS,"INGREDIENTES":data[0].INGREDIENTES_PIZZAS });
            //});
            // this.promociones = res.COMBOS;
            // console.log(this.promociones);
          }else{
            if(data.STATUS != 'OK'){
              this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
            }
          }
        }, (error: any) => {
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        });
      }else{
        this.httpRequest.get(Constantes.getPromocionalesUrl(token)).then((res: any) => {
          res = res.json();
          let data = res.COMBOS;
          //console.log(data)
          let combos = (this.navParams.get("combo"));
          //console.log(combos.ID)
          for (var i in Object.keys(data)) {
            if (Object.keys(data)[i] == combos.ID) {
              for (var j in data) {
                if (data[j].ID == combos.ID) {
                  //data[j].PIZZAS=[]
                  this.combos.push(data[j])
                }
              }
            }
          }
        }, (error: any) => {
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        });
      }
    } catch (err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
  }
  async comboAdiccion() {
    await this.getLocalCombosToPreview();
  }
  ordenar(event: Event) {
    event.preventDefault;
    let arrayTemp = this.horarioProvider.checkTime()
    if(arrayTemp[0] != "OK!"){
      //this.navCtrl.pop();
      let modal = this.modalCtrl.create(AvisoPage, {
        //pagina : CrearPizzaPage,
        message1 : arrayTemp[0],
        message2 : arrayTemp[1], 
        message3 : arrayTemp[2], 
      })
      modal.present();
    }else
    this.pedido();

    
  }
  pedido(){
    let nombre = this.navParams.get("promo");
    let  costo = this.navParams.get("costo");
    let  combo = this.navParams.get("combo");
    console.log("combosss--------------------------------------------->")
    console.log(combo)
    if(nombre==null && costo ==null){
      nombre= this.combos[0].NOMBRE
      costo= this.combos[0].COSTO
      combo=this.combos[0]
    }
    //console.log("Datos antes de pizza 1")
    //console.log(nombre)
    //console.log(costo)
    //console.log(combo)
    //let combosNav = this.navParams.get("combos"); 
    /**let id=this.navParams.get("combo");
    if(id==null){
      id=combo.ID
    }*/
    if(combo.ID =='28'){
      if(this.weekdays[this.currentDate.getDay()]=="lunes" || this.weekdays[this.currentDate.getDay()]=="viernes"){
        this.abrirVentanaTradicionales(nombre, costo, combo);
        this.viewCtrl.dismiss();
      }else{
        this.viewCtrl.dismiss();
        this.mostrarMensaje2(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA,Constantes.SLOGAN);
        //this.app.getRootNav()
      }
    }
    else if(combo.ID =='29'){
      if(this.weekdays[this.currentDate.getDay()]=="martes" || this.weekdays[this.currentDate.getDay()]=="viernes"){
        this.abrirVentanaPromo(nombre, costo, combo);
        this.viewCtrl.dismiss();
      }else{
        this.viewCtrl.dismiss();
        this.mostrarMensaje2(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA,Constantes.SLOGAN);
        //this.app.getRootNav()
      }
    }
    else if(combo.ID=='30'){
      if(this.weekdays[this.currentDate.getDay()]=="miercoles"){
        this.abrirVentanaUno(nombre, costo, combo);
        this.viewCtrl.dismiss();
      }else{
        this.viewCtrl.dismiss();
        this.mostrarMensaje2(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA,Constantes.SLOGAN);
        //this.app.getRootNav()
      }
    } 
    else if(combo.ID =='31') {
      if(this.weekdays[this.currentDate.getDay()]=="jueves"){
        this.abrirVentanaUno(nombre, costo, combo);
        this.viewCtrl.dismiss();
      }else{
        this.viewCtrl.dismiss();
        this.mostrarMensaje2(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA,Constantes.SLOGAN);
      }
    }
    else if(combo.ID =='32') {
      if(this.weekdays[this.currentDate.getDay()]=="sabado"){
        this.abrirVentanaUno(nombre, costo, combo);
        this.viewCtrl.dismiss();
      }else{
        this.viewCtrl.dismiss();
        this.mostrarMensaje2(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA,Constantes.SLOGAN);
        //this.app.getRootNav()
      }   
    }
    else if(combo.ID =='33') {
      if(this.weekdays[this.currentDate.getDay()]=="domingo"){
        this.abrirVentanaUno(nombre, costo, combo);
        this.viewCtrl.dismiss();
      }else{
        this.viewCtrl.dismiss();
        this.mostrarMensaje2(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA,Constantes.SLOGAN);
        //this.app.getRootNav()
      }
    }else if(combo.ID =='34' || combo.ID =='35'){
      this.abrirVentanaCombosNuevos(nombre,costo,combo);
      this.viewCtrl.dismiss();
    }else if(combo.ID =='36'){
      this.abrirVentanaEspecial(nombre,costo,combo);
      this.viewCtrl.dismiss();
      //console.log("direccionar a combinaciones, detalles: c.	Combo lasaña, rinde 4 porciones: 4 lasañas, 1 cola de 1litro (Solo le das clic y se va a la selección)");
    }else if(this.combos[0].ID==0){
      //console.log("vamos Biennnn------------------------------------>")
      //console.log(this.combos)
      this.abrirVentanaCombosEspeciales(this.combos[0].NOMBRE,this.combos[0].PRECIOS[0],{"ID":0 ,"NOMBRE": this.combos[0].NOMBRE , "DESCRIPCION":this.combos[0].DESCRIPCION, "CANTIDAD":1 ,"COSTO":Number(this.combos[0].PRECIOS[0]),"NUM_PIZZAS":this.combos[0].NUM_PIZZAS, "COSTOS":this.combos[0].PRECIOS,"INGREDIENTES":this.combos[0].INGREDIENTES,"TAMANOS":this.combos[0].TAMANOS, "IMAGEN_URL": this.combos[0].IMAGEN_URL, "PIZZAS": []});
      this.viewCtrl.dismiss();
    }
    /*else if(this.weekdays[this.currentDate.getDay()]==""){
      //presentar... este servicio no esta disponible en este dia...
      this.viewCtrl.dismiss();
      this.mostrarMensaje(Constantes.DIA_INCORRECTO, Constantes.INTENTA_OTRO_DIA);
    }*/
  }
  abrirVentanaUno(promo, costo, combo){
    let combosNav = this.navParams.get("combos");
    if(combosNav==null){
      combosNav=this.combosTemp
    }
    console.log("Entra a combo")
    console.log(combosNav)
    console.log(costo)
    console.log(promo)
    console.log(combo)
    if(this.objetivo == "nuevo-combo"){
      //console.log("NUEVO COMBO2-------------------------------------------------------------->");
      //this.navCtrl.pop();
      this.navCtrl.push(PizzaUnoPage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo,
        objetivo : "nuevo-combo", 
      });
    }else{//si es la primera cosacha.....
/*      console.log("Combo nav------------------------------------------->");
      console.log(combosNav);
      console.log("Promo------------------------------------------->");
      console.log(promo);
      console.log("Combo------------------------------------------->");
      console.log(combo);
      console.log("------------------------------------------------>");*/
      //this.navCtrl.push(HomePage);
      
      this.app.getRootNav().push(PizzaUnoPage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo, 
      });
    }
  }
  abrirVentanaTradicionales(promo, costo, combo){
    let combosNav = this.navParams.get("combos");
    if(this.objetivo == "nuevo-combo"){
      //this.navCtrl.pop();
      this.navCtrl.push(TradicionalesPage, {
        combos : this.combosTemp,
        costo : costo,
        promo : promo,
        combo : combo,
        objetivo : "nuevo-combo", 
      });
    }else{///si es la primera cosacha.....
      //console.log(combosNav);
      //this.navCtrl.push(HomePage);
      this.app.getRootNav().push(TradicionalesPage, {
        combos : this.combosTemp,
        costo : costo,
        promo : promo,
        combo : combo, 
      });
    }
  }

  abrirVentanaPromo(promo, costo, combo){
    let combosNav = this.navParams.get("combos");
    if(combosNav==null){
      combosNav=this.combosTemp
    } 
    //console.log(combosNav);
    if(this.objetivo == "nuevo-combo"){
      //console.log("NUEVO COMBO2-------------------------------------------------------------->");
      //this.navCtrl.pop();
      this.navCtrl.push(PromoMarViePage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo,
        objetivo : "nuevo-combo" 
      });
    }else{
      //this.navCtrl.push(HomePage);//
      //this.navCtrl.push(ComboPage);
      //this.navCtrl.setRoot(HomePage);
      //this.app.getRootNav()----->This thing is not working as you cannot inject navController to a root page -----ref: https://stackoverflow.com/questions/47953108/how-to-show-a-page-from-a-component-in-ionic2
      this.app.getRootNav().push(PromoMarViePage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo, 
      });
      //console.log(this.navCtrl.getViews());
      //console.log("vista post-Promo",this.navCtrl.getViews());
    }
  }

  abrirVentanaCombosNuevos(promo, costo, combo){
    let combosNav = this.navParams.get("combos"); 
    if(combosNav==null){
      combosNav=this.combosTemp
    }
    //console.log("CombosNav -------------------------------------------------------->");
    //console.log(combosNav);
    if(this.objetivo == "nuevo-combo"){
      this.navCtrl.pop();
      this.navCtrl.push(PizzaComboNuevoPage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo,
        objetivo : "nuevo-combo" 
      });
    }else{
      //this.navCtrl.push(HomePage);//
      //this.navCtrl.push(ComboPage);
      //this.navCtrl.setRoot(HomePage);
      //this.app.getRootNav()----->This thing is not working as you cannot inject navController to a root page -----ref: https://stackoverflow.com/questions/47953108/how-to-show-a-page-from-a-component-in-ionic2
      this.app.getRootNav().push(PizzaComboNuevoPage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo, 
      });
      //console.log(this.navCtrl.getViews());
      //console.log("vista post-Promo",this.navCtrl.getViews());
    }
  }
  abrirVentanaCombosEspeciales(promo,costo,combo){
    //  let combosNav = this.navParams.get("combos"); 
    //console.log("eNTRAMOS 1 -------------------------------------------------------->");
    //console.log(combosNav);
    if(this.objetivo == "nuevo-combo"){
      //this.navCtrl.pop();
      this.navCtrl.push(PizzaComboEspecialPage, {
        combos : this.combos,
        costo : costo,
        promo : promo,
        combo : combo, 
        objetivo : "nuevo-combo"
      });
    }else{
      //this.navCtrl.push(HomePage);//
      //this.navCtrl.push(ComboPage);
      //this.navCtrl.setRoot(HomePage);
      //this.app.getRootNav()----->This thing is not working as you cannot inject navController to a root page -----ref: https://stackoverflow.com/questions/47953108/how-to-show-a-page-from-a-component-in-ionic2
      
      //console.log(combo)
      this.app.getRootNav().push(PizzaComboEspecialPage, {
        combos : this.combos,
        costo : costo,
        promo : promo,
        combo : combo, 
      });
      //console.log(this.navCtrl.getViews());
      //console.log("vista post-Promo",this.navCtrl.getViews());
    }
  }
  abrirVentanaEspecial(promo, costo, combo){
    let combosNav = this.navParams.get("combos"); 
    if(combosNav==null){
      combosNav=this.combosTemp
    }
    //console.log("CombosNav -------------------------------------------------------->");
    //console.log(combo);
    if(this.objetivo == "nuevo-combo"){
      this.navCtrl.pop();
      combo.CANTIDAD += 1;
      this.navCtrl.push(CombinacionesPage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo,
        objetivo : "nuevo-combo" 
      });
    }else{
      //this.navCtrl.push(HomePage);//
      //this.navCtrl.push(ComboPage);
      //this.navCtrl.setRoot(HomePage);
      //this.app.getRootNav()----->This thing is not working as you cannot inject navController to a root page -----ref: https://stackoverflow.com/questions/47953108/how-to-show-a-page-from-a-component-in-ionic2
      this.app.getRootNav().push(CombinacionesPage, {
        combos : combosNav,
        costo : costo,
        promo : promo,
        combo : combo, 
      });
      //console.log(this.navCtrl.getViews());
      //console.log("vista post-Promo",this.navCtrl.getViews());
    }
  }


  mostrarMensaje(titulo: string, mensaje: string) {
    let alert = this.alertCtrl.create({
      title: "<div class='DivErr'><span class='SpanErr'>"+titulo+"</span></div>",
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //this.app.getRootNavs()[0].setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
  }
  mostrarMensaje2(titulo: string, mensaje: string,slogan: string) {
    let alert = this.alertCtrl.create({
      title: "<div class='DivErr'><span class='SpanErr'>"+titulo+"</span></div>",
      message: "<br><div><span >"+mensaje+"</span></div><br><div><span class='DivSlogan'>"+slogan+"</span></div>",
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //this.app.getRootNavs()[0].setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }
}
