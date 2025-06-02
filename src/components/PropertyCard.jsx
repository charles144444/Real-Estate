import { motion } from 'framer-motion';
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Add this import

const PropertyCard = ({ property, favorites, toggleFavorite }) => {
  const navigate = useNavigate(); // Add this line

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <div className={`h-64 ${property.image} bg-cover bg-center relative`}>
        <motion.button 
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md"
          onClick={() => toggleFavorite(property.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <HeartIcon 
            className={`h-6 w-6 ${Array.isArray(favorites) && favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </motion.button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-semibold text-white">{property.title}</h3>
          <p className="text-gray-200">{property.location}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 font-bold text-xl">{formatPrice(property.price)}</span>
          <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{property.type}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 mb-4">
          <div>
            <div className="font-medium">{property.beds}</div>
            <div>Beds</div>
          </div>
          <div>
            <div className="font-medium">{property.baths}</div>
            <div>Baths</div>
          </div>
          <div>
            <div className="font-medium">{property.sqft.toLocaleString()}</div>
            <div>Sq. Ft.</div>
          </div>
        </div>
              </div>
    </motion.div>
  );
};

export default PropertyCard;