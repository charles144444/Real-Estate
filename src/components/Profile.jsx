import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setUser(userObj);
      fetch(`/api/users/${userObj.id}/properties`)
        .then(res => res.json())
        .then(data => setProperties(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-red-600">You must be signed in to view your profile.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="mb-4">
        <div><span className="font-semibold">Name:</span> {user.name}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
      </div>
      <h3 className="text-xl font-bold mb-2">My Properties</h3>
      {properties.length === 0 ? (
        <div className="text-gray-600">No properties found.</div>
      ) : (
        <ul className="space-y-2">
          {properties.map((p) => (
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

export default Profile;
