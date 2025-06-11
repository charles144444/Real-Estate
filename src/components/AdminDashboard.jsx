import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalValue: 0,
    userDistribution: {
      users: 0,
      admins: 0
    }
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please sign in again.');
      }

      // Fetch users
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const usersRes = await fetch(`https://${backendUrl}/api/admin/users`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!usersRes.ok) {
        const errorData = await usersRes.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }
      
      const usersData = await usersRes.json();
      setUsers(usersData);

      // Fetch properties
      const propertiesRes = await fetch(`https://${backendUrl}/api/admin/properties`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!propertiesRes.ok) {
        const errorData = await propertiesRes.json();
        throw new Error(errorData.error || 'Failed to fetch properties');
      }
      
      const propertiesData = await propertiesRes.json();
      setProperties(propertiesData);

      // Calculate statistics
      const totalValue = propertiesData.reduce((sum, property) => sum + parseFloat(property.price), 0);
      const userDistribution = {
        users: usersData.filter(u => u.role === 'user').length,
        admins: usersData.filter(u => u.role === 'admin').length
      };
      
      setStats({
        totalUsers: usersData.length,
        totalProperties: propertiesData.length,
        totalValue,
        userDistribution
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Admin dashboard error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://${backendUrl}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
      
      // Refresh user list
      setUsers(users.filter(user => user.id !== userId));
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        userDistribution: {
          ...prev.userDistribution,
          users: prev.userDistribution.users - (users.find(u => u.id === userId)?.role === 'user' ? 1 : 0),
          admins: prev.userDistribution.admins - (users.find(u => u.id === userId)?.role === 'admin' ? 1 : 0)
        }
      }));
      
      alert('User deleted successfully');
    } catch (err) {
      console.error('Delete user error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
          <button 
            className="ml-4 text-blue-600 hover:text-blue-800"
            onClick={fetchAdminData}
          >
            Try Again
          </button>
        </div>
      )}
      
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList className="flex border-b border-gray-200 mb-6">
          <Tab className="mr-4 py-2 px-4 font-medium text-gray-600 hover:text-blue-600 cursor-pointer focus:outline-none border-b-2 border-transparent ui-selected:border-blue-500 ui-selected:text-blue-600">
            Users
          </Tab>
          <Tab className="mr-4 py-2 px-4 font-medium text-gray-600 hover:text-blue-600 cursor-pointer focus:outline-none border-b-2 border-transparent ui-selected:border-blue-500 ui-selected:text-blue-600">
            Properties
          </Tab>
          <Tab className="py-2 px-4 font-medium text-gray-600 hover:text-blue-600 cursor-pointer focus:outline-none border-b-2 border-transparent ui-selected:border-blue-500 ui-selected:text-blue-600">
            Statistics
          </Tab>
        </TabList>

        <TabPanel>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No users found</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={fetchAdminData}
              >
                Refresh Data
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto shadow rounded-lg">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">ID</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Email</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Role</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Joined</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{user.id}</td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteUser(user.id)}
                          disabled={user.role === 'admin'}
                          className={`px-3 py-1 rounded text-sm ${
                            user.role === 'admin'
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No properties found</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={fetchAdminData}
              >
                Refresh Data
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto shadow rounded-lg">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">ID</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Title</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Price</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Location</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Agent</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map(property => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{property.id}</td>
                      <td className="py-3 px-4 font-medium">
                        <a 
                          href={`/properties/${property.id}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {property.title}
                        </a>
                      </td>
                      <td className="py-3 px-4">${property.price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {property.city}, {property.state}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
                          <div>
                            <div className="font-medium">{property.agent_name}</div>
                            <div className="text-sm text-gray-500">{property.agent_email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(property.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600"
                          onClick={async () => {
                            if (!window.confirm('Are you sure you want to delete this property?')) return;
                            try {
                              const token = localStorage.getItem('token');
                              const res = await fetch(`https://${backendUrl}/api/properties/${property.id}`, {
                                method: 'DELETE',
                                headers: {
                                  'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json',
                                },
                              });
                              const data = await res.json();
                              if (!res.ok) {
                                alert(data.error || 'Failed to delete property');
                              } else {
                                setProperties(properties.filter(p => p.id !== property.id));
                                alert('Property deleted successfully!');
                              }
                            } catch (err) {
                              alert('Network error');
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading statistics...</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">
                    {stats.totalUsers}
                  </div>
                  <div className="text-gray-600">Total Users</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-700">
                    {stats.totalProperties}
                  </div>
                  <div className="text-gray-600">Total Properties</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-700">
                    ${(stats.totalValue / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-gray-600">Total Property Value</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">User Distribution</h3>
                <div className="flex items-center">
                  <div className="w-3/4 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full" 
                      style={{ width: `${(stats.userDistribution.users / stats.totalUsers) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-4 text-sm">
                    <span className="font-medium">Users:</span> {stats.userDistribution.users}
                  </div>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="w-3/4 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-600 h-4 rounded-full" 
                      style={{ width: `${(stats.userDistribution.admins / stats.totalUsers) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-4 text-sm">
                    <span className="font-medium">Admins:</span> {stats.userDistribution.admins}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Top Properties</h3>
                <div className="space-y-4">
                  {properties.slice(0, 3).map(property => (
                    <div key={property.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                      <div>
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-gray-600">${property.price.toLocaleString()} · {property.beds} beds</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;