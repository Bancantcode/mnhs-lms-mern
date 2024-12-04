import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/dashboard.module.scss';

const Dashboard = () => {
  const [LRNUser, setLRNUser] = useState(localStorage.getItem('LRN'));

  useEffect(() => {
    const handleStorageChange = () => {
      setLRNUser(localStorage.getItem('LRN'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLRNUser(null);
    window.location.reload();
  };

  return (
    <main className={styles.main}>
      <p>Student LRN: {LRNUser || 'Loading...'}</p>
      <button type="button" onClick={handleLogout}>Logout</button>
    </main>
  );
};

export default Dashboard;
