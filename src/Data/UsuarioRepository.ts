import { pool } from "../Utils/db";
import { UsuarioReq, UsuarioReqEdit, UsuarioReqEditPassword, UsuarioRes } from "../Interfaces/UsuarioInterfaces";
import { ResultSetHeader } from "mysql2";

export const usuarioRepository = {
    
    async getAll() {
        try {
            const [rows] = await pool.query<UsuarioRes[]>("SELECT id_usuario, nombre_usuario, correo_usuario, rol_usuario, DATE_FORMAT(fecha_creacion_usuario, '%d/%m/%Y') as fecha_registro FROM usuarios");
            return rows;
        } catch (error) {
            throw error;
        }
    },
    async getById(id_usuario: number) {
        try {
            const [rows] = await pool.query<UsuarioRes[]>("SELECT id_usuario, nombre_usuario, correo_usuario, rol_usuario, DATE_FORMAT(fecha_creacion_usuario, '%d/%m/%Y') as fecha_registro FROM usuarios WHERE id_usuario = ?", [id_usuario]);
            return rows[0];
        }catch(error){
            throw error;
        }

    },
    async getbyEmail(correo: string) {
        try {
            const [rows] = await pool.query<UsuarioRes[]>("SELECT id_usuario, nombre_usuario, correo_usuario, rol_usuario, DATE_FORMAT(fecha_creacion_usuario, '%d/%m/%Y') as fecha_registro FROM usuarios WHERE correo_usuario = ?", [correo])
            return rows[0]
        }catch(error){
            throw error;
        }

    },
    async getEmailAndPassword(correo: string) {
        try {
            const [rows] = await pool.query<UsuarioRes[]>("SELECT correo_usuario, clave_usuario FROM usuarios WHERE correo_usuario = ?", [correo])
            return rows[0];
        }catch(error){
            throw error;
        }
    },
    async create(data: UsuarioReq) {
        try {
            const [result] = await pool.query<ResultSetHeader>("INSER INTO usuarios(nombre_usuario, correo_usuario, clave_usuario) VALUES(?, ?, ?)", [data.nombre_usuario, data.correo_usuario, data.clave_usuario]);
            return result.insertId;
        }catch(error){
            throw error;
        }
    },
    async edit(id_usuario: number, data: UsuarioReqEdit) {
        try {
            const [result] = await pool.query<ResultSetHeader>("UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ? WHERE id_usuario = ?", [data.nombre_usuario, data.correo_usuario, id_usuario]);
            return result.affectedRows;
        }catch(error){
            throw error;
        }
    },
    async editPassword(id_usuario: number, data: UsuarioReqEditPassword) {
        try {
            const [result] = await pool.query<ResultSetHeader>("UPDATE usuarios SET clave_usuario = ? WHERE id_usuario = ?", [data.clave_usuario, id_usuario]);
            return result.affectedRows;
        }catch(error){
            throw error;
        }
    },
    async delete(id_usuario: number) {
        try {
            const [result] = await pool.query<ResultSetHeader>("DELETE FROM usuarios WHERE id_usuario = ?", [id_usuario]);
            return result.affectedRows;
        }catch(error){
            throw error;
        }
    }
}