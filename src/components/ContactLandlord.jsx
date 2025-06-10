import React, { useState } from 'react';

const ContactLandlord = ({ propertyId }) => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch(`/api/properties/${propertyId}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to send message');
      } else {
        setSuccess(true);
        setMessage('');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-50 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Contact Landlord/Agent</h3>
      {success && <div className="text-green-600 mb-2">Message sent!</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Your message..."
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
        Send Message
      </button>
    </form>
  );
};

export default ContactLandlord;