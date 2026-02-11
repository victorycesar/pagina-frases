import { pool } from "../Utils/db";
import { ResultSetHeader } from "mysql2";
import { FraseRes, FraseReq, FraseReqEdit, FraseReqEditStatus } from "../Interfaces/FraseInterfaces";

export const FraseRepository = {
    async getAll(){
        try {
            const [rows] = await pool.query<FraseRes[]>("SELECT id_frase, nombre_usuario, titulo_frase, texto_frase, DATE_FORMAT(fecha_creacion_frase, '%d/%m/%Y') as fecha_creacion, estado_frase FROM frases INNER JOIN usuarios ON frases.id_usuario = usuarios.id_usuario");
            return rows;
        }catch(error){
            throw error;
        }
    },
    async getByID(id_frase: number){
        try {
            const [rows] = await pool.query<FraseRes[]>("SELECT id_frase, nombre_usuario, titulo_frase, texto_frase, DATE_FORMAT(fecha_creacion_frase, '%d/%m/%Y') as fecha_creacion, estado_frase FROM frases INNER JOIN usuarios ON frases.id_usuario = usuarios.id_usuario WHERE id_frase = ?", [id_frase]);
            return rows[0];
        }catch(error){
            throw error;
        }
    },
    async create(data: FraseReq) {
        try {
            const [result] = await pool.query<ResultSetHeader>("INSERT INTO frases(id_usuario, titulo_frase, texto_frase, estado_frase) VALUES (?, ?, ?, ?)", [data.id_usuario, data.titulo_frase, data.texto_frase, data.estado_frase]);
            return result.insertId;
        }catch(error){
            throw error;
        }
    },
    async edit(id_frase: number, data: FraseReqEdit){
        try {
            const [result] = await pool.query<ResultSetHeader>("UPDATE frases SET titulo_frase = ?, texto_frase = ? WHERE id_frase = ?", [data.titulo_frase, data.texto_frase, id_frase]);
            return result.affectedRows; 
        }catch(error){
            throw error;
        }
    },
    async editStatus(id_frase: number, data: FraseReqEditStatus) {
        try {
            const [result] = await pool.query<ResultSetHeader>("UPDATE frases SET estado_frase = ? WHERE id_frase = ?", [data.estado_frase, id_frase]);
            return result.affectedRows;
        }catch(error){
            throw error;
        }
    },
    async delete(id_frase: number){
        try {
            const [result] = await pool.query<ResultSetHeader>("DELETE FROM frases WHERE id_frase = ?", [id_frase]);
            return result.insertId;
        }catch(error){
            throw error;
        }
    }
}