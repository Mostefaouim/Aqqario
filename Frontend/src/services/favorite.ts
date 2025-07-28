import { apiClient, ApiResponse, PaginationMeta } from './api';
import { Property } from './property';

// Types
export interface Favorite {
  id: string;
  created_at: string;
  properties: Property;
}

export interface FavoriteFilters {
  page?: number;
  limit?: number;
  sortBy?: 'created_at';
  sortOrder?: 'asc' | 'desc';
}

// Favorites Service
export const favoriteService = {
  // Get user's favorite properties
  async getFavorites(filters: FavoriteFilters = {}): Promise<ApiResponse<Favorite[]> & PaginationMeta> {
    return apiClient.get('/favorites', filters);
  },

  // Add property to favorites
  async addToFavorites(propertyId: string): Promise<ApiResponse<Favorite>> {
    return apiClient.post('/favorites', { propertyId });
  },

  // Remove property from favorites
  async removeFromFavorites(propertyId: string): Promise<ApiResponse> {
    return apiClient.delete(`/favorites/${propertyId}`);
  },

  // Check if property is in favorites
  async checkFavoriteStatus(propertyId: string): Promise<ApiResponse<{ propertyId: string; isFavorite: boolean }>> {
    return apiClient.get(`/favorites/${propertyId}/status`);
  }
};
