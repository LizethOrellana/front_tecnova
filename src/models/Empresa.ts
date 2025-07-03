import { Banner } from "./Banner";

export interface Empresa {
    id?: number;  // opcional para crear nuevas
    nombre: string;
    logo: string;
    mision: string;
    vision: string;
    banners: Banner[];
}
