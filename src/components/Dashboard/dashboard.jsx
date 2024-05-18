import SaidBar from "../SideBar/saidBar.jsx";
import styles from './dashboard.module.scss'

const Dashboard = () => {
    return (
        <div className={styles.mainContainer}>
           <SaidBar/>
            <div className={styles.test}>

            </div>
        </div>
    );
};

export default Dashboard;