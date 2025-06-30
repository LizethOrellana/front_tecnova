export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    fecha_creacion:string;
    precio: number;
    stock: number;
    imagen_url?: string;
    categoria_id?: number;
    marca_id?: number;
}
