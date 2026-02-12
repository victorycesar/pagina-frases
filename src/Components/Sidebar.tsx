// components/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from './UI/Button';

interface User {
  id: string;
  username: string;
  email: string;
}

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const navItems = [
    { href: '/feed', label: 'Feed', icon: '📰' },
    { href: '/profile', label: 'Mi Perfil', icon: '👤' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">
          Frases
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Comparte tus pensamientos
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Crear Frase Button */}
        <div className="pt-4">
          <Button 
            onClick={() => router.push('/profile?tab=create')}
            className="w-full"
          >
            ✍️ Crear Frase
          </Button>
        </div>
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-3">
            <p className="font-medium text-gray-800">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}
        <Button 
          variant="secondary" 
          onClick={handleLogout}
          className="w-full"
        >
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
};