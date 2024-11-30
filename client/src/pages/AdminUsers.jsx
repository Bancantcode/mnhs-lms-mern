import styles from '../assets/styles/adminUsers.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const AdminUsers = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const fileToSubmit = file ? file.name : 'N/A';
    console.log({ title, subject, file: fileToSubmit, date: currentDate });
    toggleModal();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <section className={styles.upper}>
          <h1>Admin Dashboard <i className="ri-arrow-right-wide-line"></i>Users</h1>

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
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Submit</button>
                <button type="button" onClick={toggleModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

export default AdminUsers