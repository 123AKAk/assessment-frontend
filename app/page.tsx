'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.push('/dashboard');
    }
  }, [authState, router]);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A comprehensive user management system with role-based access control
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button 
            size="lg" 
            className="w-full gap-2 group"
            onClick={handleLogin}
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Admin: admin@example.com / password</p>
          </div>
        </div>
      </div>
    </main>
  );
}