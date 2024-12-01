import styles from '../assets/styles/login.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    try {
      const response = await axios.post('http://localhost:3000/login', userData);
      alert('You are now logged in!.');
      setUserData({
        email: '',
        password: ''
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <img src="/images/MNHS-Logo.png" alt="Logo" />
                <label htmlFor="email">Email
                  <input type="email" name='email'onChange={handleChange} />
                </label>
                
                <label htmlFor="password">Password
                  <input type="password" name='password'onChange={handleChange} />
                </label>

                <button type="submit">Login</button>
            </form>
            <p>Don&apos;t have an account? <Link to={"/Register"} className={styles.link}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login