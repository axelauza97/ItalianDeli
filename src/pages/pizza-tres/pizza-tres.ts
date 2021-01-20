
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Tabs, App, AlertController, ToastController, Slides, Platform, isActivatable } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { PizzaPromo } from "../../interfaces/IPizzaPromo";
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { IngredientesPromo } from '../../interfaces/IIngredientesPromo';
import { IngredientesPromoPage } from '../ingredientes-promo/ingredientes-promo';
import { CombinacionesPage } from '../combinaciones/combinaciones';
import { PizzaCuatroPage } from '../pizza-cuatro/pizza-cuatro';
import { Borde } from '../../interfaces/IBorde';


@IonicPage()
@Component({
  selector: 'page-pizza-tres',
  templateUrl: 'pizza-tres.html',
})
export class PizzaTresPage {
  @ViewChild('tabs') tabRef: Tabs;

  public pizzas = [];
  public promocionales = [];
  pizzaTres: PizzaPromo;
  ingredientesTres: Array<IngredientesPromo>;
  ingredientes: Array<IngredientesPromo>;
  ingredientesCont = [];
  tamanos: any;
  objetivo: String;
  objt: String
  tamanoElegido: any;
  /*   Tabs  */
  ingredientesTab = IngredientesPromoPage;
  ingredientesParams = {};
  ingredientesEnabled: boolean;
  diaPromo: string;
  costoCombo: number;
  tamanoPizza: any;
  combos = [];
  combo = [];
  bordes: any
  bordeElegido:any
  bordeElegidoChoice:any
  bordesChecker: Array<boolean> = new Array<boolean>();
  bordesSelector: Array<boolean> = new Array<boolean>();
  bordeClasico: any;
  valorBorde: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public httpRequest: HttpRequestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events,
    public toastCtrl: ToastController) {
      this.objetivo = this.navParams.get("objetivo");
      this.combos = this.navParams.get("combos");
      
  }

  ionViewDidLoad() {
    //this.escucharEventos();

    this.objetivo = this.navParams.get("objetivo");
    this.diaPromo = this.navParams.get("promo");
    //this.combos = this.navParams.get("combos");
    this.tamanoPizza = this.navParams.get("tamanoPizza");
    console.log(this.tamanoPizza);
    this.costoCombo = this.navParams.get('costo');

    this.cargarTamanos();

    let pizzas = this.navParams.get("pizzas");
    if (this.objetivo != 'editar-pizza') {
      pizzas.forEach(pizza => {
        this.pizzas.push(pizza)
      });
    }

    this.pizzaTres = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1, borde: null };  
    if (this.objetivo != 'editar-pizza') {
      this.pizzas.push(this.pizzaTres);
    }
    this.objt = "pizzaPromo"
  }
  /*ionViewDidEnter(){
    this.pizzaTres = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1 };
  }
  /ionViewDidLeave(){
    this.pizzaTres = { ingredientes: [], nombre: null, descripcion: "Pizza combo promocional", imgUrl: null, tamano: null, costo: null, cantidad: 1 };
  }*/

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

  /*async cargarTamanos(){
    try {
      let token = window.localStorage.getItem("userToken");
      await this.httpRequest.get(Constantes.getTamanosUrl(token)).then((data : any) => {
        var response = data.json();
        let lista = [];
        if(response["TAMANOS"] != undefined){
          response["TAMANOS"].forEach(tamano => {
            lista.push({"id": tamano.ID , "nombre":tamano.NOMBRE , "nombreBase":tamano.NOMBRE_BASE});
          });
          this.tamanos = lista;
          if (this.diaPromo == 'Ultra Pack Dominguero') {
            this.tamanoElegido = this.tamanos[this.tamanoPizza];
          }
          if (this.diaPromo == 'Jueves Sorpresa') {
            this.tamanoElegido = this.tamanos[1];
          }
          if (this.diaPromo == 'Miercoles Tripleta' || this.diaPromo == 'Sabado Tetra') {
            this.tamanoElegido = this.tamanos[2];
          }               
          this.ingredientesParams = { tamano: this.tamanoElegido };
        }else{
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
  }*/

  cargarTamanos() {
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getTamanosUrl(token)).then((data: any) => {
        var response = data.json();
        console.log(response)
        let lista = [];
        if (response["TAMANOS"] != undefined) {
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

          if (this.tamanoPizza.nombre == this.tamanos[0].nombre) {
            this.tamanoElegido = this.tamanos[0];
            this.pizzaTres.tamano = this.tamanos[0];
            this.cargarIngredientes();
          }
          if (this.tamanoPizza.nombre == this.tamanos[1].nombre) {
            this.tamanoElegido = this.tamanos[1];
            this.pizzaTres.tamano = this.tamanos[1];
            this.cargarIngredientes();
          }
          if (this.tamanoPizza.nombre == this.tamanos[2].nombre) {
            this.tamanoElegido = this.tamanos[2];
            this.pizzaTres.tamano = this.tamanos[2];
            this.cargarIngredientes();
          }
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
            if(pizza == null)
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

  cargarIngredientes() {
    console.log(this.tamanos);
    //let tamanos = this.navParams.get("tamano");
    let tamanos = this.tamanoElegido;

   /* let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();*/
    this.ingredientes = new Array<IngredientesPromo>();
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getTamanosIngredientesUrl(token, tamanos.id)).then((data: any) => {
        var response = data.json();
        console.log(response)
        if (response["INGREDIENTES"] != undefined) {
          response["INGREDIENTES"].forEach((child: any) => {
            let ingrediente: IngredientesPromo = {
              id: child.ID,
              nombre: child.NOMBRE,
              descripcion: child.DESCRIPCION,
              imagenUrl: child.IMAGEN_URL,
              checked: false,
              seleccion: null
            }
            this.ingredientes.push(ingrediente);
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

  handlerCheckbox(ingrediente: IngredientesPromo) {
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    if (ingrediente.checked == true) {
      this.ingredientesCont.push(ingrediente);
      this.bloquearAdiccionIngredientes(this.ingredientes);
      console.log(this.ingredientesCont);
    } else if (ingrediente.checked == false) {
      this.removeItemFromArr(this.ingredientesCont, ingrediente);
      this.bloquearAdiccionIngredientes(this.ingredientes);
    }
    console.log(this.ingredientes);
    loading.dismiss();
  }

  bloquearAdiccionIngredientes(ingredientes) {
    ingredientes.forEach(ingrediente => {
      if (this.ingredientesCont.length == 0 || this.ingredientesCont.length == 1) {
        ingrediente.seleccion = false;
      }
      else if (this.ingredientesCont.length == 2 && ingrediente.checked == true) {
        ingrediente.seleccion = false;
      } else {
        ingrediente.seleccion = true;
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

  escucharEventos() {
    this.events.subscribe('seleccion-ingrediente', (ingredienteTres: IngredientesPromo) => {
      var ingredienteIndex
      if (ingredienteTres.checked) {
        if (this.pizzaTres.ingredientes.length > 1) {
          this.ingredientesEnabled = false;
          ingredienteTres.checked = false;
          this.presentAlert("Ingredientes excedidos", "Solo puede elegir dos ingredientes");
          this.pizzaTres.ingredientes.length = 1
        } else {
          if (this.pizzaTres.ingredientes.filter(function (e, index) { return e.id === ingredienteTres.id; }).length > 0) { //si ya contiene el elemento
            ingredienteIndex = this.pizzaTres.ingredientes.map(function (x) { return x.id; }).indexOf(ingredienteTres.id);
            this.pizzaTres.ingredientes[ingredienteIndex] = ingredienteTres;                                              //se reemplaza
          } else {
            this.pizzaTres.ingredientes.push(ingredienteTres);                                                             //se agrega
          }
        }
      } else {                                                                                                        //se quita de la lista
        ingredienteIndex = this.pizzaTres.ingredientes.map(function (x) { return x.id; }).indexOf(ingredienteTres.id);
        this.pizzaTres.ingredientes.splice(ingredienteIndex, 1);
      }
    });
  }

  /* Eliminar todas las suscripciones */
  ngOnDestroy() {
    this.events.unsubscribe('seleccion-ingrediente');
    this.events.unsubscribe('carga-completa');
  }

  /**
   * Este metodo se ejecutara cuando se seleccione una opcion del select
   * @param tamano contendra el objeto elegido del select */
  cambioTamano(tamano) {
    /* reiniciar los valores*/
    this.pizzaTres.ingredientes = [];
    this.ingredientesEnabled = false;
    this.tabRef.select(0, { animate: true });
    this.pizzaTres.tamano = tamano;
    /* Publica un evento que indica que se ha cambiado el tamano este eveno sera escuchado por los tabs para actualizar los valores */
    this.events.publish('cambio-tamano', tamano);
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

  terminarEventos() {
    this.events.unsubscribe('seleccion-ingrediente');
  }

  siguiente() {
    this.eventoSeleccion();
    if (this.pizzaTres.ingredientes.length == 1) {
      this.presentAlert('Faltan ingredientes', 'Por favor selecciona un ingrediente más');
      return;
    } else if (this.pizzaTres.ingredientes.length == 0) {
      this.presentAlert('Faltan ingredientes', 'No has seleccionado ningún ingrediente');
      return;
    }
    else {
      if(this.pizzaTres.ingredientes.length>2){
        var ingredientescpy=this.pizzaTres.ingredientes;
        this.pizzaTres.ingredientes=[];
        this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-1]);
        this.pizzaTres.ingredientes.push(ingredientescpy[ingredientescpy.length-2]);
        
      }
      this.eventoPublicar();
      this.pizzaTres.nombre = "Pizza Tres";
      this.pizzaTres.borde = this.bordeElegidoChoice
    //Sabado
      if (this.diaPromo == this.combos[4].NOMBRE) {
        this.pizzaTres.costo = this.costoCombo / 4;
        this.abrirPizzaCuatro();
      }
      //Miercoles, Jueves, Domingo
      else if (this.diaPromo == this.combos[2].NOMBRE || this.diaPromo == this.combos[3].NOMBRE || this.diaPromo == this.combos[5].NOMBRE) {
        this.pizzaTres.costo = this.costoCombo / 3;
        this.abrirCombinaciones();
      }
    }
    this.terminarEventos();
  }

  abrirPizzaCuatro() {
    this.combo = this.navParams.get("combo");
    if(this.combo['PIZZAS'].length>2){//si se regresa con el boton atras 
      var pizzascpy = this.combo['PIZZAS'];
      this.combo['PIZZAS'] = [];
      this.combo['PIZZAS'].push(pizzascpy[0]);
      this.combo['PIZZAS'].push(pizzascpy[1]);
    }
    this.combo['PIZZAS'].push(this.pizzaTres);
    /*if(this.combo['PIZZAS'].length==4){//si se regresa con el boton atras 
      this.combo['PIZZAS'].splice(3, 1);
    }else if(this.combo['PIZZAS'].length==3){
      this.combo['PIZZAS'].splice(2, 1);
    }*/
        this.combo['PIZZAS'].push(this.pizzaTres);
    //let combo = this.navParams.get("combo");
    if(this.objetivo == "nuevo-combo"){
      //this.navCtrl.pop();
      this.navCtrl.push(PizzaCuatroPage, {
        pizzas: this.pizzas,
        promo: this.diaPromo,
        costo: this.costoCombo,
        opcional: this.objt,
        combo: this.combo,
        combos : this.combos,
        tamanoPizza: this.pizzaTres.tamano,
        objetivo : "nuevo-combo"
      });
    }else{//si es la primera cosacha paso 2.....
      this.navCtrl.push(PizzaCuatroPage, {
        pizzas: this.pizzas,
        promo: this.diaPromo,
        costo: this.costoCombo,
        opcional: this.objt,
        combo: this.combo,
        combos : this.combos,
        tamanoPizza: this.pizzaTres.tamano
      });
    }
  }

  abrirCombinaciones() {
    // let combo = this.navParams.get("combo");
    this.combo = this.navParams.get("combo");
    if(this.combo['PIZZAS'].length>2){//si se regresa con el boton atras 
      var pizzascpy = this.combo['PIZZAS'];
      this.combo['PIZZAS'] = [];
      this.combo['PIZZAS'].push(pizzascpy[0]);
      this.combo['PIZZAS'].push(pizzascpy[1]);
    }
    this.combo['PIZZAS'].push(this.pizzaTres);
    /*if(this.diaPromo == this.combos[4].NOMBRE){
      if(this.combo['PIZZAS'][0].tamano.nombreBase=="EXTRA GRANDE"){
        this.combo['COSTO']=27.99;
      }else if(this.combo['PIZZAS'][0].tamano.nombreBase=="FAMILIAR"){
        this.combo['COSTO']=23.99;
      }else{
        this.combo['COSTO']=19.99;
      }
      this.combo['COSTO']=this.combo['PIZZAS'][0].costo*3;
    }*/
    if(this.objetivo == "nuevo-combo"){
      console.log("Hola tamaño------------------------------------->")
      console.log(this.tamanoElegido)
      this.events.publish('nuevo-combo', this.combo);
      console.log("volviendo a combinaciones pop")
      console.log(this.combo)
      this.navCtrl.pop();
      this.navCtrl.pop();
      this.navCtrl.pop();
    }else{//si es la primera cosacha paso 3 completo....
      this.navCtrl.push(CombinacionesPage, {
        promocionales: this.pizzas,
        promo: this.diaPromo,
        costo: this.costoCombo,
        opcional: this.objt,
        combo: this.combo,
        combos : this.combos,
        tamanoName: this.tamanoElegido.nombre
      });
    }
  }

  editarPizzas() {
    if (this.objetivo == 'editar-pizza') {
      let combo = this.navParams.get("combo");
      this.promocionales = this.navParams.get("promocionales"); //pizza que se quiere editar
      this.ingredientesEnabled = true;
      this.promocionales.forEach((pizzaTres) => {
        this.promocionales[2]["ingredientes"] = this.pizzaTres.ingredientes;
        console.log(this.promocionales[2]['ingredientes']);
        //this.pizzaUno.ingredientes = pizzaUno.ingredientes;
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

  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

  @ViewChild("tabs") tabs: Tabs;
  @ViewChild(Slides) slides: Slides;
}
