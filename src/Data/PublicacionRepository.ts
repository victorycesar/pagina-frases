import { pool } from "../Utils/db";
import { PublicacionReq, PublicacionRes, PublicacionReqEdit } from "../Interfaces/PublicacionInterfaces";
import { ResultSetHeader } from "mysql2";

export const PublicacionRepository = {
    async getAll() {
        try {
            const [rows] = await pool.query<PublicacionRes[]>("SELECT id_publicacion, nombre_usuario, titulo_publicacion, texto_publicacion, DATE_FORMAT(fecha_creacion_publicacion, '%d/%m/%Y') as fecha_creacion FROM publicaciones INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario");
            return rows;
        } catch (error) {
            throw error;
        }
    },
    async getById(id_publicacion: number) {
        try {
            const [rows] = await pool.query<PublicacionRes[]>("SELECT id_publicacion, nombre_usuario, titulo_publicacion, texto_publicacion, DATE_FORMAT(fecha_creacion_publicacion, '%d/%m/%Y') as fecha_creacion FROM publicaciones INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario WHERE id_publicacion = ?", [id_publicacion]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },
    async getByUser(id_usuario: number) {
        try {
            const [rows] = await pool.query<PublicacionRes[]>("SELECT id_publicacion, nombre_usuario, titulo_publicacion, texto_publicacion, DATE_FORMAT(fecha_creacion_publicacion, '%d/%m/%Y') as fecha_creacion FROM publicaciones INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario WHERE id_usuario = ?", [id_usuario]);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    async create(data: PublicacionReq) {
        try {
            const [result] = await pool.query<ResultSetHeader>("INSERT INTO publicaciones(id_usuario, titulo_publicacion, texto_publicacion) VALUES(?,?,?)", [data.id_usuario, data.titulo_publicaion, data.texto_publicacion]);
            return result.insertId;
        }catch(error){
            throw error;
        }
    },
    async edit(id_publicacion: number, data: PublicacionReqEdit) {
        try {
            const [result] = await pool.query<ResultSetHeader>("UPDATE publicaciones SET titulo_publicacion = ?, texto_publicacion = ? WHERE id_publicacion = ?", [data.titulo_publicacion, data.texto_publicacion, id_publicacion]);
            return result.affectedRows;
        }catch(error){
            throw error;
        }
    },
    async delete(id_publicacion: number) {
        try {
            const [result] = await pool.query<ResultSetHeader>("DELETE FROM publicaciones WHERE id_publicacion = ?", [id_publicacion]);
            return result.affectedRows;
        }catch(error){
            throw error;
        }
    }
}