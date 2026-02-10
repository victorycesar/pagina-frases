import { pool } from "../Utils/db";
import { UsuarioReq, UsuarioRes } from "../Interfaces/UsuarioInterfaces";
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
    }
}