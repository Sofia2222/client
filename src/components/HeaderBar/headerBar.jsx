import styles from './headerBar.module.scss';
import {LuBell} from "react-icons/lu";

const HeaderBar = ({title, aboutPage}) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.aboutText}>
                <span className={styles.title}>{title}</span>
                <span className={styles.aboutPage}>{aboutPage}</span>
            </div>
            <div className={styles.extraBtn}>
                <div className={styles.language}></div>
                <div className={styles.notification}> <LuBell /> </div>
            </div>
        </div>
    );
};

export default HeaderBar;