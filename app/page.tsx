'use client'

import { useEffect, useState } from "react";
import { UsuarioRes } from "@/src/Interfaces/UsuarioInterfaces";

export default function Home() {
  const [usuarios, setUsuarios] = useState<UsuarioRes[]>([])

  useEffect(() => {
  async function obtenerDatos() {
    try {
      const response = await fetch("/api/usuario", {headers: {
        "Content-Type": "application/json",
      }})
      const data = await response.json()
      setUsuarios(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  obtenerDatos()

}, [])


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {usuarios.map(usuario => (
        <div key={usuario.id_usuario}>
          <h1>{usuario.nombre_usuario}</h1>
          <h2>{usuario.fecha_registro}</h2>
          <p>{usuario.correo_usuario}</p>
        </div>
      ))}
    </div>
  );
}
