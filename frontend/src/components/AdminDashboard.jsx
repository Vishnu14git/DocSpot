import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Load data on mount
  useEffect(() => {
    fetchPendingDoctors();
    fetchRegisteredUsers();
  }, []);

  // Fetch pending doctors
  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors/pending');
      setPendingDoctors(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch pending doctors.');
    }
  };

  // Fetch all registered users
  const fetchRegisteredUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setRegisteredUsers(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch users.');
    }
  };

  // Approve a doctor
  const approveDoctor = async (doctorId) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${doctorId}/approve`);
      alert('Doctor approved successfully!');
      fetchPendingDoctors();
      fetchRegisteredUsers();
    } catch (error) {
      console.error(error);
      alert('Failed to approve doctor.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin Panel</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>Dashboard</li>
          <li style={styles.menuItem}>Approve Doctors</li>
          <li style={styles.menuItem}>View Users</li>
          <li style={styles.menuItem}>Appointments</li>
          <li style={styles.menuItem}>Logout</li>
        </ul>
      </div>

      <div style={styles.mainContent}>
        <h2 style={styles.welcome}>Welcome, Admin</h2>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Pending Doctor Approvals</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Specialization</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingDoctors.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.emptyRow}>No pending doctors.</td>
                </tr>
              ) : (
                pendingDoctors.map((doc) => (
                  <tr key={doc._id}>
                    <td style={styles.td}>{doc.name}</td>
                    <td style={styles.td}>{doc.email}</td>
                    <td style={styles.td}>{doc.specialization}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.approveBtn}
                        onClick={() => approveDoctor(doc._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Registered Users</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" style={styles.emptyRow}>No users found.</td>
                </tr>
              ) : (
                registeredUsers.map((user) => (
                  <tr key={user._id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.role}</td>
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

export default AdminDashboard;

// ------------------------------
// Inline Styles
// ------------------------------
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
    marginBottom: '30px',
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
  headerRow: {
    backgroundColor: '#dbeeff',
    fontWeight: 'bold',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  emptyRow: {
    textAlign: 'center',
    color: '#999',
    padding: '20px',
  },
  approveBtn: {
    backgroundColor: '#0d6efd',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
