export interface Carrito {
    id: number;
    fechaCreacion: Date;
    usuario: { secuencial: number };
    productos: {
        producto: {
            id: number;
            nombre: string;
            precio: number;
        };
        cantidad: number;
    }[];
}
