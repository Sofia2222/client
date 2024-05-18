import styles from './saidBar.module.scss'
import {Link} from "react-router-dom";
import pages from "./menuFields.js";
import {LuLogOut, LuSearch, LuSettings, LuSlidersHorizontal} from "react-icons/lu";

const SaidBar = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.img}></div>
            <div className={styles.search}>
                <LuSearch className={styles.searchImg} />
                <input className={styles.searchInput} type="text" placeholder="Пошук"/>
            </div>
            <div className={styles.pages}>
                {pages.map((item, index) => (
                    <div key={index} className={styles.page}>
                        <Link to={item.link}>
                            <div className={styles.linkBody}>
                                <item.icon className={styles.Icon}/>
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.footer}>
                <div className={styles.line}></div>
                <div className={styles.footerPages}>
                    <div className={styles.page}>
                        <Link to={'/integrations'}>
                            <div className={styles.linkBody}>
                                <LuSlidersHorizontal className={styles.Icon}/>
                                <span>Інтеграції</span>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.page}>
                        <Link to={'/settings'}>
                            <div className={styles.linkBody}>
                                <LuSettings className={styles.Icon}/>
                                <span>Налаштування</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.logout}>
                    <Link to='/'>
                        <div>
                            <LuLogOut className={styles.Icon}/>
                            <span>Вихід</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SaidBar;