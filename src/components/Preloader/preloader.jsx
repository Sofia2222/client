import styles from './preloader.module.scss'
import {useEffect} from "react";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.preloaderContainer}>
                <span className={styles.animatedPreloader}></span>
            </div>
        </div>
    );
};

export default Preloader;