import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

//useeffect to fetch users when component loads.
function Home() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // Fetch users from API when component loads
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setError('');
            setLoading(true);

            //  fetchusers to get all users from backend and display on home page.
            // seterror to update error msgs.
            //setloading to true when fetching users.
            
            // API call to get all users
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            //const response to store response from backend.
            // await fetch to wait for resonse from backend,
            //method get to get all users.
            //contnent type

            const data = await response.json();

            if (response.ok) {
                setUsers(data);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (error) {
            console.error('Fetch users error:', error);
            setError('Unable to connect to server');
        }
        
        setLoading(false);
    };

    //const data to store response from backend.
    //

    const handleEdit = (userId) => {
        navigate(`/edit/${userId}`); // Fixed template literal
    };

    const handleDelete = async (userId, userName) => {
        // Confirm before deleting
        if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                //handleedit to navigate to edit page with user id.
                //handledelete to delete user by id.
                //confirmation to confirm before deleting user, if user clciks ok then user deleted.

                const data = await response.json();

                if (response.ok) {
                    // Remove deleted user from the list
                    setUsers(users.filter(user => user.id !== userId));
                    alert('User deleted successfully!');
                } else {
                    alert(data.message || 'Failed to delete user');
                }
            } catch (error) {
                console.error('Delete user error:', error);
                alert('Unable to connect to server');
            }
        }
    };

    const handleLogout = () => {
        // Clear stored data
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="loading">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="home-header">
                <h2>User Management System</h2>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="users-list">
                <h3>All Users ({users.length})</h3>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="users-grid">
                        {users.map(user => (
                            <div key={user.id} className="user-card">
                                <div className="user-info">
                                    <h4>{user.name}</h4>
                                    <p>Email: {user.email}</p>
                                    <p>Phone: {user.phone}</p>
                                    <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="user-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user.id, user.name)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;