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
  const [activeUserIndex, setActiveUserIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ lrn: '', email: '', grlvl: '', strand: '', user_role: '', password: '' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleUserDropdown = (index) => {
    setActiveUserIndex(activeUserIndex === index ? null : index);
  };

  //change the format of the date to be month, day, year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  //pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Previous and Next
  const handleNext = () => {
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

  const handleEdit = (user) => {
    setEditUser({
      lrn: user.lrn,
      email: user.email,
      grlvl: user.grlvl,
      strand: user.strand,
      user_role: user.user_role,
      password: '' // Initialize password as empty
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of edited user data
    console.log('Edited User:', editUser);
    setEditModalOpen(false);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Logic to delete the user
    console.log('Deleted User:', userToDelete);
    setDeleteModalOpen(false);
    // Optionally, refresh the user list or update state
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
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
          <button className={styles.hamburger}>
            <i className="ri-menu-2-line"></i>
          </button>
          
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

        {editModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Edit User</h2>
              <form onSubmit={handleEditSubmit}>
                <input type="text" placeholder="LRN" value={editUser.lrn} onChange={(e) => setEditUser({ ...editUser, lrn: e.target.value })} required />
                <input type="email" placeholder="Email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} required />
                <input type="text" placeholder="Grade Level" value={editUser.grlvl} onChange={(e) => setEditUser({ ...editUser, grlvl: e.target.value })} required />
                <input type="text" placeholder="Strand" value={editUser.strand} onChange={(e) => setEditUser({ ...editUser, strand: e.target.value })} required />
                <input type="text" placeholder="Role" value={editUser.user_role} onChange={(e) => setEditUser({ ...editUser, user_role: e.target.value })} required />
                <input type="password" placeholder="Password" value={editUser.password} onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} required />
                <div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this user?</p>
              <div>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.table__container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>LRN</th>
                <th className={styles.hidden}>Email</th>
                <th className={styles.hidden}>Grade Level & Strand</th>
                <th className={`${styles.hidden} ${styles.role}`}>Role</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.lrn}</td>
                  <td className={styles.hidden}>{user.email}</td>
                  <td className={styles.hidden}>{`${user.grlvl} - ${user.strand}`}</td>
                  <td className={`${styles.hidden} ${styles.role}`}>{user.user_role}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <div onClick={() => toggleUserDropdown(index)}>
                      <img src="/images/threedot.svg" alt="Three Dots" className={styles.three__dots} width={15} height={20} />
                    </div>
                    {activeUserIndex === index && (
                      <div className={styles.dropdown}>
                        <div className={styles.dropdown__item} onClick={() => handleEdit(user)}>Edit</div>
                        <div className={styles.dropdown__item} onClick={() => handleDelete(user)}>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>Showing {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, users.length)} of {users.length} Users</span>
            <div>
              <button onClick={handlePrevious} disabled={currentPage === 1}>&lt; Prev</button>
              <span>Page {currentPage} of {Math.ceil(users.length / usersPerPage)}</span>
              <button onClick={handleNext} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>Next &gt;</button>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  )
}

export default AdminUsers