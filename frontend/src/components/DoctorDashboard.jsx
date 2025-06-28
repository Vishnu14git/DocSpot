import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [doctorName, setDoctorName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      const userData = JSON.parse(localStorage.getItem(email));
      if (userData?.role === 'doctor') {
        setDoctorName(userData.name || 'Doctor');
        fetchAppointments(email);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchAppointments = async (doctorEmail) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorEmail}`);
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load appointments.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/approve`);
      alert('✅ Appointment approved!');
      refreshAppointments();
    } catch (error) {
      console.error(error);
      alert('Failed to approve appointment.');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/reject`);
      alert('❌ Appointment rejected!');
      refreshAppointments();
    } catch (error) {
      console.error(error);
      alert('Failed to reject appointment.');
    }
  };

  const refreshAppointments = () => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) fetchAppointments(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Doctor Panel</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem} onClick={() => navigate('/')}>Home</li>
          <li style={styles.menuItem} onClick={() => navigate('/doctor')}>Appointments</li>
          <li style={styles.menuItem} onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div style={styles.mainContent}>
        <h2 style={styles.welcome}>Welcome, Dr. {doctorName}</h2>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Patient Appointments</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Patient Email</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.emptyRow}>
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.patientEmail}</td>
                    <td>{new Date(appt.date).toLocaleString()}</td>
                    <td>{appt.reason}</td>
                    <td>{appt.status}</td>
                    <td>
                      <button
                        style={styles.approveBtn}
                        onClick={() => handleApprove(appt._id)}
                        disabled={appt.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button
                        style={styles.rejectBtn}
                        onClick={() => handleReject(appt._id)}
                        disabled={appt.status === 'Rejected'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

// ✅ Inline styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#eef6ff',
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
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
  },
  welcome: {
    fontSize: '24px',
    color: '#004aad',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    color: '#004aad',
    marginBottom: '15px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#dbeeff',
    fontWeight: 'bold',
  },
  approveBtn: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    marginRight: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  rejectBtn: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  emptyRow: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
  },
};
