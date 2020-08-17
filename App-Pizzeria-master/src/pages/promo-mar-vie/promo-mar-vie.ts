import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Events, Platform, ViewController, App } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { PizzaTradicional } from "../../interfaces/IPizzaTradicional";
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { delay } from 'rxjs/operators/delay';
import { ComboPage } from '../combo/combo';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-promo-mar-vie',
  templateUrl: 'promo-mar-vie.html',
})
export class PromoMarViePage {
  public pizzasSilver: Array<PizzaTradicional> = new Array<PizzaTradicional>();
  public pizzasGolden: Array<PizzaTradicional> = new Array<PizzaTradicional>();
  public pizzasPlatinum: Array<PizzaTradicional> = new Array<PizzaTradicional>();
  pizzaSilverLo = [];
  pizzaGoldLo = [];
  pizzaPlatinumLo = [];
  tradicionalesPromo = [];
  tamanoElegido: any;
  costoPizza: number;
  public costoTamaTipo: any;
  loading: any = null;
  bloquearSilver: boolean;
  bloquearGold: boolean;
  bloquearPlatinum: boolean;
  combo = [];
  public tamanos: any;
  public objetivo : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public httpRequest: HttpRequestProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform, 
    public app: App,
    private toastCtrl: ToastController,
    public events: Events,
    private viewCtrl : ViewController,
    public alertCtrl: AlertController) {
      console.log("vista1....",this.navCtrl.getViews());
      this.objetivo = this.navParams.get("objetivo");
      this.cargarTamanos();
      this.cargarCostos();
      //platform.backButton.subscribe(()
      //platform.backButton.subscribe(() => {//0,
        //console.log("Funciono!!!!",navCtrl.getViews());
        //navCtrl.popTo(HomePage);
        //navCtrl.setRoot(ComboPage);

        /*let currentRootPage = viewCtrl.component; 
        if (currentRootPage == PromoMarViePage) {
          console.log("hey brother one time :C");
          //navCtrl.setRoot(ComboPage);
          //navCtrl.setRoot(HomePage);
          navCtrl.popToRoot();
        }*/
        //navCtrl.pop();
        //console.log("Funciono!!!!");
        //navCtrl.pop();
        //this.navCtrl.setRoot(ComboPage);
      //},1);
      /*platform.registerBackButtonAction(() => {
      //this.navCtrl.pop();
      this.navCtrl.setRoot(ComboPage); //this.navCtrl.getByIndex(0)
      //const index = this.viewCtrl.index;
      //this.navCtrl.remove(index);
      console.log("hey 2da page....",this.navCtrl.getViews());
    },2);*/
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    //loading.present();
    this.obtenerPizzasTodo();
    /*this.obtenerPizzasSilver();
    this.obtenerPizzasGolden();
    this.obtenerPizzasPlatinum();*/
    this.costoPizza = this.navParams.get("costo");
    console.log(this.pizzasSilver);
    this.pizzaSilverLo.forEach(pizzaProm => {
      if(pizzaProm.checked == null ||  pizzaProm.checked==false){
        this.removeItemFromArr(pizzaProm);//this.pizzaSilverLo, 
        console.log(this.pizzaGoldLo);
      }
     });
     this.pizzaGoldLo.forEach(pizzaProm => {
      if(pizzaProm.checked == null ||  pizzaProm.checked==false){
        this.removeItemFromArr(pizzaProm);//this.pizzaGoldLo, 
        console.log(this.pizzaGoldLo);
      }
     });
     this.pizzaPlatinumLo.forEach(pizzaProm => {
      if(pizzaProm.checked == null ||  pizzaProm.checked==false){
        this.removeItemFromArr(pizzaProm);//this.pizzaPlatinumLo, 
        console.log(this.pizzaGoldLo);
      }
     });
     this.combo = this.navParams.get("combo");
     console.log(this.combo);
     //loading.dismiss();
  }
  backButtonAction(){
    console.log("aqui ess.... https://stackoverflow.com/questions/41373774/how-to-handle-back-button-on-ionic-2")
    /* checks if modal is open */
    /*if(this.modal && this.modal.index === 0) {
        
        this.modal.dismiss();
    } else {
        this.platform.exitApp();
        // this.navCtrl.setRoot(AnotherPage);  <-- if you wanted to go to another page
    }*/
}
cargarTamanos() {
  try {
    let token = window.localStorage.getItem("userToken");
    this.httpRequest.get(Constantes.getTamanosUrl(token)).then((data: any) => {
      var response = data.json();
      let lista = [];
      if (response["TAMANOS"] != undefined) {
        /* lista.push(response["TAMANOS"][0]);
         lista.push(response["TAMANOS"][1]);
         lista.push(response["TAMANOS"][2]);
         console.log (lista)*/
        if (response["TAMANOS"][0].NOMBRE == 'Mediana') {
          lista.push({ "id": response["TAMANOS"][0].ID, "nombre": response["TAMANOS"][0].NOMBRE, "nombreBase": response["TAMANOS"][0].NOMBRE_BASE });
        }
        if (response["TAMANOS"][1].NOMBRE == 'Familiar') {
          lista.push({ "id": response["TAMANOS"][1].ID, "nombre": response["TAMANOS"][1].NOMBRE, "nombreBase": response["TAMANOS"][1].NOMBRE_BASE });
        }
        if (response["TAMANOS"][2].NOMBRE == 'Extra grande') {
          lista.push({ "id": response["TAMANOS"][2].ID, "nombre": response["TAMANOS"][2].NOMBRE, "nombreBase": response["TAMANOS"][2].NOMBRE_BASE });
        }
        this.tamanos = lista;
        this.tamanoElegido = this.tamanos[0];
      } else {
        if (response["STATUS"] != 'OK') {
          this.cerrarPagina();
        }
      }
    }, (err) => {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    });
  }
  catch (err) {
    console.log('Error: ', err.message);
  }
}
  async obtenerPizzasTodo() {
    /*let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });*/
    this.loading.present();
    if (window.localStorage.getItem("userToken") != null) {
      console.log(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken")));
      await this.httpRequest.get(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken"))).then((data: any) => {
        var response = data.json();
        console.log(response);
        if (response.STATUS == "OK") {
          response.PIZZAS.forEach(pizzaProm => {
            if (pizzaProm.TAMANO == 'Silver') {
              let pizzaSilver: PizzaTradicional = {
                id: pizzaProm.ID,
                nombre: pizzaProm.NOMBRE,
                descripcion: pizzaProm.DESCRIPCION,
                imgUrl: pizzaProm.IMAGEN_URL,
                favorita: pizzaProm.FAVORITA,
                masa: null,
                borde: null,
                ingredientes: null,
                tamano: pizzaProm.TAMANO,
                cantidad: 1,
                costo: pizzaProm.COSTO,
                checked: null,
                seleccion: null
              }
              this.pizzasSilver.push(pizzaSilver);
            }else if (pizzaProm.TAMANO == 'Gold') {

              //var child = response.PIZZAS[key];
              let pizzasGolden: PizzaTradicional = {
                id: pizzaProm.ID,
                nombre: pizzaProm.NOMBRE,
                descripcion: pizzaProm.DESCRIPCION,
                imgUrl: pizzaProm.IMAGEN_URL,
                favorita: pizzaProm.FAVORITA,
                masa: null,
                borde: null,
                ingredientes: null,
                tamano: pizzaProm.TAMANO,
                cantidad: 1,
                costo: pizzaProm.COSTO,
                checked: null,
                seleccion: null
              }
              this.pizzasGolden.push(pizzasGolden);
            }else if (pizzaProm.TAMANO == 'Platinum') {

              //var child = response.PIZZAS[key];
              let pizzasPlatinum: PizzaTradicional = {
                id: pizzaProm.ID,
                nombre: pizzaProm.NOMBRE,
                descripcion: pizzaProm.DESCRIPCION,
                imgUrl: pizzaProm.IMAGEN_URL,
                favorita: pizzaProm.FAVORITA,
                masa: null,
                borde: null,
                ingredientes: null,
                tamano: pizzaProm.TAMANO,
                cantidad: 1,
                costo: pizzaProm.COSTO,
                checked: null,
                seleccion: null
              }
              this.pizzasPlatinum.push(pizzasPlatinum);
            }
          }); 
        }
        this.loading.dismiss();
      }, (error: any) => {
        console.log("Error");
        this.loading.dismiss();
      });
    }
  }
  async obtenerPizzasSilver() {
    /*let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });*/
    this.loading.present();
    if (window.localStorage.getItem("userToken") != null) {
      console.log(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken")));
      await this.httpRequest.get(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken"))).then((data: any) => {
        var response = data.json();
        console.log(response);
        if (response.STATUS == "OK") {
          response.PIZZAS.forEach(pizzaProm => {
            if (pizzaProm.TAMANO == 'Silver') {
              let pizzaSilver: PizzaTradicional = {
                id: pizzaProm.ID,
                nombre: pizzaProm.NOMBRE,
                descripcion: pizzaProm.DESCRIPCION,
                imgUrl: pizzaProm.IMAGEN_URL,
                favorita: pizzaProm.FAVORITA,
                masa: null,
                borde: null,
                ingredientes: null,
                tamano: pizzaProm.TAMANO,
                cantidad: 1,
                costo: pizzaProm.COSTO,
                checked: null,
                seleccion: null
              }
              this.pizzasSilver.push(pizzaSilver);
            }
          });
        }
        //this.loading.dismiss();
      }, (error: any) => {
        console.log("Error");
        this.loading.dismiss();
      });
    }
  }

  async obtenerPizzasGolden() {
    /*let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();*/
    if (window.localStorage.getItem("userToken") != null) {
      console.log(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken")));
      await this.httpRequest.get(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken"))).then((data: any) => {
        var response = data.json();
        console.log(response);
        if (response.STATUS == "OK") {
          response.PIZZAS.forEach(pizzaProm => {
            if (pizzaProm.TAMANO == 'Gold') {

              //var child = response.PIZZAS[key];
              let pizzasGolden: PizzaTradicional = {
                id: pizzaProm.ID,
                nombre: pizzaProm.NOMBRE,
                descripcion: pizzaProm.DESCRIPCION,
                imgUrl: pizzaProm.IMAGEN_URL,
                favorita: pizzaProm.FAVORITA,
                masa: null,
                borde: null,
                ingredientes: null,
                tamano: pizzaProm.TAMANO,
                cantidad: 1,
                costo: pizzaProm.COSTO,
                checked: null,
                seleccion: null
              }
              this.pizzasGolden.push(pizzasGolden);
            }
          });
        }
        //loading.dismiss();
      }, (error: any) => {
        console.log("Error");
        this.loading.dismiss();
      });
    }
  }

  async obtenerPizzasPlatinum() {
    
    if (window.localStorage.getItem("userToken") != null) {
      console.log(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken")));
      await this.httpRequest.get(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken"))).then((data: any) => {
        var response = data.json();
        console.log(response);
        if (response.STATUS == "OK") {
          response.PIZZAS.forEach(pizzaProm => {
            if (pizzaProm.TAMANO == 'Platinum') {

              //var child = response.PIZZAS[key];
              let pizzasPlatinum: PizzaTradicional = {
                id: pizzaProm.ID,
                nombre: pizzaProm.NOMBRE,
                descripcion: pizzaProm.DESCRIPCION,
                imgUrl: pizzaProm.IMAGEN_URL,
                favorita: pizzaProm.FAVORITA,
                masa: null,
                borde: null,
                ingredientes: null,
                tamano: pizzaProm.TAMANO,
                cantidad: 1,
                costo: pizzaProm.COSTO,
                checked: null,
                seleccion: null
              }
              this.pizzasPlatinum.push(pizzasPlatinum);
            }
          });
        }
        this.loading.dismiss();
      }, (error: any) => {
        console.log("Error");
        this.loading.dismiss();
      });
    }
  }
  handlerCheckboxUno(pizza: PizzaTradicional,event: Event) {
    console.log("Se ha tocado la pizza",pizza.nombre);
    event.cancelBubble;
    
    this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: true}));
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: false}));
    let nombre = pizza.nombre;

    if (pizza.checked == true) {
      pizza.costo = this.costoPizza / 3;
      this.pizzaSilverLo.push(pizza);
    } 
    
    if(pizza.checked == false){
      /*this.pizzasSilver.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });
       this.pizzasGolden.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });
       this.pizzasPlatinum.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });

       this.pizzaSilverLo.forEach(pizzaProm => {
        if(pizzaProm.nombre==nombre){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
          pizzaProm.cantidad = 1;        
        }
        if(pizzaProm.checked == null  ||  pizzaProm.checked==false){
          this.removeItemFromArr(pizzaProm);//this.pizzaSilverLo, 
        }
       });*/
       var cont = 3
       while(cont!=0){
        if(this.pizzaSilverLo.find(this.findIndexToUpdate, pizza.id)!=null){
          let updateItem = this.pizzaSilverLo.find(this.findIndexToUpdate, pizza.id);
          let index = this.pizzaSilverLo.indexOf(updateItem);
          this.pizzaSilverLo.splice(index, 1);
        }else{
          cont=0;
        }
       }
       /*this.pizzaSilverLo.forEach(pizzaProm => {
        console.log(this.pizzasSilver);
        //var arraycpy=this.pizzaSilverLo.reverse();
        if(pizzaProm.nombre==nombre){  
          //this.removeItemFromArr(pizzaProm);
          let updateItem = this.pizzaSilverLo.find(this.findIndexToUpdate, pizza.id);
          let index = this.pizzaSilverLo.indexOf(updateItem);
          this.pizzaSilverLo.splice(index, 1);      
        }
        //if(pizzaProm.checked == null  ||  pizzaProm.checked==false){
          //this.removeItemFromArr(pizzaProm);//this.pizzaSilverLo, 
        //}
       });*/
      let updateItem = this.pizzasSilver.find(this.findIndexToUpdate, pizza.id);
      let index = this.pizzasSilver.indexOf(updateItem);
      this.pizzasSilver[index].cantidad=1;
       console.log(this.pizzasSilver);
    }

    /*this.pizzaSilverLo.forEach(pizzaProm => {
      if(pizzaProm.checked == null ||  pizzaProm.checked==false){
        this.removeItemFromArr(pizzaProm);//this.pizzaSilverLo, 
      }
     }); */
     if(this.pizzaSilverLo.length ==0){
       this.pizzaSilverLo = [];
     }
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    console.log(this.pizzaSilverLo);
    //await delay(1000);
    //setTimeout(() =>{}, 2000);
    loading.dismiss();
  }
  cargarCostos() {
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCostosComboUrl(token)).then((data: any) => {
        var response = data.json();
        let lista = [];
        if (response["PAQUETE"] != undefined) {
          lista.push({ "COMBO": response["PAQUETE"][0].COMBO, "TAMANO": response["PAQUETE"][0].TAMANO, "COSTO": response["PAQUETE"][0].COSTO });
          lista.push({ "COMBO": response["PAQUETE"][1].COMBO, "TAMANO": response["PAQUETE"][1].TAMANO, "COSTO": response["PAQUETE"][1].COSTO });
          lista.push({ "COMBO": response["PAQUETE"][2].COMBO, "TAMANO": response["PAQUETE"][2].TAMANO, "COSTO": response["PAQUETE"][2].COSTO });
           this.costoTamaTipo = lista;
           //console.log (lista)*/
           //lista.push({ "id": response["TAMANOS"][0].ID, "nombre": response["TAMANOS"][0].NOMBRE, "nombreBase": response["TAMANOS"][0].NOMBRE_BASE });
          /*if (response["TAMANOS"][0].NOMBRE == 'Mediana') {
            lista.push({ "id": response["TAMANOS"][0].ID, "nombre": response["TAMANOS"][0].NOMBRE, "nombreBase": response["TAMANOS"][0].NOMBRE_BASE });
          }
          if (response["TAMANOS"][1].NOMBRE == 'Familiar') {
            lista.push({ "id": response["TAMANOS"][1].ID, "nombre": response["TAMANOS"][1].NOMBRE, "nombreBase": response["TAMANOS"][1].NOMBRE_BASE });
          }
          if (response["TAMANOS"][2].NOMBRE == 'Extra grande') {
            lista.push({ "id": response["TAMANOS"][2].ID, "nombre": response["TAMANOS"][2].NOMBRE, "nombreBase": response["TAMANOS"][2].NOMBRE_BASE });
          }*/
          
        } else {
          if (response["STATUS"] != 'OK') {
            this.cerrarPagina();
          }
        }
      }, (err) => {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }
    catch (err) {
      console.log('Error: ', err.message);
    }
  }

  handlerCheckboxDos(pizza: PizzaTradicional,event: Event) {
    console.log("Se ha tocado la pizza",pizza.nombre);
    event.cancelBubble;
    
    this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: true}));
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: false}));
    let nombre = pizza.nombre;
    if (pizza.checked == true) {
      pizza.costo = this.costoPizza / 3;
      this.pizzaGoldLo.push(pizza);
    }
    
    if(pizza.checked == false){
      /*this.pizzasSilver.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });
       this.pizzasGolden.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });
       this.pizzasPlatinum.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });

       this.pizzaGoldLo.forEach(pizzaProm => {
        if(pizzaProm.nombre==nombre){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
          pizzaProm.cantidad = 1;     
        }
        if(pizzaProm.checked == null ||  pizzaProm.checked==false){
          this.removeItemFromArr(pizzaProm);//this.pizzaGoldLo, 
        }
       });*/
       var cont = 3
       while(cont!=0){
        if(this.pizzaGoldLo.find(this.findIndexToUpdate, pizza.id)!=null){
          let updateItem = this.pizzaGoldLo.find(this.findIndexToUpdate, pizza.id);
          let index = this.pizzaGoldLo.indexOf(updateItem);
          this.pizzaGoldLo.splice(index, 1);
        }else{
          cont=0;
        }
       }
       let updateItem = this.pizzasGolden.find(this.findIndexToUpdate, pizza.id);
      let index = this.pizzasGolden.indexOf(updateItem);
      this.pizzasGolden[index].cantidad=1;
       console.log(this.pizzasGolden);
    }

    /*this.pizzaGoldLo.forEach(pizzaProm => {
      if(pizzaProm.checked == null ||  pizzaProm.checked==false){
        this.removeItemFromArr(pizzaProm);//this.pizzaGoldLo, 
      }
     });*/
     if(this.pizzaGoldLo.length ==0){
      this.pizzaGoldLo = [];
    }
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    console.log(this.pizzaGoldLo);
    //await delay(1000);
    //setTimeout(() =>{}, 2000);
    loading.dismiss();
  }

  handlerCheckboxTres(pizza: PizzaTradicional,event: Event) {
    console.log("Se ha tocado la pizza",pizza.nombre);
    event.cancelBubble;
    
    this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: true}));
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: false}));
    let nombre = pizza.nombre;
    if (pizza.checked == true) {
      pizza.costo = this.costoPizza / 3;
      this.pizzaPlatinumLo.push(pizza);
    }

    if(pizza.checked == false){
      /*this.pizzasSilver.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });
       this.pizzasGolden.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });
       this.pizzasPlatinum.forEach(pizzaProm => {
        if(pizzaProm.checked==false || pizzaProm.checked==null){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
        }
       });

       this.pizzaPlatinumLo.forEach(pizzaProm => {
        if(pizzaProm.nombre==nombre){  
          pizzaProm.checked = null;
          pizzaProm.seleccion = null;
          pizzaProm.cantidad = 1;        
        }
        if(pizzaProm.checked == null ||  pizzaProm.checked==false){
          this.removeItemFromArr(pizzaProm);//this.pizzaPlatinumLo, 
        }
       });*/
       var cont = 3
       while(cont!=0){
        if(this.pizzaPlatinumLo.find(this.findIndexToUpdate, pizza.id)!=null){
          let updateItem = this.pizzaPlatinumLo.find(this.findIndexToUpdate, pizza.id);
          let index = this.pizzaPlatinumLo.indexOf(updateItem);
          this.pizzaPlatinumLo.splice(index, 1);
        }else{
          cont=0;
        }
       }
       let updateItem = this.pizzasPlatinum.find(this.findIndexToUpdate, pizza.id);
      let index = this.pizzasPlatinum.indexOf(updateItem);
      this.pizzasPlatinum[index].cantidad=1;
       console.log(this.pizzasPlatinum); 
    }

    /*this.pizzaPlatinumLo.forEach(pizzaProm => {
      if(pizzaProm.checked == null ||  pizzaProm.checked==false){
        this.removeItemFromArr(pizzaProm);//this.pizzaPlatinumLo, 
      }
     });*/
     if(this.pizzaPlatinumLo.length ==0){
      this.pizzaPlatinumLo = [];
    }
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    console.log(this.pizzaPlatinumLo)
    //await delay(1000);
    //setTimeout(() =>{}, 2000);
    loading.dismiss();
  }

  disminuirCantidadSilver(pizza){
    pizza.cantidad--;
    this.removeItemFromArr(pizza);//this.pizzaSilverLo, 
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
    
    //this.handlerCheckbox(pizza);
  }

  disminuirCantidadGold(pizza){
    pizza.cantidad--;
    this.removeItemFromArr(pizza);//this.pizzaGoldLo, 
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
  }

  disminuirCantidadPlatinum(pizza){
    pizza.cantidad--;
    this.removeItemFromArr(pizza);//this.pizzaPlatinumLo, 
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
  }
  
  aumentarCantidadSilver(pizza) {
    pizza.cantidad++;
    this.pizzaSilverLo.push(pizza);
    console.log(this.pizzaSilverLo)
    //this.handlerCheckbox(bebida);
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
  }

  aumentarCantidadGold(pizza) {
    pizza.cantidad++;
    this.pizzaGoldLo.push(pizza);
    console.log(this.pizzaGoldLo)
    //this.handlerCheckbox(bebida);
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
  }

  aumentarCantidadPlatinum(pizza) {
    pizza.cantidad++;
    this.pizzaPlatinumLo.push(pizza);
    this.bloquearSeleccionTodo(this.pizzaSilverLo,this.pizzaGoldLo,this.pizzaPlatinumLo);
    this.bloquearAdicionSilver();
    this.bloquearAdicionGold();
    this.bloquearAdicionPlatinum();
    //this.bloquearSeleccionSilver(this.pizzasSilver);
    //this.bloquearSeleccionGold(this.pizzasGolden);
    //this.bloquearSeleccionPlatinum(this.pizzasPlatinum);
  }

  removeItemFromArra(arr, item) {//quitar orr.
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  removeItemFromArr(pizza){
    if(this.pizzaSilverLo.find(this.findIndexToUpdate, pizza.id)!=null){
      let updateItem = this.pizzaSilverLo.find(this.findIndexToUpdate, pizza.id);
      let index = this.pizzaSilverLo.indexOf(updateItem);
      this.pizzaSilverLo.splice(index, 1);//[index].seleccion = false;
    }else if(this.pizzaGoldLo.find(this.findIndexToUpdate, pizza.id)!=null){
      let updateItem = this.pizzaGoldLo.find(this.findIndexToUpdate, pizza.id);
      let index = this.pizzaGoldLo.indexOf(updateItem);
      this.pizzaGoldLo.splice(index, 1);//[index].seleccion = false;
    }else if(this.pizzaPlatinumLo.find(this.findIndexToUpdate, pizza.id)!=null){
      let updateItem = this.pizzaPlatinumLo.find(this.findIndexToUpdate, pizza.id);
      let index = this.pizzaPlatinumLo.indexOf(updateItem);
      this.pizzaPlatinumLo.splice(index, 1);//[index].seleccion = false;
    }else{
      console.log("No se encontro la pizza o quizas no esta presente aca... o no se apunto en la lista...");
    }
  }

  close(){
    this.navCtrl.popTo(HomePage);
  }
  siguiente() {
    if(  this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length ==0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length ==1
      || this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length ==0
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length ==0
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length ==1){

        this.combo = this.navParams.get("combo");
        this.combo['PIZZAS']=[];
      if (this.pizzaSilverLo != null) {
        this.pizzaSilverLo.forEach(pizza => {
          this.tradicionalesPromo.push(pizza)
          pizza.masa=this.tamanoElegido.nombreBase; 
          this.combo['PIZZAS'].push(pizza);  
        });
      }
      if (this.pizzaGoldLo != null) {
        this.pizzaGoldLo.forEach(pizza => {
          this.tradicionalesPromo.push(pizza)
          pizza.masa=this.tamanoElegido.nombreBase;
          this.combo['PIZZAS'].push(pizza); 
        });
      }
  
      if (this.pizzaPlatinumLo != null) {
        this.pizzaPlatinumLo.forEach(pizza => {
          this.tradicionalesPromo.push(pizza)
          pizza.masa=this.tamanoElegido.nombreBase;
          this.combo['PIZZAS'].push(pizza); 
        });
      }
      //console.log(this.tradicionalesPromo);
      //console.log(this.combo); push
      if(this.objetivo == "nuevo-combo"){
        this.events.publish('nuevo-combo', this.combo);
        console.log("volviendo a combinaciones pop")
        console.log(this.combo)
        this.navCtrl.pop();
      }else{//si es la primera cosacha.....
        console.log("Hola tamaño------------------------------------->")
        console.log(this.tamanoElegido)
        this.app.getRootNav().push(CombinacionesPage, {
          tradicionalPromo: this.tradicionalesPromo,
          combo: this.combo,
          tamanoName: this.tamanoElegido.nombre
        });
      }
      this.tradicionalesPromo=[];
      console.log("Vistasss......",this.navCtrl.getViews());
    } else {
      this.mostrarMensaje("Orden incompleta", "Elija entre las combinaciones permitidas de la promoción");
    }
  }

  presentAlert(title: string, mensaje: string, par: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            par;
          }
        }
      ]
    });
    alert.present();
  }

  bloquearAdicionSilver(){
    if(this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1){
        this.bloquearSilver = false;
    } else{
        this.bloquearSilver = true;
    }
  }

  bloquearAdicionGold(){
    if(this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1){
        this.bloquearGold = false;
    } else{
        this.bloquearGold = true;
    }
  }

  bloquearAdicionPlatinum(){
    if(this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 0
      || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1
      || this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1){
        this.bloquearPlatinum = false;
    } else{
        this.bloquearPlatinum = true;
    }
  }
  bloquearSeleccionTodo(pizza1,pizza2,pizza3){
    if (this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 
      || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
    ) {
      this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: true}));//true para bloquear todo
      pizza1.forEach(pizzaProm => {
        let updateItem = this.pizzasSilver.find(this.findIndexToUpdate, pizzaProm.id);
        let index = this.pizzasSilver.indexOf(updateItem);
        this.pizzasSilver[index].seleccion = false;
      });
    }else{
      this.pizzasSilver=this.pizzasSilver.map(x => ({...x, seleccion: false}));//true para bloquear todo
    }
    if (this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 
      || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 
      || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 
      || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0
    ) {
     this.pizzasGolden=this.pizzasGolden.map(x => ({...x, seleccion: true}));
     pizza2.forEach(pizzaProm => {
      let updateItem = this.pizzasGolden.find(this.findIndexToUpdate, pizzaProm.id);
       let index = this.pizzasGolden.indexOf(updateItem);
       this.pizzasGolden[index].seleccion = false; 
    });  
   }else{
    this.pizzasGolden=this.pizzasGolden.map(x => ({...x, seleccion: false}));
     }
     if (this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 
      || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
      || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
      || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0
    ) {
      this.pizzasPlatinum=this.pizzasPlatinum.map(x => ({...x, seleccion: true}));
      pizza3.forEach(pizzaProm => {
        let updateItem = this.pizzasPlatinum.find(this.findIndexToUpdate, pizzaProm.id);
        let index = this.pizzasPlatinum.indexOf(updateItem);
        this.pizzasPlatinum[index].seleccion = false;  
      });
    }else{
      //console.log(this.pizzasPlatinum);
      this.pizzasPlatinum=this.pizzasPlatinum.map(x => ({...x, seleccion: false}));
    }
  }
  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }
  bloquearSeleccionSilver(pizza){
    pizza.forEach(pizzaProm => {
      /*if ((this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0)
        || (this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1)
        || (this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 0)
        || (this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1)
        || (this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0)
        || (this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1)
        || (this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 0)
        || (this.pizzaSilverLo.length == 0 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length == 0)
        || (this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0)
      ) {
        pizzaProm.seleccion = false;
      }
      else if (this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 2 && this.pizzaPlatinumLo.length == 0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length == 1 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 1 && this.pizzaPlatinumLo.length == 0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length == 2 && this.pizzaGoldLo.length == 0 && this.pizzaPlatinumLo.length == 1 && pizzaProm.checked != null) {
        pizzaProm.seleccion = false;
      } else {
        pizzaProm.seleccion = true;
      }*/
      if (this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
      ) {
        pizzaProm.seleccion = true;
      } else {
        pizzaProm.seleccion = false;
      }
    });
  }

  bloquearSeleccionGold(pizza){
    pizza.forEach(pizzaProm => {
     /* if (this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
        //|| this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
      ) {
        pizzaProm.seleccion = false;
      }
      else if (
        this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null) {
        pizzaProm.seleccion = false;
      } else {
        pizzaProm.seleccion = true;
      }*/
      if (this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
      ) {
        pizzaProm.seleccion = true;
      } else {
        pizzaProm.seleccion = false;
      }
    });
  }

  bloquearSeleccionPlatinum(pizza){
    pizza.forEach(pizzaProm => {
    /*  if (this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
        //|| this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0
      ) {
        pizzaProm.seleccion = false;
      }
      else if (this.pizzaSilverLo.length == 3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        //|| this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==1 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked != null
        || this.pizzaSilverLo.length ==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked != null) {
        pizzaProm.seleccion = false;
      } else {
        pizzaProm.seleccion = true;
      }*/
      if (this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==1 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==3 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==0 && this.pizzaPlatinumLo.length==1 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==2 && this.pizzaGoldLo.length==1 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
        || this.pizzaSilverLo.length==0 && this.pizzaGoldLo.length==2 && this.pizzaPlatinumLo.length==0 && pizzaProm.checked == null || pizzaProm.checked == false
      ) {
        pizzaProm.seleccion = true;
      } else {
        pizzaProm.seleccion = false;
      }
    });
  }
  cerrarPagina() {
    let alert = this.alertCtrl.create({
      title: 'Algo ha salido mal',
      message: 'Lo sentimos, estamos teniendo inconvenientes, por favor intentalo nuevamente',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //if (this.objetivo != null) {
              this.app.getRootNavs()[0].pop();
            //} else {
            //  this.navCtrl.setRoot(HomePage)
            //}
          }
        }
      ]
    });
    alert.present();
  }
  cambiarPrecio(){
    //console.log(this.costoTamaTipo);
    console.log(this.tamanoElegido);
    if(this.tamanoElegido.nombreBase =="MEDIANA"){
      this.combo['COSTO'] = Number(this.costoTamaTipo[0].COSTO);
    }else if(this.tamanoElegido.nombreBase =="FAMILIAR"){
      this.combo['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
    }else if(this.tamanoElegido.nombreBase =="EXTRA GRANDE"){
      this.combo['COSTO'] = Number(this.costoTamaTipo[2].COSTO);
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
          }
        }   
      ]
    });
    alert.present();
   }
}
