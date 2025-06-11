import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaEdit, FaTrash, FaHeart, FaShare } from 'react-icons/fa';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [filter, setFilter] = useState({
    type: 'all',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`https://${backendUrl}/api/users/1`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch user');
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError('Failed to load user data');
      }
    };

    const fetchProperties = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`https://${backendUrl}/api/properties`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch properties');
        }
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchProperties();
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(savedFavorites);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`https://${backendUrl}/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete property');
      }
      setProperties(properties.filter(property => property.id !== id));
      alert('Property deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = { ...favorites };
    if (newFavorites[id]) {
      delete newFavorites[id];
    } else {
      newFavorites[id] = true;
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const filteredProperties = properties.filter(property => {
    // Type filter
    if (filter.type !== 'all' && property.type !== filter.type) return false;
    // Convert filter values to numbers safely
    const minPrice = filter.minPrice ? Number(filter.minPrice) : 0;
    const maxPrice = filter.maxPrice ? Number(filter.maxPrice) : Infinity;
    const minBeds = filter.beds ? Number(filter.beds) : 0;
    const minBaths = filter.baths ? Number(filter.baths) : 0;
    // Skip if conversion failed
    if (isNaN(minPrice) || isNaN(maxPrice) || isNaN(minBeds) || isNaN(minBaths)) {
      return true;
    }
    // Price filter
    if (minPrice > 0 && property.price < minPrice) return false;
    if (maxPrice < Infinity && property.price > maxPrice) return false;
    // Bedrooms filter
    if (minBeds > 0 && property.beds < minBeds) return false;
    // Bathrooms filter
    if (minBaths > 0 && property.baths < minBaths) return false;
    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Validate numeric inputs
    if ([ 'minPrice', 'maxPrice', 'beds', 'baths' ].includes(name)) {
      // Only allow numbers or empty string
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFilter(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFilter(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Find Your Dream Property</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our curated selection of premium properties across the United States and Europe.
        </p>
      </div>
      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
            >
              <option value="all">All Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
            <input
              type="text"
              name="minPrice"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min"
              value={filter.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
            <input
              type="text"
              name="maxPrice"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max"
              value={filter.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="beds"
              value={filter.beds}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="baths"
              value={filter.baths}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
        </h2>
      </div>
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">No properties match your criteria</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your filters to find what you're looking for.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setFilter({
              type: 'all',
              minPrice: '',
              maxPrice: '',
              beds: '',
              baths: ''
            })}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              {/* Image Gallery */}
              <div className="relative">
                {property.images && property.images.length > 0 ? (
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {property.images.length} photos
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-60 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow ${favorites[property.id] ? 'bg-red-500 text-white' : 'bg-white text-gray-500'}`}
                  aria-label={favorites[property.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  <FaHeart />
                </button>
                {/* Price Tag */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white font-bold py-1 px-3 rounded-lg">
                  ${property.price.toLocaleString()}
                </div>
              </div>
              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      <Link to={`/properties/${property.id}`} className="hover:text-blue-600">
                        {property.title}
                      </Link>
                    </h3>
                    <p className="flex items-center text-gray-600 mb-3">
                      <FaMapMarkerAlt className="mr-1 text-blue-500" />
                      {property.address}, {property.city}, {property.state}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {property.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <div className="flex space-x-4">
                    <div className="flex items-center text-gray-600">
                      <FaBed className="mr-1 text-blue-500" />
                      <span>{property.beds} beds</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaBath className="mr-1 text-blue-500" />
                      <span>{property.baths} baths</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaRulerCombined className="mr-1 text-blue-500" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-blue-500">
                    <FaShare />
                  </button>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <Link
                  to={`/properties/${property.id}`}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
                >
                  View Details
                </Link>
                {(user?.role === 'admin' || user?.id === property.user_id) && (
                  <>
                    <Link
                      to={`/edit-property/${property.id}`}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors font-medium flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination would go here */}
      {filteredProperties.length > 0 && (
        <div className="mt-10 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md">
              Previous
            </button>
            <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
              1
            </button>
            <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PropertyList;