import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/dashboard.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [LRNUser, setLRNUser] = useState(localStorage.getItem('LRN'));
  const [Strand, setStrand] = useState(localStorage.getItem('Strand'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [name, setName] = useState('');
  const [modules, setModules] = useState({
    core: [],
    applied: [],
    specialized: []
  }); 
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/dashboard/?id=${id}`);
        const fetchedModules = response.data.modules;

        const uniqueModules = [];
        const seenSubjects = new Set();
  
        fetchedModules.forEach(module => {
          if (!seenSubjects.has(module.subject)) {
            uniqueModules.push(module);
            seenSubjects.add(module.subject);
          }
        });
  
        const categorizedModules = uniqueModules.reduce((acc, module) => {
          if (module.type === 'Core') {
            acc.core.push(module);
          } else if (module.type === 'Applied') {
            acc.applied.push(module);
          } else if (module.type === 'Specialized') {
            acc.specialized.push(module);
          }
          return acc;
        }, { core: [], applied: [], specialized: [] });
  
        setModules(categorizedModules);
        setName(response.data.name);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setErrors(err.response?.data?.message || 'Failed to fetch modules.');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setLRNUser(localStorage.getItem('LRN'));
      setStrand(localStorage.getItem('Strand'));
      setID(localStorage.getItem('id'));
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   const fetchModules = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`http://localhost:3000/dashboard/?strand=${Strand}`);
  //       setModules(response.data);
  //     } catch (err) {
  //       console.error('Error fetching modules:', err.response || err.message);
  //       setErrors(err.response?.data?.message || 'Failed to fetch modules.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (Strand) {
  //     fetchModules();
  //   } else {
  //     setErrors('Strand is not defined. Please login or update your profile.');
  //     setLoading(false);
  //   }
  // }, [Strand]);

  const handleLogout = () => {
    localStorage.clear();
    setLRNUser(null);
    window.location.reload();
  };

  return (
    <main className={styles.main}>
      <p>Student LRN: {LRNUser || 'Loading...'}</p>         { /* PLACEHOLDER ONLY ? */ }
      <p>Student Name: {name || 'Loading...'}</p> 
      <p>Student Strand: {Strand || 'Loading...'}</p>       { /* PLACEHOLDER ONLY ? */ }

      <div>
        <br />
        <h1>Modules Dashboard</h1>

        <br />
        <h2>Core Subjects</h2>
        <ul>
          {modules.core.length === 0 ? (  
            <p>No core subjects available</p>
          ) : (
            modules.core.map(module => (
              <Link to={`/subject-page/?subject=${module.subject}`} key={module.MID}>{module.subject}</Link>
            ))
          )}
        </ul>

        <br />
        <h2>Applied Subjects</h2>
        <ul>
          {modules.applied.length === 0 ? (
            <p>No applied subjects available</p>
          ) : (
            modules.applied.map(module => (
              <Link to={`/subject-page/?subject=${module.subject}`} key={module.MID}>{module.subject}</Link>
            ))
          )}
        </ul>

        <br />
        <h2>Specialized Subjects</h2>
        <ul>
          {modules.specialized.length === 0 ? (
            <p>No specialized subjects available</p>
          ) : (
            modules.specialized.map(module => (
              <Link to={`/subject-page/?subject=${module.subject}`} key={module.MID}>{module.subject}</Link>
            ))
          )}
        </ul>
      </div>

      <br />
      <button type="button" onClick={handleLogout}>Logout</button>
    </main>
  );
};

export default Dashboard;
