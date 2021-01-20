import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController, AlertController, Platform, App } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { ListaPedidosPage } from '../lista-pedidos/lista-pedidos';
import { ValoresPage  } from '../valores/valores';
import { CarritoPage } from '../carrito/carrito';

@IonicPage()
@Component({
  selector: 'page-forma-pago',
  templateUrl: 'forma-pago.html',
})

export class FormaPagoPage {
  opct : string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public toastCtrl: ToastController,
              public httpRequest : HttpRequestProvider, 
              public events: Events, 
              public app: App,
              public loadingCtrl: LoadingController, 
              public alertCtrl : AlertController ,
              public platform: Platform) {         
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FormaPagoPage');
    let tradicionales = this.navParams.get("tradicionales");
    //console.log(tradicionales)
  }

  efectivo(){
    let delivery = this.navParams.get('delivery');
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    let tradicionales = this.navParams.get("tradicionales");
    //console.log(tradicionales)
    let combos = this.navParams.get("combos");
    let cupones = this.navParams.get("cupones");
    let coordenada = this.navParams.get("coordenada");
    let poligono = this.navParams.get("poligono");
    let local = this.navParams.get("local");
    let total = this.navParams.get("total");

    /*console.log("-------------------Pizza-------------------------------")
    console.log(pizzas)
    console.log("-------------------Adicional-------------------------------")
    console.log(adicionales)
    console.log("-------------------Tradicionales-------------------------------")
    console.log(tradicionales)
    console.log("-------------------Combos-------------------------------")
    console.log(combos)*/
    console.log("coordenadaaaa...............................................");
    console.log(coordenada);

    /*let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();*/
    //console.log(token)
    //console.log(tokenFirebase)
    
    /*let elementos = []
    
    if(pizzas != null || pizzas != undefined){
      pizzas.forEach(elemento=> {
        elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":'PIZZA'})
        
      });
    }
    if(adicionales != null || adicionales != undefined){
      adicionales.forEach(elemento=> {
        elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO": 'ADICIONAL'})
        
      });  
    }

    if(tradicionales != null || tradicionales != undefined){
        tradicionales.forEach(elemento=> {
      elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO": 'PIZZA'})
      
    });
    } 
    
    if(combos != null || combos != undefined){
      combos.forEach(elemento=> {
        elementos.push({"ID":elemento.ID , "CANTIDAD":elemento.CANTIDAD , "TIPO": 'COMBO'})
        
      }); 
    }
    
    let pedido = {};
   
    if(local == null){
      
      pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":coordenada,"TOTAL":total,"TELEFONO":"", "FORMA_PAGO" : "0" , "ELEMENTOS":{"pizzas":pizzas,"Tradicionales":tradicionales,"Adicionales":adicionales,"Combo":combos}
        , "POLIGONO_ID": poligono}
    }else{
      pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":{"LATITUD": local.LATITUD , "LONGITUD":local.LONGITUD},"TOTAL":total,"TELEFONO":"", "FORMA_PAGO" : "0" , "ELEMENTOS":{"pizzas":pizzas,"Tradicionales":tradicionales,"Adicionales":adicionales,"Combo":combos}
        , "POLIGONO_ID": poligono}
    }*/
    //console.log(pedido);
    /*let pedido = {};
      pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":coordenada,"TOTAL":total,"TELEFONO":"", "FORMA_PAGO" : "0" , "ELEMENTOS":{"pizzas":pizzas,"Tradicionales":tradicionalesPromo,"Adicionales":adicionales,"Combo":combos}
        , "POLIGONO_ID": poligono}
        console.log("pedido en forma ",pedido);
        this.navCtrl.push(CarritoPage , {
          pedido : pedido,

          opcional : 'pizzaPromo'
        });   */ 
    //this.mostrarMensaje("orden: {pizzas:..., Adicionales:...., Tradicionales:...., Combo:....}","                pizzas: "+JSON.stringify(pizzas)+"                Adicionales: "+JSON.stringify(adicionales)+"                Tradicionales: "+JSON.stringify(tradicionalesPromo)+"               Combo: "+JSON.stringify(combos), "OK");
    let formaEntrega=this.navParams.get("formaEntrega");
    this.navCtrl.push(CarritoPage , {
      pizzas : pizzas,
      adicionales : adicionales,
      combos : combos,
      coordenada: coordenada,
      cupones: cupones,
      //promocionales : promocionales,
      tradicionales : tradicionales,
      local : local,
      formaEntrega:formaEntrega,
      poligono : poligono,
      total: total,
      delivery: delivery,
      tipoPago: 1
    });      
    //this.mostrarMensaje("Total: ",JSON.stringify(pedido), "OK");
    //this.mostrarMensaje("orden: {pizzas:..., Adicionales:...., Tradicionales:...., Combo:....}","                pizzas: "+JSON.stringify(pizzas)+"                Adicionales: "+JSON.stringify(adicionales)+"                Tradicionales: "+JSON.stringify(tradicionales)+"                Combo: "+JSON.stringify(combos), "OK");
    /*this.httpRequest.post(Constantes.CREAR_PEDIDOS, pedido).then((data : any)=>{
      var response = data.json();
      console.log(response)
      if(response["STATUS"] == 'OK'){
        this.mostrarMensaje("Pedido enviado","Tu pedido ha sido recibido exitosamente, ahora puedes revisar el estado de tu pedido", "OK");
        loading.dismiss();
      }else{
        loading.dismiss();
        this.mostrarMensaje("Solicitud reprobada","Estamos teniendo inconvenientes, por favor intenta nuevamente", "ERROR");
      
      }
    }, (err)=>{
      loading.dismiss();
      this.mostrarMensaje("","Estamos teniendo inconvenientes, por favor intenta nuevamente","ERROR");
    });*/
  }
  tarjeta(){
    //let elementos = [];

    let delivery = this.navParams.get('delivery');
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    let combos = this.navParams.get("combos");
    let cupones = this.navParams.get("cupones");
    let promocionales = this.navParams.get("promocionales");
    let tradicionalesPromo = this.navParams.get("tradicionales");
    console.log(tradicionalesPromo)
    let coordenada = this.navParams.get("coordenada");
    let poligono = this.navParams.get("poligono");
    let local = this.navParams.get("local");
    //let token = window.localStorage.getItem("userToken");
    //let tokenFirebase = window.localStorage.getItem("firebaseToken");
    let total = this.navParams.get("total");
    console.log("coordenadaaaa...............................................");
    console.log(coordenada);
    /*if(pizzas != null || pizzas != undefined){
      pizzas.forEach(elemento=> {
        elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
        
      });
	   }
	  if(promocionales != null || promocionales != undefined){
		  promocionales.forEach(elemento=> {
			elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
      
    });
	  }else{
		  promocionales=[];
	  }
	  if(tradicionalesPromo != null || tradicionalesPromo != undefined){
      tradicionalesPromo.forEach(elemento=> {
        elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
        
      });
	  }else{
		  tradicionalesPromo=[];
	  }
	  if(adicionales != null || adicionales != undefined){
      adicionales.forEach(elemento=> {
        elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
        
      });
	  }
	  if(combos != null || combos != undefined){
      combos.forEach(elemento=> {
        elementos.push({"ID":elemento.id , "CANTIDAD":elemento.cantidad , "TIPO":elemento.tipo})
        
      });
    }*/
    
      /*let pedido = {};
      if(local == null){
        
        pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":coordenada,"TOTAL":total,"TELEFONO":"", "FORMA_PAGO" : "0" , "ELEMENTOS":{"pizzas":pizzas,"Tradicionales":tradicionalesPromo,"Adicionales":adicionales,"Combo":combos}
          , "POLIGONO_ID": poligono}
      }else{
        pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":{"LATITUD": local.LATITUD , "LONGITUD":local.LONGITUD},"TOTAL":total,"TELEFONO":"", "FORMA_PAGO" : "0" , "ELEMENTOS":{"pizzas":pizzas,"Tradicionales":tradicionalesPromo,"Adicionales":adicionales,"Combo":combos}
          , "POLIGONO_ID": poligono}
      }*/
      let formaEntrega=this.navParams.get("formaEntrega");
        this.navCtrl.push(CarritoPage , {
          pizzas : pizzas,
          adicionales : adicionales,
          combos : combos,
          coordenada: coordenada,
          //promocionales : promocionales,
          tradicionales : tradicionalesPromo,
          local : local,
          cupones:cupones,
          formaEntrega:formaEntrega,
          poligono : poligono,
          total: total,
          delivery: delivery,
          tipoPago: 0
        });    
    //this.mostrarMensaje("orden: {pizzas:..., Adicionales:...., Tradicionales:...., Combo:....}","                pizzas: "+JSON.stringify(pizzas)+"                Adicionales: "+JSON.stringify(adicionales)+"                Tradicionales: "+JSON.stringify(tradicionalesPromo)+"               Combo: "+JSON.stringify(combos), "OK");
    //this.mostrarMensaje("Total: ",local.LONGITUD, "OK");
      
  }


  mostrarMensaje(titulo: string ,mensaje: string , objetivo: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
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
