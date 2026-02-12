'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Button } from './UI/Button';
import { Input } from './UI/Input';

interface EditPhraseModalProps {
  phraseId: number;
  initialData: {
    titulo_frase: string;
    texto_frase: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export const EditPhraseModal = ({
  phraseId,
  initialData,
  onClose,
  onSuccess
}: EditPhraseModalProps) => {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/frases/${phraseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al editar frase');
        return;
      }

      onSuccess();
      onClose();

    } catch (error) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold mb-4">Editar Frase</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título"
            value={formData.titulo_frase}
            onChange={(e) => setFormData({ ...formData, titulo_frase: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texto
            </label>
            <textarea
              value={formData.texto_frase}
              onChange={(e) => setFormData({ ...formData, texto_frase: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-2">
            <Button type="submit" isLoading={isLoading} className="flex-1">
              Guardar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};