import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import FeaturedProperties from './components/FeaturedProperties';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PropertyDetails from './components/PropertyDetails';
import PropertyList from './components/PropertyList';
import About from './components/About'; 
import Blog from "./components/Blog";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <SearchForm />
                  <FeaturedProperties />
                  {/* Removed the extra Browse All Properties button here */}
                  <CTA />
                  <Blog />

                </>
              }
            />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} /> {/* <-- Add this route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;