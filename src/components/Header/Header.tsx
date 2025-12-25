import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1>HeaderAM</h1>
      <div className={styles.wrapp}>
        <Link to='/' className={styles.btnTo}>Comments and posts</Link>
        <Link to='/list' className={styles.btnTo}>List</Link>
      </div>
    </div>
  )
}