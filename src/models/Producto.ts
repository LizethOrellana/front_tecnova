export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    fecha_creacion: string;
    precio: number;
    stock: number;
    imagenUrl?: string;
    categoriaId?: number;
    marcaId?: number;
    estado?: boolean;
}
