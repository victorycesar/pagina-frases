import { RowDataPacket } from "mysql2";

export interface UsuarioRes extends RowDataPacket{
    id_usuario: number;
    nombre_usuario: string;
    correo_usuario: string;
    rol_usuario: string;
    fecha_registro: string;
}