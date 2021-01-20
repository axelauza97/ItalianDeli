import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';
import { FormaPagoPage } from '../forma-pago/forma-pago';
import { ViewMapPage } from '../view-map/view-map';
/**
 * Generated class for the ListLocalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-locales',
  templateUrl: 'list-locales.html',
})
export class ListLocalesPage {

  locales = [];
  localesGuayaquil = [];
  localesDuran = [];
  opc : string;
  costoTotal : Number;
  componente: Boolean;

  constructor(public navCtrl: NavController
    , public toastCtrl: ToastController
    , public httpRequest: HttpRequestProvider
    , public events: Events
    , public loadingCtrl: LoadingController
    , public alertCtrl: AlertController
    , public navParams: NavParams
  ) {
    this.getLocales();
    console.log(this.locales)
  }

  ionViewDidLoad() {
    this.componente = this.navParams.get('componente');
    console.log('ionViewDidLoad ListLocalesPage');
    

  }

  getLocales() {
    if (this.locales.length == 0) {
      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      loading.present()
      var token = window.localStorage.getItem("userToken");
      try {
        console.log(Constantes.getTodosLocales(token))
        this.httpRequest.get(Constantes.getLocales(token)).then((res: any) => {
          res = res.json();
          if (res.STATUS != 'OK') {
            console.log(res);
            loading.dismiss();
            this.mostrarMensaje(Constantes.ALGO_ANDA_MAL, Constantes.INTENTALO_NUEVAMENTE);
          } else {
            res.PAQUETE.forEach(element => {
              this.locales.push(element);
              if (res.PAQUETE[2]!=element){
                  this.localesGuayaquil.push(element);
              }else{
                  this.localesDuran.push(element);
              }
            });
            // this.locales = res["LOCALES"];
            console.log(this.locales);
            loading.dismiss();
          }
        });
      } catch (err) {
        this.mostrarMensaje(Constantes.SIN_CONEXION, Constantes.REVISAR_CONEXION);
      }
    }
  }
  
  seleccionar_direccion(local) {
    let pizzas = this.navParams.get("pizzas");
    let adicionales = this.navParams.get("adicionales");
    //let promocionales = this.navParams.get("promocionales");
    let tradicionales = this.navParams.get("tradicionales");
    console.log(tradicionales)
    let combos = this.navParams.get("combos");
    let cupones= this.navParams.get("cupones");
    this.costoTotal = this.navParams.get("total");

    this.opc = this.navParams.get("opcional");
    if(pizzas && adicionales && tradicionales && combos){//Navegacion para hacer pedido
      this.navCtrl.push(FormaPagoPage , {
        pizzas : pizzas,
        adicionales : adicionales,
        combos : combos,
        formaEntrega:0,//0 es retirr al local
        //promocionales : promocionales,
        tradicionales : tradicionales,
        local : local,
        poligono : local.POLIGONO_ID,
        total: this.costoTotal,
        cupones : cupones,
        delivery: 0
       // "15"  , //-----------------> coordenadas  lat  , lng       
      });
    }else{//netamente informativo
      this.navCtrl.push(ViewMapPage, {
        type: 'referencia',
        data: {
            NOMBRE: 'Dirección',
            LATITUD: local.LATIDUD,
            LONGITUD: local.LONGITUD
        }
      });
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

}
