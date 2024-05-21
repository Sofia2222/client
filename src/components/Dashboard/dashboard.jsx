import SaidBar from "../SideBar/saidBar.jsx";
import styles from './dashboard.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";

const Dashboard = () => {
    return (
        <div className={styles.mainContainer}>
            <SaidBar/>
            <div className={styles.leftBar}>
                <HeaderBar title='Головна сторінка' aboutPage='Детальна інформація про вашу компанію'/>

            </div>
        </div>
    );
};

export default Dashboard;