import SaidBar from "../SideBar/saidBar.jsx";
import styles from './orders.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {TbFilterPlus} from "react-icons/tb";
import {LuMenu, LuPlusSquare, LuSearch} from "react-icons/lu";
import {MdArrowForwardIos, MdOutlineArrowBackIos} from "react-icons/md";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useEffect, useState} from "react";
import orderStore from '../../store/orderStore.js'
import tableHead from "./tableValue.js";

import {observer} from "mobx-react-lite";
import dayjs from "dayjs";

const Orders = observer(() => {
    const { orders, fetchOrders, isLoading } = orderStore

    useEffect(() => {
        fetchOrders({limit: 10, offset: 0})
    }, [])

    if(isLoading === true) {
        return (
            <div>
                Loading
            </div>
        )
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
                    <div className={styles.addOrder}><LuPlusSquare/></div>
                </div>
                <div className={styles.ordersBar}>
                    <div className={styles.headerOrders}>
                        <div className={styles.select}>
                            <span>із обраним:</span>
                            <span onClick={() => console.log(orders)}>Оберіть дію</span>
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
                            <span>Показано 21 - 80 з 88 результату</span>
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
                                                                <span key={product.id}>{product.title} - {product.OrderRefProduct.amount}</span>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className={styles.bCell}>
                                                    <span style={{backgroundColor: order.status.backgroundColor, padding: '4px', borderRadius: '2px'}}>{order.status.name}</span>
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
                                                    <LuMenu />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Orders;