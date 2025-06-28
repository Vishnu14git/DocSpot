import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('loggedInEmail', data.user.email);
        localStorage.setItem(data.user.email, JSON.stringify(data.user)); // for dashboards

        alert(`✅ Login successful as ${data.user.role}. Redirecting...`);

        // ✅ Redirect based on role
       switch (data.user.role.toLowerCase()) {
  case 'admin':
    navigate('/admin/dashboard');
    break;
  case 'doctor':
    navigate('/doctor/dashboard');
    break;
  case 'user':
    navigate('/user/dashboard');
    break;
  default:
    alert('Unknown user role. Contact admin.');
    break;
}

      } else {
        alert(`❌ Login failed: ${data.error || 'Invalid credentials or response'}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    alert("📧 A password reset link has been sent to your email (simulated).");
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={forgotStyle}>
          <button onClick={handleForgotPassword} style={linkButtonStyle}>
            Forgot Password?
          </button>
        </p>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don’t have an account? <Link to="/register" style={linkStyle}>Register</Link>
        </p>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: `url('https://t4.ftcdn.net/jpg/03/65/76/33/360_F_365763394_KsD8IOHsZVTsIaXMcDuDoJ9TfMNWnpix.jpg') center/cover no-repeat`,
};
const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
const forgotStyle = {
  marginTop: '0.5rem',
  textAlign: 'right',
};
const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#1565c0',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

export default Login;
