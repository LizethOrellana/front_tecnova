import { Usuario } from "./Usuario";

export interface Pedido {
    id?: number;
    usuario: Usuario;
    total: number;
    estado: string;
    fechaPedido: Date;
}
