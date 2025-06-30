import { Banner } from "./Banner";

export interface Empresa {
    secuencial?: number;  // opcional para crear nuevas
    nombre: string;
    logo: string;
    mision: string;
    vision: string;
    banners: Banner[];
}
