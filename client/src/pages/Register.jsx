import styles from '../assets/styles/register.module.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    email: '',
    lrn: '',
    grlvl: '11',
    strand: 'STEM',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateData = () => {
    const error = {};

    if (!userData.lrn || !/^\d{12}$/.test(userData.lrn)) {
      error.lrn = 'LRN must be exactly 12 numeric characters.';
    }

    if (!userData.password || userData.password.length < 8 || !/[A-Z]/.test(userData.password)) {
      error.password = 'Password must be at least 8 characters and include an uppercase letter.';
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateData()) {
      try {
        const response = await axios.post('http://localhost:3000/register', userData);
        alert('Registration successful! You can now log in.');
        setUserData({
          email: '',
          lrn: '',
          grlvl: '11',
          strand: 'STEM',
          password: '',
        });
        navigate('/login');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Registration failed!');
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Error with input validation:", errors); // Debugging log
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src="" alt="" />
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required value={userData.email} onChange={handleChange}/>
          
          <label htmlFor="lrn">LRN</label>
          <input type="text" name="lrn" required value={userData.lrn} onChange={handleChange} />

          {errors.lrn && <p style={{ color: 'red' }}>{errors.lrn}</p>}

          <label htmlFor="grlvl">Grade Level</label>
          <select name="grlvl" value={userData.grlvl} onChange={handleChange}>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          <label htmlFor="strand">Strand</label>
          <select name="strand" value={userData.strand} onChange={handleChange}>
            <option value="STEM">STEM</option>
            <option value="ABM">ABM</option>
            <option value="GAS">GAS</option>
          </select>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required value={userData.password} onChange={handleChange} />

          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register