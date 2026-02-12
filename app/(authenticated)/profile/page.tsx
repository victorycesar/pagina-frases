// app/(authenticated)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { CreatePhraseForm } from '@/Components/CreatePhraseForm';
import { Phrase } from '@/Components/Phrase';
import { EditPhraseModal } from '@/Components/EditPhraseModal';
import { Card } from '@/Components/UI/Card';
import { Button } from '@/Components/UI/Button';

interface Usuario {
  id_usuario: number;
  nombre_usuario: string;
  correo_usuario: string;
  fecha_registro: string;
}

interface Frase {
  id_frase: number;
  titulo_frase: string;
  texto_frase: string;
  estado_frase: string;
  fecha_creacion: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [frases, setFrases] = useState<Frase[]>([]);
  const [filteredFrases, setFilteredFrases] = useState<Frase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'todas' | 'publicas' | 'privadas'>('todas');
  const [editingPhrase, setEditingPhrase] = useState<{ id: number; data: { titulo_frase: string; texto_frase: string } } | null>(null);

  useEffect(() => {
    fetchUser();
    fetchFrases();
  }, []);

  useEffect(() => {
    filterFrases();
  }, [activeTab, frases]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchFrases = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/frases/mis-frases', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setFrases(data);
      }
    } catch (error) {
      console.error('Error fetching frases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFrases = () => {
    if (activeTab === 'todas') {
      setFilteredFrases(frases);
    } else if (activeTab === 'publicas') {
      setFilteredFrases(frases.filter(f => f.estado_frase === 'Publica'));
    } else {
      setFilteredFrases(frases.filter(f => f.estado_frase === 'Privada'));
    }
  };

  const handleDelete = async (id_frase: number) => {
    if (!confirm('¿Estás seguro de eliminar esta frase?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/frases/${id_frase}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setFrases(frases.filter(f => f.id_frase !== id_frase));
      }
    } catch (error) {
      console.error('Error deleting frase:', error);
    }
  };

  const handleEdit = (id_frase: number) => {
    const frase = frases.find(f => f.id_frase === id_frase);
    if (frase) {
      setEditingPhrase({
        id: id_frase,
        data: {
          titulo_frase: frase.titulo_frase,
          texto_frase: frase.texto_frase
        }
      });
    }
  };

  const handleEditSuccess = () => {
    fetchFrases();
    setEditingPhrase(null);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Mi Perfil
          </h1>
          {user && (
            <p className="text-gray-600 mt-1">
              @{user.nombre_usuario} • {user.correo_usuario}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar: Crear Frase */}
          <div className="lg:col-span-1">
            <CreatePhraseForm onSuccess={fetchFrases} />
          </div>

          {/* Main: Mis Frases */}
          <div className="lg:col-span-2">
            <Card>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-3">Mis Frases</h2>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                  {[
                    { key: 'todas', label: 'Todas' },
                    { key: 'publicas', label: 'Públicas' },
                    { key: 'privadas', label: 'Privadas' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
                      className={`
                        px-4 py-2 font-medium transition-colors
                        ${activeTab === tab.key
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-800'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Frases */}
              {filteredFrases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No tienes frases en esta categoría
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFrases.map((frase) => (
                    <Phrase
                      key={frase.id_frase}
                      id_frase={frase.id_frase}
                      titulo_frase={frase.titulo_frase}
                      texto_frase={frase.texto_frase}
                      estado_frase={frase.estado_frase}
                      fecha_creacion={frase.fecha_creacion}
                      isOwn={true}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      showActions={true}
                    />
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPhrase && (
        <EditPhraseModal
          phraseId={editingPhrase.id}
          initialData={editingPhrase.data}
          onClose={() => setEditingPhrase(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}