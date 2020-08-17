import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Platform } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request'
import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, Poly, Polyline } from '@ionic-native/google-maps';
import { SetUbicationPage } from '../set-ubication/set-ubication';
import { Constantes } from '../../util/constantes';
import { Http, HttpModule } from '@angular/http';
import { ListUbicationPage } from '../list-ubication/list-ubication';
import { ToastController } from 'ionic-angular';
import { FormaPagoPage } from '../forma-pago/forma-pago';

@IonicPage()
@Component({
  selector: 'page-view-map',
  templateUrl: 'view-map.html',
})
export class ViewMapPage {

  map: GoogleMap;
  type_page: any;

  ubication: any;
  latLng: any;
  loading: any = null;
  marker: null;

  locales = [];
  coberturas = [];
  poligonos = [];

  ubications_list = [];
  costoTotal : Number;
  poligonoId  : any;
  coordenada : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private googleMaps: GoogleMaps
    , public Http: Http
    , public app: App
    , public httpRequest: HttpRequestProvider
    , public loadingCtrl: LoadingController
    , public platform: Platform
    , public alertCtrl: AlertController
    , public toastCtrl: ToastController) {
    //cargamos primero los poligonos  
    
    
    this.type_page = navParams.get('type');
    console.log("Aqui esta el tipo------------------------------------>");
    console.log(navParams.get('type'));
    this.ubication = navParams.get('data');
    console.log(navParams.get('data'));
    this.costoTotal = navParams.get("total");
    this.latLng = {
      lat: +this.ubication['LATITUD'],
      lng: +this.ubication['LONGITUD']
    }
    if (this.type_page === 'cobertura') {
      console.log('GETTING LIST');
      //this.getUbications();
    }
  }

  /*ngOnInit() {
    this.platform.ready();
    this.loadMap();
  }*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMapPage');
    this.getCoberturas();
    //this.loadMap();
    //setTimeout(this.loadMap.bind(this), 1000);
    
    //setTimeout(this.loadMap.bind(this), 1000);
  }
  /*ionViewDidEnter(){
    console.log("Entrando....."+document.getElementsByClassName("app-root")[0]+document.getElementsByClassName("app-root")[1]);
    //document.getElementsByClassName("app-root")[0].setAttribute("style", "opacity:0");
    //document.getElementsByClassName("app-root")[0].setAttribute("style", "visibility:hidden");
    //document.getElementsByClassName("menu")[0].setAttribute("style", "visibility:visible");
    document.getElementsByClassName("app-root")[0].setAttribute("style", "visibility:hidden");
    document.getElementsByClassName("menu")[0].setAttribute("style", "visibility:visible");
    //document.getElementsByClassName("ion-toast")[0].setAttribute("style", "visibility:visible");
    //this.loading.style.visibility = "visible" ;
    //document.getElementsByClassName('toast-message')[0].setAttribute("style", "visibility:visible");
    //document.getElementsByClassName("body2")[0].setAttribute("style", "visibility:hidden");
    //this.loadMap();
  }

  ionViewDidLeave(){
    //this.map.remove()
    //console.log("Entrando....."+document.getElementsByClassName("app-root")[0]+document.getElementsByClassName("app-root")[1]);
    //this.loading.style.visibility = "hidden" ;
    document.getElementsByClassName("app-root")[0].setAttribute("style", "visibility:visible");
    //document.getElementsByClassName("app-root")[0].setAttribute("style", "opacity:1");
  }*/
  getCoberturas() {
    if (this.locales.length == 0) {
      /*let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });*/
      this.loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      this.loading.present();
      var token = window.localStorage.getItem("userToken");
      try {
        //await 
        console.log(Constantes.getTodasCoberturas(token))
        this.httpRequest.get(Constantes.getTodasCoberturas(token)).then((res: any) => {
          res = res.json();
          // let data = res.DIRECCIONES
          //  OTRA SOLUCION MAS MEJOR :v
          if (res.STATUS != 'OK') {
            console.log(res);
            this.loading.dismiss();
            this.loadMap();//cargamos el mapa luego de todo
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
            return null;
          } else {
            this.coberturas = res["COBERTURAS"];
            console.log("aqui-------"+this.coberturas);
            this.loading.dismiss();
            this.loadMap();
            return this.coberturas;
          }
        });
      } catch (err) {
        this.loadMap();
        this.loading.dismiss();
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
    }
  }

  async getLocales() {
    if (this.coberturas.length == 0) {
      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      loading.present()
      var token = window.localStorage.getItem("userToken");
      try {
        console.log(Constantes.getTodosLocales(token))
        await this.httpRequest.get(Constantes.getTodosLocales(token)).then((res: any) => {
          res = res.json();
          // let data = res.DIRECCIONES
          //  OTRA SOLUCION MAS MEJOR :v
          if (res.STATUS != 'OK') {
            console.log(res);
            loading.dismiss();
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          } else {
            this.locales = res["LOCALES"];
            console.log(this.locales);
            loading.dismiss();
          }
        });
      } catch (err) {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
    }
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      backgroundColor: 'transparent',
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPiker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        target: {
          lat: this.latLng.lat, // default location
          lng: this.latLng.lng// default location
        },
        zoom: 18,
        tilt: 30
      }
    };
    
    //this.getCoberturas();
    let mapDiv = document.getElementById('map_canvas');
    //this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map = GoogleMaps.create(mapDiv, mapOptions);
    let tipo = this.navParams.get('type');
    if(tipo!="referencia"){//Navegacion para hacer pedido
      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
      .then(async() => {
        // Now you can use all methods safely.
        await this.addPoligons();
        await this.getPosition();
        /*await this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
          // Colocando marcador para guardar direccion
          if (this.type_page === 'set') {
            console.log(e[0]);
            this.map.clear();
            this.addLocalesMarkers();
            this.map.addMarker({
              icon: 'red',
              position: e[0]  // {lat: some_data, lng: some_data}
            })
            this.marker = e[0];
            this.map.animateCamera({
              target: e[0], // {lat: some_data, lng: some_data}
              zoom: 17,
              duration: 5000
            });
          }
          // Checking si marcador esta dentro de poligono o no
          if (this.type_page === 'cobertura') {
            let position = e[0];
            //this.map.clear();
            //this.addLocalesMarkers();
            this.poligonoId =  this.isInPoligono(position) ;
    
            // if( this.poligonoId !== null ){
            //   this.coordenada = e[0];
            //   //Dibujar marcador
            //     this.map.clear();
            //     this.map.addMarker({
            //       icon: 'red',
            //       position: e[0]
            //     })
            //     this.marker = e[0];
            //     this.map.animateCamera({
            //       target: e[0],
            //       zoom: 17,
            //       duration: 5000
            //     });
            // }
          }
        })*/
        })
      .catch(error => {
        console.log(error);
      });
    }else{
      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
      .then(async() => {
        this.addLocalMarker();
      })
      .catch(error => {
        console.log(error);
      });
    }

    
  }

  getPosition() {
    this.map.getMyLocation()
      .then(response => {
        this.latLng=response.latLng;
        this.coordenada=response.latLng;
        //this.isInPoligono(this.latLng);
        this.map.moveCamera({
          //target: this.latLng
          target: response.latLng
        });
        //if (this.type_page == 'view') {
          console.log('ADD MARKER');
          //this.map.clear();
          this.map.addMarker({
            // title: 'My Position',
            title: this.ubication['NOMBRE'],
            icon: 'red',
            animation: 'DROP',
            position: this.latLng,
            draggable: true,

            //position: response.latLng
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_DRAG_END)
              .subscribe(() => {

                this.latLng = marker.getPosition();
                this.coordenada=this.latLng;
                console.log(this.latLng);
                /*localStorage.setItem("latt1",this.latLng.lat);
                localStorage.setItem("long1",this.latLng.lng);

                this.http.get('API URL').map(res => res.json()).subscribe(data => {
                  console.log(data);
                });*/
                 
              });
          });
          //this.poligonoId =  this.isInPoligono(this.latLng);
        //}
      })
      .catch(error => {
        console.log(error);
      });
    //this.addLocalesMarkers();
  }

  async eliminarUbicacion() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present()
    var token = window.localStorage.getItem("userToken");
    var id = this.ubication['ID'];
    try {
      await this.httpRequest.post(Constantes.postBorrarDireccionUrl(),
        {
          TOKEN: token,
          ID: this.ubication['ID']
        }).then((res: any) => {
          res = res.json();
          if (res.STATUS != 'OK') {
            console.log(res);
            loading.dismiss();
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          } else {
            // this.navCtrl.push(ListUbicationPage);
            this.navCtrl.setRoot(ListUbicationPage);
            loading.dismiss();
          }
        });
    } catch (err) {
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
          /*handler: () => {
            this.app.getRootNavs()[0].setRoot(HomePage)
        }*/
        }
      ]
    });
    alert.present();
  }

  confirmarBorrado() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Borrado',
      message: '¿Desea eliminar permanentemente esta dirección?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.setRoot(ListUbicationPage);
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarUbicacion();
          }
        }
      ]
    });
    alert.present();
  }

  guardarForm() {
    if (this.marker !== null) {
      this.navCtrl.push(SetUbicationPage, {
        data: this.marker
      })
    }
  }


  confirmarDireccion(){
    //console.log("coordenada "+this.coordenada)
    //comprueba usted esta dentro de la zona permitida delimitada por poligono
    //por uno de los 3 locales
    this.poligonoId =  this.isInPoligono(this.latLng);
    console.log(this.coberturas)


    
    if (this.poligonoId != null) {//this.coordenada !== null &&
      console.log("boton click")
      /*  --------------------------------------FLUJO  HACIA  FORMA DE PAGO ------------------------- */
      this.irFormaDePago();
    }
  }

  async getUbications() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present()
    var token = window.localStorage.getItem("userToken");
    try {
      console.log(Constantes.getListaDireccionesUrl(token))
      await this.httpRequest.get(Constantes.getListaDireccionesUrl(token)).then((res: any) => {
        res = res.json();
        // let data = res.DIRECCIONES
        //  OTRA SOLUCION MAS MEJOR :v
        if (res.STATUS != 'OK') {
          console.log(res);
          loading.dismiss();
          this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
        } else {
          this.ubications_list = res["DIRECCIONES"];
          console.log('LIST:', this.ubications_list);
          loading.dismiss();
        }
      });
    } catch (err) {
      this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
    }
  }

  setMarkerDirection(data) {
    let nombre = data['NOMBRE'];
    let latLng = {
      lat: 0.0,
      lng: 0.0
    }
    latLng = {
      lat: +data['LATITUD'],
      lng: +data['LONGITUD']
    }
    console.log('data data', latLng);
    this.addLocalesMarkers();
    this.isInPoligono(latLng);


  }



  isInPoligono(coordenada) {
    for (let poligono of this.poligonos) {  // recorre -> [{'ID':1, 'COORDENADAS': [{lat: ..., lng: ...}, {}..]}]
      let contain = Poly.containsLocation(
        coordenada, poligono['COORDENADAS']);
      if (contain) {
        console.log('CON COBERTURA');
        this.map.addMarker({
          icon: 'red',
          position: coordenada
        })
        this.map.animateCamera({
          target: coordenada,
          zoom: 17,
          duration: 5000
        });
        return poligono['ID'];
      }
    }
    console.log('SIN COBERTURA');
    const toast = this.toastCtrl.create({
      message: 'No esta dentro de la cobertura de nuestros locales',
      duration: 3000,
      position: 'top',
    });
    //toast.pageRef().nativeElement.getElementsByClassName('toast-message')[0].setAttribute("style", "visibility:visible");
    toast.present();

    if (this.type_page === 'set') {
      this.map.addMarker({
        icon: 'red',
        position: coordenada
      })
      this.map.animateCamera({
        target: coordenada,
        zoom: 17,
        duration: 5000
      });
    }
    return null
  }

  addPoligons() {
    var data = [];
    this.poligonos = [];
    for (var i = 0; i < this.coberturas.length; i++) {
      // console.log(this.locales);
      let poligon_dic = {};
      let poligon = [];
      var puntosDelimitantes = [];

      for (var j = 0; j < this.coberturas[i]['POLIGONO']['COORDENADAS'].length; j++) {
        // console.log(this.locales[i]['POLIGONO']['COORDENADAS'][j]);
        let coor = {
          lat: +this.coberturas[i]['POLIGONO']['COORDENADAS'][j]['LAT'],
          lng: +this.coberturas[i]['POLIGONO']['COORDENADAS'][j]['LNG']
        }
        poligon.push(coor)
      }

      /*var polylineOptions = {
        points: poligon,
        color: "#000000",
        width: 4,
        geodesic: true
      }
      //new Polyline(this.map,polylineOptions);
      this.map.addPolyline(polylineOptions);*/
      poligon_dic['ID'] = this.coberturas[i]['POLIGONO']['POLIGONO_ID'];
      poligon_dic['COORDENADAS'] = poligon;
      this.poligonos.push(poligon_dic);
    }
    // console.log(this.poligonos);
  }

  addLocalesMarkers() {
    var data = [];
    let snippet = '';
    let title = '';
    this.poligonos = [];
    for (var i = 0; i < this.locales.length; i++) {
      // console.log(this.locales);
      let poligon_dic = {};
      let poligon = [];
      title = this.locales[i]['SECTOR'] + ' | ' + this.locales[i]['CIUDAD'];
      snippet = 'Apertura: ' + this.locales[i]['APERTURA'] + '|Cierre: ' + this.locales[i]['CIERRE'];
      console.log(title);
      console.log(snippet);
      this.map.addMarker({
        // icon: 'blue',
        icon: {
          url: './assets/imgs/pizza_marker.png',
          size: {
            width: 30,
            height: 30
          }
        },
        position: {
          lat: this.locales[i]['COORDENADAS_LOCAL']['LAT'],
          lng: this.locales[i]['COORDENADAS_LOCAL']['LNG']
        },
        title: title,
        snippet: snippet
      })/*.then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            //alert('clicked');
          });
      });*/

      var puntosDelimitantes = [];

      for (var j = 0; j < this.locales[i]['POLIGONO']['COORDENADAS'].length; j++) {
        // console.log(this.locales[i]['POLIGONO']['COORDENADAS'][j]);
        let coor = {
          lat: +this.locales[i]['POLIGONO']['COORDENADAS'][j]['LAT'],
          lng: +this.locales[i]['POLIGONO']['COORDENADAS'][j]['LNG']
        }
        poligon.push(coor)
      }
      var polylineOptions = {
        points: poligon,
        color: "#000000",
        width: 4,
        geodesic: true
      }
      //new Polyline(this.map,polylineOptions);
      this.map.addPolyline(polylineOptions);
      poligon_dic['ID'] = this.locales[i]['POLIGONO']['ID'];
      poligon_dic['COORDENADAS'] = poligon;
      this.poligonos.push(poligon_dic);
    }
    // console.log(this.poligonos);
  }

  addLocalMarker() {
    this.map.addMarker({
      // icon: 'blue',
      icon: {
        url: './assets/imgs/pizza_marker.png',
        size: {
          width: 30,
          height: 30
        }
      },
      position: {
        lat: this.latLng.lat,
        lng: this.latLng.lng
      }
    })
  }

  irFormaDePago(){
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    let combos = this.navParams.get("combos");
    let tradicionales = this.navParams.get("tradicionales");
    
    let delivery = 0;
    //console.log("coordenadaaaa...............................................");
    //console.log(this.coordenada);
    //console.log(this.poligonoId);
    for (let cobertura of this.coberturas) {
      if(cobertura["POLIGONO"].POLIGONO_ID==this.poligonoId){
        //this.costoTotal= this.costoTotal+cobertura["PRECIO"];
        delivery=cobertura["PRECIO"];
        //combos[0].COSTO=total;
      }
    }
    //console.log(this.costoTotal);
    //this.navCtrl
    this.map.remove();
    this.app.getRootNav().push(FormaPagoPage , {
      pizzas : pizzas,
      adicionales : adicionales,
      combos : combos,
      tradicionales: tradicionales,
      formaEntrega:1,//1 es a domicilio
      coordenada : this.coordenada  , //-----------------> coordenadas  lat  , lng
      poligono :  this.poligonoId,
      total: this.costoTotal,
      delivery: delivery
    });
  }
}
