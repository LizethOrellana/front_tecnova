export interface Carrito {
    id?: number;
    usuario: string;
    fechaCreacion: string;
    productos?: any[]; // Podrías tener CarritoDetalle si lo manejas
}
