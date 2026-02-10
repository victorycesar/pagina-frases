import { usuarioRepository } from "../Data/UsuarioRepository"
import { UsuarioReq } from "../Interfaces/UsuarioInterfaces";

export const usuarioController = {
    async obtenerUsuarios() {
        const usuarios = await usuarioRepository.getAll();
        return usuarios;
    },
    async crearUsuario(data: any) {
        if (!data.nombre_usuario || !data.correo_usuario || !data.clave_usuario) {
            throw new Error("Los datos son invalidos o estan vacios");
        }

        const datos: UsuarioReq = {
            nombre_usuario: data.nombre_usuario,
            correo_usuario: data.correo_usuario,
            clave_usuario: data.clave_usuario
        }

        return await usuarioRepository.create(datos);
    }
}