import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import OrderService from "../../http/services/OrderService.js";
import styles from "../Orders/.module.scss";
import SaidBar from "../SideBar/saidBar.jsx";
import HeaderBar from "../HeaderBar/headerBar.jsx";


const OrderById = () => {
    const {id} = useParams();
    const [currentOrder, setCurrentOrder] = useState({});
    useEffect(() => {
        OrderService.getOrderById({id}).then(order => { setCurrentOrder(order.data.order)})
    },[])
    return (
        <div className={styles.mainContainer}>
            <SaidBar/>
            <div className={styles.sidebarLayout}></div>
            <div className={styles.mainBar}>
                <HeaderBar title={`Замовлення №${currentOrder.id}`} aboutPage='Детальна інформація про замовлення.'/>
                <div>
                    <div className={styles}></div>
                </div>
            </div>
        </div>
    );
};

export default OrderById;