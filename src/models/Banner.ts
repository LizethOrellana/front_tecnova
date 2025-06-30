import { Empresa } from "./Empresa";

export interface Banner {
    secuencial?: number;
    descripcion: string;
    url: string;
    estaBanner: number;
    empresa?: Empresa; // opcional para evitar ciclos al serializar
}
