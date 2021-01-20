
import { IngredientesPromo } from "../interfaces/IIngredientesPromo";
import { Borde } from "./IBorde";

export interface PizzaPromo{
    ingredientes : IngredientesPromo[]
    nombre : string,
    descripcion : string,
    imgUrl : string,
    tamano : any,
    costo: Number,
    cantidad : Number,
    borde: Borde,
}