import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <Link to={`/properties/${property.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={property.images && property.images[0]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
        <p className="text-green-600 text-lg mb-1">${property.price.toLocaleString()}</p>
        <p className="text-gray-600 text-sm">{property.address}, {property.city}, {property.state}</p>
      </div>
    </Link>
  );
}

export default PropertyCard;
