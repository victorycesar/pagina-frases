import { pool } from "../Utils/db";
import { UsuarioRes } from "../Interfaces/UsuarioInterfaces";

export const usuarioRepository = {
    
    async getAll() {
        try {
            const [rows] = await pool.query<UsuarioRes[]>("SELECT id_usuario, nombre_usuario, correo_usuario, rol_usuario, DATE_FORMAT(fecha_creacion_usuario, '%d/%m/%Y') as fecha_registro FROM usuarios");
            return rows;
        } catch (error) {
            throw error;
        }
    }
}