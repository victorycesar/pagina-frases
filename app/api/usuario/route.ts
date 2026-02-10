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