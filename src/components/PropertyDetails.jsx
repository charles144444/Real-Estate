import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`https://${backendUrl}/api/properties/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch property');
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!property) return <div className="text-center mt-10">Property not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {property.images && property.images.length > 0 ? (
            <img src={property.images[0]} alt={property.title} className="w-full h-96 object-cover rounded" />
          ) : (
            <img src="https://via.placeholder.com/600" alt="Placeholder" className="w-full h-96 object-cover rounded" />
          )}
        </div>
        <div>
          <p className="text-lg font-bold">${property.price.toLocaleString()}</p>
          <p className="text-gray-600 mt-2">{property.description}</p>
          <p className="mt-2"><strong>Location:</strong> {property.address}, {property.city}, {property.state} {property.zip_code}</p>
          <p className="mt-2"><strong>Type:</strong> {property.type}</p>
          <p className="mt-2"><strong>Beds:</strong> {property.beds} | <strong>Baths:</strong> {property.baths} | <strong>Sqft:</strong> {property.sqft}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;