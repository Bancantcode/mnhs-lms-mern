import styles from '../assets/styles/register.module.scss'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <img src="" alt="" />
            <form action="" className={styles.form}>
                <label htmlFor="email">Email</label>
                <input type="email" required />

                <label htmlFor="lrn">LRN</label>
                <input type="text" required />

                <label htmlFor="grade__level">Grade Level</label>
                <input type="text" required/>

                <label htmlFor="strand">Strand</label>
                <input type="text" required />

                <label htmlFor="password">Password</label>
                <input type="password" required />
                
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to={"/Login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register