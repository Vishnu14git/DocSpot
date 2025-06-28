import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('📤 Submitting register form:', { name, email, password, role });

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      console.log('📥 Response from backend:', res.status, data);

      if (res.ok) {
        alert(`✅ Registered successfully as ${role}. You can now log in.`);
        navigate('/login');
      } else {
        if (res.status === 409 || data.error === 'User already exists') {
          alert('⚠️ Already registered. Redirecting to login.');
          navigate('/login');
        } else {
          alert(`❌ Registration failed: ${data.error || 'Unknown error'}`);
        }
      }
    } catch (err) {
      console.error('❌ Network error during registration:', err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already registered? <Link to="/login" style={linkStyle}>Login</Link>
        </p>
      </div>
    </div>
  );
};

// Styles...
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: `url('https://t4.ftcdn.net/jpg/03/65/76/33/360_F_365763394_KsD8IOHsZVTsIaXMcDuDoJ9TfMNWnpix.jpg') center/cover no-repeat`,
};
const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '450px',
  width: '100%',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};
const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  margin: '0.5rem 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};
const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '1rem',
  backgroundColor: '#1565c0',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
const linkStyle = {
  color: '#1565c0',
  fontWeight: 'bold',
  textDecoration: 'none',
};

export default Register;
