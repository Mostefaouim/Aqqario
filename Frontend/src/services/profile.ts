import { apiClient, ApiResponse, PaginationMeta } from './api';
import { UserProfile } from './auth';

// Profile Service
export const profileService = {
  // Get current user's profile
  async getMyProfile(): Promise<ApiResponse<UserProfile>> {
    return apiClient.get('/profiles/me');
  },

  // Update current user's profile
  async updateMyProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return apiClient.put('/profiles/me', data);
  },

  // Get user profile by ID
  async getProfile(id: string): Promise<ApiResponse<UserProfile>> {
    return apiClient.get(`/profiles/${id}`);
  },

  // Get all agents
  async getAgents(filters: {
    page?: number;
    limit?: number;
    city?: string;
    agencyName?: string;
  } = {}): Promise<ApiResponse<UserProfile[]> & PaginationMeta> {
    return apiClient.get('/profiles/agents', filters);
  }
};
