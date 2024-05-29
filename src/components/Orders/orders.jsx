import SaidBar from "../SideBar/saidBar.jsx";
import styles from './orders.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {TbFilterPlus} from "react-icons/tb";
import {LuPlusSquare, LuSearch} from "react-icons/lu";
import {MdArrowForwardIos, MdOutlineArrowBackIos} from "react-icons/md";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useEffect, useState} from "react";
import orderStore from '../../store/orderStore.js'
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
                            <div className={styles.perPage}>
                                <span>Елементів на сторінці</span>
                                <div> 10 <RiArrowDropDownLine /></div>
                            </div>
                            <span>Показано 21 - 80 з 88 результату</span>
                        </div>
                    </div>
                    <div className={styles.orders}>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox"/></th>
                                        <th>Номер заявки</th>
                                        <th>Дата створення</th>
                                        <th>ПІБ</th>
                                        <th>Товари</th>
                                        <th>Статус</th>
                                        <th>Сума</th>
                                        <th>Оплачено</th>
                                        <th>Доставка</th>
                                        <th>Дія</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orders.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="checkbox"/>
                                            </td>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                            </td>
                                            <td>
                                                {item.pib}
                                            </td>
                                            <td>
                                                <div>
                                                    {item.products.map((product, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {product.title}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td>
                                                {item.status.name}
                                            </td>
                                            <td>
                                                {item.suma}
                                            </td>
                                            <td>
                                                {item.paymentSuma}
                                            </td>
                                            <td>
                                                {item.delivery}
                                            </td>
                                            <td>
                                                <button>Дія</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Orders;