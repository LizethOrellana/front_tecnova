export interface Menu {
    id?: number;
    nombre: string;
    ruta: string;
    icono?: string;
    activo: boolean;
    nivel_acceso?: number;
}
