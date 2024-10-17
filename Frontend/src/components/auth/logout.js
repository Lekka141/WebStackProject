import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <button onClick={handleLogout} style={buttonStyle}>
            Logout
        </button>
    );
};

const buttonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
};

export default Logout;
