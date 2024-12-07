import { useState, useEffect } from 'react';
import styles from '../assets/styles/subjectPage.module.scss';
// import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

const SubjectPage = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);      
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get("subject");
    const [LRNUser, setLRNUser] = useState(localStorage.getItem('LRN'));
    const [showLogout, setShowLogout] = useState(false);
    const [progressStatus, setProgressStatus] = useState([]);

    useEffect(() => {
      const fetchModules = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/subject-page/?subject=${subject}`
          );
          setModules(response.data.modules);
          setProgressStatus(Array(response.data.modules.length).fill('Incomplete'));
        } catch (err) {
          console.error("Error fetching module details:", err);
        }
      };
  
      fetchModules();
    }, [subject]);

    const handleLogout = () => {
      localStorage.clear();
      setLRNUser(null);
      window.location.reload();
    };
  
    const handleLogoutToggle = () => {
      setShowLogout(prev => !prev);
    };

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

  const handleProgressChange = (index) => {
    setProgressStatus(prev => {
        const newStatus = [...prev];
        switch (newStatus[index]) {
            case 'Incomplete':
                newStatus[index] = 'In Progress';
                break;
            case 'In Progress':
                newStatus[index] = 'Completed';
                break;
            case 'Completed':
                newStatus[index] = 'Incomplete';
                break;
            default:
                newStatus[index] = 'Incomplete';
        }
        return newStatus;
    });
  };

  return (
    <main className={styles.main}>
        <div className={styles.hamburger}>
            <i className="ri-menu-2-line"></i>
        </div>
        
        <aside>
            <div className={styles.main__container}>
                <h1>MNHS-LMS</h1>
                <img src="/images/MNHS-Logo.png" alt="logo" width={60} height={60}/>
            </div>

            <div className={styles.profile__flex}>
                <div className={styles.profile}>
                    <p className={styles.name}><i className="ri-user-line"></i>{name || 'Loading...'}</p> 
                    <br />
                </div>
                <div className={styles.click__logout} onClick={handleLogoutToggle} style={{ position: 'relative' }}>
                    <i className="ri-logout-box-line" onClick={handleLogout}></i>
                </div>
            </div>
        </aside>

        <div className={styles.container}>
            <div className={styles.dashboard}>
                <h1>Lessons</h1>
            </div>

            <div className={styles.table__container}>
              <table className={styles.table}> 
                  <thead>
                      <tr>
                          <th>Title</th>
                          <th>File</th>
                          <th>Date</th>
                          <th>Progress</th>
                      </tr>
                  </thead>
                  <tbody>
                  {modules.map((module, index) => (
                    <tr key={index}>
                      <td>{module.title}</td>
                      <td className={styles.file}>{module.file_name && (
                        module.file_name.startsWith("http://") || 
                        module.file_name.startsWith("https://")) ? (
                          <a className={styles.file__link} href={module.file_name} target="_blank" rel="noopener noreferrer">{module.file_name}</a>
                        ) : (
                          <p className={styles.file__link} onClick={() => handleDownload(module.MID, index)}>{module.file_name}</p>
                        )}
                      </td>
                      <td>{module.upload_date}</td>
                      <td>
                          <button onClick={() => handleProgressChange(index)} className={styles.progress__button}>
                              {progressStatus[index]}
                          </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
        </div>
    </main>    
  )
}

export default SubjectPage