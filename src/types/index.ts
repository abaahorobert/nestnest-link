export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  profilePicture?: string;
  role: 'buyer' | 'agent' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  price: number;
  propertyType: 'apartment' | 'house' | 'land' | 'commercial';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  images: string[];
  agentId: string;
  agent: User;
  isApproved: boolean;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  userId: string;
  user: User;
  agentId: string;
  viewingDate: string;
  viewingTime: string;
  message?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  paymentAmount?: number;
  paymentId?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'review' | 'property';
  isRead: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface SearchFilters {
  query: string;
  propertyType: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'oldest';
}