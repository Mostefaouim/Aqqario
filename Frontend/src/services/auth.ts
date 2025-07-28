import { apiClient, ApiResponse } from './api';

// Types
export interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  bio?: string;
  agency_name?: string;
  license_number?: string;
  avatar_url?: string;
  role: 'user' | 'agent' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  session: AuthSession;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'user' | 'agent';
}

export interface AgencyRegisterData extends RegisterData {
  agencyName: string;
  licenseNumber: string;
  bio?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Auth Service
export const authService = {
  // Register a new user
  async register(data: RegisterData): Promise<ApiResponse<{ user: User }>> {
    return apiClient.post('/auth/register', data);
  },

  // Register a new agency/agent
  async registerAgency(data: AgencyRegisterData): Promise<ApiResponse<{ user: User }>> {
    return apiClient.post('/auth/register-agency', data);
  },

  // Login user
  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
    
    // Store tokens in localStorage
    if (response.success && response.data) {
      localStorage.setItem('access_token', response.data.session.accessToken);
      localStorage.setItem('refresh_token', response.data.session.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // Refresh token
  async refreshToken(): Promise<ApiResponse<{ session: AuthSession }>> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<ApiResponse<{ session: AuthSession }>>('/auth/refresh', {
      refreshToken
    });

    // Update tokens in localStorage
    if (response.success && response.data) {
      localStorage.setItem('access_token', response.data.session.accessToken);
      localStorage.setItem('refresh_token', response.data.session.refreshToken);
    }

    return response;
  },

  // Logout user
  async logout(): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/logout');
      // Clear localStorage on successful logout
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      return response;
    } catch (error) {
      // Clear localStorage even if API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      // Return error response
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Logout failed',
        timestamp: new Date().toISOString()
      };
    }
  },

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
};
