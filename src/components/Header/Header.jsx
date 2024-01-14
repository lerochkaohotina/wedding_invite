import styles from './Header.module.scss';
export default function Header() {
    return (
        <header className={styles.header}>
            <span className={styles.header__title}>Приглашение</span>
            <button className={styles.header__button}>Добавить в календарь</button>
        </header>
    )
}