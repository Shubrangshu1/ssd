
"use client";
import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import type { AuthState } from '@/types';

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
