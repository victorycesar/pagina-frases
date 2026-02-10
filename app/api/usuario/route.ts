import { NextResponse, NextRequest } from "next/server";
import { usuarioController } from "@/src/Controllers/UsuarioController";

export async function GET() {
    try {
        const usuarios = await usuarioController.obtenerUsuarios();
        return NextResponse.json(usuarios);
    }catch(error: any){
        return NextResponse.json(
            {error: "Hubo un error " + error}
        )
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    try {
        const result = await usuarioController.crearUsuario(body);
        return NextResponse.json({id_usuario: `${result}`},{status:201});
    }catch(error){
        return NextResponse.json({error: "Hubo un error" + error});
    }
}