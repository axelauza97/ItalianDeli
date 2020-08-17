
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, FabContainer, AlertController, App, Platform, LoadingController, ViewController, ModalController } from 'ionic-angular';
import { Adicional } from '../../interfaces/IAdicional';
import { Combinacion } from '../../interfaces/ICombinacion';
import { CrearPizzaPage } from '../crear-pizza/crear-pizza';
import { Pizza } from '../../interfaces/IPizza';
import { AdicionalesPage } from '../adicionales/adicionales';
import { FavoritasPage } from '../favoritas/favoritas';
import { TradicionalesPage } from '../tradicionales/tradicionales';
import { CarritoPage } from '../carrito/carrito';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { PizzaPromo } from '../../interfaces/IPizzaPromo';
import { ComboPage } from '../combo/combo';
import { PizzaUnoPage } from '../pizza-uno/pizza-uno';
import { PizzaDosPage } from '../pizza-dos/pizza-dos';
import { PizzaTresPage } from '../pizza-tres/pizza-tres';
import { PizzaCuatroPage } from '../pizza-cuatro/pizza-cuatro';
import { PromoMarViePage } from '../promo-mar-vie/promo-mar-vie';
import { DetallePromocionalPage } from '../detalle-promocional/detalle-promocional';
import { FormaEntregaPage } from '../forma-entrega/forma-entrega';
import { ComboNuevoPage } from '../combonuevo/combonuevo';
import { tradicionalPopUpPage } from '../tradicionalPopUp/tradicionalPopUp';

@IonicPage()
@Component({
  selector: 'page-combinaciones',
  templateUrl: 'combinaciones.html',
})
export class CombinacionesPage {

  public combinacion : Combinacion
  public tradicionales : Array<Pizza>;
  public tradicionalesPromo : Array<Pizza>;
  public promocionales : Array<PizzaPromo>;
  public combos = []
  opc : string;
  diaPromo: string;
  //page:string;
  tamanoName: string;
  cont=3;
  costoTotal : Number;
  bloquearBoton = false;
  public currentDate: Date;
  public weekdays = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events : Events, 
              public httpRequest: HttpRequestProvider, 
              public alertCtrl : AlertController, 
              public app : App,
              public platform: Platform,
              private viewCtrl : ViewController, 
              public loadingCtrl : LoadingController,
              public modalCtrl: ModalController) {
                this.currentDate= new Date();
                console.log("vista2....",this.navCtrl.getViews());
              /*platform.registerBackButtonAction(() => {
                /*let nav = app.getActiveNav();
                let activeView: ViewController = nav.getActive();

                if(activeView != null){
                  if(nav.canGoBack()) {
                    nav.pop();
                  }else if (typeof activeView.instance.backButtonAction === 'function')
                    activeView.instance.backButtonAction();
                  else nav.parent.select(0); // goes to the first tab se activa siempre... parece ser que esta en root siempre
                }
                //this.navCtrl.pop();
                //const index = this.viewCtrl.index;
                //this.navCtrl.remove(1);//-1//index
                //navCtrl.popTo(PromoMarViePage);//this.navCtrl.getByIndex(1)
                console.log("hey 3era page....",this.navCtrl.getViews());
              })*/
          this.tradicionales  = new Array<Pizza>();
          this.tradicionalesPromo  = new Array<Pizza>();
          this.promocionales  = new Array<PizzaPromo>();
          this.combos = [];
          let page=this.navParams.get("tipo");
          if(page){
            let modal = this.modalCtrl.create(tradicionalPopUpPage, {});
            modal.present();
            //this.mostrarMensajepopup("","La segunda del mismo tamaño de igual o menor valor 50% off. ¿Desea otra pizza?");
          }
          //instanciar combinacion
          let combinacion : Combinacion={
              pizzas : [],
              adicionales :[],
              total : 0
          }
          this.combinacion = combinacion;
          this.tamanoName = this.navParams.get("tamanoName");
          //leyendo parametros recibidos
          let pizza =  navParams.get("pizza");
          //console.log(pizza)
          let promocionales =  navParams.get("promocionales");
          //console.log(promocionales);
          let adicionales =  navParams.get("adicionales");

          let tradicional =  navParams.get("tradicional");
          console.log("Aqui tradicionales----------------------------------------------------->");
          console.log(tradicional);
          let tradicionalPromo =  navParams.get("tradicionalPromo");
          //console.log("combo abajo-------------------------->"+tradicionalPromo);
          let tarea = navParams.get("tarea");
          let combo =  navParams.get("combo");
          console.log(combo)
          let objetivo = navParams.get("opcional");
          this.diaPromo = this.navParams.get("promo");
          
          if( pizza != null ){
             this.combinacion.pizzas.push(pizza);
             console.log(this.combinacion.pizzas);
          }
          if (promocionales != null) {
            promocionales.forEach(promocional => {
              this.promocionales.push(promocional)
              console.log(this.promocionales)
            });
          }

          if( tradicional != null ){ 
              this.tradicionales.push(tradicional);                
         }

         if( tradicionalPromo != null ){ 
           console.log(tradicionalPromo);
          tradicionalPromo.forEach(pizza => {
              this.tradicionalesPromo.push(pizza)
              console.log(this.tradicionalesPromo)
            });              
       }
         if( combo != null ){
            this.combos.push(combo)
            console.log("Entra a combos--------------------------------------------------->");
            console.log(this.combos)
         }

          if( adicionales != null ){
              adicionales.forEach(adicional => {
                this.combinacion.adicionales.push(adicional)
              });
          }
          this.actualizarPrecioTotal();
          window.localStorage.setItem("resumenActivo", "true");

  }
  ionViewWillLeave() {
    console.log("heyyyyy");
    /*this.callback(param).then(()=>{
       this.navController.pop();
   });*/
  }

  ionViewDidLoad() {
    this.tamanoName = this.navParams.get("tamanoName");
    //console.log(this.tamanoName);
    this.escucharEventos(); 
    
    //primero en calcular la mitad--------------------------------------------------------->
    /*if(this.tradicionales.length == 2){
      if(this.tradicionales[0].costo > Number(this.tradicionales[1].costo)){
        this.tradicionales[1].costo = Number(this.tradicionales[1].costo) - Number(Number(this.tradicionales[1].costo) * 0.5)
        console.log(this.tradicionales[1].costo)
      }
    }*/
  }

  ionViewWillEnter(){
    //primero en calcular la mitad--------------------------------------------------------->
    /*if(this.tradicionales.length == 2){
      if(this.tradicionales[0].tamano == 'Silver' && this.tradicionales[1].tamano == 'Silver' && this.tradicionales[0].costo > Number(this.tradicionales[1].costo)
      || this.tradicionales[0].tamano == 'Gold' && this.tradicionales[1].tamano == 'Gold' && this.tradicionales[0].costo > Number(this.tradicionales[1].costo)
      || this.tradicionales[0].tamano == 'Platinum' && this.tradicionales[1].tamano == 'Platinum'  && this.tradicionales[0].costo > Number(this.tradicionales[1].costo)
      || this.tradicionales[0].tamano == 'Gold' && this.tradicionales[1].tamano == 'Silver'
      || this.tradicionales[0].tamano == 'Platinum' && this.tradicionales[1].tamano == 'Silver'
      || this.tradicionales[0].tamano == 'Platinum' && this.tradicionales[1].tamano == 'Gold'){
          this.tradicionales[1].costo = Number(this.tradicionales[1].costo) - Number(Number(this.tradicionales[1].costo) * 0.5)
          console.log(this.tradicionales[1].costo)
      }
    }
    if(this.tradicionales.length != 0){
      this.tradicionales.forEach(tradicional => {
        if(tradicional.cantidad == 2){
          tradicional.costo = Number(Number(tradicional.costo) - (Number(tradicional.costo) * 0.25))
        }
      });
    }*/
    
    this.actualizarPrecioTotal();
  }
  getSamePizza(combo: any){
    var bandera= true;

  }

   /** Este pone el resumen en escucha de nuevos elementos*/
  escucharEventos(){
    console.log("combos----------------------------------------->");
    console.log(this.combos);
    //Escuchar evento de creacion  de pizza
    this.events.subscribe('nueva-pizza', pizza => {
        this.combinacion.pizzas.push(pizza)
        this.actualizarPrecioTotal();
    });
    //Escuchar evento de creacion  de pizza
    this.events.subscribe('nueva-favorita', pizza => {
      if(this.combinacion.pizzas.filter(function(e ,index) { return e.id === pizza.id ; }).length > 0){
        //let index = this.combinacion.pizzas.map(function (x) { return x.id; }).indexOf(pizza.id);
        //this.combinacion.pizzas[index].cantidad += pizza.cantidad;
        let cont=0;
        let bandera=true;
        for(let favpizza of this.combinacion.pizzas){
          if(pizza.id==favpizza.id&&pizza.costo==favpizza.costo)  {
            this.combinacion.pizzas[cont].cantidad += pizza.cantidad;
            bandera=false;
          }/*else{
            //this.tradicionales.push(pizza)
          }*/
          cont++;
        }
        if(bandera){  
          /*if(this.tamanoName){
            pizza.tamano=this.tamanoName;
          }*/
          this.combinacion.pizzas.push(pizza);
        } 
      }else{
        //Si no existe se agrega
        this.combinacion.pizzas.push(pizza);
      } 
      this.actualizarPrecioTotal();
    });
    //Escuchar evento de seleccion de pizza tradicional
    /*this.events.subscribe('nueva-tradicional', pizza => {
      //Si la pizza ya existe solo se aumenta su cantidad
      if(this.tradicionales.filter(function(e ,index) { return e.id === pizza.id ; }).length > 0){
        let index = this.tradicionales.map(function (x) { return x.id; }).indexOf(pizza.id);
        //console.log("indexx-----------------X");
        //console.log(index);
        //if(pizza.costo==this.tradicionales[index].costo)  {
          this.tradicionales[index].cantidad += pizza.cantidad;
        //}else{
          //this.tradicionales.push(pizza)
        //}
      }else{
        //Si no existe se agrega
        this.tradicionales.push(pizza)
      }
      this.actualizarPrecioTotal();
    });*/
    this.events.subscribe('nueva-tradicional', pizza => {
      //Si la pizza ya existe solo se aumenta su cantidad
      if(this.tradicionales.filter(function(e ,index) { return e.id === pizza.id ; }).length > 0){
        let cont=0;
        let bandera=true;
        for(let nuestrapizza of this.tradicionales){
          if(pizza.id==nuestrapizza.id&&pizza.costo==nuestrapizza.costo)  {
            this.tradicionales[cont].cantidad += pizza.cantidad;
            bandera=false;
          }/*else{
            //this.tradicionales.push(pizza)
          }*/
          cont++;
        }
        if(bandera){  
          /*if(this.tamanoName){
            pizza.tamano=this.tamanoName;
          }*/
          this.tradicionales.push(pizza);
        }
        /*let index = this.tradicionales.map(function (x) { return x.id; }).indexOf(pizza.id);
        //console.log("indexx-----------------X");
        //console.log(index);
        //if(pizza.costo==this.tradicionales[index].costo)  {
          this.tradicionales[index].cantidad += pizza.cantidad;
        //}else{
          //this.tradicionales.push(pizza)
        //}*/
      }else{
        //Si no existe se agrega
        this.tradicionales.push(pizza)
      }
      this.actualizarPrecioTotal();
    });

    //Escuchar evento de seleccion de nuevo combo
    this.events.subscribe('nuevo-combo', combo => {
      var i=1;
      var bandera=true;
      //console.log("Al menos lee la señal del nuevo en combo ---------------------------------------------->");
      this.combos.forEach(comboElement => {
        if(bandera){//solo se hace la actualizacion una vez
          //Si el combo ya existe solo se aumenta su cantidad
          console.log("nuevo comboo----------------------------------------------------------_>");
          console.log(combo)
          if(combo["ID"] =='29'){
            if(comboElement["PIZZAS"][0].id==combo["PIZZAS"][0].id && comboElement["PIZZAS"][1].id==combo["PIZZAS"][1].id && comboElement["PIZZAS"][2].id==combo["PIZZAS"][2].id && comboElement["COSTO"]==combo["COSTO"]){//this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0 
                //let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
                this.combos[i-1].CANTIDAD += 1;//combo.cantidad; 
                bandera=false;
            }else{//nunca entrara... puesto que simpre serael mismo combo...
              //Si no existe se agrega
              if(this.combos.length==i){
                combo.CANTIDAD = 1;
                this.combos.push(combo);
              }
            }
          }/*else if(combo["NOMBRE"] =='Combo Lazaña'){
            this.combos[i-1].CANTIDAD += 1;
          }*/else if(combo["ID"] =='34'){
            var j=0;//contador para pizzas
            var cont=0;
            comboElement["PIZZAS"].forEach(currentpizza => {
              if((currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[0].id) ){//this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0 
                //let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
                if(cont==comboElement["PIZZAS"].length-1){
                  this.combos[i-1].CANTIDAD += 1;//combo.cantidad; 
                bandera=false;
                }
                cont++;
              }else{//nunca entrara... puesto que simpre serael mismo combo...
                //Si no existe se agrega
                if(this.combos.length==i && comboElement["PIZZAS"].length-1==j){
                  combo.CANTIDAD = 1;
                  this.combos.push(combo);
                }
              }
              j++;
            });
          }else if(combo["ID"] =='35'){
            var j=0;//contador para pizzas
            var cont=0;
            comboElement["PIZZAS"].forEach(currentpizza => {
              /*if(currentpizza.ingredientes.length==1 ){//this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0 
                //let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
                if((currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[0].id && combo["PIZZAS"][j].ingredientes.length==1) ){
                  if(cont==comboElement["PIZZAS"].length-1){
                    this.combos[i-1].CANTIDAD += 1;//combo.cantidad; 
                  bandera=false;
                  }
                  cont++;
                }
              }else if(currentpizza.ingredientes.length==2){//this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0 
                //let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
                if((currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[0].id || currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[1].id || currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[0].id || currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[1].id ) ){
                  if(cont==comboElement["PIZZAS"].length-1){
                    this.combos[i-1].CANTIDAD += 1;//combo.cantidad; 
                  bandera=false;
                  }
                  cont++;
                }
              }else if(currentpizza.ingredientes.length==3 && combo["PIZZAS"][j].ingredientes.length==3){//this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0 
                //let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
                if((currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[0].id || currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[1].id || currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[2].id) && (currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[0].id || currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[1].id || currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[2].id) && (currentpizza.ingredientes[3].id==combo["PIZZAS"][j].ingredientes[0].id || currentpizza.ingredientes[3].id==combo["PIZZAS"][j].ingredientes[1].id || currentpizza.ingredientes[3].id==combo["PIZZAS"][j].ingredientes[2].id)){
                  if(cont==comboElement["PIZZAS"].length-1){
                    this.combos[i-1].CANTIDAD += 1;//combo.cantidad; 
                  bandera=false;
                  }
                  cont++;
                }
              }else{*///nunca entrara... puesto que simpre serael mismo combo...
                //Si no existe se agrega
                if(this.combos.length==i && comboElement["PIZZAS"].length-1==j){
                  combo.CANTIDAD = 1;
                  this.combos.push(combo);
                }
              //}
              j++;
            });
          }else{
            //console.log("Prueba entra a contar en combo ---------------------------------------------->");
            var j=0;//contador para pizzas
            var cont=0;
            comboElement["PIZZAS"].forEach(currentpizza => {
              if((currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[0].id)&& (currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[1].id)||(currentpizza.ingredientes[0].id==combo["PIZZAS"][j].ingredientes[1].id)&& (currentpizza.ingredientes[1].id==combo["PIZZAS"][j].ingredientes[0].id) && comboElement["COSTO"]==combo["COSTO"] ){//this.combos.filter(function(e ,index) { return e.id === combo.id ; }).length > 0 
                //let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
                if(cont==comboElement["PIZZAS"].length-1){
                  this.combos[i-1].CANTIDAD += 1;//combo.cantidad; 
                bandera=false;
                }
                cont++;
              }else{//nunca entrara... puesto que simpre serael mismo combo...
                //Si no existe se agrega
                if(this.combos.length==i && comboElement["PIZZAS"].length-1==j){
                  combo.CANTIDAD = 1;
                  this.combos.push(combo);
                }
              }
              j++;
            });
          }
        }
      i++;           
      });
      this.actualizarPrecioTotal();
    });
    //Escuchar evento de seleccion de nuevo adicional
    this.events.subscribe('nuevo-adicional', adicionales => {
      adicionales.forEach(adicional => {
        //Si el adicional ya existe solo se aumenta su cantidad
        if(this.combinacion.adicionales.filter(function(e ,index) { return e.id === adicional.id ; }).length > 0){
            let index = this.combinacion.adicionales.map(function (x) { return x.id; }).indexOf(adicional.id);
            this.combinacion.adicionales[index].cantidad += adicional.cantidad; 
        }else{
          //Si no existe se agrega
          this.combinacion.adicionales.push(adicional);
        }         
      });
      this.actualizarPrecioTotal();
    });
    //Escuchar evento para acutalizar una pizza cuando ha sido editada
    this.events.subscribe('editar-pizza', pizza => {
      let index = this.combinacion.pizzas.map(function (x) { return x.id; }).indexOf(pizza.id);
      this.combinacion.pizzas[index] = pizza;
      this.actualizarPrecioTotal();
    }); 
  }

  /** Este metodo elimina todas las suscripciones de eventos */
  ngOnDestroy(){
    this.events.unsubscribe('nueva-pizza');
    this.events.unsubscribe('nueva-tradicional');
    this.events.unsubscribe('nuevo-adicional');
    this.events.unsubscribe('editar-pizza');
    this.events.unsubscribe('nueva-favorita');
    this.events.unsubscribe('nuevo-combo');
    window.localStorage.setItem("resumenActivo", "false");
  }

  /** Este metodo abre la pagina crearPizza, con el objetivo de crear una nueva pizza al resumen */
  anadirPizza(fab: FabContainer){
    fab.close();
    this.navCtrl.push(CrearPizzaPage, {
      objetivo : "nueva-pizza"
    });
  }

   /** Este metodo abre la pagina de favoritas, con el objetivo de anadir una nueva pizza al resumen */
  anadirPizzaFav(fab: FabContainer){
    fab.close();
    this.navCtrl.push(FavoritasPage , {
      objetivo : "nueva-favorita"
    });
  }

   /** Este metodo abre la pagina de tradicionales, con el objetivo de anadir una nueva pizza al resumen */
  anadirPizzaTradicional(fab: FabContainer){
    fab.close();
    this.navCtrl.push(TradicionalesPage , {
      objetivo : "nueva-tradicional"
    });
  }

   /** Este metodo abre la pagina de adicionales, con el objetivo de anadir un nuevo adicional al resumen */
  anadirAdicional(fab: FabContainer){
    fab.close();
    this.navCtrl.push(AdicionalesPage , {
      objetivo : "nuevo-adicional"
    });
  }

  /** Este metodo abre la pagina de combos, con el objetivo de anadir un nuevo combo al resumen */
  anadirCombo(fab: FabContainer){
    fab.close();
    //if(this.weekdays[this.currentDate.getDay()]!="lunes"){
      let comboPrevio = this.navParams.get("combo");
      //console.log("Combo previo------------------------------------------------------------------------->");
      //console.log(comboPrevio);
      if(comboPrevio){
        if(comboPrevio.ID!="34" && comboPrevio.ID!="35" && comboPrevio.ID!="36"){
          //console.log(this.combos);
        this.navCtrl.push(DetallePromocionalPage, {
          objetivo : "nuevo-combo",
          comboPrevio: comboPrevio
        });
        }else{
          //console.log("Hay nuevo combo------------------------------------------->");
          let objetivo ="nuevo-combo";
          this.navCtrl.push(ComboPage, {
            objetivo : objetivo
          });
        }
        
      }else{
        this.AdicionCombosToPreview();
      }
    /*}else{
      this.navCtrl.push(TradicionalesPage , {
        objetivo : "nueva-tradicional"
      });
      //this.mostrarMensaje(Constantes.COMBO_INCORRECTO, Constantes.INTENTA_NOLUNES);
      //no puedes agregar un combo... por lo general se daa en crear pizza page

    }  */
  }
  anadirComboNuevo(fab: FabContainer){
    fab.close();
    //if(this.weekdays[this.currentDate.getDay()]!="lunes"){
      let comboPrevio = this.navParams.get("combo");
      //console.log("Combo previo------------------------------------------------------------------------->");
      //console.log(comboPrevio);
      //console.log(this.combos);
        this.navCtrl.push(ComboNuevoPage, {
          objetivo : "nuevo-combo"
        });
      /*if(comboPrevio){
        
      }else{
        this.AdicionCombosToPreview();
      }*/
    /*}else{
      this.navCtrl.push(TradicionalesPage , {
        objetivo : "nueva-tradicional"
      });
      //this.mostrarMensaje(Constantes.COMBO_INCORRECTO, Constantes.INTENTA_NOLUNES);
      //no puedes agregar un combo... por lo general se daa en crear pizza page

    }  */
  }
  AdicionCombosToPreview() {
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present()
    var token =  window.localStorage.getItem("userToken");
    try{
      //console.log(Constantes.getPromocionalesUrl(token))
      this.httpRequest.get(Constantes.getPromocionalesUrl(token)).then( (res: any) => {
          res = res.json();
          let data = res.COMBOS;
          if(data != null){
            //console.log(Object.keys(data));
            var combo_actual = null;
            let combosprevios = Object.keys(data).map(function(index) {
              let promo = data[index];
              return promo;
            });
            if(this.weekdays[this.currentDate.getDay()]=="martes" || this.weekdays[this.currentDate.getDay()]=="viernes"){
              combo_actual=combosprevios[0];
            }
            if(this.weekdays[this.currentDate.getDay()]=="miercoles"){
              combo_actual=combosprevios[1];
            } 
            else if(this.weekdays[this.currentDate.getDay()]=="jueves") {
              combo_actual=combosprevios[2];
            }
            else if(this.weekdays[this.currentDate.getDay()]=="sabado") {
              combo_actual=combosprevios[3];
            }
            else if(this.weekdays[this.currentDate.getDay()]=="domingo") {
              combo_actual=combosprevios[4];
            }
            this.navCtrl.push(DetallePromocionalPage, {
              objetivo : "nuevo-combo",
              comboPrevio: combo_actual
            });
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

   /** Este metodo disminuye la cantidad del elemento recibido */
  disminuirCantidad(elemento) {
    elemento.cantidad--;
    this.actualizarPrecioTotal();
  }

  /** Este metodo aumenta la cantidad del elemento recibido  */
  aumentarCantidad(elemento) {
    elemento.cantidad++;
    this.actualizarPrecioTotal();
  }

  /** Este metodo suma los costos de los elementos de la combinacion */
  actualizarPrecioTotal(){
    let totalPizzas = 0;
    //let totalPizzasPromo = 0;
    let totalAdicionales = 0 ;
    let totalTradicionales = 0 ;
    //let totalTradicionalesPromo = 0 ;
    let totalCombos = 0 ;
    //Calular total de pizzas creadas
    console.log("combinaciones aquí------------------------------------------------------------>");
    console.log(this.combinacion.pizzas)
    if (this.combinacion.pizzas.length > 0) {
      this.combinacion.pizzas.forEach(pizza => {
        let totalPizza = 0;
        //let costo = this.navParams.get("pizzaFavoritoCosto");
        if(pizza.tamano=="PLATINUM" ||  pizza.tamano=="GOLD" || pizza.tamano=="SILVER"){//viene de favoritos
            totalPizza += Number(pizza.costo);
            if (pizza.borde != null) {
              console.log("Si entra a borde--------------------------------------------------------->");
              //totalPizza += Number(pizza.borde.costo);
            }
        }else{//si es directamente arma tu pizza 
          if (pizza.masa != null) {
            totalPizza += Number(pizza.masa.costo);
          }
          if (pizza.borde != null) {
            console.log("Si entra a borde--------------------------------------------------------->");
            totalPizza += Number(pizza.borde.costo);
          }
          if (pizza.ingredientes.length > 0) {
            pizza.ingredientes.forEach(function (ingrediente) {
              totalPizza += Number(ingrediente.costoBase) * Number(ingrediente.porcion.valor);
            });
          }
        }
        pizza.costo = totalPizza
        totalPizzas += totalPizza * Number(pizza.cantidad);
      });
    } else {
      totalPizzas = 0;
    }
  
    //Calcular total de pizza promo
  /*  if (this.promocionales.length != 0) {
      this.promocionales.forEach((pizzaPromo) => {
        totalPizzasPromo += Number(pizzaPromo.costo) * Number(pizzaPromo.cantidad)
      });
    } else {
      totalPizzasPromo = 0;
    }*/
    //Calcular total de adicionales
    if (this.combinacion.adicionales.length != 0) {
      this.combinacion.adicionales.forEach((adicional: Adicional) => {
          totalAdicionales += Number(adicional.costoBase) * Number(adicional.cantidad);
      });
    } else {
      totalAdicionales = 0;
    }

    //console.log("combos----------------------------------------->");
    //console.log(this.combos);
    //console.log(JSON.stringify(this.tradicionales));
    
     //Calcular total de tradicionales
     if (this.tradicionales.length != 0) {
      let medianas=[];
      let familiares=[];
      let extras=[];

      this.tradicionales.forEach((tradicional: Pizza) => {
        if(tradicional.masa.nombre=="Mediana"){
          medianas.push(tradicional);
        }else if(tradicional.masa.nombre=="Familiar"){
          familiares.push(tradicional);
        }else if(tradicional.masa.nombre=="Extra grande"){
          extras.push(tradicional);
        }
        //totalTradicionales += Number(tradicional.borde.costo);
      });
      console.log("Tradicional------------------------------------------------------------------>");
      console.log(this.tradicionales);
      console.log("medianas------------------------------------------------------------------>");
      console.log(medianas.length);
      console.log("Familiares------------------------------------------------------------------>");
      console.log(familiares.length);
      console.log("Extras------------------------------------------------------------------>");
      console.log(extras.length);
      let bandera=true;
      if(medianas.length>0){
        let costoMenor = (medianas.reduce((min, p) => p.costo < min ? p.costo : min, medianas[0].costo));
        //let PizzaMenorArr=medianas.filter(pizza => pizza.costo == costoMenor);
        medianas.forEach((tradicional: Pizza) => {
        
          if (medianas.length > 1){
            if(tradicional.costo==costoMenor && tradicional.cantidad==1 && bandera){
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }
            else if(tradicional.cantidad>1 && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad);//Number(tradicional.costo) ;
            }
          }else{
            /*if(tradicional.costo==costoMenor && tradicional.cantidad==1 && bandera){//tradicional.cantidad>1 || 
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }else */if(tradicional.cantidad>1 &&  tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad)
            }
          }
          //totalTradicionales += Number(tradicional.borde.costo);
        });
        /*let costoMenor = (medianas.reduce((min, p) => p.costo < min ? p.costo : min, medianas[0].costo));
        let PizzaMenorArr=medianas.filter(pizza => pizza.costo == costoMenor);
        medianas.forEach((tradicional: Pizza) => {
        
          if (medianas.length > 1){
            if(tradicional.costo==costoMenor &&PizzaMenorArr[0].masa==tradicional.masa  && tradicional.cantidad==1 && bandera){
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }
            else if(tradicional.cantidad>1 && PizzaMenorArr[0].masa==tradicional.masa && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad);//Number(tradicional.costo) ;
            }
          }else{
            if(tradicional.costo==costoMenor && PizzaMenorArr[0].masa==tradicional.masa && (medianas.length > 1) && tradicional.cantidad==1 && bandera){//tradicional.cantidad>1 || 
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }else if(tradicional.cantidad>1 && PizzaMenorArr[0].masa==tradicional.masa && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad)
            }
          }
          totalTradicionales += Number(tradicional.borde.costo);
        });*/
        console.log("costo total mediana----------------------------------------------------------->");
          console.log(totalTradicionales);
      }if(familiares.length>0){
        let costoMenor = (familiares.reduce((min, p) => p.costo < min ? p.costo : min, familiares[0].costo));
        //let PizzaMenorArr=familiares.filter(pizza => pizza.costo == costoMenor);
        familiares.forEach((tradicional: Pizza) => {
        
          if (familiares.length > 1){
            if(tradicional.costo==costoMenor && tradicional.cantidad==1 && bandera){
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }
            else if(tradicional.cantidad>1 && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad);//Number(tradicional.costo) ;
            }
          }else{
            /*if(tradicional.costo==costoMenor && PizzaMenorArr[0].masa==tradicional.masa && (familiares.length > 1) && tradicional.cantidad==1 && bandera){//tradicional.cantidad>1 || 
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }else */if(tradicional.cantidad>1 && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad)
            }
          }
          //totalTradicionales += Number(tradicional.borde.costo);
          console.log("costo total familiar----------------------------------------------------------->");
          console.log(totalTradicionales);
        });
      }if(extras.length>0){
        let costoMenor = (extras.reduce((min, p) => p.costo < min ? p.costo : min, extras[0].costo));
        //let PizzaMenorArr=extras.filter(pizza => pizza.costo == costoMenor);
        extras.forEach((tradicional: Pizza) => {
        
          if (extras.length > 1){
            if(tradicional.costo==costoMenor && tradicional.cantidad==1 && bandera){
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }
            else if(tradicional.cantidad>1 && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad);//Number(tradicional.costo) ;
            }
          }else{
            /*if(tradicional.costo==costoMenor && PizzaMenorArr[0].masa==tradicional.masa && (extras.length > 1) && tradicional.cantidad==1 && bandera){//tradicional.cantidad>1 || 
              totalTradicionales += Number(tradicional.costo)*0.5;
              bandera=false;
            }else */if(tradicional.cantidad>1 && tradicional.costo==costoMenor && bandera){
              let descuento = Number(tradicional.costo)*0.5;
              let i=0;
              while(i<tradicional.cantidad){
                totalTradicionales += Number(tradicional.costo);
                i++;
              }
              totalTradicionales -= descuento;//se le hace el descuento
              bandera=false;
            }else{
              totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad)
            }
          }
          //totalTradicionales += Number(tradicional.borde.costo);
          console.log("costo total extra----------------------------------------------------------->");
          console.log(totalTradicionales);
        });
      }
      /*let bandera=true;
      
        let costoMenor = (this.tradicionales.reduce((min, p) => p.costo < min ? p.costo : min, this.tradicionales[0].costo));
        let PizzaMenorArr=this.tradicionales.filter(pizza => pizza.costo == costoMenor);
      console.log("PizzaMenor-------------------------------------------------->");
      console.log(PizzaMenorArr);
      this.tradicionales.forEach((tradicional: Pizza) => {
        
        if (this.tradicionales.length > 1){
          if(tradicional.costo==costoMenor &&PizzaMenorArr[0].masa==tradicional.masa  && tradicional.cantidad==1 && bandera){
            totalTradicionales += Number(tradicional.costo)*0.5;
            bandera=false;
          }
          else if(tradicional.cantidad>1 && PizzaMenorArr[0].masa==tradicional.masa && tradicional.costo==costoMenor && bandera){
            let descuento = Number(tradicional.costo)*0.5;
            let i=0;
            while(i<tradicional.cantidad){
              totalTradicionales += Number(tradicional.costo);
              i++;
            }
            totalTradicionales -= descuento;//se le hace el descuento
            bandera=false;
          }else{
            totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad);//Number(tradicional.costo) ;
          }
        }else{
          if(tradicional.costo==costoMenor && PizzaMenorArr[0].masa==tradicional.masa && (this.tradicionales.length > 1) && tradicional.cantidad==1 && bandera){//tradicional.cantidad>1 || 
            totalTradicionales += Number(tradicional.costo)*0.5;
            bandera=false;
          }else if(tradicional.cantidad>1 && PizzaMenorArr[0].masa==tradicional.masa && tradicional.costo==costoMenor && bandera){
            let descuento = Number(tradicional.costo)*0.5;
            let i=0;
            while(i<tradicional.cantidad){
              totalTradicionales += Number(tradicional.costo);
              i++;
            }
            totalTradicionales -= descuento;//se le hace el descuento
            bandera=false;
          }else{
            totalTradicionales += Number(tradicional.costo) * Number(tradicional.cantidad)
          }
        }
        totalTradicionales += Number(tradicional.borde.costo);
      });*/
    } else {
      totalTradicionales = 0;
    }
  /*
    if (this.tradicionalesPromo.length != 0) {
      this.tradicionalesPromo.forEach((pizza) => {
        totalTradicionalesPromo += Number(pizza.costo) * Number(pizza.cantidad)
      });
    } else {
      totalTradicionalesPromo = 0;
    }*/

     //Calcular total de combos
    if (this.combos.length != 0) {
      this.combos.forEach((combo) => {
        totalCombos += Number(combo.COSTO) * Number(combo.CANTIDAD)
      });
    } else {
      totalCombos = 0;
    }
    //suma de todos los productos
    this.costoTotal = totalPizzas +  totalAdicionales + totalTradicionales + totalCombos;
    console.log("Pasa calcular precio------------------------------------------------------------>")
  }

 /** Este metodo elimina un adicional del resumen @param adicional  */
 eliminarAdicional(adicional){
    let index = this.combinacion.adicionales.map(function (x) { return x.id; }).indexOf(adicional.id);
    this.combinacion.adicionales.splice(index,1 );
    this.actualizarPrecioTotal();
 }

 /** Este metodo elimina una pizza creada del resumen @param pizza */
  eliminarPizza(pizza){
    let index = this.combinacion.pizzas.map(function (x) { return x.id; }).indexOf(pizza.id);
    this.combinacion.pizzas.splice(index,1 );
    this.actualizarPrecioTotal();
  }

  /** Este metodo elimina una pizza tradicional del resumen @param pizza */
  eliminarTradicional(pizza){
    let index = this.tradicionales.map(function (x) { return x.id; }).indexOf(pizza.id);
    this.tradicionales.splice(index,1 );
    this.actualizarPrecioTotal();
  }

  /** Este metodo elimina un combo del resumen @param combo */
  eliminarCombo(combo){
    let index = this.combos.map(function (x) { return x.id; }).indexOf(combo.id);
    this.combos.splice(index,1 );
    this.actualizarPrecioTotal();
  }

  /** Metodo para editar  los valores de una pizza desde el resume @param pizza */
  editarPizza(pizza : Pizza){
    this.navCtrl.push(CrearPizzaPage , {
      objetivo : "editar-pizza",
      pizza : pizza
    });
  }

  aCarrito(){
    this.bloquearBoton = true;
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    let token = window.localStorage.getItem("userToken");
    let combinacion = {"TOKEN": token }
    let pizzas = []
    let adicionales = [];
    let combos = [];
    let promocionales = [];
    this.combinacion.pizzas.forEach(pizza => {
        if(pizza.id != null){
          pizzas.push({"ID" : pizza.id , "CANTIDAD": pizza.cantidad})
        }else{
          let composicion = {"NOMBRE" : "Pizza" , "CANTIDAD": pizza.cantidad,
                            "TAMANO": pizza.tamano.id , "MASA": pizza.masa.id,
                            "BORDE": pizza.borde.id};
          let ingredientes = [];
          pizza.ingredientes.forEach(ingrediente => {
              ingredientes.push({"ID": ingrediente.id , "PORCION": ingrediente.porcion.id})
          });
          composicion["INGREDIENTES"] = ingredientes;
          pizzas.push(composicion);
        }
    });
    this.tradicionales.forEach(pizza=> {
      pizzas.push({"ID" : pizza.id , "CANTIDAD": pizza.cantidad})
    });
    console.log(this.combos)
    this.combos.forEach(combo=> {
      combos.push({"ID" : combo.ID , "CANTIDAD": 1, "TIPO": "COMBO"})
    });
    this.combinacion.adicionales.forEach( adicional => {
        adicionales.push({"ID": adicional.id , "CANTIDAD": adicional.cantidad})
    });
    combinacion["PIZZAS"] = pizzas;
    combinacion["ADICIONALES"] = adicionales;
    combinacion["COMBOS"] = combos;
    console.log(this.combinacion)
    this.httpRequest.post(Constantes.CREAR_COMBINACION, combinacion).then((data : any)=>{
      var response = data.json();
      if(response["STATUS"] == 'OK'){
        loading.dismiss();
        this.navCtrl.setRoot(CarritoPage , {
          combinacion : this.combinacion,
          tradicionales : this.tradicionales,
          pizzas : this.combinacion.pizzas,
          adicionales: this.combinacion.adicionales,
          //promocionales : this.promocionales,
          //tradicionalesPromo: this.tradicionalesPromo,
          combos : this.combos,
          opcional : 'pizzaPromo'
        }); 
      }else{
        loading.dismiss();
        this.bloquearBoton = false;
        this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente");
      }
    }, (err)=>{
      loading.dismiss();
      this.bloquearBoton = false;
      this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente");
    });
  }

  aCarrito2(){
    console.log(this.combinacion)
    //this.navCtrl
    this.app.getRootNav().push(FormaEntregaPage, {
      pizzas: this.combinacion.pizzas,
      //promocionales : this.promocionales,
      tradicionales : this.tradicionales,
      adicionales: this.combinacion.adicionales,
      combos: this.combos,
      total: this.costoTotal
    });
    /*this.app.getRootNav().push(CarritoPage , {
      combinacion : this.combinacion,
      tradicionales : this.tradicionales,
      pizzas : this.combinacion.pizzas,
      adicionales: this.combinacion.adicionales,
      //promocionales : this.promocionales,
      //tradicionalesPromo: this.tradicionalesPromo,
      combos : this.combos,
      opcional : 'pizzaPromo'
    });*/ 
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
   mostrarMensajepopup(titulo: string ,mensaje: string){
    let alert = this.alertCtrl.create({
      //title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.navCtrl.push(TradicionalesPage , {
              objetivo : "nueva-tradicional"
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ]
    });
    alert.present();
   }

   eliminarElemento(elemento,tipo) {
    let alert = this.alertCtrl.create({
      title: 'Borrar elemento',
      message: '¿Estás seguro que deseas borrar este elemento de tu resumen? ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            if(tipo == "PIZZA"){
                this.eliminarPizza(elemento)
            }else if( tipo == "ADICIONAL"){
                this.eliminarAdicional(elemento)
            }else if( tipo == "TRADICIONAL"){
                this.eliminarTradicional(elemento)
            }else if(tipo == "COMBO"){
               this.eliminarCombo(elemento);
            }
          }
        }
      ]
    });
    alert.present();
  }

  editarPizzaPromocional(pizza: Pizza, nombre: string) {
    if (nombre == 'Pizza Uno') {
      this.abrirPizzaUnoPage();
    }
    if (nombre == 'Pizza Dos') {
      this.abrirPizzaDosPage();
    }
    if (nombre == 'Pizza Tres') {
      this.abrirPizzaTresPage();
    }
    if (nombre == 'Pizza Cuatro') {
      this.abrirPizzaCuatroPage();
    }
  }

  abrirPizzaUnoPage() {
    let combo =  this.navParams.get("combo");
    let combos =  this.navParams.get("combos");
    this.navCtrl.push(PizzaUnoPage, {
      objetivo: 'editar-pizza',
      pizzas: this.combinacion.pizzas,
      tradicionales: this.tradicionales,
      promocionales: this.promocionales,
      adicionales: this.combinacion.adicionales,
      combo: combo,
      promo : this.diaPromo,
      combos: combos
    });
  }

  abrirPizzaDosPage() {
    let combo =  this.navParams.get("combo");
    let combos =  this.navParams.get("combos");
    console.log(combo)
    this.navCtrl.push(PizzaDosPage, {
      objetivo: 'editar-pizza',
      pizzas: this.combinacion.pizzas,
      tradicionales: this.tradicionales,
      promocionales: this.promocionales,
      adicionales: this.combinacion.adicionales,
      combo: combo,
      promo : this.diaPromo,
      combos: combos
    });
  }

  abrirPizzaTresPage() {
    let combo =  this.navParams.get("combo");
    let combos =  this.navParams.get("combos");
    this.navCtrl.push(PizzaTresPage, {
      objetivo: 'editar-pizza',
      pizzas: this.combinacion.pizzas,
      tradicionales: this.tradicionales,
      promocionales: this.promocionales,
      adicionales: this.combinacion.adicionales,
      combo: combo,
      promo : this.diaPromo,
      combos: combos
    });
  }

  abrirPizzaCuatroPage() {
    let combo =  this.navParams.get("combo");
    let combos =  this.navParams.get("combos");
    this.navCtrl.push(PizzaCuatroPage, {
      objetivo: 'editar-pizza',
      pizzas: this.combinacion.pizzas,
      tradicionales: this.tradicionales,
      promocionales: this.promocionales,
      adicionales: this.combinacion.adicionales,
      combo: combo,
      promo : this.diaPromo,
      combos: combos
    });
  }

}
