/**
 * Interface para modelar objetos Porcion
 */
export interface Cupon{
    id: string,
    fechaInicio : string,
    fechaFin : string,
    nombre : string,
    texto : string,
    imagen : string,
    checked : boolean,
    cantidad : Number,
    num_person : Number

}
  