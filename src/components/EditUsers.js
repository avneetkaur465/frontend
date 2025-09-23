import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//useeffect to fetch user data when component loads.
//useparams to get user id from url because we need user id to fetch user data and update user data.

function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user data when component loads
  //setloading to true (loading spinner will be shown while fetching user data)//
  //setupdating to false to prevent multiple submissions and to dsiable update button.//
  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setError('');
      setLoading(true);
      
      // API call to get user by ID
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Pre-fill form with user data
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        // Don't pre-fill password for security
        setPassword('');
      } else {
        setError(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      setError('Unable to connect to server');
    }
    
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
   
    // Basic validation
    if (!name || !email || !phone) {
      setError('Name, email, and phone are required');
      setUpdating(false);
      return;
    }

    // Validate password if provided
    if (password && password.length < 6) {
      setError('Password must be at least 6 characters long');
      setUpdating(false);
      return;
    }

    try {
      // Prepare update data
      const updateData = { name, email, phone };
      
      // Only include password if it's provided
      if (password.trim()) {
        updateData.password = password;
      }

      // API call to update user
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User updated successfully!');
        navigate('/home');
      } else {
        setError(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      setError('Unable to connect to server');
    }
    
    setUpdating(false);
  };

  const goBack = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="edit-user-container">
        <div className="loading">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="edit-user-container">
      <div className="edit-user-form">
        <h2>Edit User</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name: *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
         
          <div className="form-group">
            <label>Email: *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
         
          <div className="form-group">
            <label>Phone: *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>
         
          
         
          <div className="button-group">
            <button 
              type="submit" 
              className="update-btn"
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={goBack}
              disabled={updating}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;