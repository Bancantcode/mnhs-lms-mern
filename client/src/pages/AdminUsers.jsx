import styles from '../assets/styles/adminUsers.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AdminUsers = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  //change the format of the date to be month, day, year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  //make an object and put title, subject, file and date
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const newModule = { 
      title, 
      subject, 
      file: file ? file.name : 'N/A', 
      date: formatDate(currentDate) 
    };

    console.log(newModule);

    //reset
    setTitle('');
    setSubject('');
    setFile(null);
    
    toggleModal();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin-users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } 
      catch (error) {
        console.error('Failed to fetch users', error);
        setLoading(false); 
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <img src="/images/MNHS-Logo.png" alt="Logo" />
      </aside>
      <div className={styles.container}>

        <section className={styles.upper}>
          <h1>Admin Dashboard <i className="ri-arrow-right-wide-line"></i>Users</h1>
          
          <div className={styles.search__wrapper}>
            <i className="ri-search-line"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div className={styles.user} onClick={toggleDropdown}> 
            <i className="ri-user-fill"></i>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div>My Account</div>
                <Link to="/settings">Settings</Link>
                <div>Support</div>
                <Link to="/register">Log out</Link>
              </div>
            )}
          </div>
        </section>

        <section className={styles.lower}>
          <div className={styles.links}>
            <Link className={styles.a} to="/admin-users">Users</Link>
            <Link className={styles.a} to="/admin-modules">Modules</Link>
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
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                <div>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={toggleModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.table__container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>LRN</th>
                <th>Email</th>
                <th>Grade Level & Strand</th>
                <th>Role</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.lrn}</td>
                  <td>{user.email}</td>
                  <td>{`${user.grlvl} - ${user.strand}`}</td>
                  <td>{user.user_role}</td>
                  <td>{user.created_at}</td>
                  <td><img src="/images/threedot.svg" alt="Three Dots" className={styles.three__dots} width={15} height={20}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}

export default AdminUsers