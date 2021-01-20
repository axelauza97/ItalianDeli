import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events, AlertController, App } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { VirtualScroll } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { Pizza } from "../../interfaces/IPizza";
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { HomePage } from '../home/home';
import { Borde } from '../../interfaces/IBorde';

@IonicPage()
@Component({
  selector: 'page-tradicionales',
  templateUrl: 'tradicionales.html',
})
@ViewChild('virtualScroll', { read: VirtualScroll })
export class TradicionalesPage {

  public objetivo : string;
  public pizzas:Array<Pizza> = new Array<Pizza>();
  public costos:Array<Number> = new Array<Number>();
  public costosString: Array<String> = new Array<String>();
  public tamanos: any;
  public bordes:any;
  public virtualScroll: VirtualScroll;
  tamanoElegido: any;
  bordeElegido: any;
  bordesElegidos:Array<any> = new Array<any>();
  bordeElegidoChoice: any;
  public costoTamaTipo: any;
  costoSilver : Number;
  costoGold : Number;
  costoPlatinum : Number;
  silver:Array<Number> = new Array<Number>();
  gold:Array<Number> = new Array<Number>();
  platinum:Array<Number> = new Array<Number>();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public httpRequest: HttpRequestProvider, 
              public loadingCtrl: LoadingController, 
              private toastCtrl: ToastController, 
              public events : Events,
              public app: App,
              public alertCtrl: AlertController) {
     this.obtenerPizzas();
     this.objetivo = navParams.get("objetivo");
     this.cargarTamanos();
     this.cargarCostos();
     
     
     //let bordesList = []
     //bordesList.push({"id":"1","nombre":"Cheddar","descripcion":"Borde de Cheddar","tamano":"Mediano","costo":"1.50"});//no se usaran los costos
     //bordesList.push({"id":"2","nombre":"Mosarella","descripcion":"Borde de Mosarella","tamano":"Mediano","costo":"1.00"});//no se usaran los costos
              
    }

    ngOnInit(){
      //this.cambiarPrecio()
    }

  obtenerPizzas(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    if(window.localStorage.getItem("userToken") != null){
      console.log(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken")))
      this.httpRequest.get(Constantes.getTradicionalesUrl(window.localStorage.getItem("userToken"))).then((data:any) => {
        var response = data.json();
        var arrayGold=[];
        var arrayPlatinum=[];
        console.log(response);
        if(response.STATUS == "OK"){
          for (var key in response.PIZZAS) {
            var child = response.PIZZAS[key];
            let pizza:Pizza = {
              id: child.ID,
              nombre : child.NOMBRE,
              descripcion : child.DESCRIPCION,
              imgUrl : child.IMAGEN_URL,
              favorita: child.FAVORITA,
              masa : null,
              borde : this.bordeElegido, 
              ingredientes : null,
              //tamano : child.TAMANO,
              tamano : child.TAMANO,
              cantidad : 1,
              costo : child.COSTO
            }
            //this.costos.push(pizza.costo)
            this.costosString.push("")
            this.bordesElegidos.push(key)   
            if (child.TAMANO == "Silver"){
              this.pizzas.push(pizza);
              this.silver.push(pizza.costo)  
            }else if (child.TAMANO == "Gold"){
              arrayGold.push(pizza);
              this.gold.push(pizza.costo)
            }else if (child.TAMANO == "Platinum"){
              arrayPlatinum.push(pizza);
              this.platinum.push(pizza.costo)
            } 
          }
          for (let pizzagold of arrayGold) {
            this.pizzas.push(pizzagold);
          }
          for (let pizzaplat of arrayPlatinum) {
            this.pizzas.push(pizzaplat);
          }
          this.silver.forEach(silver=>{
            this.costos.push(silver)
          })
          this.gold.forEach(gold =>{
            this.costos.push(gold)
          })
          this.platinum.forEach(platinum =>{
            this.costos.push(platinum)
          })
        } 
        loading.dismiss();             
      },(error : any)=>{
        console.log("Error");
        loading.dismiss();
      });
    }
  }

  favorito(event){
    var id = event.id
    var datos = {"PIZZA_ID": Number(id), "TOKEN": window.localStorage.getItem("userToken")};
    console.log(datos);
    var service;
    for(let pizza of this.pizzas){
      if(pizza.id == id){
        if(pizza.favorita == "1"){
          pizza.favorita = "0";
          service = "http://navi.pythonanywhere.com/rest/borrar_pizza_favorita";
        }else{
          pizza.favorita = "1";
          service = Constantes.getCrearPizzaFavoritasUrl();
        }
      } 
    }

    this.httpRequest.post(service, datos).then((data:any)=>{
      var response = data.json();
      console.log(response);
      if (response.STATUS == "ERROR"){
        this.presentToast(response.DETALLE);
      };      
    });
  }

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

  ordenar(pizza){
    pizza.masa=this.tamanoElegido;
    //let pizzacpy=pizza;
    let pizzacpy:Pizza = {
      id: pizza.id,
      nombre : pizza.nombre,
      descripcion : pizza.descripcion,
      imgUrl : pizza.imgUrl,
      favorita: pizza.favorita,
      masa : this.tamanoElegido,
      borde : pizza.borde, 
      ingredientes : null,
      //tamano : child.TAMANO,
      tamano : pizza.tamano,
      cantidad : 1,
      costo : Number(pizza.costo)+Number(pizza.borde.costo),
    }
    //pizzacpy.costo=Number(pizza.costo)+Number(this.bordeElegido.costo);
    //pizza.costo=Number(pizza.costo)+Number(this.bordeElegido.costo);
    //pizza.costo=Number(this.bordeElegido.COSTO+pizza.costo);
    if(this.objetivo == "nueva-tradicional" || this.objetivo == "nuevo-combo"){
      this.events.publish('nueva-tradicional', pizzacpy);
      this.navCtrl.pop();
    }else{
      //console.log("Aqui la pizza y el tamano------------------------------------>");
      //console.log(pizza);
      //console.
      //pizza.masa=this.tamanoElegido.nombre;
      console.log("------------------------------------------------------------->");
      
      this.app.getRootNav().push(CombinacionesPage, {
        tradicional : pizzacpy,
        tamanoName: this.tamanoElegido.nombre,
        tipo: "tradicionalPage"
      });
    }
  }

  async cargarTamanos() {
    try {
      let token = window.localStorage.getItem("userToken");
      let x = await this.httpRequest.get(Constantes.getTamanosUrl(token)).then((data: any) => {
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
          console.log (lista);
          this.pizzas.forEach(pizza => {
            if(pizza.tamano == 'Silver'){
              this.costoSilver = pizza.costo;
            }
            if(pizza.tamano == 'Gold'){
              this.costoGold = pizza.costo;
            }
            if(pizza.tamano == 'Platinum'){
              this.costoPlatinum = pizza.costo;
            }
          });
          this.cargarBordes(this.tamanoElegido);
        } else {
          if (response["STATUS"] != 'OK') {
            this.cerrarPagina();
          }
        }
      }, (err) => {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION, "cerrar");
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
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION, "cerrar");
      });
    }
    catch (err) {
      console.log('Error: ', err.message);
    }
  }
  cambiarBorde(pizza, index){
    event.cancelBubble;
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    
    this.pizzas.forEach(pizza => {
      /*
      if(Number(this.bordeElegidoChoice.costo)<Number(this.bordeElegido.costo)){
        pizza.costo=Number(pizza.costo)+Number(this.bordeElegido.costo);  
      }else if(Number(this.bordeElegidoChoice.costo)>Number(this.bordeElegido.costo)){
        pizza.costo=Number(pizza.costo)-Number(this.bordeElegido.costo);
      }else{
        pizza.costo=Number(pizza.costo)
      }
      */
      //pizza.borde=this.bordeElegido;
    });
    pizza.borde=this.bordesElegidos[index];
    this.costos[index] = this.redondearDecimales(Number(pizza.costo)+Number(this.bordesElegidos[index].costo),2);
    
    console.log("pizzas borde choice------------------------------------------------>")
    console.log(this.bordeElegidoChoice)
    console.log("pizzas borde------------------------------------------------>")
    console.log(this.bordeElegido)
    this.bordeElegidoChoice=this.bordeElegido//actualizo el borde
    loading.dismiss();
    
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
        console.log("Tamano cambio---------------------------------------------->");
        console.log(response);
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
          this.bordesElegidos.forEach(variable => {
              variable = this.bordes[0]
          })
          this.bordeElegidoChoice=this.bordeElegido;
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
  cambiarPrecio(){     
    //console.log(this.tamanoElegido);
    //console.log(this.costoTamaTipo);
    //console.log(this.pizzas);
    this.cargarBordes(this.tamanoElegido);
    let index = 0;
    this.pizzas.forEach(pizza => {
      if(pizza.tamano == 'Silver'){
        /*if(this.tamanoElegido == this.tamanos[0]){
          pizza.costo = Number(this.costoSilver);
        }
        else if(this.tamanoElegido == this.tamanos[1]){
          pizza.costo = Number(this.costoSilver);
          pizza.costo = this.redondearDecimales((Number(this.costoSilver) + Number(Number(this.costoSilver)*0.332)), 2)
        }
         else if(this.tamanoElegido == this.tamanos[2]){
          pizza.costo = Number(this.costoSilver);
          pizza.costo = this.redondearDecimales((Number(this.costoSilver) + Number(Number(this.costoSilver)*0.667)), 2)
         }*/
         if(this.tamanoElegido.nombreBase == this.costoTamaTipo[0].tamano){
          pizza.costo = this.costoTamaTipo[0].costo;
          this.costos[index] = pizza.costo 
        }
        else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[3].tamano){
          pizza.costo = this.costoTamaTipo[3].costo;
          this.costos[index] = pizza.costo 
          //pizza.costo = this.redondearDecimales((Number(this.costoSilver) + Number(Number(this.costoSilver)*0.332)), 2)
        }
         else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[6].tamano){
          pizza.costo = this.costoTamaTipo[6].costo;
          this.costos[index] = pizza.costo 
          //pizza.costo = this.redondearDecimales((Number(this.costoSilver) + Number(Number(this.costoSilver)*0.667)), 2)
         }
      }
      else if (pizza.tamano == 'Gold'){
        if(this.tamanoElegido.nombreBase == this.costoTamaTipo[1].tamano){
          pizza.costo = this.costoTamaTipo[1].costo;
          this.costos[index] = pizza.costo 
        }
        else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[4].tamano){
          pizza.costo = this.costoTamaTipo[4].costo;
          this.costos[index] = pizza.costo 
          //pizza.costo = this.redondearDecimales((Number(this.costoGold) + Number(Number(this.costoGold)*0.294)), 2)
        }
         else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[7].tamano){
          pizza.costo = this.costoTamaTipo[7].costo;
          this.costos[index] = pizza.costo 
          //pizza.costo = this.redondearDecimales((Number(this.costoGold) + Number(Number(this.costoGold)*0.588)), 2) 
         }
      //pizza.costo = Number(pizza.costo) + Number(Number(pizza.costo)*0.33)
      }
      else if (pizza.tamano == 'Platinum'){
        if(this.tamanoElegido.nombreBase == this.costoTamaTipo[2].tamano){
          pizza.costo = this.costoTamaTipo[2].costo;
          this.costos[index] = pizza.costo 
        }
        else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[5].tamano){
          pizza.costo = this.costoTamaTipo[5].costo;
          this.costos[index] = pizza.costo 
          //pizza.costo = this.redondearDecimales((Number(this.costoPlatinum) + Number(Number(this.costoPlatinum)*0.251)), 2) 
        }
         else if(this.tamanoElegido.nombreBase == this.costoTamaTipo[8].tamano){
          pizza.costo = this.costoTamaTipo[8].costo;
          this.costos[index] = pizza.costo 
          //pizza.costo = this.redondearDecimales((Number(this.costoPlatinum) + Number(Number(this.costoPlatinum)*0.502)), 2) 
         }
      }
      index++;
    });
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

  cerrarPagina() {
    let alert = this.alertCtrl.create({
      title: 'Algo ha salido mal',
      message: 'Lo sentimos, estamos teniendo inconvenientes, por favor intentalo nuevamente',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            if (this.objetivo != null) {
              this.app.getRootNavs()[0].pop();
            } else {
              this.navCtrl.setRoot(HomePage)
            }
          }
        }
      ]
    });
    alert.present();
  }

  redondearDecimales(numero, decimales) {
   let numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numeroRegexp.test(numero)) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
        return Number(numero.toFixed(decimales));
    } else {
        return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
    }
}


}
