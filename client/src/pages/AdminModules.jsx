import styles from '../assets/styles/adminModules.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

const AdminModules = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
  }, [])

  //change the format of the date to be month, day, year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // const validateData = () => {
  //   const error = {};

  //   if (!userData.lrn || !/^\d{12}$/.test(userData.lrn)) { // CHANGE
  //     error.lrn = 'LRN must be exactly 12 numeric characters.';
  //   }

  //   if (!userData.password || userData.password.length < 8 || !/[A-Z]/.test(userData.password)) { // CHANGE
  //     error.password = 'Password must be at least 8 characters and include an uppercase letter.';
  //   }

  //   setErrors(error);
  //   return Object.keys(error).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    //make an object and put title, subject, file and date
    // const newModule = { 
    //   title, 
    //   subject, 
    //   file: file, 
    //   date: formatDate(currentDate) 
    // };
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('file', file);
    formData.append('date', formatDate(currentDate));

    // console.log(newModule)

    // if (validateData()) {
      try {
        const response = await axios.post('http://localhost:3000/admin-modules', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Module successfully uploaded!.');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Upload failed!');
      } finally {
        // setLoading(false);
      }
    // } 
    // else {
    //   console.log("Error with input validation:", errors);
    //   setLoading(false);
    // }

    //reset
    setTitle('');
    setSubject('');
    setFile(null);
    
    toggleModal();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <section className={styles.upper}>
          <h1>Admin Dashboard <i className="ri-arrow-right-wide-line"></i>Modules</h1>

          <div className={styles.searchWrapper}>
            <i className="ri-search-line"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div className={styles.user} onClick={toggleDropdown}> 
            <i className="ri-user-line"></i>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div>My Account</div>
                <Link to="/settings">Settings</Link>
                <div>Support</div>
                <Link to="/register">Sign In</Link>
              </div>
            )}
          </div>
        </section>

        <section className={styles.lower}>
          <div className={styles.links}>
            <Link to="/admin-users">Users</Link>
            <Link to="/admin-modules">Modules</Link>
          </div>
          <button onClick={toggleModal}><i className="ri-add-circle-line"></i>Add Modules</button>
        </section>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Add Module</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} required/>
                <button type="submit">Submit</button>
                <button type="button" onClick={toggleModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}

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
              <tr>
                {/* THIS WILL BE CHANGED */}
                <td>Progdats</td>
                <td>Activity</td>
                <td>N/A</td>
                <td>11/24/2024</td>
              </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default AdminModules