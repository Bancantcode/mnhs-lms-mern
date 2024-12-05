import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/dashboard.module.scss';
import axios from 'axios';

const Dashboard = () => {
  const [LRNUser, setLRNUser] = useState(localStorage.getItem('LRN'));
  const [Strand, setStrand] = useState(localStorage.getItem('Strand'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [name, setName] = useState('');
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/dashboard/?id=${id}`);
        setModules(response.data.modules);
        setName(response.data.name);
      } catch (err) {
        console.error('Error fetching modules:', err.response || err.message);
        setErrors(err.response?.data?.message || 'Failed to fetch modules.');
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/download/${id}`, {
        responseType: 'blob', 
      });

      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('No file to download');
      }
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to download file');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLRNUser(null);
    window.location.reload();
  };

  return (
    <main className={styles.main}>
      <p>Student LRN: {LRNUser || 'Loading...'}</p> 
      <p>Student Name: {name || 'Loading...'}</p> 
      <p>Student Strand: {Strand || 'Loading...'}</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Title</th>
            <th>File</th>
            <th>Date</th>
            <th>Uploader</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => (
            <tr key={index}>
              <td>{module.subject}</td>
              <td>{module.title}</td>
              <td>{module.file_name}</td>
              <td>{module.upload_date}</td>
              <td>{module.uploader}</td>
              <td><button onClick={() => handleDownload(module.MID)}>Download</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button type="button" onClick={handleLogout}>Logout</button>
    </main>
  );
};

export default Dashboard;
