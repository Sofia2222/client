import SaidBar from "../SideBar/saidBar.jsx";
import styles from './orders.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {TbFilterPlus} from "react-icons/tb";
import {LuMenu, LuPlusSquare, LuSearch} from "react-icons/lu";
import {MdArrowForwardIos, MdOutlineArrowBackIos} from "react-icons/md";
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

const Orders = observer(() => {
    const perPage = 14;
    const { orders, statuses, totalOrders, fetchOrders, fetchStatuses, updateOrderStatus, isLoading } = orderStore;
    const [activeAddModal, setActiveAddModal] = useState(false);
    const countPages = Math.ceil(totalOrders/perPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = createArrayFromNumber(countPages)
    console.log(currentPage)
    useEffect(() => {
        fetchOrders({limit: perPage, offset: currentPage === 1 ? 0 : perPage*(currentPage - 1)});
        fetchStatuses();
    }, [currentPage])


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
            <div className={styles.mainBar}>
                <HeaderBar title='Замовлення' aboutPage='Детальна інформація про замовлення.'/>
                <div className={styles.filterSection}>
                    <div className={styles.filter}><TbFilterPlus/></div>
                    <div className={styles.searchOrders}>
                        <LuSearch />
                        <input type="text" placeholder='Пошук замовлень'/>
                    </div>

                    <div className={styles.addOrder}>
                        <LuPlusSquare onClick={() => setActiveAddModal(true)}/>
                    </div>
                </div>
                <div className={styles.ordersBar}>
                    <div className={styles.headerOrders}>
                        <div className={styles.select}>
                            <span>із обраним:</span>
                            <span onClick={() => console.log(orders)}>Оберіть дію</span>
                        </div>
                        <div className={styles.pagination}>
                            <MdOutlineArrowBackIos onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}/>
                            <div className={styles.numbersPagination}>
                                {pages.map((page) => (
                                    <span onClick={() => setCurrentPage(page)} className={page === currentPage ? styles.pagNumberActive : ''} key={page}>
                                        {page}
                                    </span>
                                ))}
                            </div>
                            <MdArrowForwardIos onClick={() => setCurrentPage(currentPage >= countPages ? currentPage: currentPage+1)}/>
                        </div>
                        <div className={styles.pageInformation}>
                            <span>
                                {
                                    `Показано ${currentPage === 1 ? 1 : perPage*(currentPage - 1)} 
                                    - ${currentPage ===countPages ? totalOrders : perPage*currentPage}
                                     з ${totalOrders} результату`
                                }
                            </span>
                        </div>
                    </div>
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
                                                <span>0</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{order.delivery}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <LuMenu/>
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