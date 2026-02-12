// app/page.tsx
import Link from 'next/link';
import { Button } from '@/Components/UI/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Logo/Título */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          FrasNet
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Comparte tus pensamientos con el mundo
        </p>

        {/* Descripción */}
        <p className="text-gray-600 mb-12 max-w-lg mx-auto">
          Una plataforma donde puedes crear, organizar y compartir 
          tus mejores frases. Inspira a otros y descubre nuevas perspectivas.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button className="px-8 py-3 text-lg">
              Crear Cuenta
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="px-8 py-3 text-lg">
              Iniciar Sesión
            </Button>
          </Link>
        </div>

        {/* Features (opcional) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl mb-2">✍️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Crea</h3>
            <p className="text-sm text-gray-600">
              Escribe y organiza tus frases favoritas
            </p>
          </div>
          <div>
            <div className="text-4xl mb-2">🌍</div>
            <h3 className="font-semibold text-gray-900 mb-1">Comparte</h3>
            <p className="text-sm text-gray-600">
              Publica y conecta con otros usuarios
            </p>
          </div>
          <div>
            <div className="text-4xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900 mb-1">Descubre</h3>
            <p className="text-sm text-gray-600">
              Explora frases de la comunidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}