import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User, UserProfile } from '@/services/auth';
import { profileService } from '@/services/profile';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<{ error: any }>;
  signUpAgency: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    agencyName: string;
    licenseNumber: string;
    bio?: string;
  }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any }>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();

        if (storedUser && isAuth) {
          setUser(storedUser);
          // Fetch updated profile data
          await refreshUserData();
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Clear invalid tokens
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshUserData = async () => {
    try {
      const response = await profileService.getMyProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        
        // Update user in localStorage with profile data
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, profile: response.data };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone?: string) => {
    try {
      const response = await authService.register({
        email,
        password,
        firstName,
        lastName,
        phone,
        role: 'user'
      });

      if (response.success) {
        return { error: null };
      } else {
        return { error: { message: response.message } };
      }
    } catch (error: any) {
      return { error: { message: error.message || 'Registration failed' } };
    }
  };

  const signUpAgency = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    agencyName: string;
    licenseNumber: string;
    bio?: string;
  }) => {
    try {
      const response = await authService.registerAgency(data);

      if (response.success) {
        return { error: null };
      } else {
        return { error: { message: response.message } };
      }
    } catch (error: any) {
      return { error: { message: error.message || 'Agency registration failed' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });

      if (response.success && response.data) {
        setUser(response.data.user);
        setProfile(response.data.user.profile || null);
        return { error: null };
      } else {
        return { error: { message: response.message } };
      }
    } catch (error: any) {
      return { error: { message: error.message || 'Login failed' } };
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setProfile(null);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const response = await profileService.updateMyProfile(data);

      if (response.success && response.data) {
        setProfile(response.data);
        
        // Update user in localStorage
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, profile: response.data };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
        
        return { error: null };
      } else {
        return { error: { message: response.message } };
      }
    } catch (error: any) {
      return { error: { message: error.message || 'Profile update failed' } };
    }
  };

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: authService.isAuthenticated(),
    signUp,
    signUpAgency,
    signIn,
    signOut,
    updateProfile,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};