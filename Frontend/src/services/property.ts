import { apiClient, ApiResponse, PaginationMeta } from './api';

// Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state?: string;
  zip_code?: string;
  country: string;
  property_type: 'apartment' | 'house' | 'villa' | 'studio' | 'office' | 'shop' | 'warehouse' | 'land';
  listing_type: 'sale' | 'rent';
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  year_built?: number;
  parking: boolean;
  furnished: boolean;
  features?: string[];
  images?: string[];
  latitude?: number;
  longitude?: number;
  status: 'available' | 'pending' | 'sold' | 'rented';
  agent_id: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    agency_name?: string;
    avatar_url?: string;
    bio?: string;
  };
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  city?: string;
  propertyType?: Property['property_type'];
  listingType?: Property['listing_type'];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  parking?: boolean;
  furnished?: boolean;
  status?: Property['status'];
  sortBy?: 'price' | 'created_at' | 'area' | 'bedrooms';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface CreatePropertyData {
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
  propertyType: Property['property_type'];
  listingType: Property['listing_type'];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  yearBuilt?: number;
  parking?: boolean;
  furnished?: boolean;
  features?: string[];
  images?: string[];
  latitude?: number;
  longitude?: number;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  status?: Property['status'];
}

// Property Service
export const propertyService = {
  // Get all properties with filtering
  async getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<Property[]> & PaginationMeta> {
    return apiClient.get('/properties', filters);
  },

  // Get a single property by ID
  async getProperty(id: string): Promise<ApiResponse<Property>> {
    return apiClient.get(`/properties/${id}`);
  },

  // Create a new property (agents only)
  async createProperty(data: CreatePropertyData): Promise<ApiResponse<Property>> {
    return apiClient.post('/properties', data);
  },

  // Update a property
  async updateProperty(id: string, data: UpdatePropertyData): Promise<ApiResponse<Property>> {
    return apiClient.put(`/properties/${id}`, data);
  },

  // Delete a property
  async deleteProperty(id: string): Promise<ApiResponse> {
    return apiClient.delete(`/properties/${id}`);
  },

  // Get current agent's properties
  async getMyProperties(filters: Omit<PropertyFilters, 'search'> = {}): Promise<ApiResponse<Property[]> & PaginationMeta> {
    return apiClient.get('/properties/my-properties', filters);
  },

  // Upload property images
  async uploadImages(files: File[]): Promise<ApiResponse<{ files: any[]; count: number }>> {
    return apiClient.uploadFiles('/upload/property-images', files);
  }
};
