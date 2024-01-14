import styles from './Footer.module.scss';

export default function Footer({map}) {
    return (
        <footer className={styles.footer}>
            <iframe
                className={styles.footer__map}
                src={map}
                width="100%"
                height="100%"
            />
        </footer>
    )
}