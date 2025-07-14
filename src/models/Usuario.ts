import { TipoUsuario } from "./TipoUsuario";

export interface Usuario {
    secuencial: number;
    cedula: string
    nombre: string;
    apellido: string;
    telefono: string;
    username: string;
    password: string;
    estaActivo: number;
    tipoUsuario: TipoUsuario;
    pregunta: string;
}