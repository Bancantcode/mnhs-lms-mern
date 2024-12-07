import { useState, useEffect, useRef } from 'react';
import styles from '../assets/styles/dashboard.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';

const Dashboard = () => {
  const [LRNUser, setLRNUser] = useState(localStorage.getItem('LRN'));
  const [Strand, setStrand] = useState(localStorage.getItem('Strand'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [name, setName] = useState('');
  const [modules, setModules] = useState({ core: [], applied: [], specialized: [] }); 
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [showLogout, setShowLogout] = useState(false);
  const courseRefs = useRef([]);

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

  const handleLogout = () => {
    localStorage.clear();
    setLRNUser(null);
    window.location.reload();
  };
  const capSubject =(str)=>{
    return str
      .split(" ")
      .map(word=> word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };
  const handleLogoutToggle = () => {
    setShowLogout(prev => !prev);
  };

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  })

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
          <h1>Dashboard</h1>
        </div>
        <div className={styles.courses}>
          <h4><i className="ri-corner-down-right-line"></i>Core Subjects</h4>
          <ul>
            {modules.core.length === 0 ? (  
              <p>No core subjects available</p>
            ) : (
              modules.core.map((module, index) => (
                <Link to={`/subject-page/?subject=${module.subject}`} key={index} className={styles.course__container}>
                  <i className="ri-arrow-right-up-line"></i>
                  <p className={styles.subject} key={module.MID}>{capSubject(module.subject)}</p>
                </Link>
              ))
            )}
          </ul>
          <br />
          <h4><i className="ri-corner-down-right-line"></i>Applied Subjects</h4>
          <ul>
            {modules.applied.length === 0 ? (
              <p>No applied subjects available</p>
            ) : (
              modules.applied.map((module, index) => (
                <Link to={`/subject-page/?subject=${module.subject}`} key={index} className={styles.course__container}>
                  <i className="ri-arrow-right-up-line"></i>
                  <p className={styles.subject} key={module.MID}>{module.subject}</p>
                </Link>
              ))
            )}
          </ul>
          <br />
          <h4><i className="ri-corner-down-right-line"></i>Specialized Subjects</h4>
          <ul>
            {modules.specialized.length === 0 ? (
              <p>No specialized subjects available</p>
            ) : (
              modules.specialized.map((module, index) => (
                <Link to={`/subject-page/?subject=${module.subject}`} key={index} className={styles.course__container}>
                  <i className="ri-arrow-right-up-line"></i>
                  <p className={styles.subject} key={module.MID}>{module.subject}</p>
                </Link>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
