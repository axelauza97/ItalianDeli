import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ViewMapPage } from '../view-map/view-map';
import { ListLocalesPage } from '../list-locales/list-locales';

/**
 * Generated class for the FormaEntregaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forma-entrega',
  templateUrl: 'forma-entrega.html',
})
export class FormaEntregaPage {
  
  public pizzas =  []
  public adicionales = []
  public promocionales = []
  public tradicionales = []
  public combos = []
  opc : string
  costoTotal : Number;

  constructor(  public navCtrl: NavController
              , public app: App
              , public navParams: NavParams) {

    this.pizzas = navParams.get("pizzas");
    this.adicionales = navParams.get("adicionales");
    //this.promocionales = navParams.get("promocionales");
    this.tradicionales = navParams.get("tradicionales");
    console.log(this.tradicionales)
    this.combos = navParams.get("combos");
    this.costoTotal = navParams.get("total");
  }

  ionViewDidLoad() {
    
  }


  domicilio(){
    //this.navCtrl.
    this.app.getRootNav().push(ViewMapPage, {
      type: 'cobertura',
      data: {
          NOMBRE: 'Cobertura',
          LATITUD: "-2.134636",
          LONGITUD: "-79.926739"
      },     
      pizzas : this.pizzas,
      adicionales : this.adicionales,
      //promocionales : this.promocionales,
      tradicionales: this.tradicionales,
      combos : this.combos,
      total: this.costoTotal
    });
  }
  componente = false;
  local(){
    this.app.getRootNav().push(ListLocalesPage, {
        pizzas : this.pizzas,
        adicionales : this.adicionales,
        //promocionales : this.promocionales, 
        tradicionales: this.tradicionales,
        combos : this.combos,
        total: this.costoTotal,
        componente: this.componente

    });
  }
}
