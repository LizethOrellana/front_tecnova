import { Usuario } from "./Usuario";

export interface Pedido {
    id?: number;
    usuario: Usuario; // o mejor: Usuario si tienes el modelo
    total: number;
    estado: string;
    fechaPedido: Date;
}
