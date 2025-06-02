import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <motion.section
      className="relative h-[400px] md:h-[600px] flex items-center justify-start overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="absolute top-0 left-0 w-full z-30 px-6 py-4 bg-transparent flex items-center">
        <span className="text-lg font-bold text-white mr-8">DevCharles</span>
        <button
          className="md:hidden ml-auto text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><Link to="/properties" className="hover:underline">Listings</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            {user ? (
              <>
                                {user.role && user.role.toLowerCase() === 'admin' && (
                  <>
                    <li><Link to="/add-property" className="hover:underline">Add Property</Link></li>
                    {/* Admin Dashboard Link */}
                    <li>
                      <Link to="/admin" className="hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={handleSignOut} className="hover:underline text-red-300">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/signin" className="hover:underline">login</Link></li>
                <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-transparent md:hidden">
            <ul className="flex flex-col space-y-2 py-4 px-6 text-white font-medium bg-black/50 rounded-b-lg">
              <li><a href="#" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><Link to="/properties" className="hover:underline" onClick={() => setMenuOpen(false)}>Listings</Link></li>
              <li><Link to="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</Link></li>
              <li><a href="#" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</a></li>
              {user ? (
                <>
                                    {user.role && user.role.toLowerCase() === 'admin' && (
                    <>
                      <li><Link to="/add-property" className="hover:underline" onClick={() => setMenuOpen(false)}>Add Property</Link></li>
                      {/* Admin Dashboard Link for Mobile */}
                      <li>
                        <Link to="/admin" className="hover:underline flex items-center" onClick={() => setMenuOpen(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="hover:underline text-red-300">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/signin" className="hover:underline" onClick={() => setMenuOpen(false)}>login</Link></li>
                  <li><Link to="/signup" className="hover:underline" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
      <img
        src="/images/hero-house.jpg"
        alt="Modern house"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
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
        <motion.div
          className="mt-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <Link
            to={user ? '/properties' : '/signin'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {user ? 'Browse Properties' : 'Get Started'}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;