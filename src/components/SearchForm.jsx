import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  HomeModernIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: [0, 1000000]
  });

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Build query string
    const params = new URLSearchParams();
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.propertyType) params.append('propertyType', searchParams.propertyType);
    if (searchParams.priceRange[1]) params.append('maxPrice', searchParams.priceRange[1]);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <motion.section 
      className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-2xl -mt-16 relative z-20 mb-16"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring' }}
      whileHover={{ scale: 1.01 }}
    >
      <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="location"
              placeholder="City or Street"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={searchParams.location}
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <div className="relative">
            <HomeModernIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <select
              id="propertyType"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200"
              value={searchParams.propertyType}
              onChange={(e) => setSearchParams({...searchParams, propertyType: e.target.value})}
            >
              <option value="">Any Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="cottage">Cottage</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <div className="relative">
            <CurrencyDollarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              id="price"
              placeholder="Max budget"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={searchParams.priceRange[1]}
              onChange={(e) => setSearchParams({...searchParams, priceRange: [0, parseInt(e.target.value) || 0]})}
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            Search
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
};

export default SearchForm;