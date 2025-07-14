import { Producto } from "./Producto";

export interface CarritoProducto {
  id?: number;
  producto: Producto;
  cantidad: number;
}
