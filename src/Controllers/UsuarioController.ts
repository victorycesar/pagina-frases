import { usuarioRepository } from "../Data/UsuarioRepository"

export const usuarioController = {
    async obtenerUsuarios() {
        const usuarios = await usuarioRepository.getAll();
        return usuarios;
    }
}