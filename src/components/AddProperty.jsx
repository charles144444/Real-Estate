import React, { useState } from 'react';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    type: '',
    beds: '',
    baths: '',
    sqft: '',
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-specific error when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) {
      setError('Please select at least one image');
      return;
    }

    // Limit to 10 images
    if (files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validImageTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError(`Invalid file type: ${invalidFiles[0].name}. Only JPG, PNG, and WebP are allowed.`);
      return;
    }

    // Check file sizes (max 2MB each)
    const maxSize = 2 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError(`File too large: ${oversizedFiles[0].name} (max 2MB)`);
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    // Process files in batches to avoid UI freeze
    const processFiles = async () => {
      try {
        const processedImages = await Promise.all(
          files.map(file => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(file);
            });
          })
        );
        
        setImages(processedImages);
      } catch (err) {
        console.error('Error processing images:', err);
        setError('Failed to process image files');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    processFiles();
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    const requiredFields = [
      'title', 'description', 'price', 'address', 
      'city', 'state', 'zip_code', 'latitude', 
      'longitude', 'type', 'beds', 'baths', 'sqft'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
        isValid = false;
      }
    });
    
    // Numerical validation
    const numericalFields = ['price', 'latitude', 'longitude', 'beds', 'baths', 'sqft'];
    numericalFields.forEach(field => {
      const value = parseFloat(formData[field]);
      if (isNaN(value)) {
        errors[field] = 'Invalid number';
        isValid = false;
      }
    });
    
    // Specific range validations
    if (formData.price) {
      const price = parseFloat(formData.price);
      if (price < 0 || price > 1000000000) {
        errors.price = 'Price must be between $0 and $1,000,000,000';
        isValid = false;
      }
    }
    
    if (formData.latitude) {
      const latitude = parseFloat(formData.latitude);
      if (latitude < -90 || latitude > 90) {
        errors.latitude = 'Latitude must be between -90 and 90';
        isValid = false;
      }
    }
    
    if (formData.longitude) {
      const longitude = parseFloat(formData.longitude);
      if (longitude < -180 || longitude > 180) {
        errors.longitude = 'Longitude must be between -180 and 180';
        isValid = false;
      }
    }
    
    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }
    
    setIsSubmitting(true);
    
    // Parse numerical values
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      beds: parseInt(formData.beds, 10),
      baths: parseInt(formData.baths, 10),
      sqft: parseInt(formData.sqft, 10),
      images,
    };
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing. Please sign in again.');
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`https://${backendUrl}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          // Handle field errors from backend
          const backendErrors = {};
          data.errors.forEach(err => {
            // Map backend error to field (simplified)
            if (err.includes('Title')) backendErrors.title = err;
            else if (err.includes('Price')) backendErrors.price = err;
            // Add more mappings as needed
          });
          setFieldErrors(backendErrors);
        } else {
          setError(data.error || 'Failed to add property');
        }
      } else {
        alert('Property added successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          latitude: '',
          longitude: '',
          type: '',
          beds: '',
          baths: '',
          sqft: '',
        });
        setImages([]);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form fields configuration
  const formFields = [
    { label: 'Title', name: 'title', required: true },
    { label: 'Description', name: 'description', type: 'textarea', required: true },
    { label: 'Price ($)', name: 'price', type: 'number', required: true },
    { label: 'Address', name: 'address', required: true },
    { label: 'City', name: 'city', required: true },
    { label: 'State', name: 'state', required: true },
    { label: 'Zip Code', name: 'zip_code', required: true },
    { label: 'Latitude', name: 'latitude', type: 'number', step: '0.000001', required: true },
    { label: 'Longitude', name: 'longitude', type: 'number', step: '0.000001', required: true },
    { label: 'Beds', name: 'beds', type: 'number', required: true },
    { label: 'Baths', name: 'baths', type: 'number', required: true },
    { label: 'Square Feet', name: 'sqft', type: 'number', required: true },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Property</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(({ label, name, type = 'text', step, required }) => (
            <div key={name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldErrors[name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="4"
                  required={required}
                />
              ) : (
                <input
                  type={type}
                  step={step}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldErrors[name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required={required}
                />
              )}
              {fieldErrors[name] && (
                <p className="text-sm text-red-600">{fieldErrors[name]}</p>
              )}
            </div>
          ))}
          
          {/* Property Type Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.type ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>
            {fieldErrors.type && (
              <p className="text-sm text-red-600">{fieldErrors.type}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images <span className="text-red-500">*</span>
              <span className="ml-2 text-sm text-gray-500">(Max 10 images, 2MB each)</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png, image/webp"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              disabled={isSubmitting}
              required
            />
          </div>
          
          {images.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h3>
              <div className="flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded border border-gray-200"
                    />
                    <span className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {images.length} image{images.length !== 1 ? 's' : ''} ready for upload
              </p>
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md shadow-sm text-white font-medium ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Property...
              </span>
            ) : (
              'Add Property'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;