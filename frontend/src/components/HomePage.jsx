import React from 'react';

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#e3f2fd', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#1976d2', color: 'white', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>HealthEase</h1>
        <nav>
          <a href="/login" style={navLink}>Login</a>
          <a href="/register" style={navLink}>Register</a>
        </nav>
      </header>

      <main>
        <section style={heroSection}>
          <div style={heroText}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0d47a1', marginBottom: '1rem' }}>Your Health, Our Priority</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#333' }}>
              Book appointments with trusted doctors in seconds. Simple, secure, and stress-free — all in one platform.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="/login" style={btn}>Get Started</a>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/images/doc.jpg" alt="Medical" style={{ maxWidth: '100%', height: 'auto' }} />

          </div>
        </section>

        <section style={{ backgroundColor: '#f4faff', padding: '4rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#0d47a1' }}>Why Choose HealthEase?</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            <div style={featureBox}>
              <h4 style={featureTitle}>Verified Doctors</h4>
              <p style={featureText}>All listed doctors are verified and approved by our admin team.</p>
            </div>
            <div style={featureBox}>
              <h4 style={featureTitle}>Instant Booking</h4>
              <p style={featureText}>Schedule appointments quickly with our user-friendly interface.</p>
            </div>
            <div style={featureBox}>
              <h4 style={featureTitle}>Secure Platform</h4>
              <p style={featureText}>Your medical documents and data are protected and encrypted.</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#0d47a1' }}>What Our Users Say</h3>
          <p style={{ fontStyle: 'italic', maxWidth: '600px', margin: 'auto', color: '#333' }}>
            “HealthEase made it so easy to connect with specialists. I booked an appointment in just 2 minutes!” – <strong>Aarav M.</strong>
          </p>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#1976d2', color: 'whitw' }}>
        <p>&copy; 2025 HealthEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

const navLink = {
  color: 'white',
  textDecoration: 'none',
  marginLeft: '2rem',
  fontWeight: 600,
};

const heroSection = {
  padding: '4rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  backgroundColor: '#ffffff',
};

const heroText = {
  flex: 1,
  maxWidth: '500px',
};

const btn = {
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '12px 24px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 600,
  transition: '0.3s',
};

const featureBox = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '10px',
  width: '250px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
};

const featureTitle = {
  color: '#1976d2',
  marginBottom: '0.5rem',
};

const featureText = {
  fontSize: '0.95rem',
  color: '#444',
};

export default HomePage;
