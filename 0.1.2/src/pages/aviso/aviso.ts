import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, App } from 'ionic-angular';
import { TimeServiceProvider } from '../../providers/time-service/time-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the AvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aviso',
  templateUrl: 'aviso.html',
})
export class AvisoPage {

  toPage: any;
  message4: string = "Italian Deli Express, te espera de"
  message1: string  = "";
  message2: string = "";
  message3: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl : ViewController,
    public modalCtrl: ModalController,
    public app: App) {
    this.toPage = this.navParams.get("pagina")
    this.message1 = this.navParams.get("message1")
    this.message2 = this.navParams.get("message2")
    this.message3 = this.navParams.get("message3")
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AvisoPage');
  }

  continuar(event: Event){
    event.preventDefault;
    //this.app.getRootNav().push(this.toPage)
    this.viewCtrl.dismiss()
    
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

}
