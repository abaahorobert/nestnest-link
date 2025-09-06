import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

interface PropertySearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  resultsCount: number;
}

const PropertySearch: React.FC<PropertySearchProps> = ({
  filters,
  onFiltersChange,
  resultsCount,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleInputChange = (field: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const hasActiveFilters = 
    filters.query || 
    filters.propertyType || 
    filters.status || 
    filters.minPrice > 0 || 
    filters.maxPrice < 2000000000 || 
    filters.city || 
    filters.bedrooms > 0 || 
    filters.bathrooms > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Main Search Bar */}
      <div className="p-6 pb-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties by title, location, or description..."
              value={filters.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filters.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
            </select>

            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Results Count and Clear Filters */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            {resultsCount} properties found
          </p>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-gray-100 p-6 pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price (UGX)
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => handleInputChange('minPrice', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price (UGX)
              </label>
              <input
                type="number"
                placeholder="2,000,000,000"
                value={filters.maxPrice === 2000000000 ? '' : filters.maxPrice}
                onChange={(e) => handleInputChange('maxPrice', parseInt(e.target.value) || 2000000000)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Cities</option>
                <option value="Kampala">Kampala</option>
                <option value="Entebbe">Entebbe</option>
                <option value="Jinja">Jinja</option>
                <option value="Mbarara">Mbarara</option>
                <option value="Gulu">Gulu</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={5}>5+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Bathrooms
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;