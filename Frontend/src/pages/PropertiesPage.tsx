import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyService, Property, PropertyFilters } from '@/services/property';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import SEOHead from '@/components/SEOHead';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, MapPin, Home, Building, DollarSign } from 'lucide-react';

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Filters state
  const [filters, setFilters] = useState<PropertyFilters>({
    page: 1,
    limit: 12,
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') as any || '',
    listingType: searchParams.get('listingType') as any || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
    sortBy: (searchParams.get('sortBy') as any) || 'created_at',
    sortOrder: (searchParams.get('sortOrder') as any) || 'desc'
  });

  const [showFilters, setShowFilters] = useState(false);

  // Fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyService.getProperties(filters);
      
      if (response.success && response.data) {
        setProperties(response.data);
        if (response.meta?.pagination) {
          setPagination(response.meta.pagination);
        }
      } else {
        toast.error('Failed to load properties');
      }
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast.error(error.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  // Update URL with current filters
  const updateURL = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
    fetchProperties();
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // Effect to fetch properties when filters change
  useEffect(() => {
    fetchProperties();
  }, [filters.page]);

  // Effect to update URL when filters change
  useEffect(() => {
    updateURL();
  }, [filters]);

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'office', label: 'Office' },
    { value: 'shop', label: 'Shop' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'land', label: 'Land' }
  ];

  const listingTypes = [
    { value: '', label: 'All Listings' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ];

  const sortOptions = [
    { value: 'created_at:desc', label: 'Newest First' },
    { value: 'created_at:asc', label: 'Oldest First' },
    { value: 'price:asc', label: 'Price: Low to High' },
    { value: 'price:desc', label: 'Price: High to Low' },
    { value: 'area:desc', label: 'Area: Largest First' },
    { value: 'bedrooms:desc', label: 'Most Bedrooms' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Properties for Sale & Rent | Aqqario Real Estate"
        description="Browse thousands of properties for sale and rent in Morocco. Find apartments, houses, villas and commercial properties."
        keywords="properties, real estate, morocco, apartments, houses, villas, rent, sale"
        canonical="https://aqqario.com/properties"
      />
      <Navbar />
      
      <div className="pt-16">
        {/* Search and Filters Section */}
        <div className="bg-secondary/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, location, or description..."
                    className="pl-10"
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </form>

              {/* Advanced Filters */}
              {showFilters && (
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">City</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter city"
                            className="pl-10"
                            value={filters.city || ''}
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Property Type</label>
                        <Select
                          value={filters.propertyType || ''}
                          onValueChange={(value) => handleFilterChange('propertyType', value)}
                        >
                          <SelectTrigger>
                            <Home className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Listing Type</label>
                        <Select
                          value={filters.listingType || ''}
                          onValueChange={(value) => handleFilterChange('listingType', value)}
                        >
                          <SelectTrigger>
                            <Building className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Sale or Rent" />
                          </SelectTrigger>
                          <SelectContent>
                            {listingTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Sort By</label>
                        <Select
                          value={`${filters.sortBy}:${filters.sortOrder}`}
                          onValueChange={(value) => {
                            const [sortBy, sortOrder] = value.split(':');
                            handleFilterChange('sortBy', sortBy);
                            handleFilterChange('sortOrder', sortOrder);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            {sortOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Min Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="Min price"
                            className="pl-10"
                            value={filters.minPrice || ''}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Max Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="Max price"
                            className="pl-10"
                            value={filters.maxPrice || ''}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                        <Select
                          value={filters.bedrooms?.toString() || ''}
                          onValueChange={(value) => handleFilterChange('bedrooms', value ? Number(value) : undefined)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={handleSearch}
                          className="w-full"
                          disabled={loading}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Properties</h1>
              <p className="text-muted-foreground">
                {loading ? 'Loading...' : `${pagination.totalItems} properties found`}
              </p>
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-secondary h-4 rounded w-3/4"></div>
                    <div className="bg-secondary h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={page === pagination.currentPage ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    disabled={!pagination.hasNextPage}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Home className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button onClick={() => {
                setFilters({ page: 1, limit: 12 });
                setShowFilters(false);
              }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
