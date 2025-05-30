import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, getCurrentUser } from '../lib/supabase';

export type UserRole = 'admin' | 'faculty' | 'student';

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          if (data?.user) {
            // In a real app, we would fetch user details including role from a profiles table
            // For this example, we're using a simplified approach
            const userRole = email.includes('admin') ? 'admin' : 
                            email.includes('faculty') ? 'faculty' : 'student';
            
            const user: User = {
              id: data.user.id,
              email: data.user.email || '',
              role: userRole as UserRole,
              firstName: 'Test',
              lastName: 'User',
            };
            
            set({ user, isAuthenticated: true });
            return { success: true };
          }
          
          return { success: false, error: 'Login failed' };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      },
      
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuth: async () => {
        set({ isLoading: true });
        
        const user = await getCurrentUser();
        
        if (user) {
          // In a real app, fetch user role from profiles table
          const userRole = user.email?.includes('admin') ? 'admin' : 
                          user.email?.includes('faculty') ? 'faculty' : 'student';
          
          set({ 
            user: {
              id: user.id,
              email: user.email || '',
              role: userRole as UserRole,
              firstName: 'Test',
              lastName: 'User',
            }, 
            isAuthenticated: true 
          });
        } else {
          set({ user: null, isAuthenticated: false });
        }
        
        set({ isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);