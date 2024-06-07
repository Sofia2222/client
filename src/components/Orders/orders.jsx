import SaidBar from "../SideBar/saidBar.jsx";
import styles from './orders.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {LuMenu} from "react-icons/lu";
import {useEffect, useState} from "react";
import orderStore from '../../store/orderStore.js'
import tableHead from "./tableValue.js";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import 'reactjs-popup/dist/index.css';
import ModalAddOrder from "./PopupAddOrder/modalAddOrder.jsx";
import Select from 'react-select'
import Preloader from "../Preloader/preloader.jsx";
import createArrayFromNumber from "../../utils/createArrayFromNumber.js";
import FilterAndAddSection from "../UI/FilterAndAddSection/filterAndAddSection.jsx";
import TableHeader from "../UI/TableHeader/tableHeader.jsx";
import {Link} from "react-router-dom";

const Orders = observer(() => {
    const [perPage, setPerPage] = useState(15);
    const { orders, statuses, totalOrders, fetchOrders, fetchStatuses, updateOrderStatus, isLoading } = orderStore;
    const [activeAddModal, setActiveAddModal] = useState(false);
    const countPages = Math.ceil(totalOrders/perPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = createArrayFromNumber(countPages)
    console.log(currentPage)
    useEffect(() => {
        fetchOrders({limit: perPage, offset: currentPage === 1 ? 0 : perPage * (currentPage - 1)})
        fetchStatuses();
    }, [currentPage, perPage])


    if(isLoading === true) {
        return (
            <Preloader/>
        )
    }
    const optionStatuses = statuses.map((status) => {
        return {value: status.id, label: status.name, backgroundColor: status.backgroundColor};
    })
    const onChangeStatus = async (newStatus, orderId) =>{
        console.log(newStatus)
        await updateOrderStatus({orderId, statusId: newStatus.value})
    }

    return (
        <div className={styles.mainContainer}>
            <SaidBar/>
            <div className={styles.sidebarLayout}></div>
            <div className={styles.mainBar}>
                <HeaderBar title='Замовлення' aboutPage='Детальна інформація про замовлення.'/>
                <FilterAndAddSection setActiveModal={setActiveAddModal}/>
                <div className={styles.ordersBar}>
                    <TableHeader countPages={countPages} currentPage={currentPage} pages={pages} perPage={perPage} setCurrentPage={setCurrentPage} totalPages={totalOrders} setPerPage={setPerPage}/>
                    <div className={styles.orders}>
                        <div className={styles.table}>
                            <div className={styles.tableHead}>
                                <div className={styles.hRow}>
                                    <div className={styles.hCell}>
                                        <input type="checkbox"/>
                                    </div>
                                    {tableHead.map((item, i) => {
                                        return (
                                            <div className={styles.hCell} key={i}>
                                                <span>{item.title}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.tableBody}>
                                {orders.map((order, i) => {
                                    return (
                                        <div className={styles.bRow} key={i}>
                                            <div className={styles.bCell}>
                                                <input type="checkbox"/>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{order.id}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{order.pib}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <div className={styles.multiCell}>
                                                    {order.products.map((product) => {
                                                        return (
                                                            <span
                                                                key={product.id}>{product.title} - {product.OrderRefProduct.amount}</span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className={styles.bCell}>
                                                <Select classNamePrefix={'selectStatuses'} options={optionStatuses}
                                                        defaultValue={optionStatuses.filter(status => status.value === order.status.id)[0]}
                                                        onChange={(newStatus) => onChangeStatus(newStatus, order.id)}
                                                        styles={{
                                                            control: (baseStyles, state) => ({
                                                                ...baseStyles,
                                                                backgroundColor: state.getValue()[0].backgroundColor,
                                                            }),
                                                        }}/>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{order.suma}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{order.amountPayments || 0}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{order.delivery}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <Link to={`/order/${order.id}`}><LuMenu /></Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAddOrder active={activeAddModal} setActive={setActiveAddModal}/>
        </div>
    );
});

export default Orders;