import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <motion.section 
      className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl font-bold mb-6"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Easiest Method To Find Your Dream Home
        </motion.h2>
        <motion.p 
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join thousands of satisfied customers who found their perfect home with us.
        </motion.p>
        <Link to="/properties">
          <motion.button
            className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Browse All Properties</span>
            <motion.span 
              className="absolute inset-0 bg-white/20 z-0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 1 }}
            />
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
};

export default CTA;