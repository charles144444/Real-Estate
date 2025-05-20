import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.section 
      className="relative h-[400px] md:h-[600px] flex items-center justify-start overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-30 px-6 py-4 bg-transparent flex items-center">
        <span className="text-lg font-bold text-white mr-8">DevCharles</span>
        <button
          className="md:hidden ml-auto text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li>
              <Link to="/properties" className="hover:underline">Listings</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">About</Link>
            </li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 md:hidden">
            <ul className="flex flex-col space-y-2 py-4 px-6 text-white font-medium">
              <li><a href="#" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li>
                <Link to="/properties" className="hover:underline" onClick={() => setMenuOpen(false)}>Listings</Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
              </li>
              <li><a href="#" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
      {/* Background Image */}
      <img
        src="/images/hero-house.jpg"
        alt="Modern house"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-start justify-center w-full h-full text-left text-white px-4 md:px-16">
        <motion.h1 
          className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg font-serif"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          Finding Your Dream <br className="hidden md:inline" /> Home Made Simple
        </motion.h1>
        <motion.p 
          className="text-base md:text-lg max-w-2xl drop-shadow-md font-serif"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          Discover perfect rental properties <br className="hidden md:inline" /> across the United States and Europe.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Hero;