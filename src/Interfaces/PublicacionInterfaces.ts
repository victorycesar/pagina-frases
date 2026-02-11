import { RowDataPacket } from "mysql2";

export interface PublicacionRes extends RowDataPacket {
    id_publicacion: number;
    nombre_usuario: string;
    titulo_publicacion: string;
    texto_publicacion: string;
    fecha_creacion: string;
}

export interface PublicacionReq {
    id_usuario: number;
    titulo_publicaion: string;
    texto_publicacion: string;
}

export interface PublicacionReqEdit {
    titulo_publicacion: string;
    texto_publicacion: string;
}