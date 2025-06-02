import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/properties', {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch properties');
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading properties...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
              src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/300'}
              alt={property.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-600">{property.description.substring(0, 100)}...</p>
              <p className="text-lg font-bold mt-2">${property.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
              <button
                onClick={() => navigate(`/properties/${property.id}`)} // Placeholder for detail page
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;