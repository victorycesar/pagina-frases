'use client';

import { Card } from './UI/Card';
import { Phrase } from './Phrase';

interface PublicationPhrase {
  id_frase: number;
  titulo_frase: string;
  texto_frase: string;
  estado_frase: string;
}

interface PublicationProps {
  id_publicacion: number;
  nombre_usuario: string;
  titulo_publicacion: string;
  texto_publicacion?: string;
  fecha_creacion: string;
  frases: PublicationPhrase[];
  currentUserId?: number;
  authorId?: number;
  onDeletePhrase?: (id: number) => void;
  onEditPhrase?: (id: number) => void;
}

export const Publication = ({
  id_publicacion,
  nombre_usuario,
  titulo_publicacion,
  texto_publicacion,
  fecha_creacion,
  frases,
  currentUserId,
  authorId,
  onDeletePhrase,
  onEditPhrase
}: PublicationProps) => {
  const isOwn = currentUserId === authorId;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {nombre_usuario.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="font-medium text-gray-800">
            {nombre_usuario}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(fecha_creacion)}
          </p>
        </div>
      </div>

      {/* Título Publicación */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {titulo_publicacion}
      </h2>

      {/* Texto Publicación (opcional) */}
      {texto_publicacion && (
        <p className="text-gray-700 mb-4">
          {texto_publicacion}
        </p>
      )}

      {/* Frases */}
      <div className="mt-4 space-y-2">
        {frases.map((frase) => (
          <Phrase
            key={frase.id_frase}
            id_frase={frase.id_frase}
            titulo_frase={frase.titulo_frase}
            texto_frase={frase.texto_frase}
            estado_frase={frase.estado_frase}
            isOwn={isOwn}
            onDelete={onDeletePhrase}
            onEdit={onEditPhrase}
            showActions={isOwn}
          />
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-500">
        {frases.length} {frases.length === 1 ? 'frase' : 'frases'}
      </div>
    </Card>
  );
};