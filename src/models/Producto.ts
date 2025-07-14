import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    fecha_creacion: string;
    precio: number;
    stock: number;
    imagenUrl?: string;
    categoria?: Categoria;
    marca?: Marca;
    estado?: boolean;
}
