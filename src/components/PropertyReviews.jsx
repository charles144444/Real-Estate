import React, { useState, useEffect } from 'react';

const PropertyReviews = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/properties/${propertyId}/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`/api/properties/${propertyId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to add review');
      } else {
        setReview('');
        // Refresh reviews
        fetch(`/api/properties/${propertyId}/reviews`)
          .then(res => res.json())
          .then(data => setReviews(data));
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">Reviews</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <textarea
          value={review}
          onChange={e => setReview(e.target.value)}
          placeholder="Write a review..."
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
          Add Review
        </button>
      </form>
      <ul className="space-y-2">
        {reviews.map((r, idx) => (
          <li key={idx} className="border rounded p-2 bg-gray-50">
            {r.review}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyReviews;