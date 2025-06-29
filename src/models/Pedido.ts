export interface Pedido {
    id?: number;
    usuario: string; // o mejor: Usuario si tienes el modelo
    total: number;
    estado: string;
    fechaPedido: string;
}
