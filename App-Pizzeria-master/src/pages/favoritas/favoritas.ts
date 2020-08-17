import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events, AlertController, Platform, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { Pizza } from "../../interfaces/IPizza";
import { HomePage } from '../home/home';
import { Masa } from '../../interfaces/IMasa';
import { Borde } from '../../interfaces/IBorde';
import { Ingrediente } from '../../interfaces/IIngrediente';
import { Porcion } from '../../interfaces/IPorcion';
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { CarritoPage } from '../carrito/carrito';


@IonicPage()
@Component({
  selector: 'page-favoritas',
  templateUrl: 'favoritas.html',
})
export class FavoritasPage {
  objetivo : String;
  bordeElegido: any;
  tamanoElegido: any;
  public tamanos: any;
  public bordes:any;
  public costoTamaTipo: any;

  public pizzas:Array<Pizza> = new Array<Pizza>();

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public httpRequest: HttpRequestProvider
              , public loadingCtrl: LoadingController
              , private toastCtrl: ToastController
              , public alertCtrl: AlertController
              , public app: App
              , public events : Events
              , public platform: Platform) {

            /*platform.registerBackButtonAction(() => {
              this.navCtrl.setRoot(HomePage)
            },2)*/
        
           this.tamanoElegido={id: 1, nombre: "Mediana", nombreBase: "MEDIANA"};
           this.obtenerPizzas();
           this.objetivo = navParams.get("objetivo");
  } 

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FavoritasPage');
  }
  cambiarBorde(){
    this.pizzas.forEach(pizza => {
      pizza.borde=this.bordeElegido;
    });
    console.log("borde finalll------------------------------------------------>")
    console.log(this.bordeElegido)
  }
  cargarBordes(tamano : any){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    this.bordes = new Array<Borde>();
    try{
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getTamanosBordesUrl(token,tamano.id)).then((data : any) => {
        
        var response = data.json();
        //console.log("Tamano cambio---------------------------------------------->");
        //console.log(response);
        if(response["BORDES"] != undefined){
          response["BORDES"].forEach((child :any) => {
            let borde:Borde ={
              id: child.ID,
              nombre : child.NOMBRE,
              descripcion : child.DESCRIPCION,
              tamano : child.TAMANO,
              costo : child.COSTO
            }
            this.bordes.push(borde);
          });
          //this.bordes=bordesList;
          this.bordeElegido = this.bordes[0];
          this.pizzas.forEach(pizza => {
            pizza.borde=this.bordeElegido;
          });
          /* avisa que ya se ha terminado de cargar los bordes, para recibir cualquier pizza que se desee editar */
          //this.events.publish('carga-completa',"bordes");
          loading.dismiss();
    
        }else{
          loading.dismiss();
          if(response["STATUS"] != 'OK'){
            console.log(response["DETALLE"])
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          }
        }
        
      }, (err)=>{
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }
    catch(err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
    
  }
  cerrarPage(){ 
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
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
          this.cargarBordes(this.tamanoElegido);
          /*this.pizzas.forEach(pizza => {
            console.log(this.pizzas);
            if(pizza.tamano == 'Silver'){
              this.costoSilver = pizza.costo;
            }
            if(pizza.tamano == 'Gold'){
              this.costoGold = pizza.costo;
            }
            if(pizza.tamano == 'Platinum'){
              this.costoPlatinum = pizza.costo;
            }
          });*/
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
  cargarCostos() {
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCostosUrl(token)).then((data: any) => {
        var response = data.json();
        let lista = [];
        if (response["PAQUETE"] != undefined) {
          lista.push({ "tipo": response["PAQUETE"][0].TIPO, "tamano": response["PAQUETE"][0].TAMANO, "costo": response["PAQUETE"][0].COSTO });
           lista.push({ "tipo": response["PAQUETE"][1].TIPO, "tamano": response["PAQUETE"][1].TAMANO, "costo": response["PAQUETE"][1].COSTO });
           lista.push({ "tipo": response["PAQUETE"][2].TIPO, "tamano": response["PAQUETE"][2].TAMANO, "costo": response["PAQUETE"][2].COSTO });
           lista.push({ "tipo": response["PAQUETE"][3].TIPO, "tamano": response["PAQUETE"][3].TAMANO, "costo": response["PAQUETE"][3].COSTO });
           lista.push({ "tipo": response["PAQUETE"][4].TIPO, "tamano": response["PAQUETE"][4].TAMANO, "costo": response["PAQUETE"][4].COSTO });
           lista.push({ "tipo": response["PAQUETE"][5].TIPO, "tamano": response["PAQUETE"][5].TAMANO, "costo": response["PAQUETE"][5].COSTO });
           lista.push({ "tipo": response["PAQUETE"][6].TIPO, "tamano": response["PAQUETE"][6].TAMANO, "costo": response["PAQUETE"][6].COSTO });
           lista.push({ "tipo": response["PAQUETE"][7].TIPO, "tamano": response["PAQUETE"][7].TAMANO, "costo": response["PAQUETE"][7].COSTO });
           lista.push({ "tipo": response["PAQUETE"][8].TIPO, "tamano": response["PAQUETE"][8].TAMANO, "costo": response["PAQUETE"][8].COSTO });
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
  cerrarPagina() {
    let alert = this.alertCtrl.create({
      title: 'Algo ha salido mal',
      message: 'Lo sentimos, estamos teniendo inconvenientes, por favor intentalo nuevamente',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
           // if (this.objetivo != null) {
              this.app.getRootNavs()[0].pop();
            /*} else {
              this.navCtrl.setRoot(HomePage)
            }*/
          }
        }
      ]
    });
    alert.present();
  }

  obtenerPizzas(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    var token = window.localStorage.getItem("userToken");
    if(token != null){
      //console.log(Constantes.getPizzasFavoritas(token));
      this.httpRequest.get(Constantes.getPizzasFavoritas(token)).then((data : any) => {
        var response = data.json();
        //console.log(response);  
        if(response.STATUS == "OK"){
          for (var key in response.PIZZAS_FAVORITAS) {
            var child = response.PIZZAS_FAVORITAS[key];
            let pizza:Pizza ={
              id: child.PIZZA_ID,
              nombre : child.NOMBRE,
              imgUrl : child.IMAGEN_URL,
              masa : null,
              borde : null,
              cantidad : null,
              descripcion : null,
              ingredientes : null,
              tamano : null,
              costo : child.COSTO,
              favorita: "1"
            }
            //console.log(pizza);
            this.pizzas.push(pizza);
          }
          this.cargarTamanos();
          this.cargarCostos();
        }
        loading.dismiss();       
      }, (error : any)=>{
        console.log("Error")
        loading.dismiss();
        this.presentToast("Revisa tu conexion a internet!");
      });
    }
    
    
  }
  cambiarPrecio(){     
    //console.log(this.tamanoElegido);
    this.cargarBordes(this.tamanoElegido);
  }
  favorito(event){
    var id = event.id
    
    var datos = {"PIZZA_ID": Number(id), "TOKEN": window.localStorage.getItem("userToken")};
    //console.log(datos);
    var service;
    let pizzaIndex = this.pizzas.map(function (x) { return x.id; }).indexOf(id);
    let pizza = this.pizzas[pizzaIndex];
    if(pizza.favorita == "1"){
        this.confirmacionQuitarFav(pizza.id , datos)
        
      }else{
        pizza.favorita = "1";
        service = Constantes.getCrearPizzaFavoritasUrl();
        this.llamadaServicioFavoritas(service ,datos);
    }
    
  }

  llamadaServicioFavoritas(service , datos){
    //console.log(service);
    this.httpRequest.post(service, datos).then((data:any)=>{
      var response = data.json();
      //console.log(response);
      if (response.STATUS == "ERROR"){
        this.presentToast(response.DETALLE);
      };      
    }, (err)=>{
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    });
  }

  ordenar(pizza){
     this.obtenerDetallesPizza(pizza)
     
  }

  obtenerDetallesPizza(pizza){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present()
  
    try {
      let token = window.localStorage.getItem("userToken");

      this.httpRequest.get(Constantes.getVerPizzaUrl(token ,pizza.id)).then((data : any) => {
        var response = data.json();
        console.log("Previo a combinaciones------------------------------------------------------->");
        console.log(response)
        console.log("Previo a combinaciones------------------------------------------------------->");
        console.log(pizza)
        if(response["PIZZA"] != undefined){
          var costo=0;
          if(response.PIZZA.TAMANO=="SILVER"){
            if(this.tamanoElegido.nombreBase == this.costoTamaTipo[0].tamano){
              costo = Number(this.costoTamaTipo[0].costo);
            }
            else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[3].tamano){
              costo = Number(this.costoTamaTipo[3].costo);
              //pizza.costo = this.redondearDecimales((Number(this.costoSilver) + Number(Number(this.costoSilver)*0.332)), 2)
            }
             else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[6].tamano){
              costo = Number(this.costoTamaTipo[6].costo);
              //pizza.costo = this.redondearDecimales((Number(this.costoSilver) + Number(Number(this.costoSilver)*0.667)), 2)
             }
          }else if(response.PIZZA.TAMANO=="GOLD"){
            if(this.tamanoElegido.nombreBase == this.costoTamaTipo[1].tamano){
              costo = Number(this.costoTamaTipo[1].costo);
            }
            else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[4].tamano){
              costo = Number(this.costoTamaTipo[4].costo);
              //pizza.costo = this.redondearDecimales((Number(this.costoGold) + Number(Number(this.costoGold)*0.294)), 2)
            }
             else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[7].tamano){
              costo = Number(this.costoTamaTipo[7].costo);
              //pizza.costo = this.redondearDecimales((Number(this.costoGold) + Number(Number(this.costoGold)*0.588)), 2) 
             }
          }else if(response.PIZZA.TAMANO=="PLATINUM"){
            if(this.tamanoElegido.nombreBase == this.costoTamaTipo[2].tamano){
              costo = Number(this.costoTamaTipo[2].costo);
            }
            else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[5].tamano){
              costo = Number(this.costoTamaTipo[5].costo);
              //pizza.costo = this.redondearDecimales((Number(this.costoPlatinum) + Number(Number(this.costoPlatinum)*0.251)), 2) 
            }
             else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[8].tamano){
              costo = Number(this.costoTamaTipo[8].costo);
              //pizza.costo = this.redondearDecimales((Number(this.costoPlatinum) + Number(Number(this.costoPlatinum)*0.502)), 2) 
             }
          }
          let masa = null;
          let borde = null;
          let ingredientes=[];//: new Array<Ingrediente>();
          /*let masa  : Masa = {costo: response.PIZZA.MASA.COSTO , id :  response.PIZZA.MASA.ID , nombre :  response.PIZZA.MASA.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.MASA.TAMANO  }
          let borde  : Borde = {costo: response.PIZZA.BORDE.COSTO , id :  response.PIZZA.BORDE.ID , nombre :  response.PIZZA.BORDE.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.BORDE.TAMANO  }
          let ingredientes = new Array<Ingrediente>();
          response.PIZZA.INGREDIENTES.forEach(element => {
            let porcion : Porcion = {id : null , nombre : element.PORCION , valor : null}
            let ingrediente  : Ingrediente = {porcion : porcion , costoBase: element.COSTO , id :  element.ID , nombre :  element.NOMBRE ,  descripcion : element.DESCRIPCION,  tamano :  element.TAMANO , imagenUrl : element.IMAGEN_URL  , checked  : true}
            ingredientes.push(ingrediente)
          });*/
          if(response.PIZZA.TAMANO=="MEDIANA" || response.PIZZA.TAMANO=="FAMILIAR" || response.PIZZA.TAMANO=="EXTRA GRANDE"){
            response.PIZZA.TAMANO=this.tamanoElegido.nombreBase;;
            if(this.tamanoElegido.nombreBase=="MEDIANA"){
              
              masa = {costo: 4.19 , id :  response.PIZZA.MASA.ID , nombre :  response.PIZZA.MASA.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.MASA.TAMANO  }
              borde  = {costo: 2.5 , id :  response.PIZZA.BORDE.ID , nombre :  response.PIZZA.BORDE.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.BORDE.TAMANO  }
              response.PIZZA.INGREDIENTES.forEach(element => {
                let porcion : Porcion = {id : null , nombre : element.PORCION , valor : this.getPorcionValue(element.PORCION)}
                let ingrediente  : Ingrediente = {porcion : porcion , costoBase: 1.8 , id :  element.ID , nombre :  element.NOMBRE ,  descripcion : element.DESCRIPCION,  tamano :  element.TAMANO , imagenUrl : element.IMAGEN_URL  , checked  : true}
                ingredientes.push(ingrediente)
              });
            }else if(this.tamanoElegido.nombreBase=="FAMILIAR"){
              masa = {costo: 6.31 , id :  response.PIZZA.MASA.ID , nombre :  response.PIZZA.MASA.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.MASA.TAMANO  }
              borde  = {costo: 3.0 , id :  response.PIZZA.BORDE.ID , nombre :  response.PIZZA.BORDE.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.BORDE.TAMANO  }
              response.PIZZA.INGREDIENTES.forEach(element => {
                let porcion : Porcion = {id : null , nombre : element.PORCION , valor : this.getPorcionValue(element.PORCION)}
                let ingrediente  : Ingrediente = {porcion : porcion , costoBase: 2.2 , id :  element.ID , nombre :  element.NOMBRE ,  descripcion : element.DESCRIPCION,  tamano :  element.TAMANO , imagenUrl : element.IMAGEN_URL  , checked  : true}
                ingredientes.push(ingrediente)
              });
            }else if(this.tamanoElegido.nombreBase=="EXTRA GRANDE"){
              masa = {costo: 7.39 , id :  response.PIZZA.MASA.ID , nombre :  response.PIZZA.MASA.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.MASA.TAMANO  }
              borde  = {costo: 3.5 , id :  response.PIZZA.BORDE.ID , nombre :  response.PIZZA.BORDE.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.BORDE.TAMANO  }
              response.PIZZA.INGREDIENTES.forEach(element => {
                let porcion : Porcion = {id : null , nombre : element.PORCION , valor : this.getPorcionValue(element.PORCION)}
                let ingrediente  : Ingrediente = {porcion : porcion , costoBase: 2.6 , id :  element.ID , nombre :  element.NOMBRE ,  descripcion : element.DESCRIPCION,  tamano :  element.TAMANO , imagenUrl : element.IMAGEN_URL  , checked  : true}
                ingredientes.push(ingrediente)
              });
            }
          }else{
            masa=this.tamanoElegido.nombreBase;
            //masa = {costo: response.PIZZA.MASA.COSTO , id :  response.PIZZA.MASA.ID , nombre :  response.PIZZA.MASA.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.MASA.TAMANO  }
              borde  = {costo: response.PIZZA.BORDE.COSTO , id :  response.PIZZA.BORDE.ID , nombre :  response.PIZZA.BORDE.NOMBRE ,  descripcion : null,  tamano :  response.PIZZA.BORDE.TAMANO  }
              response.PIZZA.INGREDIENTES.forEach(element => {
                let porcion : Porcion = {id : null , nombre : element.PORCION , valor : null}
                let ingrediente  : Ingrediente = {porcion : porcion , costoBase: element.COSTO , id :  element.ID , nombre :  element.NOMBRE ,  descripcion : element.DESCRIPCION,  tamano :  element.TAMANO , imagenUrl : element.IMAGEN_URL  , checked  : true}
                ingredientes.push(ingrediente)
              });
          }
          
          /*if(response.PIZZA.TAMANO=="SILVER"||response.PIZZA.TAMANO=="GOLD"||response.PIZZA.TAMANO=="PLATINUM"){
            masa=this.tamanoElegido.nombreBase;
            borde="";
          }*/

          let pizzasend  : Pizza ={id : response.PIZZA.ID  , masa :masa, borde: this.bordeElegido,  ingredientes:ingredientes , costo:Number(costo)+Number(this.bordeElegido.costo) , nombre : response.PIZZA.NOMBRE , descripcion : null, imgUrl : null, tamano : response.PIZZA.TAMANO , cantidad:1, favorita : null};
          console.log("Favorita........................................");
          console.log(pizzasend);
          /**/
          if(this.objetivo == "nueva-favorita"){
            this.events.publish('nueva-favorita', pizzasend);
            this.navCtrl.pop();
          }else{
            this.navCtrl.push(CombinacionesPage ,{
              pizza: pizzasend,
              tamanoName: this.tamanoElegido.nombreBase
              //pizzaFavoritoCosto: costo//cualquier valor si es armada... si es tradicional se respeta
            })
          }
          loading.dismiss();
        }else{
          loading.dismiss();
          if(response["STATUS"] != 'OK'){
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          }
        }
        
      }, (err)=>{
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }
    catch(err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
  }

  capitalize(palabra: string) 
{
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
  getPorcionValue(nombre: String){
    let value=0;
    if(nombre=="Simple"){
      value=1.8;
    }else if(nombre=="Doble"){
      value=3.6
    }else if(nombre=="Triple"){
      value=5.4;
    }
    return value;
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

   confirmacionQuitarFav(id , datos) {
    let alert = this.alertCtrl.create({
      title: 'Quitar de favoritas',
      message: '¿Estas seguro de quitar esta pizza de tu lista de favoritas?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        
        },
        {
          text: 'Si',
          handler: () => {
            let pizzaIndex = this.pizzas.map(function (x) { return x.id; }).indexOf(id);
            let pizza = this.pizzas[pizzaIndex];
            pizza.favorita = "0";
            this.pizzas.splice(pizzaIndex,1 );
            let service = Constantes.getBorrarPizzaFavoritasUrl();
            this.llamadaServicioFavoritas(service , datos)
          }
        }
      ]
    });
    alert.present();
  }

  /*cambiarPrecio(){     
    console.log(this.tamanoElegido);
    //console.log(this.costoTamaTipo);
    //console.log(this.pizzas);
  }*/

  presentToast(mensaje: string , duracion? : Number, posicion? : string , mostrarBoton? : boolean , mensajeBoton? :string )  {
    let duration ,position , closeButtonText, showCloseButton;
    if(duracion == undefined){
        duration = 3000;
    }
    if(mostrarBoton == undefined){
      showCloseButton = false;
    }
    if(mensajeBoton == undefined){
      mensajeBoton = "";
    }
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duration,
      position: position,
      cssClass: 'dark-trans',
      closeButtonText: closeButtonText,
      showCloseButton: showCloseButton
    });
    toast.present();
  }
}

