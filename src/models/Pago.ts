export interface Pago {
    id?: number;
    pedido: any; // Podrías usar tipo Pedido si está relacionado
    metodoPago: string;
    estadoPago: string;
    fechaPago: Date;
}
