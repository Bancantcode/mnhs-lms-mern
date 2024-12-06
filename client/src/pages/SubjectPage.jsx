import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/subjectPage.module.scss';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

const SubjectPage = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);      
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get("subject");
  
    useEffect(() => {
      const fetchModules = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/subject-page/?subject=${subject}`
          );
          setModules(response.data.modules);
        } catch (err) {
          console.error("Error fetching module details:", err);
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

  return (
    <main className={styles.main}>
        <table className={styles.table}> 
            <thead>
            <tr>
                <th>Subject</th>
                <th>Title</th>
                <th>File</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {modules.map((module, index) => (
                <tr key={index}>
                <td>{module.subject}</td>
                <td>{module.title}</td>
                <td>{module.file_name}</td>
                <td>{module.upload_date}</td>
                <td><button onClick={() => handleDownload(module.MID)}>Download</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    </main>    
  )
}

export default SubjectPage