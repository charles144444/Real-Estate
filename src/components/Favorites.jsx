import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This assumes you have a /api/favorites endpoint for the signed-in user
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => setFavorites(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <div className="text-gray-600">No favorite properties yet.</div>
      ) : (
        <ul className="space-y-2">
          {favorites.map((p) => (
            <li key={p.id} className="border rounded p-2">
              <div className="font-semibold">{p.title}</div>
              <div className="text-gray-700">{p.address}, {p.city}, {p.state}</div>
              <div className="text-blue-700">${p.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;