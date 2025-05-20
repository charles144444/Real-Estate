import { Link } from 'react-router-dom';

const properties = [
  {
    id: '1',
    title: 'Modern Family Home',
    location: '123 Main St, Springfield',
    price: 450000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 2500,
    image: 'bg-[url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '2',
    title: 'Downtown Apartment',
    location: '456 Elm St, Metropolis',
    price: 320000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: 'bg-[url("https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '3',
    title: 'Cozy Country Cottage',
    location: '789 Oak Lane, Smallville',
    price: 275000,
    type: 'Cottage',
    beds: 3,
    baths: 2,
    sqft: 1600,
    image: 'bg-[url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '4',
    title: 'Luxury Villa',
    location: '321 Palm Drive, Beverly Hills',
    price: 2500000,
    type: 'Villa',
    beds: 6,
    baths: 7,
    sqft: 7000,
    image: 'bg-[url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '5',
    title: 'Urban Loft',
    location: '101 City Center, Downtown',
    price: 600000,
    type: 'Loft',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: 'bg-[url("https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXJiYW4lMjBsb2Z0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '6',
    title: 'Suburban Townhouse',
    location: '55 Maple Ave, Suburbia',
    price: 350000,
    type: 'Townhouse',
    beds: 3,
    baths: 2,
    sqft: 2000,
    image: 'bg-[url("https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG93bmhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '7',
    title: 'Lakeview Cabin',
    location: '12 Lake Rd, Lakeview',
    price: 420000,
    type: 'Cabin',
    beds: 4,
    baths: 3,
    sqft: 2300,
    image: 'bg-[url("https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGNhYmlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '8',
    title: 'Penthouse Suite',
    location: '999 Skyline Blvd, Metropolis',
    price: 1200000,
    type: 'Penthouse',
    beds: 3,
    baths: 4,
    sqft: 3500,
    image: 'bg-[url("https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVudGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '9',
    title: 'Historic Mansion',
    location: '1 Heritage Way, Oldtown',
    price: 1800000,
    type: 'Mansion',
    beds: 8,
    baths: 6,
    sqft: 9000,
    image: 'bg-[url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '10',
    title: 'Eco-Friendly Home',
    location: '77 Green St, Eco City',
    price: 500000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 2600,
    image: 'bg-[url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '11',
    title: 'Mountain Retreat',
    location: '888 Summit Rd, Highlands',
    price: 800000,
    type: 'Retreat',
    beds: 5,
    baths: 4,
    sqft: 4000,
    image: 'bg-[url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '12',
    title: 'Studio Apartment',
    location: '202 Central Ave, Midtown',
    price: 220000,
    type: 'Apartment',
    beds: 1,
    baths: 1,
    sqft: 600,
    image: 'bg-[url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGlvJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '13',
    title: 'Beachfront Bungalow',
    location: '3 Ocean View, Seaside',
    price: 950000,
    type: 'Bungalow',
    beds: 3,
    baths: 2,
    sqft: 1700,
    image: 'bg-[url("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBidW5nYWxvd3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '14',
    title: 'Country Farmhouse',
    location: '456 Country Rd, Farmland',
    price: 400000,
    type: 'Farmhouse',
    beds: 5,
    baths: 3,
    sqft: 3200,
    image: 'bg-[url("https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
  {
    id: '15',
    title: 'Modern Duplex',
    location: '789 Twin St, Urbania',
    price: 550000,
    type: 'Duplex',
    beds: 4,
    baths: 4,
    sqft: 2800,
    image: 'bg-[url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVwbGV4fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
  },
];

const badgeColors = {
  House: 'bg-blue-100 text-blue-800',
  Apartment: 'bg-green-100 text-green-800',
  Villa: 'bg-yellow-100 text-yellow-800',
  Cottage: 'bg-pink-100 text-pink-800',
  Loft: 'bg-purple-100 text-purple-800',
  Townhouse: 'bg-orange-100 text-orange-800',
  Cabin: 'bg-teal-100 text-teal-800',
  Penthouse: 'bg-indigo-100 text-indigo-800',
  Mansion: 'bg-red-100 text-red-800',
  Farmhouse: 'bg-lime-100 text-lime-800',
  Duplex: 'bg-gray-100 text-gray-800',
  Bungalow: 'bg-cyan-100 text-cyan-800',
  Retreat: 'bg-fuchsia-100 text-fuchsia-800',
  Studio: 'bg-amber-100 text-amber-800',
  default: 'bg-gray-100 text-gray-800',
};

const PropertyList = () => (
  <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-400 to-blue-600 drop-shadow">
      Browse All Properties
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <Link
          to={`/properties/${property.id}`}
          key={property.id}
          className="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-400 overflow-hidden relative"
        >
          <div className={`h-56 w-full ${property.image} bg-cover bg-center group-hover:scale-105 transition-transform duration-300 rounded-t-2xl relative`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-2xl" />
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColors[property.type] || badgeColors.default}`}>
                {property.type}
              </span>
              <span className="text-blue-600 font-bold text-lg">
                {property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1 group-hover:text-blue-700 transition-colors font-serif">{property.title}</h2>
            <p className="text-gray-500 mb-4 flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-400 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {property.location}
            </p>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <div className="flex flex-col items-center">
                <svg className="w-5 h-5 mb-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-5 h-5 mb-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 10V6a5 5 0 0110 0v4M5 20h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-5 h-5 mb-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                <span>{property.sqft.toLocaleString()} Sq. Ft.</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow group-hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
              View Details
            </button>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default PropertyList;