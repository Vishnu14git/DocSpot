import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      const userData = JSON.parse(localStorage.getItem(email));
      if (userData?.role === 'user') {
        setUserName(userData.name || 'User');
        fetchDoctors();
        fetchAppointments(email);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

 const fetchDoctors = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/doctors/all');
    setDoctors(res.data);
  } catch (error) {
    alert('Failed to fetch doctors');
  }
};


  const fetchAppointments = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/user/${email}`);
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch appointments.');
    }
  };

  const handleBook = async (doctor) => {
    const email = localStorage.getItem('loggedInEmail');
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        patientEmail: email,
        doctorEmail: doctor.email,
        doctorName: doctor.name,
        reason: 'General Consultation',
      });
      alert(`✅ Appointment booked with ${doctor.name}`);
      fetchAppointments(email); // Refresh after booking
    } catch (error) {
      console.error(error);
      alert('Booking failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>HealthEase</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem} onClick={() => setActiveTab('dashboard')}>
            📋 Dashboard
          </li>
          <li style={styles.menuItem} onClick={() => setActiveTab('history')}>
            📅 Booking History
          </li>
          <li style={styles.menuItem} onClick={handleLogout}>
            ↩️ Logout
          </li>
        </ul>
      </div>

      <div style={styles.mainContent}>
        <h2 style={styles.welcome}>Welcome, {userName}</h2>

        {activeTab === 'dashboard' ? (
          <>
            {doctors.length === 0 ? (
              <p>No doctors available at the moment.</p>
            ) : (
              doctors.map((doc, index) => (
                <div key={index} style={styles.card}>
                  <div>
                    <h3>{doc.name}</h3>
                    <p><strong>Specialization:</strong> {doc.specialization}</p>
                    <p><strong>Availability:</strong> {doc.availability}</p>
                  </div>
                  <button style={styles.bookButton} onClick={() => handleBook(doc)}>
                    Book Now
                  </button>
                </div>
              ))
            )}
          </>
        ) : (
          <>
            {appointments.length === 0 ? (
              <p>No appointment history.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Doctor</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{appt.doctorName || 'N/A'}</td>
                      <td style={styles.td}>{appt.doctorEmail}</td>
                      <td style={styles.td}>{appt.date || 'N/A'}</td>
                      <td style={styles.td}>{appt.status}</td>
                      <td style={styles.td}>{appt.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f8ff',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    marginBottom: '40px',
    fontWeight: 'bold',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    marginBottom: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#eef6ff',
    overflowY: 'auto',
  },
  welcome: {
    fontSize: '24px',
    marginBottom: '30px',
    color: '#004aad',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#dbeeff',
    padding: '12px',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
  },
};
