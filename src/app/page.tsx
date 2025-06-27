'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/LoginForm';
import QuoteGenerator from '@/app/components/QuoteGenerator';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <QuoteGenerator onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
}
