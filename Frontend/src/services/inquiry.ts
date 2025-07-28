import { apiClient, ApiResponse, PaginationMeta } from './api';
import { Property } from './property';

// Types
export interface Inquiry {
  id: string;
  property_id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiry_type: 'viewing' | 'info' | 'offer' | 'other';
  status: 'pending' | 'contacted' | 'viewed' | 'closed' | 'spam';
  created_at: string;
  updated_at: string;
  properties?: Partial<Property>;
}

export interface CreateInquiryData {
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiryType?: Inquiry['inquiry_type'];
}

export interface InquiryFilters {
  page?: number;
  limit?: number;
  status?: Inquiry['status'];
  inquiryType?: Inquiry['inquiry_type'];
  propertyId?: string;
  sortBy?: 'created_at' | 'updated_at' | 'status';
  sortOrder?: 'asc' | 'desc';
}

// Inquiry Service
export const inquiryService = {
  // Create a new inquiry
  async createInquiry(data: CreateInquiryData): Promise<ApiResponse<Inquiry>> {
    return apiClient.post('/inquiries', data);
  },

  // Get current user's inquiries
  async getMyInquiries(filters: InquiryFilters = {}): Promise<ApiResponse<Inquiry[]> & PaginationMeta> {
    return apiClient.get('/inquiries/my-inquiries', filters);
  },

  // Get agent's received inquiries
  async getAgentInquiries(filters: InquiryFilters = {}): Promise<ApiResponse<Inquiry[]> & PaginationMeta> {
    return apiClient.get('/inquiries/agent-inquiries', filters);
  },

  // Update inquiry status (agents only)
  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<ApiResponse<Inquiry>> {
    return apiClient.put(`/inquiries/${id}/status`, { status });
  },

  // Delete an inquiry
  async deleteInquiry(id: string): Promise<ApiResponse> {
    return apiClient.delete(`/inquiries/${id}`);
  }
};
