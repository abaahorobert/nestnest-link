import React, { useState, useMemo } from 'react';
import { mockProperties } from '../data/mockData';
import { SearchFilters } from '../types';
import PropertySearch from '../components/property/PropertySearch';
import PropertyCard from '../components/property/PropertyCard';
import { Grid, List } from 'lucide-react';

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    propertyType: '',
    status: '',
    minPrice: 0,
    maxPrice: 2000000000,
    city: '',
    bedrooms: 0,
    bathrooms: 0,
    sortBy: 'newest',
  });

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = mockProperties.filter((property) => {
      // Search query
      if (filters.query) {
        const searchLower = filters.query.toLowerCase();
        const matchesQuery = 
          property.title.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower) ||
          property.location.city.toLowerCase().includes(searchLower) ||
          property.location.district.toLowerCase().includes(searchLower);
        
        if (!matchesQuery) return false;
      }

      // Property type
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Status
      if (filters.status && property.status !== filters.status) {
        return false;
      }

      // Price range
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      // City
      if (filters.city && property.location.city !== filters.city) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms > 0 && (!property.bedrooms || property.bedrooms < filters.bedrooms)) {
        return false;
      }

      // Bathrooms
      if (filters.bathrooms > 0 && (!property.bathrooms || property.bathrooms < filters.bathrooms)) {
        return false;
      }

      return true;
    });

    // Sort properties
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600 mt-1">Discover your perfect property</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <PropertySearch
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredAndSortedProperties.length}
          />
        </div>

        {/* Properties Grid/List */}
        {filteredAndSortedProperties.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {filteredAndSortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-gray-400 mb-4">
                <svg className="h-24 w-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available properties.
              </p>
              <button
                onClick={() => setFilters({
                  query: '',
                  propertyType: '',
                  status: '',
                  minPrice: 0,
                  maxPrice: 2000000000,
                  city: '',
                  bedrooms: 0,
                  bathrooms: 0,
                  sortBy: 'newest',
                })}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Load More Button (for pagination in production) */}
        {filteredAndSortedProperties.length > 0 && filteredAndSortedProperties.length >= 12 && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;