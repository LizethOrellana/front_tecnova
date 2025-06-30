export interface Menu {
    id?: number;
    nombre: string;
    ruta: string;
    icono?: string;
    activo: boolean;
    orden?: number;
    padre?: Menu;
}
