import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, FabContainer, ToastController, LoadingController, AlertController, Platform, App } from 'ionic-angular';
import { Pizza } from '../../interfaces/IPizza';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { FormaEntregaPage } from '../forma-entrega/forma-entrega';
import { PizzaTresPage } from '../pizza-tres/pizza-tres';
import { PizzaUnoPage } from '../pizza-uno/pizza-uno';
import { PizzaDosPage } from '../pizza-dos/pizza-dos';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatosUsuario } from '../../interfaces/IDatosUsuario';
import { format } from 'date-fns/esm';
//import { DatosUsuario } from '../../interfaces/IDatosUsuario';

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  datosUsuario: DatosUsuario = {
    apellidos : null,
    cedula : null,
    contrasena : "",
    correo : null,
    nombres : null,
    telefono : null,
    telefonoEntrega : null,
    imagenUrl : null,
    token : null,
    direccion: null,
    direccionEntrega: null,
    DoB: null,
    tel_fijo: null 
  }
  public validations_form: FormGroup;
  public apellidos : string;
  public nombres : string;
  public telefono : string;
  public direccion : string;
  public delivery: Number;
  public pizzas = []
  public adicionales = []
  public combos = []
  public promocionales = [];
  public tradicionales = [];
  public tradicionalesPromo = [];
  formaEntrega: String;
  opc: string;
  public cargando = false;
  public costoTamaTipo: any;
  public costoTamaCombo: any;
  public costoTotal: Number;
  validation_messages = {
    'telefono': [
      { type: 'required', message: 'El Teléfono es obligatorio.' },
      { type: 'minlength', message: 'El Teléfono debe contener 10 dígitos'},
      { type: 'pattern', message: 'El Teléfono debe contener únicamente números'}
    ],
    'direccion': [
      { type: 'required', message: 'La dirección es obligatoria.' },
    ],
  };
  
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public toastCtrl: ToastController
    , public httpRequest: HttpRequestProvider
    , public app: App
    , public formBuilder: FormBuilder
    , public events: Events
    , public loadingCtrl: LoadingController
    , public alertCtrl: AlertController,
    public platform: Platform) {

    /*platform.registerBackButtonAction(() => {
      //this.navCtrl.setRoot(HomePage)
      this.navCtrl.pop()
    }, 2)*/
    
    //this.cargarCarrito();
   /*this.tradicionales = navParams.get("tradicionales");
   this.combos = navParams.get("combos");
   this.pizzas = navParams.get("pizzas");
   this.adicionales = navParams.get("adicionales");
   console.log(navParams.get("pizzas"))
   console.log(navParams.get("combos"))
   console.log(navParams.get("tradicionales"))
   console.log(navParams.get("adicionales"))
   this.actualizarPrecioTotal();*/
   this.cargarCostos();
   this.cargarCostosCombo();
   this.cargarDatos(); 
    /*this.nombres = navParams.get("nombres");
    this.apellidos = navParams.get("apellidos");
    this.telefono = navParams.get("telefono");*/
    this.delivery =navParams.get('delivery');
    this.costoTotal = navParams.get("total");
    this.formaEntrega=this.navParams.get("formaEntrega");
    if(this.formaEntrega=='0'){
      this.direccion="N/A"
    }
    if(this.formaEntrega!='0'){
      this.validations_form = this.formBuilder.group({
        telefono:new FormControl('', Validators.compose([
          Validators.minLength(7),
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])),
        direccion:new FormControl('', Validators.compose([
          //Validators.minLength(10),
          Validators.required,
          //Validators.pattern('^[0-9]*$')
        ])),
      });
      
    }else{
      this.validations_form = this.formBuilder.group({
        telefono:new FormControl('', Validators.compose([
          Validators.minLength(7),
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])),
        direccion:new FormControl('', Validators.compose([
          //Validators.minLength(10),
          //Validators.required,
          //Validators.pattern('^[0-9]*$')
        ])),
      });
    }
  }


  ionViewDidLoad() {
    //this.promocionales = this.navParams.get("promocionales");
    //this.tradicionalesPromo = this.navParams.get("tradicionalesPromo");
  }
  cargarCostosCombo() {
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCostosComboUrl(token)).then((data: any) => {
        var response = data.json();
        let lista = [];
        if (response["PAQUETE"] != undefined) {
          lista.push({ "COMBO": response["PAQUETE"][0].TIPO, "TAMANO": response["PAQUETE"][0].TAMANO, "COSTO": response["PAQUETE"][0].COSTO });
          lista.push({ "COMBO": response["PAQUETE"][1].TIPO, "TAMANO": response["PAQUETE"][1].TAMANO, "COSTO": response["PAQUETE"][1].COSTO });
          lista.push({ "COMBO": response["PAQUETE"][2].TIPO, "TAMANO": response["PAQUETE"][2].TAMANO, "COSTO": response["PAQUETE"][2].COSTO });
           this.costoTamaCombo = lista;
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
  cargarDatos(){
    var token = "";
    if(window.localStorage.getItem("userToken")!= null){
      token = window.localStorage.getItem("userToken");
      let loading = this.loadingCtrl .create({
        content: 'Cargando...'
      });
      //if(window.localStorage.getItem("isFacebook") == "False"){
        loading.present();
        this.httpRequest.get(Constantes.getVerPefilUrl(token)).then((res : any)=>{
          let info = res.json();
          console.log("Aqui  datos finales--------------------------------------->")
          console.log(res)
          if(info.STATUS == "OK"){
            this.nombres = info.NOMBRES;
            this.apellidos = info.APELLIDOS;
            this.telefono = info.TELEFONO_ENTREGA;
            this.direccion = info.DIRECCION_ENTREGA;



            this.datosUsuario.correo = info.CORREO;
          this.datosUsuario.nombres = info.NOMBRES;
          this.datosUsuario.apellidos = info.APELLIDOS;
          this.datosUsuario.cedula = info.CEDULA;
          this.datosUsuario.telefono = info.TELEFONO;
          this.datosUsuario.telefonoEntrega = info.TELEFONO_ENTREGA;
          this.datosUsuario.imagenUrl = info.IMAGEN;
          this.datosUsuario.tel_fijo = info.TEL_FIJO;
          this.datosUsuario.direccion = info.DIRECCION;
          this.datosUsuario.direccionEntrega = info.DIRECCION_ENTREGA;
          let dateString= "";
          dateString=info.FECHA_NACIMIENTO;
          console.log("fecha-------------------------------------------->");
          console.log(dateString);

          this.datosUsuario.DoB = new Date(dateString).toISOString();
            }
          loading.dismiss();
        },(err)=>{
          loading.dismiss();
          this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
        });
      /*}else{
        this.nombres = window.localStorage.getItem("Facebookname");
        this.apellidos = window.localStorage.getItem("Facebooklastname");
        this.telefono = " ";
        this.direccion = " ";
      }*/
    }

    
  }
  enviarPedido(){
  
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    let combos = this.navParams.get("combos");
    let cupones = this.navParams.get("cupones");
    let promocionales = this.navParams.get("promocionales");
    let tradicionalesPromo = this.navParams.get("tradicionales");
    //console.log(tradicionalesPromo)
    let coordenada = this.navParams.get("coordenada");
    let poligono = this.navParams.get("poligono");
    let local = this.navParams.get("local");
    let token = window.localStorage.getItem("userToken");
    let tokenFirebase = window.localStorage.getItem("firebaseToken");
    let total = this.navParams.get("total");
    let deliveryFinal=this.navParams.get('delivery');
    let elementosTradicionales=[];
    let elementosAdiconales=[];
    let elementosPizzas=[];
    let elementosCombos=[];
    let elementosCupones=[];
    if(cupones != null ){
      cupones.forEach(elemento=> {
        elementosCupones.push({"id":elemento.id , "CANTIDAD":elemento.cantidad })
      })
    }
    if(tradicionalesPromo != null ){
      tradicionalesPromo.forEach(elemento=> {
        let tamanoid=1;
        let tipoid=1;
        if(elemento.masa.nombre=="Mediana" && elemento.tamano == "Silver"){
          tamanoid=1;
          tipoid=1; 
        }else if(elemento.masa.nombre=="Mediana" && elemento.tamano == "Gold"){
          tamanoid=1;
          tipoid=2;
        }else if(elemento.masa.nombre=="Mediana" && elemento.tamano == "Platinum"){
          tamanoid=1;
          tipoid=3;
        }else if(elemento.masa.nombre=="Familiar" && elemento.tamano == "Silver"){
          tamanoid=2;
          tipoid=1;
        }else if(elemento.masa.nombre=="Familiar" && elemento.tamano == "Gold"){
          tamanoid=2;
          tipoid=2;
        }else if(elemento.masa.nombre=="Familiar" && elemento.tamano == "Platinum"){
          tamanoid=2;
          tipoid=3;
        }else if(elemento.masa.nombre=="Extra grande" && elemento.tamano == "Silver"){
          tamanoid=3;
          tipoid=1;
        }else if(elemento.masa.nombre=="Extra grande" && elemento.tamano == "Gold"){
          tamanoid=3;
          tipoid=2;
        }else{
          tamanoid=3;
          tipoid=3;
        }
        /*if(Number(elemento.costo)==Number(this.costoTamaTipo[0].costo)){
          tamanoid=1;
          tipoid=1; 
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[1].costo)){
          tamanoid=1;
          tipoid=2;
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[2].costo)){
          tamanoid=1;
          tipoid=3;
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[3].costo)){
          tamanoid=2;
          tipoid=1;
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[4].costo)){
          tamanoid=2;
          tipoid=2;
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[5].costo)){
          tamanoid=2;
          tipoid=3;
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[6].costo)){
          tamanoid=3;
          tipoid=1;
        }if(Number(elemento.costo)==Number(this.costoTamaTipo[7].costo)){
          tamanoid=3;
          tipoid=2;
        }else{
          tamanoid=3;
          tipoid=3;
        }*/

        elementosTradicionales.push({"id":elemento.id , "CANTIDAD":elemento.cantidad , "TAMANO": tamanoid,"TIPO": tipoid,"BORDE":elemento.borde.id})
        
      });
    }
    //console.log(pizzas);
    if(pizzas != null ){
      pizzas.forEach(elemento=> {
        if(elemento.tamano.id){
          let ingredientes=[];
          elemento.ingredientes.forEach(ingrediente=> {
            ingredientes.push({"id":ingrediente.id,"porcion": {"nombre":ingrediente.porcion.nombre}});
          });
          //   
          elementosPizzas.push({"costo":elemento.costo , "tamano": {"id":elemento.tamano.id}, "cantidad": elemento.cantidad,"masa": {"id":elemento.masa.id},"borde":{"id":elemento.borde.id},"ingredientes":ingredientes})
        }else{//favoritos item
          if(elemento.tamano=="MEDIANA" || elemento.tamano=="FAMILIAR" || elemento.tamano=="EXTRA GRANDE"){
            let ingredientes=[];
            elemento.ingredientes.forEach(ingrediente=> {
              ingredientes.push({"id":ingrediente.id,"porcion": {"nombre":ingrediente.porcion.nombre}});
            });
            elementosPizzas.push({"costo":elemento.costo , "tamano": {"id":this.getTamanoValue(elemento.tamano)}, "cantidad": elemento.cantidad,"masa": {"id":elemento.masa.id},"borde":{"id":elemento.borde.id},"ingredientes":ingredientes}) 
          }else{
            let tamanoid=1;
            let tipoid=1;
            if(elemento.masa=="MEDIANA" && elemento.tamano == "SILVER"){
              tamanoid=1;
              tipoid=1; 
            }else if(elemento.masa=="MEDIANA" && elemento.tamano == "GOLD"){
              tamanoid=1;
              tipoid=2;
            }else if(elemento.masa=="MEDIANA" && elemento.tamano == "PLATINUM"){
              tamanoid=1;
              tipoid=3;
            }else if(elemento.masa=="FAMILIAR" && elemento.tamano == "SILVER"){
              tamanoid=2;
              tipoid=1;
            }else if(elemento.masa=="FAMILIAR" && elemento.tamano == "GOLD"){
              tamanoid=2;
              tipoid=2;
            }else if(elemento.masa=="FAMILIAR" && elemento.tamano == "PLATINUM"){
              tamanoid=2;
              tipoid=3;
            }else if(elemento.masa=="EXTRA GRANDE" && elemento.tamano == "SILVER"){
              tamanoid=3;
              tipoid=1;
            }else if(elemento.masa=="EXTRA GRANDE" && elemento.tamano == "GOLD"){
              tamanoid=3;
              tipoid=2;
            }else{
              tamanoid=3;
              tipoid=3;
            }
            elementosTradicionales.push({"id":elemento.id , "CANTIDAD":elemento.cantidad , "TAMANO": tamanoid,"TIPO": tipoid,"BORDE":1})
          }
          
        //elementosPizzas.push({"id":elemento.id , "CANTIDAD":elemento.cantidad , "TAMANO": tamanoid,"TIPO": tipoid})
        }
      });
    }
    if(adicionales != null){
      adicionales.forEach(elemento=> {
        elementosAdiconales.push({"id":elemento.id , "costoBase": elemento.costoBase, "cantidad": elemento.cantidad})
        
      });  
    }
    //console.log(combos);
    if(combos != null){
      combos.forEach(elemento=> {
        let pizzas=[];
        elemento.PIZZAS.forEach(pizza=> {
          if(elemento.ID=="29"){
            let tamanoid=1;
            let tipoid=1;
            if(pizza.tamano=="Silver"){
              tipoid=1;
            }else if(pizza.tamano=="Gold"){
              tipoid=2;
            }else if(pizza.tamano=="Platinum"){
              tipoid=3;
            }
            if(pizza.masa=="MEDIANA"){
              tamanoid=1;
            }else if(pizza.masa=="FAMILIAR"){
              tamanoid=2;
            }else if(pizza.masa=="EXTRA GRANDE"){
              tamanoid=3;
            }
            let borde_id = 1
            if(pizza.borde != undefined)
              borde_id = Number(pizza.borde.id)
            //console.log("Borde: " + borde_id)
            pizzas.push({"id":pizza.id,"tamano":tamanoid,"tipo":tipoid,"borde":{"id":borde_id}});
          }else{
            let ingredientes=[];
            pizza.ingredientes.forEach(ingrediente=> {
              ingredientes.push({"id":ingrediente.id,"porcion": {"nombre":"Simple"}});
            });
            let borde_id = 1
            if(pizza.borde != undefined)
              borde_id = Number(pizza.borde.id)
            //console.log("Borde: " + borde_id)
            pizzas.push({"costo":pizza.costo , "tamano": {"id":pizza.tamano.id}, "cantidad": pizza.cantidad,"masa": {"id":1},"borde":{"id":borde_id},"ingredientes":ingredientes});
          }
        });
        elementosCombos.push({"id":elemento.ID , "COSTO":elemento.COSTO ,"BORDE":1, "PIZZAS": pizzas})
        
      }); 
    }
      let pedido = {};
      //let tipoPago
      //console.log("local.....................................................");
      //console.log(local)
      if(local == null){
        pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":{"LATITUD": coordenada.lat , "LONGITUD":coordenada.lng},"TOTAL":Number(total)+Number(deliveryFinal),"TELEFONO":this.telefono,"DIRECCIONCLIENTE":this.direccion, "FORMA_PAGO" : this.navParams.get("tipoPago") , "ELEMENTOS":{"pizzas":elementosPizzas,"Tradicionales":elementosTradicionales,"Adicionales":elementosAdiconales,"Combo":elementosCombos,"Cupones":elementosCupones}
          , "POLIGONO_ID": poligono}
      }else{
        pedido = {"TOKEN": token  , "TOKEN_FIREBASE": tokenFirebase ,"DIRECCION":{"LATITUD": local.LATIDUD , "LONGITUD":local.LONGITUD},"TOTAL":Number(total)+Number(deliveryFinal),"TELEFONO":this.telefono,"DIRECCIONCLIENTE":this.direccion, "FORMA_PAGO" : this.navParams.get("tipoPago") , "ELEMENTOS":{"pizzas":elementosPizzas,"Tradicionales":elementosTradicionales,"Adicionales":elementosAdiconales,"Combo":elementosCombos,"Cupones":elementosCupones}
          , "POLIGONO_ID": local.POLIGONO_ID}
      }
      //console.log(JSON.stringify(pedido));
    let loading = this.loadingCtrl .create({
    content: 'Cargando...'
    });
    console.log("Aquí pedidooooooooooooooooo.------------------------------------>");
    console.log(pedido)
    let postData  = new FormData();
    postData.append("NOMBRES",   this.datosUsuario.nombres);
    postData.append("APELLIDOS", this.datosUsuario.apellidos);
    postData.append("CORREO",    this.datosUsuario.correo);
    postData.append("CEDULA",    this.datosUsuario.cedula);
    postData.append("TELEFONO",   this.datosUsuario.telefono);
    postData.append("TELEFONO_ENTREGA",   this.telefono);
    postData.append("TEL_FIJO",   this.datosUsuario.tel_fijo);
    postData.append("DIRECCION",   this.datosUsuario.direccion);
    postData.append("DIRECCION_ENTREGA",   this.direccion);
    var date=new Date(this.datosUsuario.DoB);
    date.setDate(date.getDate()+1);
    postData.append("FECHA", format(date, "yyyy-MM-dd"));
    postData.append("TOKEN",     this.datosUsuario.token);
    postData.append("IMAGEN", this.datosUsuario.imagenUrl);
    console.log("Datos de la rspuesta actualizacion de perfil");
      console.log(this.datosUsuario);
    loading.present(); 
    /*this.httpRequest.post(Constantes.getEditarPerfilUrl(), postData).then((res : any)=>{
      var data = res.json();
      //loading.dismiss();
      console.log("Datos de la rspuesta actualizacion de perfil");
      console.log(data);
      if(data.STATUS == "OK"){
      //  this.navCtrl.pop();
      }else{
        //this.mostrarMensaje("", Constantes.ALGO_HA_SALIDO_MAL);
      }
      loading.dismiss();
    }, (err)=>{
      loading.dismiss();
     // this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      //this.mostrarMensaje("error",err);
    });*/
    this.httpRequest.post(Constantes.CREAR_PEDIDOS, pedido).then((data : any)=>{
      var response = data.json();
      console.log("Respuesta.------------------------------------>");
      console.log(response)
      //console.log(response)
      if(response["STATUS"] == 'OK'){
        if(Number(this.navParams.get("tipoPago"))==1){
          this.mostrarMensaje2("PEDIDO ENVIADO","TU PEDIDO HA SIDO ENVIADO EXITOSAMENTE.", "OK");
        }else{
          this.mostrarMensaje2("PEDIDO ENVIADO","POR TU SEGURIDAD, UN OPERADOR DE ITALIAN DELI EXPRESS SE COMUNICARÁ CON USTED PARA CONFIRMAR DATOS DE PAGO CON TARJETA DE CRÉDITO.", "OK");
        }
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }else{
        loading.dismiss();
        this.mostrarMensaje3("Solicitud reprobada","Estamos teniendo inconvenientes, por favor intenta nuevamente", "ERROR");
      
      }
    }, (err)=>{
      loading.dismiss();
      this.mostrarMensaje3("","Estamos teniendo inconvenientes, por favor intenta nuevamente","ERROR");
    });
    //let data : Observable<any> =this.Http.post(Constantes.getEditarPerfilUrl() , postData);
    //data.subscribe((result)=>{
    //  loading.dismiss();
    //  console.log(result)
    //})
    /*console.log(postData);
     this.httpRequest.post(Constantes.getEditarPerfilUrl(), postData).then((res : any)=>{
       var data = res.json();
       loading.dismiss();
       console.log(data);
       if(data.STATUS == "OK"){
         this.navCtrl.pop();
       }else{
         this.mostrarMensaje("", Constantes.ALGO_HA_SALIDO_MAL);
       }
     }, (err)=>{
       loading.dismiss();*/
      // this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
       //this.mostrarMensaje("error",err);
       //this.mostrarMensaje("prueba","Hola");
     //});
  }
  /** Este metodo disminuye la cantidad del elemento recibido */
  disminuirCantidad(elemento) {
    elemento.cantidad = Number(elemento.cantidad) - 1;
    this.actualizarPrecioTotal();
  }

  /** Este metodo aumenta la cantidad del elemento recibido */
  aumentarCantidad(elemento) {
    elemento.cantidad = Number(elemento.cantidad) + 1;
    this.actualizarPrecioTotal();
  }

  getTamanoValue(nombre: String){
    let value=0;
    if(nombre=="MEDIANA"){
      value=1;
    }else if(nombre=="FAMILIAR"){
      value=2;
    }else if(nombre=="EXTRA GRANDE"){
      value=3;
    }
    return value;
  }

  cargarCarrito() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.cargando = true;
    try {
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCarritoUrl(token)).then((data: any) => {
        var response = data.json();
        //console.log(response)
        if (response["STATUS"] != undefined || response["STATUS"] != "OK") {
          let carrito = response.CARRITO;
          //console.log(carrito)
          carrito.PIZZAS.forEach((pizza: any) => {
            let composicion = { "INGREDIENTES": pizza.INGREDIENTES, "ID": pizza.ID, "NOMBRE": pizza.NOMBRE, "TAMANO": pizza.TAMANO, "CANTIDAD": Number(pizza.CANTIDAD), "TIPO": pizza.TIPO, "COSTO": Number(pizza.COSTO), "MASA": pizza.MASA, "BORDE": pizza.BORDE };
            let ingredientes = [];
            pizza.INGREDIENTES.forEach(ingrediente => {
              ingredientes.push(ingrediente)
            });
            composicion["INGREDIENTES"] = ingredientes;
            this.pizzas.push(composicion);
          });

          carrito.ADICIONALES.forEach((adicional: any) => {
            this.adicionales.push({ "id": adicional.ID, "nombre": adicional.NOMBRE, "costo": Number(adicional.COSTO), "cantidad": Number(adicional.CANTIDAD), "imagenUrl": adicional.IMAGEN_URL, "tipo": adicional.TIPO });
          });
          carrito.COMBOS.forEach((combo: any) => {
            let composicionCombo = { "ID": combo.ID, "NOMBRE": combo.NOMBRE, "COSTO": Number(combo.COSTO), "CANTIDAD": Number(combo.CANTIDAD), "IMAGEN_URL": combo.IMAGEN_URL, "TIPO": combo.TIPO, "PIZZAS": combo.PIZZAS };
           let combos = this.navParams.get("combos");
           //console.log(combos)
           let pizzas = [];
           combos.forEach(element => {
             if(combo.NOMBRE == element.NOMBRE){
               element.PIZZAS.forEach(element => {
                pizzas.push(element);
               });
              composicionCombo["PIZZAS"] = pizzas;
             }
           });
            this.combos.push(composicionCombo);
          //console.log(this.combos)
          });
          this.actualizarPrecioTotal();

          this.cargando = false;
          loading.dismiss();
        } else {
          this.cargando = false;
          loading.dismiss();
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        }
      }, (err) => {
        this.cargando = false;
        loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }
    catch (err) {
      this.cargando = false;
      loading.dismiss();
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
  }

  mostrarMensaje(titulo: string, mensaje: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //this.navCtrl.setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
  }

  actualizarPrecioTotal() {
    let totalPizzas = 0;
    //let totalPizzasPromo = 0;
    let totalAdicionales = 0;
    let totalCombos = 0;
    let totalTradicional = 0;

    //let totalTradicionalesPromo = 0 ;
    //Calular total de pizzas 
    //Calcular total de pizza promo
    if (this.pizzas != null) {
      //console.log(this.pizzas)
      if (this.pizzas.length != 0) {
        this.pizzas.forEach((pizza) => {
          totalPizzas += Number(pizza.costo) * Number(pizza.cantidad)
        });
      } else {
        totalPizzas = 0;
      }
      //console.log(totalPizzas)
    }

    //Calcular total de pizza promo
    if (this.tradicionales != null) {
      if (this.tradicionales.length != 0) {
        this.tradicionales.forEach((tradicional: Pizza) => {
          totalTradicional += Number(tradicional.costo) * Number(tradicional.cantidad)
        });
      } else {
        totalTradicional = 0;
      }
      //console.log(totalTradicional)
    }
      
    //Calcular total de adicionales
    if (this.adicionales != null) {
      if (this.adicionales.length != 0) {
        this.adicionales.forEach((adicional) => {
          totalAdicionales += Number(adicional.costoBase) * Number(adicional.cantidad)
        });
      } else {
        totalAdicionales = 0;
      }
      //console.log(totalAdicionales)
    }
   /* if (this.adicionales.length > 0) {
      this.adicionales.forEach((adicional) => {
        totalAdicionales += Number(adicional.costo) * Number(adicional.cantidad)
      });
    }*/

    //Calcular total de combos
    if (this.combos != null) {
      if (this.combos.length != 0) {
        this.combos.forEach((combo) => {
          totalCombos += Number(combo.COSTO) * Number(combo.CANTIDAD)
        });
      } else {
        totalCombos = 0;
      }
      //console.log(totalCombos)
    }
    //suma de todos los productos
    this.costoTotal = totalPizzas +  totalAdicionales + totalCombos + totalTradicional;
  }

  ordenar() {
    //this.navCtrl
    this.app.getRootNav().push(FormaEntregaPage, {
      pizzas: this.pizzas,
      //promocionales : this.promocionales,
      tradicionales : this.tradicionales,
      adicionales: this.adicionales,
      combos: this.combos,
    });
  }

  editarPizza(pizza: Pizza, nombre: string) {
    if (nombre == 'Pizza Uno') {
      this.abrirPizzaUnoPage();
    }
    if (nombre == 'Pizza Dos') {
      this.abrirPizzaDosPage();
    }
    if (nombre == 'Pizza Tres') {
      this.abrirPizzaTresPage();
    }
  }

  abrirPizzaUnoPage() {
    this.navCtrl.push(PizzaUnoPage, {
      objetivo: "editar-pizza",
      pizzas: this.pizzas,
      promocionales : this.promocionales
    });
  }

  abrirPizzaDosPage() {
    this.navCtrl.push(PizzaDosPage, {
      objetivo: "editar-pizza",
      pizzas: this.pizzas,
      promocionales : this.promocionales
    });
  }

  abrirPizzaTresPage() {
    this.navCtrl.push(PizzaTresPage, {
      objetivo: "editar-pizza",
      pizzas: this.pizzas,
      promocionales : this.promocionales
    });
  }

  /**
 * Este metodo elimina un elemento del resumen
 * @param elemento 
 */
  borrarElementoServidor(elemento, tipo) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    let token = window.localStorage.getItem("userToken");
    let cuerpo = { "TOKEN": token, "ID": elemento.id, "TIPO": tipo }
    try {
      this.httpRequest.post(Constantes.BORRAR_ELEMENTO_CARRITO, cuerpo).then((data: any) => {
        var response = data.json();
        if (response["STATUS"] == "OK") {
          if (tipo == "PIZZA") {
            let index = this.pizzas.map(function (x) { return x.id; }).indexOf(elemento.id);
            this.pizzas.splice(index, 1);
          } else if (tipo == "ADICIONAL") {
            let index = this.adicionales.map(function (x) { return x.id; }).indexOf(elemento.id);
            this.adicionales.splice(index, 1);
          } else if (tipo == "COMBO") {
            let index = this.combos.map(function (x) { return x.id; }).indexOf(elemento.id);
            this.combos.splice(index, 1);
          }
          this.actualizarPrecioTotal();
        }
        loading.dismiss();
      }, (err) => {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      });
    }
    catch (err) {
      loading.dismiss();
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
  }

  presentToast(mensaje: string, duracion?: Number, posicion?: string, mostrarBoton?: boolean, mensajeBoton?: string) {
    let duration, position, closeButtonText, showCloseButton;
    if (duracion == undefined) {
      duration = 3000;
    }
    if (mostrarBoton == undefined) {
      showCloseButton = false;
    }
    if (mensajeBoton == undefined) {
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
  mostrarMensaje2(titulo: string ,mensaje: string , objetivo: string){
    let alert = this.alertCtrl.create({
      title: "<span class='mensajeFinal'>"+titulo+"</span>",
      message: "<br><div><span class='mensajeFinal'>"+mensaje+"</span></div><div><span class='mensajeFinal'>SU ORDEN ESTÁ EN PROCESO</span></div>",
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
   mostrarMensaje3(titulo: string ,mensaje: string , objetivo: string){
    let alert = this.alertCtrl.create({
      title: "<span class='mensajeFinal'>"+titulo+"</span>",
      message: "<br><div><span class='mensajeFinal'>"+mensaje+"</span></div>",
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
              //this.navCtrl.setRoot(HomePage)
            //}
          }
        }
      ]
    });
    alert.present();
  }
  eliminarElemento(elemento, tipo) {
    let alert = this.alertCtrl.create({
      title: 'Borrar elemento',
      message: '¿Estás seguro que deseas borrar este elemento del carrito? ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.borrarElementoServidor(elemento, tipo)
          }
        }
      ]
    });
    alert.present();
  }
}
