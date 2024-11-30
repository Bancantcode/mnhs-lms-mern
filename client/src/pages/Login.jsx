import styles from '../assets/styles/login.module.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <img src="" alt="" />
            <form action="" className={styles.form}>
                <label htmlFor="email">Email
                <input type="email" /></label>
                
                <label htmlFor="password">Password
                <input type="password" /></label>

                <button type="submit">Login</button>
            </form>
            <p>Don&apos;t have an account? <Link to={"/Register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login