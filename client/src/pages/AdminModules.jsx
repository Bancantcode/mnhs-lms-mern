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
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeUserIndex, setActiveUserIndex] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState(null);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleUserDropdown = (index) => {
    setActiveUserIndex(activeUserIndex === index ? null : index);
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

  const validateModuleData = (module) => {
    const error = {};
  
    if (!module.title || module.title.length > 100) {
      error.title = 'Title is required and should be less than 100 characters.';
    }
  
    if (!module.subject || module.subject.length > 100) {
      error.subject = 'Subject is required and should be less than 100 characters.';
    }
  
    if (!module.file) {
      error.file = 'File is required.';
    } else {
      const allowedExtensions = ['.pdf', '.docx', '.txt', '.pptx', '.jpg', '.jpeg', '.png', '.xlsx', '.xls'];
      const fileExtension = module.file.name.split('.').pop();
      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        error.file = 'Invalid file type.';
      }
    }
  
    return error;
  };

  const validateData = () => {
    const error = validateModuleData({ title, subject, file });
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const validateEditData = () => {
    const error = validateModuleData(moduleToEdit);
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('file', file);
    formData.append('date', formatDate(currentDate));
    console.log(file); // TESTING PURPOSES ONLY

    if (validateData()) {                // ----- ADD INPUT VALIDATION ----- //
      try {
        const response = await axios.post('http://localhost:3000/admin-modules', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Module successfully uploaded!.');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Upload failed!');
      } finally {
        setLoading(false);
      }
    } 
    else {
      console.log("Error with input validation:", errors);
      setLoading(false);
    }

    //reset
    setTitle('');
    setSubject('');
    setFile(null);
    
    toggleModal();
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin-modules');
        const data = await response.json();
        setModules(data);
        setLoading(false);
      } 
      catch (error) {
        console.error('Failed to fetch modules', error);
        setLoading(false); 
      }
    };
    fetchModules();
  }, []);

  if (loading) {
    return <p>Loading modules...</p>;
  }

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/admin-modules/download/${id}`, {
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

  const handleEdit = (module) => {
    setModuleToEdit(module);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const id = moduleToEdit.MID;
    const formData = new FormData();
    formData.append('title', moduleToEdit.title);
    formData.append('subject', moduleToEdit.subject);
    if (moduleToEdit.file) {
      formData.append('file', moduleToEdit.file);
    }

    if (validateEditData()) {            // ----- ADD INPUT VALIDATION ----- //
      try {
        const response = await axios.put(`http://localhost:3000/admin-modules/edit/${id}`, formData );
        alert('Module successfully updated!');
      } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || 'Update failed!');
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Error with input validation:", errors);
      setLoading(false);
    }
  
    console.log('Edited Module:', moduleToEdit); // TESTING PURPOSES //
    setEditModalOpen(false);
  };

  const handleDelete = (module) => {
    setModuleToDelete(module);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const id = moduleToDelete.MID;
      const response = await axios.delete(`http://localhost:3000/admin-modules/delete/${id}`);
      alert('Module successfully deleted!');
      setDeleteModalOpen(false);
    } catch (error){
      console.log(error);
      alert(err.response?.data?.messsage || 'Delete failed!');
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
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
                <input type="text" placeholder="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)} />
                <input type="text" placeholder="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} required/>
                <button type="submit">Submit</button>
                <button type="button" onClick={toggleModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {errors.file && <p style={{ color: 'red' }}>{errors.file}</p>}

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
                <td>
                    <div onClick={() => toggleUserDropdown(index)}>
                      <img src="/images/threedot.svg" alt="Three Dots" className={styles.three__dots} width={15} height={20} />
                    </div>
                    {activeUserIndex === index && (
                      <div className={styles.dropdown}>
                        <div className={styles.dropdown__item} onClick={() => handleEdit(module)}>Edit</div>
                        <div className={styles.dropdown__item} onClick={() => handleDelete(module)}>Delete</div>
                      </div>
                    )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>

        {deleteModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this module?</p>
              <div>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}

        {editModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Edit Module</h2>
              <form onSubmit={handleEditSubmit}>
                <input type="text" placeholder="Subject" value={moduleToEdit?.subject || ''} onChange={(e) => setModuleToEdit({ ...moduleToEdit, subject: e.target.value })} required />
                <input type="text" placeholder="Title" value={moduleToEdit?.title || ''} onChange={(e) => setModuleToEdit({ ...moduleToEdit, title: e.target.value })} required />
                <input type="file" onChange={(e) => setModuleToEdit({ ...moduleToEdit, file: e.target.files[0] })} />
                <div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default AdminModules