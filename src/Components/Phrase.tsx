'use client';

interface PhraseProps {
  id_frase: number;
  titulo_frase: string;
  texto_frase: string;
  nombre_usuario?: string;
  fecha_creacion?: string;
  estado_frase: string;
  isOwn?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  showActions?: boolean;
}

export const Phrase = ({
  id_frase,
  titulo_frase,
  texto_frase,
  nombre_usuario,
  fecha_creacion,
  estado_frase,
  isOwn = false,
  onDelete,
  onEdit,
  showActions = true
}: PhraseProps) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="border-b border-gray-200 py-3 last:border-b-0">
      {/* Título */}
      {titulo_frase && (
        <h3 className="font-semibold text-gray-900 mb-1">
          {titulo_frase}
        </h3>
      )}

      {/* Texto */}
      <p className="text-gray-800 leading-relaxed mb-2">
        {texto_frase}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-3">
          {nombre_usuario && (
            <span>— {nombre_usuario}</span>
          )}
          {fecha_creacion && (
            <span>{formatDate(fecha_creacion)}</span>
          )}
          {estado_frase && (
            <span className={`
              px-2 py-0.5 rounded text-xs
              ${estado_frase === 'Publica' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
              }
            `}>
              {estado_frase}
            </span>
          )}
        </div>

        {/* Actions */}
        {isOwn && showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(id_frase)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(id_frase)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};