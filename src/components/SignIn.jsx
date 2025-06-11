import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('Loaded user from localStorage:', parsedUser);
      setUser(parsedUser);
      navigate('/'); // Redirect if already signed in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`https://${backendUrl}/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log('Sign-in response:', data);
      if (!res.ok) {
        setError(data.error || 'Sign in failed');
      } else {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (err) {
      setError('Network error');
      console.error('Sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (user) {
    console.log('Current user state:', user);
    return (
      <div className="text-green-600 font-bold flex flex-col items-center mt-10">
        <div className="text-2xl mb-2">Welcome, {user.name}!</div>
        <div className="text-gray-700 mt-2">Email: {user.email}</div>
        <div className="mt-4 text-green-700">
          You are now signed in! You can browse properties or update your profile.
        </div>
        <div className="flex gap-4 mt-4">
          <a href="/properties" className="text-blue-600 underline">Browse Properties</a>
          <a href="/about" className="text-blue-600 underline">About Us</a>
          {user.role === 'admin' ? (
            <a href="/add-property" className="text-blue-600 underline">Add Property</a>
          ) : null}
          <a href="/profile" className="text-blue-600 underline">My Profile</a>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading && <div className="text-blue-600 mb-2">Signing in...</div>}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:bg-blue-400"
        disabled={loading}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;