import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom'; // Add this import

const FeaturedProperties = ({ favorites, toggleFavorite }) => {
  const featuredProperties = [
    {
      id: '1',
      title: "Ocean Breeze Villa",
      price: 910000,
      location: "Malibu, CA",
      type: "Villa",
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: "bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]"
    },
    {
      id: '2',
      title: "Jakson House",
      price: 750000,
      location: "Austin, TX",
      type: "House",
      beds: 3,
      baths: 2,
      sqft: 2400,
      image: "bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]"
    },
    {
      id: '3',
      title: "Lakeside Cottage",
      price: 540000,
      location: "Lake Tahoe, CA",
      type: "Cottage",
      beds: 2,
      baths: 1,
      sqft: 1800,
      image: "bg-[url('https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Most Viewed Properties
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover a range of vacation homes worldwide. Book securely with our platform and get expert customer support.
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {featuredProperties.map((property) => (
          <PropertyCard 
            key={property.id}
            property={property}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProperties;