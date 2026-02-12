'use client';

import { useState, FormEvent } from 'react';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { Card } from './UI/Card';

interface CreatePhraseFormProps {
  onSuccess?: () => void;
}

export const CreatePhraseForm = ({ onSuccess }: CreatePhraseFormProps) => {
  const [formData, setFormData] = useState({
    titulo_frase: '',
    texto_frase: '',
    estado_frase: 'Publica'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.texto_frase.trim()) {
      setError('El texto de la frase no puede estar vacío');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/frases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al crear frase');
        return;
      }

      // Reset form
      setFormData({
        titulo_frase: '',
        texto_frase: '',
        estado_frase: 'Publica'
      });
      
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">
        Crear Nueva Frase
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <Input
          label="Título (opcional)"
          value={formData.titulo_frase}
          onChange={(e) => setFormData({ ...formData, titulo_frase: e.target.value })}
          placeholder="Un título para tu frase..."
        />

        {/* Texto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto de la frase
          </label>
          <textarea
            value={formData.texto_frase}
            onChange={(e) => setFormData({ ...formData, texto_frase: e.target.value })}
            placeholder="Escribe tu frase aquí..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            maxLength={500}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.texto_frase.length} / 500
          </p>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visibilidad
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Publica"
                checked={formData.estado_frase === 'Publica'}
                onChange={(e) => setFormData({ ...formData, estado_frase: e.target.value })}
              />
              <span className="text-sm">Pública</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Privada"
                checked={formData.estado_frase === 'Privada'}
                onChange={(e) => setFormData({ ...formData, estado_frase: e.target.value })}
              />
              <span className="text-sm">Privada</span>
            </label>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Crear Frase
        </Button>
      </form>
    </Card>
  );
};