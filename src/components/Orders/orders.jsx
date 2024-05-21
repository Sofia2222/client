import SaidBar from "../SideBar/saidBar.jsx";
import styles from './orders.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {TbFilterPlus} from "react-icons/tb";
import {LuPlusSquare, LuSearch} from "react-icons/lu";
import {MdArrowForwardIos, MdOutlineArrowBackIos} from "react-icons/md";
import {RiArrowDropDownLine} from "react-icons/ri";

const Orders = () => {
    return (
        <div className={styles.mainContainer}>
            <SaidBar/>
            <div className={styles.mainBar}>
                <HeaderBar title='Замовлення' aboutPage='Детальна інформація про замовлення.'/>
                <div className={styles.filterSection}>
                    <div className={styles.filter}><TbFilterPlus/></div>
                    <div className={styles.searchOrders}>
                        <LuSearch />
                        <input type="text" placeholder='Пошук замовлень'/>
                    </div>
                    <div className={styles.addOrder}><LuPlusSquare/></div>
                </div>
                <div className={styles.orders}>
                    <div className={styles.headerOrders}>
                        <div className={styles.select}>
                            <span>із обраним:</span>
                            <span>Оберіть дію</span>
                        </div>
                        <div className={styles.pagination}>
                            <MdOutlineArrowBackIos />
                            <div className={styles.numberPagination}>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                            </div>
                            <MdArrowForwardIos />
                        </div>
                        <div className={styles.pageInformation}>
                            <div className={styles.perPage}>
                                <span>Елементів на сторінці</span>
                                <div> 10 <RiArrowDropDownLine /></div>
                            </div>
                            <span>Показано 21 - 80 з 88 результату</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;