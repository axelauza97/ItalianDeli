import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../../util/constantes';
import { HttpRequestProvider } from '../http-request/http-request';

/*
  Generated class for the ProvidersTimeServiceTimeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimeServiceProvider {

  horaInicio = ""
  horaFin = ""
  

  constructor(public http: HttpClient, public httpRequest: HttpRequestProvider,) {
    this.init()
  }

  async cargarHorario(token: string){
    try {
      //let token = window.localStorage.getItem("userToken");
      await this.httpRequest.get(Constantes.getHorario(token)).then((data: any) => {
        var response = data.json();
        if(response!=null){
        
          this.horaInicio = response['HORAINICIO']
          this.horaFin = response['HORAFIN']
        }
      }, (err) => {
        console.log("Error: ", err.message)
      });
    }
    catch (err) {
      console.log('Error: ', err.message);
    }
  }

  init(){
    
    let diaActual = new Date().getDay()
    console.log("WeekDay: "+diaActual)
    if(diaActual > 0)
      diaActual--
    else if(diaActual == 0)
      diaActual = 6
    console.log("WeekDay: "+diaActual)
    this.cargarHorario(diaActual.toString())
    
  }

  getHorario(){
    this.reviewTime()
    return this.horaInicio + " - " + this.horaFin
  }

  checkTime(){
    this.reviewTime()
    let date = new Date()
    let time = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString()
    let dateB = new Date()
    let dateE = new Date()
    let arr = this.horaInicio.split(":")
    let arr2 = this.horaFin.split(":")

    dateB.setHours(Number(arr[0]))
    dateB.setMinutes(Number(arr[1]))
    dateB.setSeconds(Number(arr[2]))

    dateE.setHours(Number(arr2[0]))
    dateE.setMinutes(Number(arr2[1]))
    dateE.setSeconds(Number(arr2[2]))

    console.log(date.getHours())
    console.log(dateB.getHours())
    console.log(dateE.getHours())

    console.log(time)
    console.log("hora inicio: " + this.horaInicio)
    console.log("hora fin: " + this.horaFin)

    let mensaje = this.getTime(dateB.getHours()) + ":" + this.getTime(dateB.getMinutes()) + " a " + this.getTime(dateE.getHours()) + ":" + this.getTime(dateE.getMinutes()) + " horas."

    if(date >= dateB && date < dateE)
      return ["OK!"]
    else
      return [mensaje, "Por el momento estamos recargando", "energías para la hora de apertura 💪"]
  }

  reviewTime(){
    if(this.horaInicio === "" || this.horaFin === "" || this.horaInicio === undefined || this.horaFin === undefined){
      this.init()
    }
  }

  getTime(time){
    if(time > 10)
      return time
    else
      return "0" + time

  }

}
