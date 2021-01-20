import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, App } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Cupon } from "../../interfaces/ICupon";
import { Constantes } from '../../util/constantes';
import { HomePage } from '../home/home';

/**
 * Generated class for the BebidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cupones',
  templateUrl: 'cupones.html',
})
export class CuponesPage {

  cupones : Array<Cupon>
  costoTotal:Number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams
            , public httpRequest : HttpRequestProvider
            , public events: Events
            , public loadingCtrl: LoadingController
            , public alertCtrl : AlertController
            , public app : App) {
              this.costoTotal=0;
  }

  ionViewDidLoad() {
    this.cargarCupones();
    this.events.subscribe('cambio-cupones', (cuponesviejos ) => {
      this.quitarcupones(cuponesviejos);
    });
  }

  quitarcupones(cuponesEscogidos){
    cuponesEscogidos.forEach(cuponEscogido=>{
      let index = this.cupones.map(function (x) { return x.id; }).indexOf(cuponEscogido.id);
      this.cupones.splice(index,1 );
    });
  }

  disminuirCantidad(cupon) {
    
    cupon.cantidad--;
    this.handlerCheckbox(cupon);
  }

  aumentarCantidad(cupon) {
    cupon.cantidad++;
    this.handlerCheckbox(cupon);
  }

  

  cargarCupones(){
    let loading = this.loadingCtrl .create({
      content: 'Cargando...'
    });
    loading.present();
    try{
      this.cupones = new Array<Cupon>();
      let token = window.localStorage.getItem("userToken");
      this.httpRequest.get(Constantes.getCuponesUrl(token)).then((data : any) => {
        var response = data.json();
        if( response.PAQUETE != undefined){
          let now = new Date();
          var count = 0;
          let len=response.PAQUETE.length;
          response.PAQUETE.forEach((child : any) => {
            if(len>1){
              console.log("Entra 1------------------------------->")
              var dateIni=new Date(child.fecha_inicio);
              var dateFin=new Date(child.fecha_fin);
              console.log(dateFin)
              console.log(dateIni)
              console.log(now)
              // 
              if(len>count && now.getTime()>=dateIni.getTime() && now.getTime()<dateFin.getTime() ){
                /** cupones (<n-1), restriccion (n-1)*/
                let cupon : Cupon ={
                  id : child.id,
                  texto:child.texto,
                  nombre:child.nombre,
                  fechaInicio : child.fecha_inicio,
                  fechaFin : child.fecha_fin,
                  imagen : child.imagen,
                  cantidad : 1,
                  checked: false,
                  //stock : 1,
                  num_person:response.PAQUETE[len-1]["cupones por persona"]
                }
                this.cupones.push(cupon);

                if(this.cupones.length>=1){
                  this.cupones[0].checked=true;
                  this.handlerCheckbox(this.cupones[0])
                }
                //F
                count=count+1;
              }
            }else{
              this.mostrarMensaje(Constantes.DIA_INCORRECTO, Constantes.SIN_CUPONES);
            }
          });
          //this.cargarValorCuponPersonRest();
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

  mostrarMensaje(titulo: string ,mensaje: string){
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.app.getRootNavs()[0].setRoot(HomePage)
          }
        }
     
        
      ]
    });
    alert.present();
    
   }
  
    

  /**
   * Este metodo procesara la accion de seleccionar un bebida
   * @param cupon bebid que captura el evento del checkbox
   */
  handlerCheckbox(cupon){
    this.events.publish('seleccion-cupon', cupon );
    console.log("has topado un cupon--------------------------------------->")
    console.log(cupon)
  }

  seleccioncupon(cupon){
    if(!cupon.checked){
      cupon.checked=true;
    }else{
      cupon.checked=false;
    }
    
    this.handlerCheckbox(cupon)
  }

}
