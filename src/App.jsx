import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import FeaturedProperties from './components/FeaturedProperties';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PropertyDetails from './components/PropertyDetails';
import PropertyList from './components/PropertyList';
import About from './components/About'; 
import Blog from "./components/Blog";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddProperty from "./components/AddProperty";
import EditProperty from "./components/EditProperty";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
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
                <CTA />
                <Blog />
              </>
            }
          />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;