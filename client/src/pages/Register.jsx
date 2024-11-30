import styles from '../assets/styles/register.module.scss'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <img src="" alt="" />
            <form action="" className={styles.form}>
                <label htmlFor="email">Email
                <input type="email" required /></label>

                <label htmlFor="lrn">LRN
                <input type="text" required /></label>

                <label htmlFor="grade__level">Grade Level
                <input type="text" required /></label>

                <label htmlFor="strand">Strand
                <input type="text" required /></label>

                <label htmlFor="password">Password
                <input type="password" required /></label>
                
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to={"/Login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register