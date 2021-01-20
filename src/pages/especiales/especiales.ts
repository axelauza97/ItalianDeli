import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Tabs, App, AlertController, ToastController, Slides } from 'ionic-angular';
import { MasasPage } from '../masas/masas';
import { BordesPage } from '../bordes/bordes';
import { IngredientesPage } from '../ingredientes/ingredientes';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Pizza } from "../../interfaces/IPizza";
import { Masa } from "../../interfaces/IMasa";
import { Borde } from "../../interfaces/IBorde";
import { Cupon } from "../../interfaces/ICupon";
import { Ingrediente } from "../../interfaces/IIngrediente";
import { AdicionalesPage } from '../adicionales/adicionales';
import { Adicional } from '../../interfaces/IAdicional';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { CuponesPage } from '../cupones/cupones';
import { CombinacionesPage } from '../combinaciones/combinaciones';

@IonicPage()
@Component({
  selector: 'page-especiales',
  templateUrl: 'especiales.html',
})

export class EspecialesPage {
  @ViewChild('tabs') tabRef: Tabs;

  tamanos : any;
   var =1;

  objetivo : String;

  /* total */
  precioTotal = 0.0;   
  /*   Variable contenedora de la opcion escogifa en el select  */
  tamanoElegido :any;
  costoTotal : Number;
  /*   Tabs  */
  cuponesTab = CuponesPage;
  masasTab = MasasPage;
  bordesTab = BordesPage;
  ingredientesTab= IngredientesPage;

  tabActivo : string;

  cuponesParams = {};
  masasParams = {};
  bordesParams = {};
  ingredientesParams = {};

  cupones = [];

  cuponesEnabled : boolean;
  masasEnabled : boolean;
  bordesEnabled : boolean;
  ingredientesEnabled : boolean;

  /* objeto pizza resultante */
  pizza  : Pizza ={id : null , masa :null, borde: null, ingredientes: [] , costo:0 , nombre : null , descripcion : null, imgUrl : null, tamano : null , cantidad:1, favorita : null};
  //cupon  : Cupon ={id : null ,texto:null, imagen: null, fechaInicio: null , fechaFin:null , num_person : 0 , checked : false, cantidad:1};
 
  constructor(public app: App,
              public navCtrl: NavController
             ,public navParams: NavParams
             ,public httpRequest : HttpRequestProvider
             ,public events : Events
             , private alertCtrl: AlertController
             ,public loadingCtrl: LoadingController
             , public toastCtrl: ToastController) {

            this.objetivo = navParams.get("objetivo");
            this.cuponesEnabled = true;
            this.masasEnabled = false;
            this.bordesEnabled = false;
            this.ingredientesEnabled = false;
            

            
            /* evento para controlar cual es la tab activa*/
            this.events.subscribe("tab-activo", (tab) => {
                this.tabActivo =tab;
                
            });        
  }

  
  ionViewDidLoad() {
      
      //this.cargarTamanos();
      this.escucharEventos();
      this.cargarCupones()
      
  }
  verificarCupones(){
    if(this.objetivo == "nuevo-cupon"){
      console.log("Valores------------------------------------------------>")
      console.log(this.cupones)
      let cuponesEscogidos = this.navParams.get("cupones")
      this.costoTotal=Number(this.costoTotal)-Number(cuponesEscogidos.length);
      /*cuponesEscogidos.forEach(cuponEscogido=>{
        let index = this.cupones.map(function (x) { return x.id; }).indexOf(cuponEscogido.id);
        this.cupones.splice(index,1 );
      });*/
      this.cambioCupones(cuponesEscogidos);
      console.log(this.cupones)
      console.log("Fin------------------------------------------------>")
    }
  }
  cerrarPage(){
    
      this.navCtrl.pop();
      this.navCtrl.setRoot(HomePage);
  }
  cargarCupones(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    try{
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCuponesUrl(token)).then((data : any) => {
        var response = data.json();
        if( response.PAQUETE != undefined){
          let len=response.PAQUETE.length;
          this.costoTotal=Number(response.PAQUETE[len-1]["cupones por persona"]);
          this.cargarValorCuponPersonRest();
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
        loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
  }
  cargarValorCuponPersonRest(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    try{
      //this.cupones = new Array<Cupon>();
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCuponesPersonaUrl  (token)).then((data : any) => {
        var response = data.json();
        if( response.PAQUETE["0"] != undefined){
          //let len=response.PAQUETE["0"].length;
          
          //this.costoTotal = 4//0;
          this.costoTotal=Number(this.costoTotal)- Number(response.PAQUETE["0"]["cupones_hoy_total"]);
          
          /** response.PAQUETE.forEach((child : any) => {
            if(len>1){
              if(count<len-1){
                let cupon : Cupon ={
                  id : child.id,
                  texto:child.texto,
                  fechaInicio : child.fecha_inicio,
                  fechaFin : child.fecha_fin,
                  imagen : child.imagen,
                  cantidad : 1,
                  checked: false,
                  //stock : 1,
                  num_person:response.PAQUETE[len-1]["cupones por persona"]
                }
                this.cupones.push(cupon);
                //F
                count=count+1;
              }
            }else{
              this.mostrarMensaje(Constantes.DIA_INCORRECTO, Constantes.SIN_CUPONES);
            }
          });*/
          this.verificarCupones()
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
        loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
  }

  obtenerIndexTamano(tamanoNombre : string){
    for (let index = 0; index < this.tamanos.length; index++) {
      const element = this.tamanos[index];
      if(element["nombre"] == tamanoNombre){
        console.log("econtrado")
        return index
      }
    }
    console.log("no encontrado")
    return undefined;
  }
 
  async cargarTamanos(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    try {
      let token = window.localStorage.getItem("userToken");
      await this.httpRequest.get(Constantes.getTamanosUrl(token)).then((data : any) => {
        var response = data.json();
        let lista = [];
        if(response["TAMANOS"] != undefined){
          /*response["TAMANOS"].forEach(tamano => {
            lista.push({"id": tamano.ID , "nombre":tamano.NOMBRE , "nombreBase":tamano.NOMBRE_BASE});
          });*/
          if(response["TAMANOS"][0].NOMBRE == 'Mediana'){
            console.log(response["TAMANOS"][0])
            lista.push({ "id": response["TAMANOS"][0].ID, "nombre": response["TAMANOS"][0].NOMBRE, "nombreBase": response["TAMANOS"][0].NOMBRE_BASE });
          }
          if(response["TAMANOS"][1].NOMBRE == 'Familiar'){
            lista.push({ "id": response["TAMANOS"][1].ID, "nombre": response["TAMANOS"][1].NOMBRE, "nombreBase": response["TAMANOS"][1].NOMBRE_BASE });
          }
          if(response["TAMANOS"][2].NOMBRE == 'Extra grande'){
            lista.push({ "id": response["TAMANOS"][2].ID, "nombre": response["TAMANOS"][2].NOMBRE, "nombreBase": response["TAMANOS"][2].NOMBRE_BASE });
          }
          loading.dismiss();
  
          this.tamanos = lista;
          if(this.objetivo == "editar-pizza"){
            this.tamanoElegido = this.tamanos[this.obtenerIndexTamano(this.pizza.tamano.nombre)]
          }else{
            this.tamanoElegido = this.tamanos[0];
          }
          
          this.pizza.tamano = this.tamanoElegido;
          /*publicacion de evento de tamano por primera vez */
          this.events.publish('cambio-tamano', this.tamanoElegido);
          
          this.masasParams        = { tamano: this.tamanoElegido };
          this.bordesParams       = { tamano: this.tamanoElegido };
          this.ingredientesParams = { tamano: this.tamanoElegido };


        }else{
          loading.dismiss();
          if(response["STATUS"] != 'OK'){
            this.cerrarPagina();
          }
        }
       
        
      }, (err)=>{
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION,"cerrar");
      });

    }
    catch(err) {
        console.log('Error: ', err.message);
    }
    
  }

  mostrarMensaje(titulo: string ,mensaje: string , cerrar?){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            if(cerrar != undefined )
              this.app.getRootNavs()[0].setRoot(HomePage)
            
          }
        }
     
        
      ]
    });
    alert.present();
    
  }

 
 cerrarPagina(){
  let alert = this.alertCtrl.create({
    title: 'Algo ha salido mal',
    message: 'Lo sentimos, estamos teniendo inconvenientes, por favor intentalo nuevamente',
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        handler: () => {
          if(this.objetivo != null){
            this.app.getRootNavs()[0].pop();
          }else{
            this.navCtrl.setRoot(HomePage)
          }
        }
      }
    ]
  });
  alert.present();
 }
   

  escucharEventos(){
    /* captura de evento de seleccion de adicionales */
    this.events.subscribe('seleccion-cupon', (cupon : Cupon) => {
      var cuponIndex
      if(cupon.checked){
        if (this.cupones.filter(function(e ,index) { return e.id === cupon.id ; }).length > 0) { //si ya contiene el elemento
          cuponIndex = this.cupones.map(function (x) { return x.id; }).indexOf(cupon.id);
          this.cupones[cuponIndex] = cupon;                                               //se reemplaza
        }else{     
          this.cupones.push(cupon);                                                              //se agrega
        }
      }else{                                                                                                        //se quita de la lista
        cuponIndex = this.cupones.map(function (x) { return x.id; }).indexOf(cupon.id);
        this.cupones.splice(cuponIndex,1 );
      }
    });
    this.events.subscribe('seleccion-adicional', (adicional : Adicional) => {
      if(adicional.checked){
        console.log(adicional)

        }
    });
    /* captura de evento de seleccion de masas */
    this.events.subscribe('seleccion-masa', (masa : Masa) => {
        this.pizza.masa = masa;
        this.actualizarPrecioTotal();
        this.bordesEnabled = true;
        this.tabRef.select(1, { animate: true });
    });
    /* captura de evento de seleccion de bordes */
    this.events.subscribe('seleccion-borde', (borde : Borde) => {
        this.pizza.borde = borde;
        this.actualizarPrecioTotal();
        this.ingredientesEnabled = true;
        this.tabRef.select(2, { animate: true });
    });
     /* captura de evento de seleccion de ingredientes cuando son agregados por primera vez o con un cambio de porcion */
    this.events.subscribe('seleccion-ingrediente', (ingrediente : Ingrediente) => {
      var ingredienteIndex  
      if(ingrediente.checked){
          if (this.pizza.ingredientes.filter(function(e ,index) { return e.id === ingrediente.id ; }).length > 0) { //si ya contiene el elemento
            ingredienteIndex = this.pizza.ingredientes.map(function (x) { return x.id; }).indexOf(ingrediente.id);
            this.pizza.ingredientes[ingredienteIndex] = ingrediente;                                               //se reemplaza
          }else{     
            this.pizza.ingredientes.push(ingrediente);                                                              //se agrega
          }    
      }else{                                                                                                        //se quita de la lista
          ingredienteIndex = this.pizza.ingredientes.map(function (x) { return x.id; }).indexOf(ingrediente.id);
          this.pizza.ingredientes.splice(ingredienteIndex,1 );
        }
        this.actualizarPrecioTotal();
    }); 
  }

  /*
  Eliminar todas las suscripciones
  */
  ngOnDestroy(){
    this.events.unsubscribe('seleccion-adicional');
    this.events.unsubscribe('seleccion-cupon');
    this.events.unsubscribe('seleccion-masa');
    this.events.unsubscribe('seleccion-borde');
    this.events.unsubscribe('seleccion-ingrediente');
    this.events.unsubscribe('carga-completa');
  }

  /**
   * Este metodo suma los costos de los elementos de la pizza (masa, borde, ingredientes)
   */
  actualizarPrecioTotal(){
     let total = 0;
     if(this.pizza.masa !=null){
       total += Number(this.pizza.masa.costo);
     }
     if(this.pizza.borde !=null){
      total += Number(this.pizza.borde.costo);
    }
    if(this.pizza.ingredientes.length >0){
      this.pizza.ingredientes.forEach(function (ingrediente : Ingrediente) {
            total += Number(ingrediente.costoBase)*Number(ingrediente.porcion.nombre=='Simple'?1:ingrediente.porcion.nombre=='Doble'?2:3) ;//* Number(ingrediente.porcion.valor);                  
      });
    }
    this.pizza.costo = total;
    this.precioTotal = total;
  }

  /**
   * Este metodo se ejecutara cuando se seleccione una
   * opcion del select
   * @param tamano contendra el objeto elegido del select
   */
  cambioTamano(tamano) {    
    /* reiniciar los valores*/
    this.pizza.masa = null;
    this.pizza.borde = null;
    this.pizza.ingredientes = [];
    this.pizza.costo =0;
    this.precioTotal = 0;
    this.masasEnabled = true;
    this.bordesEnabled = false;
    this.ingredientesEnabled = false;
    this.tabRef.select(0, { animate: true });
    this.pizza.tamano = tamano;
    /* Publica un evento que indica que se ha cambiado el tamano
       este eveno sera escuchado por los tabs para actualizar los valores
     */
    
    this.events.publish('cambio-tamano', tamano);
  }

  cambioCupones(cupones) {    
    /* reiniciar los valores*/
    //this.pizza.masa = null;
    /* Publica un evento que indica que se ha cambiado el tamano
       este eveno sera escuchado por los tabs para actualizar los valores
     */
    
    this.events.publish('cambio-cupones', cupones);
  }


  presentAlert(titulo,mensaje) {
    let alert = this.alertCtrl.create({
      title: titulo,//'Faltan los cupones',
      message: mensaje,//'Por favor selecciona al menos 1 cupon',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          
        }   
      ]
    });
    alert.present();
  }

  confirmacionGuardarPizza() {
    let alert = this.alertCtrl.create({
      title: 'Guardar pizza',
      message: '¿Deseas agregar esta pizza a tu lista de favoritas?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.irAdicionales();
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('guardar');
            this.ingresoNombrePizza();
          }
        }
      ]
    });
    alert.present();
  }

  ingresoNombrePizza() {
    let alert = this.alertCtrl.create({
      title: 'Añadir a Favoritas',
      message: 'Por favor ingresa un nombre',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('no guardo');
            this.irAdicionales();
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log(data)
            this.pizza.nombre = data["nombre"];
            this.guardarPizzaFavorita(data);            
          }
        }
      ]
    });
    alert.present();
  }

  siguiente(event){
    if(this.cupones.length > 0){
      if((Number(this.costoTotal)-this.cupones.length)>=0){
        if(this.objetivo == "nuevo-cupon"){
          this.events.publish('nuevo-cupon', this.cupones);
          this.navCtrl.pop();
        }else{
          //console.log("cupones------------------------------------------>")
          //console.log(this.cupones)
          this.navCtrl.push(CombinacionesPage , {
            cupones : this.cupones,
  
          });
  
          //this.irAdicionales();
          //this.confirmacionGuardarPizza()
        }  
      }else{
        this.presentAlert(Constantes.DIA_INCORRECTO,'Al parecer escogistes más cupones de lo permitido, revisa Cupones por usar e intenta de nuevo');
      }    
    }else{
      this.presentAlert('Faltan los cupones','Por favor, selecciona al menos 1 cupon');
    }
  }

  irAdicionales(){
    if(this.objetivo == "nueva-pizza"){
      this.events.publish('nueva-pizza', this.pizza);
      this.navCtrl.pop();
    }else{
      this.navCtrl.push(AdicionalesPage , {
        pizza : this.pizza
      });
    }
  }

  guardarPizzaFavorita(nombre : string){
      let loading = this.loadingCtrl .create({
        content: 'Cargando...'
      });
      let token = window.localStorage.getItem("userToken");
      
      let ingredientes  = [];
      this.pizza.ingredientes.forEach((element : Ingrediente )=> {
        let ingrediente = {"ID" : element.id , "PORCION": Number(element.porcion.id)}
        ingredientes.push(ingrediente);
      });
     
      let pizza ={"TOKEN": token, "PIZZA" :{"TAMANO":this.tamanoElegido["id"] , "MASA": this.pizza.masa.id , "BORDE": this.pizza.borde.id
                    , "INGREDIENTES": ingredientes} ,  "NOMBRE":nombre["nombre"] }

      console.log(pizza)
      try{
          
        this.httpRequest.post(Constantes.CREAR_FAVORITA_URL , pizza).then((data : any) => {
          var response = data.json();
          console.log(data)
          if(response["STATUS"] == "OK"){
            this.pizza.id = response["ID"];
            this.irAdicionales();
            this.presentToast("Pizza guardada en favoritas con exito")
          }
          loading.dismiss();

          
        }, (err)=>{
          this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
        });
      }
      catch(err) {
        loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
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


  @ViewChild("tabs") tabs: Tabs;
  @ViewChild(Slides) slides: Slides;

slideChange(){
    console.log(this.slides.getActiveIndex());
     if(this.slides.getActiveIndex() == 0){
        this.tabs.select(0);
        this.slides.slideTo(0);
      }
      if(this.slides.getActiveIndex() == 1){
        if(this.bordesEnabled){
          this.tabs.select(1);
          this.slides.slideTo(1);
        }
        
      }
      if(this.slides.getActiveIndex() == 2){
        if(this.ingredientesEnabled){
          this.tabs.select(2);
          this.slides.slideTo(2);
        }
        
      }
  }

  tabChange(){
    //console.log("tabchange");
    //console.log(this.tabs.getSelected().index);
    if(this.tabs.getSelected().index == 0){
      this.tabs.select(0);
      this.slides.slideTo(0);
    }
    if(this.tabs.getSelected().index == 1){
      if(this.bordesEnabled){
        this.tabs.select(1);
        this.slides.slideTo(1);
      }
    }
    if(this.tabs.getSelected().index == 2){
      if(this.ingredientesEnabled){
        this.tabs.select(2);
        this.slides.slideTo(2);
      }
    }
  }

}
