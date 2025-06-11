import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    type: '',
    beds: '',
    baths: '',
    sqft: '',
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`https://${backendUrl}/api/properties/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price.toString(),
            address: data.address,
            city: data.city,
            state: data.state,
            zip_code: data.zip_code,
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
            type: data.type,
            beds: data.beds.toString(),
            baths: data.baths.toString(),
            sqft: data.sqft.toString(),
          });
          setImages(data.images || []);
        } else {
          setError(data.error || 'Failed to fetch property');
        }
      } catch (err) {
        setError('Network error');
        console.error('Fetch property error:', err);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      setError('Please select at least one image');
      setImages([]);
      return;
    }
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
      .then(base64Strings => {
        console.log('Converted images to base64:', base64Strings);
        setImages(base64Strings);
        setError('');
      })
      .catch(err => {
        setError('Failed to read image files');
        setImages([]);
        console.error('File reading error:', err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);
    const price = parseFloat(formData.price);
    const beds = parseInt(formData.beds);
    const baths = parseInt(formData.baths);
    const sqft = parseInt(formData.sqft);

    if (
      !formData.title ||
      !formData.description ||
      !price ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip_code ||
      isNaN(latitude) ||
      isNaN(longitude) ||
      !formData.type ||
      isNaN(beds) ||
      isNaN(baths) ||
      isNaN(sqft)
    ) {
      setError('All fields are required and must be valid');
      return;
    }

    if (price < 0 || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      setError('Invalid price or coordinates');
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    const payload = {
      ...formData,
      price,
      latitude,
      longitude,
      beds,
      baths,
      sqft,
      images,
    };
    console.log('Submitting edited data to backend:', payload);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`https://${backendUrl}/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update property');
        console.error('Backend response:', data);
      } else {
        alert('Property updated successfully!');
        navigate('/properties');
      }
    } catch (err) {
      setError('Network error');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Zip Code</label>
          <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Latitude</label>
          <input type="number" step="0.0001" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Longitude</label>
          <input type="number" step="0.0001" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Type</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Beds</label>
          <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Baths</label>
          <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sqft</label>
          <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Images (Upload new files to replace existing ones)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default EditProperty;