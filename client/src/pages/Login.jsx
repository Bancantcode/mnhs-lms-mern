import styles from '../assets/styles/login.module.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <img src="" alt="" />
            <form action="" className={styles.form}>
                <label htmlFor="email">Email</label>
                <input type="email" />
                
                <label htmlFor="password">Password</label>
                <input type="password" />

                <button type="submit">Login</button>
            </form>
            <p>Don&apos;t have an account? <Link to={"/Register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login