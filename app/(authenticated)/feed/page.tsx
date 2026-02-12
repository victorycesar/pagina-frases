// app/(authenticated)/feed/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/Components/Publication';

interface FraseInPublicacion {
  id_frase: number;
  titulo_frase: string;
  texto_frase: string;
  estado_frase: string;
}

interface PublicacionData {
  id_publicacion: number;
  nombre_usuario: string;
  titulo_publicacion: string;
  texto_publicacion: string;
  fecha_creacion: string;
  id_usuario: number;
  frases: FraseInPublicacion[];
}

export default function FeedPage() {
  const [publicaciones, setPublicaciones] = useState<PublicacionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCurrentUser();
    fetchPublicaciones();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setCurrentUserId(data.id_usuario);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchPublicaciones = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/publicaciones', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        setError('Error al cargar publicaciones');
        return;
      }

      const data = await res.json();
      setPublicaciones(data);

    } catch (error) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Feed de Frases
          </h1>
          <p className="text-gray-600 mt-1">
            Descubre las últimas publicaciones
          </p>
        </div>

        {/* Publicaciones */}
        {publicaciones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay publicaciones aún
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Sé el primero en compartir tus frases
            </p>
          </div>
        ) : (
          <div>
            {publicaciones.map((pub) => (
              <Publication
                key={pub.id_publicacion}
                id_publicacion={pub.id_publicacion}
                nombre_usuario={pub.nombre_usuario}
                titulo_publicacion={pub.titulo_publicacion}
                texto_publicacion={pub.texto_publicacion}
                fecha_creacion={pub.fecha_creacion}
                frases={pub.frases}
                currentUserId={currentUserId ?? undefined}
                authorId={pub.id_usuario}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}