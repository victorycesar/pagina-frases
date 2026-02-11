import { RowDataPacket } from "mysql2";

export interface FraseRes extends RowDataPacket{
    id_frase: number;
    nombre_usuario: string;
    titulo_frase: string;
    texto_frase: string;
    fecha_creacion: string;
    estado_frase: string;
}

export interface FraseReq {
    id_usuario: number;
    titulo_frase: string;
    texto_frase: string;
    estado_frase: string;
}

export interface FraseReqEdit {
    titulo_frase: string;
    texto_frase: string;
}

export interface FraseReqEditStatus {
    estado_frase: string;
}

