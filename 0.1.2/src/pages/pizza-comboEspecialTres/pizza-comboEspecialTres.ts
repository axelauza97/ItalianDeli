import { Component, ViewChild, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Tabs, App, AlertController, ToastController, Slides, Platform, Checkbox } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { PizzaPromo } from "../../interfaces/IPizzaPromo";
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { IngredientesPromoPage } from '../ingredientes-promo/ingredientes-promo';
import { PizzaDosPage } from '../pizza-dos/pizza-dos';
import { IngredientesPromo } from '../../interfaces/IIngredientesPromo';
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { PizzaComboNuevoDosPage } from '../pizza-combonuevoDos/pizza-combonuevoDos';
import { Borde } from '../../interfaces/IBorde';
import { PizzaComboEspecialCuatroPage } from '../pizza-comboEspecialCuatro/pizza-comboEspecialCuatro';

@IonicPage()
@Component({
  selector: 'page-pizza-comboEspecialTres',
  templateUrl: 'pizza-comboEspecialTres.html',
})
export class PizzaComboEspecialTresPage {
  @ViewChild('tabs') tabRef: Tabs;

  ingredientes: Array<IngredientesPromo>;
  public pizzas = [];
  public promocionales = [];
  ingredientesUno: Array<IngredientesPromo>;
  public tamanos: any;
  public objetivo: String;
  tamanoElegido: any;
  public costoTamaTipo: any;
  public comboCurrent: any;
  public tamanoSeleccion: any;
  ingredientesTab = IngredientesPromoPage;
  ingredientesParams = {};
  ingredientesEnabled: boolean;
  diaPromo: string;
  costoCombo: number;
  costoTotal: Number;
  tamanoEnvio: number;
  objt: String;
  ingredientesCont = [];
  combos = [];
  combo = [];
  bordes: any
  bordeElegido:any
  bordeElegidoChoice:any
  bordesChecker: Array<boolean> = new Array<boolean>();
  bordesSelector: Array<boolean> = new Array<boolean>();
  bordeClasico: any;
  valorBorde: any;
   

  pizzaTres: PizzaPromo = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1, borde: this.bordeElegidoChoice };

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
  ) {
    //this.combos = this.navParams.get("combos");
    this.combos = this.navParams.get("combos");
    //console.log("Entramosssss----------------------_>")
    //console.log(this.comboCurrent)
    this.diaPromo = this.navParams.get("promo");
    this.comboCurrent = this.navParams.get("combo");
    //this.combos = this.navParams.get("combo");
    //this.combos = this.navParams.get("combos");
    //console.log(this.combos);
    this.cargarTamanos();
    this.costoTotal=Number(this.navParams.get("costo"));
    //this.cargarCostos();
    //this.escucharEventos();
    //console.log(this.combos);
    this.objetivo = this.navParams.get("objetivo");
    //this.objetivo = this.navParams.get("objetivo");
    this.objt = "pizzaPromo";
    //this.pizzaTres = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1 };
    //this.cargarIngredientes();
    /*this.events.subscribe('cambio-tamano', (tamano: any) => {
      this.cargarIngredientes();
    });*/
  }
  /*ionViewDidEnter(){
    this.pizzaTres = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1 };
  }
  ionViewDidLeave(){
    this.pizzaTres = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1 };
  }*/
  ionViewDidLoad() {
    /*this.combos = this.navParams.get("combos");
    console.log(this.combos)
    this.diaPromo = this.navParams.get("promo");
    this.combos = this.navParams.get("combo");
    this.combos = this.navParams.get("combos");
    console.log(this.combos);
    this.cargarTamanos();
    //this.escucharEventos();
    //this.objetivo = this.navParams.get("objetivo");
    this.objt = "pizzaPromo";
    //this.cargarIngredientes();
    this.events.subscribe('cambio-tamano', (tamano: any) => {
      this.cargarIngredientes();
    });*/
  }

  obtenerIndexTamano(tamanoNombre: string) {
    for (let index = 0; index < this.tamanos.length; index++) {
      const element = this.tamanos[index];
      if (element["nombre"] == tamanoNombre) {
        console.log("econtrado")
        return index
      }
    }
    console.log("no encontrado")
    return undefined;
  }

  cargarTamanos() {
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getTamanosUrl(token)).then((data: any) => {
        var response = data.json();
        console.log(response)
        let lista = [];
        if (response["TAMANOS"] != undefined) {
          /* lista.push(response["TAMANOS"][0]);
           lista.push(response["TAMANOS"][1]);
           lista.push(response["TAMANOS"][2]);
           console.log (lista)*/
           if (response["TAMANOS"][0].NOMBRE == 'Mediana') {
            lista.push({ "id": response["TAMANOS"][0].ID, "nombre": response["TAMANOS"][0].NOMBRE, "nombreBase": response["TAMANOS"][0].NOMBRE_BASE,"seleccion": true });
          }
          if (response["TAMANOS"][1].NOMBRE == 'Familiar') {
            lista.push({ "id": response["TAMANOS"][1].ID, "nombre": response["TAMANOS"][1].NOMBRE, "nombreBase": response["TAMANOS"][1].NOMBRE_BASE,"seleccion": true });
          }
          if (response["TAMANOS"][2].NOMBRE == 'Extra grande') {
            lista.push({ "id": response["TAMANOS"][2].ID, "nombre": response["TAMANOS"][2].NOMBRE, "nombreBase": response["TAMANOS"][2].NOMBRE_BASE,"seleccion": true });
          }
          // if(response["TAMANOS"][0].NOMBRE =='Mediana' && response["TAMANOS"][1].NOMBRE=='Familiar' && response["TAMANOS"][2].NOMBRE =='Extra Grande'){
          //response["TAMANOS"].forEach(tamano => {           
          // lista.push({ "id": tamano.ID, "nombre": tamano.NOMBRE, "nombreBase": tamano.NOMBRE_BASE });           
          //})
          //}   
          this.tamanos = lista;
           //Miercoles
          /*if (this.diaPromo == this.combos[2].NOMBRE) {
            this.tamanoElegido = this.tamanos[2];
            this.pizzaTres.tamano = this.tamanos[2];
            this.cargarIngredientes();
          }
          //Jueves
          if (this.diaPromo == this.combos[3].NOMBRE) {
            this.tamanoElegido = this.tamanos[1];
            this.pizzaTres.tamano = this.tamanos[1];
            this.cargarIngredientes();
          }
          //Viernes
          if (this.diaPromo == this.combos[4].NOMBRE) {
            this.tamanoElegido = this.tamanos[0];
            this.pizzaTres.tamano = this.tamanos[0];
            this.cargarIngredientes();
          }
          //Sabados y Domingo
          if (this.diaPromo == this.combos[5].NOMBRE) {
            this.tamanoElegido = this.tamanos[0];
            this.pizzaTres.tamano = this.tamanos[0];
            this.cargarIngredientes();
          }*/
          let tamanochoice = this.navParams.get("tamanoName");
          if(tamanochoice == this.tamanos[0].nombre){
            this.tamanoElegido  = this.tamanos[0];
            this.pizzaTres.tamano = this.tamanos[0];
          }else if(tamanochoice == this.tamanos[1].nombre){
            this.tamanoElegido  = this.tamanos[1];
            this.pizzaTres.tamano = this.tamanos[0];
          }else{
            this.tamanoElegido  = this.tamanos[2];
            this.pizzaTres.tamano = this.tamanos[0];
          }
          this.cargarIngredientes();
          this.cargarBordes(this.tamanoElegido);
          this.pizzaTres.tamano = this.tamanoElegido;
         /* if (this.diaPromo == 'Ultra Pack Dominguero') {
            this.tamanoElegido = this.tamanos[0];
            this.pizzaTres.tamano = this.tamanos[0];
            this.cargarIngredientes();
          }
          if (this.diaPromo == 'Jueves Sorpresa') {
            this.tamanoElegido = this.tamanos[1];
            this.pizzaTres.tamano = this.tamanos[1];
            this.cargarIngredientes();
          }
          if (this.diaPromo == 'Miercoles Tripleta') {
            this.tamanoElegido = this.tamanos[2];
            this.pizzaTres.tamano = this.tamanos[2];
            this.cargarIngredientes();
          }
          if (this.diaPromo == 'Sabado Tetra') {
            this.tamanoElegido = this.tamanos[0];
            this.pizzaTres.tamano = this.tamanos[0];
            this.cargarIngredientes();
          }
          this.ingredientesParams = { tamano: this.tamanoElegido };*/
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
      this.httpRequest.get(Constantes.getCostosComboUrl(token)).then((data: any) => {
        var response = data.json();
        console.log("Costos----------------------------------------------_>");
        console.log(response);
        let lista = [];
        if (response["PAQUETE"] != undefined) {
          lista.push({ "COMBO": response["PAQUETE"][3].COMBO, "TAMANO": response["PAQUETE"][3].TAMANO, "COSTO": response["PAQUETE"][3].COSTO });
          lista.push({ "COMBO": response["PAQUETE"][4].COMBO, "TAMANO": response["PAQUETE"][4].TAMANO, "COSTO": response["PAQUETE"][4].COSTO });
          lista.push({ "COMBO": response["PAQUETE"][5].COMBO, "TAMANO": response["PAQUETE"][5].TAMANO, "COSTO": response["PAQUETE"][5].COSTO });
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

  cambiarBorde(){
    
  }

  ingredienteProm(ingrediente: IngredientesPromo) {
    if (ingrediente.checked == true) {
      console.log(this.ingredientesCont);
      if (this.ingredientesCont.length > 2) {
        this.presentAlerta("Ingredientes excedidos", "Solo se puede elegir hasta 2 ingredientes", "ingrediente.checked = false;");
        ingrediente.checked = false;
        console.log(ingrediente)
        return;
      }
    } else if (ingrediente.checked == false) {
      this.removeItemFromArr(this.ingredientesCont, ingrediente);
      console.log(this.ingredientesCont);
    }
  }

  presentAlerta(title: string, mensaje: string, par: string) {
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

  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }


  escucharEventos() {
    /* captura de evento de seleccion de ingredientes cuando son agregados por primera vez o con un cambio de porcion */
    this.events.subscribe('seleccion-ingrediente', (ingrediente: IngredientesPromo) => {
      var ingredienteIndex
      if (ingrediente.checked == true) {
        if (this.pizzaTres.ingredientes.length > 1) {
          //this.pizzaTres.ingredientes[0].checked = false;
          this.presentAlert("Ingredientes excedidos", "Solo puede elegir hasta dos ingredientes");
          return;
        } else {
          if (this.pizzaTres.ingredientes.filter(function (e, index) { return e.id === ingrediente.id; }).length > 0) { //si ya contiene el elemento
            ingredienteIndex = this.pizzaTres.ingredientes.map(function (x) { return x.id; }).indexOf(ingrediente.id);
            this.pizzaTres.ingredientes[ingredienteIndex] = ingrediente;                                               //se reemplaza
          } else {
            this.pizzaTres.ingredientes.push(ingrediente);                                                              //se agrega
          }
        }
        console.log(this.pizzaTres.ingredientes)
      } else {
        this.removeItemFromArr(this.pizzaTres.ingredientes, ingrediente);

      }
    });
  }

  terminarEventos() {
    this.events.unsubscribe('seleccion-ingrediente');
  }

  /*Eliminar todas las suscripciones*/
  ngOnDestroy() {
    this.events.unsubscribe('seleccion-ingrediente');
    this.events.unsubscribe('carga-completa');
  }


  cambioTamano() {
    /* reiniciar los valores
    this.pizzaTres.ingredientes = [];
    this.ingredientesCont = [];
    this.ingredientesEnabled = false;
    this.pizzaTres.tamano = tamano;
    console.log(this.pizzaTres.tamano)
     Publica un evento que indica que se ha cambiado el tamano
       este evento sera escuchado por los tabs para actualizar los valores
    
    this.events.publish('cambio-tamano', tamano);*/
    if(this.comboCurrent['COSTOS'].length==1){
      this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[0]);
      this.costoTotal=Number(this.comboCurrent.COSTOS[0]);
      this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[0]);
    }else if(this.comboCurrent['COSTOS'].length==2){
      if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[1].id ==this.comboCurrent['TAMANOS'][1])){
        if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
          this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[0]);
          this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[0]);
          this.costoTotal=Number(this.comboCurrent.COSTOS[0]);
        }else if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
          this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[1]);
          this.costoTotal=Number(this.comboCurrent.COSTOS[1]);
          this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[1]);
          //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
        }
      }else if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
        if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
          //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[0].COSTO);
          this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[0]);
          this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[0]);
          this.costoTotal=Number(this.comboCurrent.COSTOS[0]);
        }else if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
          this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[1]);
          this.costoTotal=Number(this.comboCurrent.COSTOS[1]);
          this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[1]);
          //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
        }
      }else if((this.tamanos[1].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
        if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
          this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[0]);
          this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[0]);
          this.costoTotal=Number(this.comboCurrent.COSTOS[0]);
        }else if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
          this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[1]);
          this.costoTotal=Number(this.comboCurrent.COSTOS[1]);
          this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[1]);
          //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
        }
      }
    }else if(this.comboCurrent['COSTOS'].length==3){
      if(this.tamanoElegido.nombreBase =="MEDIANA"){
        //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[0].COSTO);
        this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[0]);
        this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[0]);
        this.costoTotal=Number(this.comboCurrent.COSTOS[0]);
      }else if(this.tamanoElegido.nombreBase =="FAMILIAR"){
        this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[1]);
        this.costoTotal=Number(this.comboCurrent.COSTOS[1]);
        this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[1]);
        //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
      }else if(this.tamanoElegido.nombreBase =="EXTRA GRANDE"){
        this.comboCurrent['COSTO'] = Number(this.comboCurrent.COSTOS[2]);
        this.costoTotal=Number(this.comboCurrent.COSTOS[2]);
        this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[2]);
        //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[2].COSTO);
      }
    }
    console.log("Costos------------------------------------------------->");
    console.log(this.costoTotal);
    console.log(this.tamanos);
    console.log(this.tamanoElegido);
    console.log(this.comboCurrent);
  }


  presentAlert(title: string, mensaje: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });
    alert.present();
  }

  editarPizzas() {
    if (this.objetivo == 'editar-pizza') {
      let combo = this.navParams.get("combo");
      this.promocionales = this.navParams.get("promocionales"); //pizza que se quiere editar
      this.ingredientesEnabled = true;
      this.promocionales.forEach((pizzaTres) => {
        this.promocionales[0]["ingredientes"] = this.pizzaTres.ingredientes;
        console.log(this.promocionales[0]['ingredientes']);
        //this.pizzaTres.ingredientes = pizzaTres.ingredientes;
        if (pizzaTres.ingredientes.length < 2) {
          this.presentAlert('Faltan ingredientes', 'Por favor selecciona 2 ingrediente');
        }
        else {
          console.log(combo)
          this.navCtrl.push(CombinacionesPage, {
            promocionales: this.promocionales,
            promo: this.diaPromo,
            costo: this.costoCombo,
            opcional: this.objt,
            combo: combo
          });
        }
      });
    }
    this.terminarEventos();
  }


  cargarIngredientes() {
    let tamanos = this.tamanoElegido;
    /*let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();*/
    this.ingredientes = new Array<IngredientesPromo>();
    try {
      let token = window.localStorage.getItem("userToken");
      //tamanos.id
      this.httpRequest.get(Constantes.getTamanosIngredientesUrl(token, "1")).then((data: any) => {
        var response = data.json();
        console.log("ingredentes------------------------------------------------------>");
        console.log(response);
        if (response["INGREDIENTES"] != undefined) {
          response["INGREDIENTES"].forEach((child: any) => {
            if(this.comboCurrent.ID=='34' && (child.NOMBRE=='Jamón de Res'||child.NOMBRE=='Pepperoni'||child.NOMBRE=='Tocino')){
              let ingrediente: IngredientesPromo = {
                id: child.ID,
                nombre: child.NOMBRE,
                descripcion: child.DESCRIPCION,
                imagenUrl: child.IMAGEN_URL,
                checked: false,
                seleccion: null
              }
              this.ingredientes.push(ingrediente);
            }else{
              let ingrediente: IngredientesPromo = {
                id: child.ID,
                nombre: child.NOMBRE,
                descripcion: child.DESCRIPCION,
                imagenUrl: child.IMAGEN_URL,
                checked: false,
                seleccion: null
              }
              this.ingredientes.push(ingrediente);
            }
            
          });
          /* avisa que ya se ha terminado de cargar los bordes, para recibir cualquier pizza que se desee editar */
          this.events.publish('carga-completa', "ingredientes");
          //loading.dismiss();

        } else {
          //loading.dismiss();
          if (response["STATUS"] != 'OK') {
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          }
        }
      });
    }
    catch (err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
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
          let index = 0
          response["BORDES"].forEach((child :any) => {
            let borde:Borde ={
              id: child.ID,
              nombre : child.NOMBRE,
              descripcion : child.DESCRIPCION,
              tamano : child.TAMANO,
              costo : child.COSTO
            }
            if(index == 0){
              this.bordeClasico = borde
            } else {
              this.valorBorde = borde.costo
              this.bordes.push(borde);
              this.bordesChecker.push(false)
              this.bordesSelector.push(false)
            }
            index++;
          });
          //this.bordes=bordesList;
          this.bordeElegido = this.bordeClasico;
          this.bordeElegidoChoice = this.bordeClasico
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

  handlerCheckbox2(borde: Borde, index){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    if(this.bordesChecker[index] == true){
        this.bordeElegido = borde
        this.bordeElegidoChoice = this.bordeElegido
        this.bloquearAdicionBordes(this.bordesSelector)
    }else if(this.bordesChecker[index] == false){
        this.bordeElegidoChoice = this.bordeClasico
        this.bloquearAdicionBordes2(this.bordesSelector)
    }


    loading.dismiss();
  }

  bloquearAdicionBordes(bordes){
    let index = 0
    bordes.forEach(selector =>{
      if(this.bordesChecker[index] == true)
        this.bordesSelector[index] = false
      else
      this.bordesSelector[index] = true
      index++
    });
  }

  bloquearAdicionBordes2(bordes){
    let index = 0
    bordes.forEach(selector =>{
      this.bordesSelector[index] = false
      index++
    });
  }

  handlerCheckbox(ingrediente: IngredientesPromo) {
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    if (ingrediente.checked == true) {
      this.ingredientesCont.push(ingrediente);
      this.bloquearAdiccionIngredientes(this.ingredientes);
    } else if (ingrediente.checked == false) {
      this.removeItemFromArr(this.ingredientesCont, ingrediente);
      this.bloquearAdiccionIngredientes(this.ingredientes);
    }
    loading.dismiss();
  }

  bloquearAdiccionIngredientes(ingredientes) {
    ingredientes.forEach(ingrediente => {
      if(this.comboCurrent.INGREDIENTES.length==3){
        if(this.tamanoElegido.nombreBase =="MEDIANA"){
          //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[0].COSTO);
          if(this.comboCurrent.INGREDIENTES[0]==1){
            if (this.ingredientesCont.length == 0 ) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==2){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==3){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==4){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==5){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }
        }else if(this.tamanoElegido.nombreBase =="FAMILIAR"){
          if(this.comboCurrent.INGREDIENTES[1]==1){
            if (this.ingredientesCont.length == 0 ) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[1]==2){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[1]==3){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[1]==4){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[1]==5){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }
        }else if(this.tamanoElegido.nombreBase =="EXTRA GRANDE"){
          if(this.comboCurrent.INGREDIENTES[2]==1){
            if (this.ingredientesCont.length == 0 ) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[2]==2){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[2]==3){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[2]==4){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }else if(this.comboCurrent.INGREDIENTES[2]==5){
            if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
              ingrediente.seleccion = false;
            }
            else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
              ingrediente.seleccion = false;
            } else {
              ingrediente.seleccion = true;
            }
          }
        } 
      }
      if(this.comboCurrent.INGREDIENTES.length==2){
        if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[1].id ==this.comboCurrent['TAMANOS'][1])){
          if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
            if(this.comboCurrent.INGREDIENTES[0]==1){
              if (this.ingredientesCont.length == 0 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==2){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==3){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==4){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==5){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }
          }else if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
            if(this.comboCurrent.INGREDIENTES[1]==1){
              if (this.ingredientesCont.length == 0 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==2){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==3){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==4){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==5){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }
          }
        }else if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
          if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
            if(this.comboCurrent.INGREDIENTES[0]==1){
              if (this.ingredientesCont.length == 0 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==2){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==3){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==4){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==5){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }
          }else if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
            if(this.comboCurrent.INGREDIENTES[1]==1){
              if (this.ingredientesCont.length == 0 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==2){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==3){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==4){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==5){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }
            //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
          }
        }else if((this.tamanos[1].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
          if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
            if(this.comboCurrent.INGREDIENTES[0]==1){
              if (this.ingredientesCont.length == 0 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==2){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==3){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==4){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==5){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }
          }else if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
            if(this.comboCurrent.INGREDIENTES[1]==1){
              if (this.ingredientesCont.length == 0 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==2){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==3){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==4){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==5){
              if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
                ingrediente.seleccion = false;
              }
              else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
                ingrediente.seleccion = false;
              } else {
                ingrediente.seleccion = true;
              }
            }
            //this.comboCurrent['COSTO'] = Number(this.costoTamaTipo[1].COSTO);
          }
        }
      }else if (this.comboCurrent.INGREDIENTES.length==1){
        if(this.comboCurrent.INGREDIENTES[0]==1){
          if (this.ingredientesCont.length == 0 ) {
            ingrediente.seleccion = false;
          }
          else if (this.ingredientesCont.length == 1 && ingrediente.checked == true) {
            ingrediente.seleccion = false;
          } else {
            ingrediente.seleccion = true;
          }
        }else if(this.comboCurrent.INGREDIENTES[0]==2){
          if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1 ) {
            ingrediente.seleccion = false;
          }
          else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
            ingrediente.seleccion = false;
          } else {
            ingrediente.seleccion = true;
          }
        }else if(this.comboCurrent.INGREDIENTES[0]==3){
          if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2) {
            ingrediente.seleccion = false;
          }
          else if (this.ingredientesCont.length == 3 && ingrediente.checked == true) {
            ingrediente.seleccion = false;
          } else {
            ingrediente.seleccion = true;
          }
        }else if(this.comboCurrent.INGREDIENTES[0]==4){
          if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3) {
            ingrediente.seleccion = false;
          }
          else if (this.ingredientesCont.length == 4 && ingrediente.checked == true) {
            ingrediente.seleccion = false;
          } else {
            ingrediente.seleccion = true;
          }
        }else if(this.comboCurrent.INGREDIENTES[0]==5){
          if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1  || this.ingredientesCont.length == 2 || this.ingredientesCont.length == 3 || this.ingredientesCont.length == 4) {
            ingrediente.seleccion = false;
          }
          else if (this.ingredientesCont.length == 5 && ingrediente.checked == true) {
            ingrediente.seleccion = false;
          } else {
            ingrediente.seleccion = true;
          }
        }
      }
    });
  }


  eventoSeleccion() {
    this.ingredientesCont.forEach(ingrediente => {
      this.pizzaTres.ingredientes.push(ingrediente);
    });
  }
  eventoPublicar() {
    this.events.subscribe('seleccion-ingrediente', (ingrediente: IngredientesPromo) => {
      if (ingrediente.checked == true) {
        this.events.publish('seleccion-ingrediente', ingrediente);
      }
    });
  }

  siguiente() {
    this.eventoSeleccion();
    if (this.comboCurrent.ID==0) {
      if (this.pizzaTres.ingredientes.length == 0) {
        this.presentAlert('Faltan ingredientes', 'No has seleccionado ningún ingrediente');
        return;
      }if(this.comboCurrent.INGREDIENTES.length==3){
        if(this.tamanoElegido.nombreBase =="MEDIANA"){
          if(this.comboCurrent.INGREDIENTES[0]==2) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[0]==3) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[0]==4) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 3){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[0]==5) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 3){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }
            else if (this.pizzaTres.ingredientes.length == 4){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }
        }else if(this.tamanoElegido.nombreBase =="FAMILIAR"){
          if(this.comboCurrent.INGREDIENTES[1]==2) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[1]==3) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[1]==4) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 3){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[1]==5) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 3){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }
            else if (this.pizzaTres.ingredientes.length == 4){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }
        }else if(this.tamanoElegido.nombreBase =="EXTRA GRANDE"){
          if(this.comboCurrent.INGREDIENTES[2]==2) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[2]==3) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[2]==4) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 3){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }if(this.comboCurrent.INGREDIENTES[2]==5) {
            if (this.pizzaTres.ingredientes.length == 1){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 2){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
              return;
            }else if (this.pizzaTres.ingredientes.length == 3){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
              return;
            }
            else if (this.pizzaTres.ingredientes.length == 4){
              this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
              return;
            }
          }
        }
      }if(this.comboCurrent.INGREDIENTES.length==2){
        if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[1].id ==this.comboCurrent['TAMANOS'][1])){
          if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
            if(this.comboCurrent.INGREDIENTES[0]==2) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==3) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==4) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==5) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }
              else if (this.pizzaTres.ingredientes.length == 4){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }
          }if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
            if(this.comboCurrent.INGREDIENTES[1]==2) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[1]==3) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[1]==4) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[1]==5) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }
              else if (this.pizzaTres.ingredientes.length == 4){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }
          }
        }else if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
          if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
            if(this.comboCurrent.INGREDIENTES[0]==2) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==3) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==4) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==5) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }
              else if (this.pizzaTres.ingredientes.length == 4){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }
          }if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
            if(this.comboCurrent.INGREDIENTES[1]==2) {
              if(this.comboCurrent.INGREDIENTES[1]==2) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }if(this.comboCurrent.INGREDIENTES[1]==3) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 2){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }if(this.comboCurrent.INGREDIENTES[1]==4) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 2){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 3){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }if(this.comboCurrent.INGREDIENTES[1]==5) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 2){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 3){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                  return;
                }
                else if (this.pizzaTres.ingredientes.length == 4){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }
            }
          }
        }else if((this.tamanos[1].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
          if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
            if(this.comboCurrent.INGREDIENTES[0]==2) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==3) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==4) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }if(this.comboCurrent.INGREDIENTES[0]==5) {
              if (this.pizzaTres.ingredientes.length == 1){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 2){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                return;
              }else if (this.pizzaTres.ingredientes.length == 3){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                return;
              }
              else if (this.pizzaTres.ingredientes.length == 4){
                this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                return;
              }
            }
          }if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
            if(this.comboCurrent.INGREDIENTES[1]==2) {
              if(this.comboCurrent.INGREDIENTES[1]==2) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }if(this.comboCurrent.INGREDIENTES[1]==3) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 2){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }if(this.comboCurrent.INGREDIENTES[1]==4) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 2){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 3){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }if(this.comboCurrent.INGREDIENTES[1]==5) {
                if (this.pizzaTres.ingredientes.length == 1){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 2){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
                  return;
                }else if (this.pizzaTres.ingredientes.length == 3){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
                  return;
                }
                else if (this.pizzaTres.ingredientes.length == 4){
                  this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
                  return;
                }
              }
            }
          }
        }
      }if(this.comboCurrent.INGREDIENTES.length==1){
        if(this.comboCurrent.INGREDIENTES[0]==2) {
          if (this.pizzaTres.ingredientes.length == 1){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
            return;
          }
        }if(this.comboCurrent.INGREDIENTES[0]==3) {
          if (this.pizzaTres.ingredientes.length == 1){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
            return;
          }else if (this.pizzaTres.ingredientes.length == 2){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
            return;
          }
        }if(this.comboCurrent.INGREDIENTES[0]==4) {
          if (this.pizzaTres.ingredientes.length == 1){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
            return;
          }else if (this.pizzaTres.ingredientes.length == 2){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
            return;
          }else if (this.pizzaTres.ingredientes.length == 3){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
            return;
          }
        }if(this.comboCurrent.INGREDIENTES[0]==5) {
          if (this.pizzaTres.ingredientes.length == 1){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona cuatro ingredientes más');
            return;
          }else if (this.pizzaTres.ingredientes.length == 2){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona tres ingredientes más');
            return;
          }else if (this.pizzaTres.ingredientes.length == 3){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona dos ingredientes más');
            return;
          }
          else if (this.pizzaTres.ingredientes.length == 4){
            this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
            return;
          }
        } 
      }
      /*else if (this.pizzaTres.ingredientes.length == 0) {
          this.presentAlert('Faltan ingredientes', 'No has seleccionado ningún ingrediente');
          return;
      }*///else {
        if(this.comboCurrent.INGREDIENTES.length==3){
          if(this.tamanoElegido.nombreBase =="MEDIANA"){
            if(this.comboCurrent.INGREDIENTES[0]==5){
              if(this.pizzaTres.ingredientes.length>5){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==4){
              if(this.pizzaTres.ingredientes.length>4){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==3){
              if(this.pizzaTres.ingredientes.length>3){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==2){
              if(this.pizzaTres.ingredientes.length>2){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              }
            }else if(this.comboCurrent.INGREDIENTES[0]==1){
              if(this.pizzaTres.ingredientes.length>1){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              }
            }
          }else if(this.tamanoElegido.nombreBase =="FAMILIAR"){
            if(this.comboCurrent.INGREDIENTES[1]==5){
              if(this.pizzaTres.ingredientes.length>5){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==4){
              if(this.pizzaTres.ingredientes.length>4){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==3){
              if(this.pizzaTres.ingredientes.length>3){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==2){
              if(this.pizzaTres.ingredientes.length>2){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              }
            }else if(this.comboCurrent.INGREDIENTES[1]==1){
              if(this.pizzaTres.ingredientes.length>1){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              }
            }
          }else if(this.tamanoElegido.nombreBase =="EXTRA GRANDE"){
            if(this.comboCurrent.INGREDIENTES[2]==5){
              if(this.pizzaTres.ingredientes.length>5){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
              }
            }else if(this.comboCurrent.INGREDIENTES[2]==4){
              if(this.pizzaTres.ingredientes.length>4){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
              }
            }else if(this.comboCurrent.INGREDIENTES[2]==3){
              if(this.pizzaTres.ingredientes.length>3){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
              }
            }else if(this.comboCurrent.INGREDIENTES[2]==2){
              if(this.pizzaTres.ingredientes.length>2){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              }
            }else if(this.comboCurrent.INGREDIENTES[2]==1){
              if(this.pizzaTres.ingredientes.length>1){
                var ingredientescpy=this.pizzaTres.ingredientes;
                this.pizzaTres.ingredientes=[];
                this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              }
            }
          }
        }if(this.comboCurrent.INGREDIENTES.length==2){
          if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[1].id ==this.comboCurrent['TAMANOS'][1])){
            if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
              if(this.comboCurrent.INGREDIENTES[0]==5){
                if(this.pizzaTres.ingredientes.length>5){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==4){
                if(this.pizzaTres.ingredientes.length>4){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==3){
                if(this.pizzaTres.ingredientes.length>3){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==2){
                if(this.pizzaTres.ingredientes.length>2){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==1){
                if(this.pizzaTres.ingredientes.length>1){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                }
              }
            }if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
              if(this.comboCurrent.INGREDIENTES[1]==5){
                if(this.pizzaTres.ingredientes.length>5){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
                }
              }else if(this.comboCurrent.INGREDIENTES[1]==4){
                if(this.pizzaTres.ingredientes.length>4){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                }
              }else if(this.comboCurrent.INGREDIENTES[1]==3){
                if(this.pizzaTres.ingredientes.length>3){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                }
              }else if(this.comboCurrent.INGREDIENTES[1]==2){
                if(this.pizzaTres.ingredientes.length>2){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                }
              }else if(this.comboCurrent.INGREDIENTES[1]==1){
                if(this.pizzaTres.ingredientes.length>1){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                }
              }
            }
          }else if((this.tamanos[0].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
            if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
              if(this.comboCurrent.INGREDIENTES[0]==5){
                if(this.pizzaTres.ingredientes.length>5){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==4){
                if(this.pizzaTres.ingredientes.length>4){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==3){
                if(this.pizzaTres.ingredientes.length>3){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==2){
                if(this.pizzaTres.ingredientes.length>2){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==1){
                if(this.pizzaTres.ingredientes.length>1){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                }
              }
            }if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
              if(this.comboCurrent.INGREDIENTES[1]==2) {
                if(this.comboCurrent.INGREDIENTES[1]==5){
                  if(this.pizzaTres.ingredientes.length>5){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==4){
                  if(this.pizzaTres.ingredientes.length>4){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==3){
                  if(this.pizzaTres.ingredientes.length>3){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==2){
                  if(this.pizzaTres.ingredientes.length>2){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==1){
                  if(this.pizzaTres.ingredientes.length>1){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  }
                }
              }
            }
          }else if((this.tamanos[1].id ==this.comboCurrent['TAMANOS'][0])&&(this.tamanos[2].id ==this.comboCurrent['TAMANOS'][1])){
            if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][0]){
              if(this.comboCurrent.INGREDIENTES[0]==5){
                if(this.pizzaTres.ingredientes.length>5){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==4){
                if(this.pizzaTres.ingredientes.length>4){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==3){
                if(this.pizzaTres.ingredientes.length>3){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==2){
                if(this.pizzaTres.ingredientes.length>2){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                }
              }else if(this.comboCurrent.INGREDIENTES[0]==1){
                if(this.pizzaTres.ingredientes.length>1){
                  var ingredientescpy=this.pizzaTres.ingredientes;
                  this.pizzaTres.ingredientes=[];
                  this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                }
              }
            }if(this.tamanoElegido.id ==this.comboCurrent['TAMANOS'][1]){
              if(this.comboCurrent.INGREDIENTES[1]==2) {
                if(this.comboCurrent.INGREDIENTES[1]==5){
                  if(this.pizzaTres.ingredientes.length>5){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==4){
                  if(this.pizzaTres.ingredientes.length>4){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==3){
                  if(this.pizzaTres.ingredientes.length>3){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==2){
                  if(this.pizzaTres.ingredientes.length>2){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
                  }
                }else if(this.comboCurrent.INGREDIENTES[1]==1){
                  if(this.pizzaTres.ingredientes.length>1){
                    var ingredientescpy=this.pizzaTres.ingredientes;
                    this.pizzaTres.ingredientes=[];
                    this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
                  }
                }
              }
            }
          }
        }if(this.comboCurrent.INGREDIENTES.length==1){
          if(this.comboCurrent.INGREDIENTES[0]==5){
            if(this.pizzaTres.ingredientes.length>5){
              var ingredientescpy=this.pizzaTres.ingredientes;
              this.pizzaTres.ingredientes=[];
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-5]);
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==4){
            if(this.pizzaTres.ingredientes.length>4){
              var ingredientescpy=this.pizzaTres.ingredientes;
              this.pizzaTres.ingredientes=[];
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-4]);
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==3){
            if(this.pizzaTres.ingredientes.length>3){
              var ingredientescpy=this.pizzaTres.ingredientes;
              this.pizzaTres.ingredientes=[];
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==2){
            if(this.pizzaTres.ingredientes.length>2){
              var ingredientescpy=this.pizzaTres.ingredientes;
              this.pizzaTres.ingredientes=[];
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
            }
          }else if(this.comboCurrent.INGREDIENTES[0]==1){
            if(this.pizzaTres.ingredientes.length>1){
              var ingredientescpy=this.pizzaTres.ingredientes;
              this.pizzaTres.ingredientes=[];
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
            }
          }
          //console.log("pizza uno --------------------------------------->");
          //console.log(this.pizzaTres);
          //console.log(this.bordeElegidoChoice);
          this.eventoPublicar();
          this.pizzaTres.nombre = "Pizza Tres";
          //this.pizzaTres.costo=Number(this.comboCurrent.COSTOS[2]);
          this.pizzaTres.borde = this.bordeElegidoChoice
          
          this.combo = this.navParams.get("combo");
    
          //this.pizzaTres.cantidad=30;
          if(this.combo['PIZZAS'].length>3){//si se regresa con el boton atras 
            var pizzascpy = this.combo['PIZZAS'];
            this.combo['PIZZAS'] = [];
            this.combo['PIZZAS'].push(pizzascpy[pizzascpy.length-1]);
            this.combo['PIZZAS'].push(pizzascpy[pizzascpy.length-2]);
            this.combo['PIZZAS'].push(pizzascpy[pizzascpy.length-3]);
          }else if(this.combo['PIZZAS'].length==2){
            this.combo['PIZZAS'].push(this.pizzaTres);
          }
          this.pizzaTres.costo=Number((this.comboCurrent.COSTO)/this.comboCurrent.NUM_PIZZAS);
          //this.costoTotal=Number(this.costoTotal)+Number(this.comboCurrent.COSTOS[2])
          if(this.comboCurrent.NUM_PIZZAS>3){
            this.abrirPizzaCuatro();
          }else{
            this.abrirCombinaciones();
          }
          /*if(this.comboCurrent.NUM_PIZZAS>1){

          }else{
            //this.abrirCombinaciones();
          }*/
          /*if(this.pizzaTres.ingredientes.length>3){
            var ingredientescpy=this.pizzaTres.ingredientes;
            this.pizzaTres.ingredientes=[];
            if(this.pizzaTres.ingredientes.length==1){
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);  
            }else if(this.pizzaTres.ingredientes.length==2){
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
            this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);  
            }else if(this.pizzaTres.ingredientes.length==3){
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
              this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-3]);
            }
          }

          
          this.eventoPublicar();
          this.pizzaTres.nombre = "Pizza Uno";
          //Little
          if (this.comboCurrent.ID=='35') {
            this.costoCombo = this.navParams.get('costo');
            this.pizzaTres.costo = this.costoCombo / 2;
            this.tamanoEnvio = this.pizzaTres.tamano;
            this.pizzaTres.borde = this.bordeElegidoChoice
            this.abrirPizzaDos();
          } */ 
        }
    }
    this.terminarEventos();
  }

  abrirPizzaCuatro() {
    if(this.objetivo == "nuevo-combo"){
      //this.navCtrl.pop();
      this.navCtrl.push(PizzaComboEspecialCuatroPage, {
        promocionales: this.pizzas,
        promo: this.diaPromo,
        costo: this.costoTotal,
        opcional: this.objt,
        combo: this.combo,
        combos : this.combos,
        tamanoName: this.tamanoElegido.nombre,
        objetivo : "nuevo-combo"
      })
    }else{//si es la primera cosacha paso 2.....
      this.navCtrl.push(PizzaComboEspecialCuatroPage, {
        promocionales: this.pizzas,
        promo: this.diaPromo,
        costo: this.costoTotal,
        opcional: this.objt,
        combo: this.combo,
        combos : this.combos,
        tamanoName: this.tamanoElegido.nombre,
      });
    }
  }

  abrirCombinaciones() {
    // let combo = this.navParams.get("combo");
    
    /*console.log("AbrirCombinaciones-------------------------------------------->");
    console.log(this.pizzas);
    console.log(this.diaPromo);
    console.log(Number(this.comboCurrent.COSTOS[0]));
    console.log(this.objt);
    console.log(this.combo);
    console.log(this.combos);
    console.log(this.tamanoElegido.nombre);*/
    //console.log(this.bordeElegidoChoice);
    if(this.objetivo == "nuevo-combo"){
      //console.log("Hola tamaño------------------------------------->")
      //console.log(this.tamanoElegido)
      this.events.publish('nuevo-combo', this.combo);
      //console.log("volviendo a combinaciones pop")
      //console.log(this.combo)
      this.navCtrl.pop();
      this.navCtrl.pop();
      this.navCtrl.pop();
    }else{//si es la primera cosacha paso 3 completo....
      this.navCtrl.push(CombinacionesPage, {
        promocionales: this.pizzas,
        promo: this.diaPromo,
        costo: this.costoTotal,
        opcional: this.objt,
        combo: this.combo,
        combos : this.combos,
        tamanoName: this.tamanoElegido.nombre,
      });
    }
  }

  @ViewChild("tabs") tabs: Tabs;
  @ViewChild(Slides) slides: Slides;
}
