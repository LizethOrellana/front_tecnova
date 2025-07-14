import { CarritoProducto } from "./CarritoProducto";

export interface Carrito {
    id?: number;
    usuario: {
        secuencial: number;
    };
    fechaCreacion: Date;
    estado: boolean;
    estado_proceso: string;
    productos: CarritoProducto[];
}
