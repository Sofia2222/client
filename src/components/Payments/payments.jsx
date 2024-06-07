import SaidBar from "../SideBar/saidBar.jsx";
import styles from './payments.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {useEffect, useState} from "react";
import paymentsStore from '../../store/paymentsStore.js'
import tableHead from "./tableValue.js";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import 'reactjs-popup/dist/index.css';
import ModalAddPayment from "./ModalAddPayment/modalAddPayment.jsx";
import Preloader from "../Preloader/preloader.jsx";
import createArrayFromNumber from "../../utils/createArrayFromNumber.js";
import FilterAndAddSection from "../UI/FilterAndAddSection/filterAndAddSection.jsx";
import TableHeader from "../UI/TableHeader/tableHeader.jsx";
import {GrUpdate} from "react-icons/gr";
import {MdDeleteForever} from "react-icons/md";

const Payments = observer(() => {
    console.log(1111)
    const [perPage, setPerPage] = useState(15);
    const { payments, totalPayments, isLoading, fetchPayments, deletePayment} = paymentsStore;
    const [activeAddModal, setActiveAddModal] = useState(false);
    const [activeEditModal, setActiveEditModal] = useState(false);
    const [currentPayment, setCurrentPayment] = useState(0);
    const countPages = Math.ceil(totalPayments/perPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = createArrayFromNumber(countPages)

    useEffect(() => {
        fetchPayments({limit: perPage, offset: currentPage === 1 ? 0 : perPage * (currentPage - 1)})
    }, [currentPage, perPage, activeAddModal])


    if(isLoading === true) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={styles.mainContainer}>
            <SaidBar/>
            <div className={styles.sidebarLayout}></div>
            <div className={styles.mainBar}>
                <HeaderBar title='Платежі' aboutPage='Детальна інформація про платежі.'/>
                <FilterAndAddSection setActiveModal={setActiveAddModal}/>
                <div className={styles.paymentsBar}>
                    <TableHeader countPages={countPages} currentPage={currentPage} pages={pages} perPage={perPage} setCurrentPage={setCurrentPage} totalPages={totalPayments} setPerPage={setPerPage}/>
                    <div>
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
                                {payments.map((payment, i) => {
                                    return (
                                        <div className={styles.bRow} key={i}>
                                            <div className={styles.bCell}>
                                                <input type="checkbox"/>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{dayjs(payment.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{payment.id}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{payment.method}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{payment.amount}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{payment.comment}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{payment.holderName}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <GrUpdate onClick={() => {
                                                    setCurrentPayment(payment);
                                                    setActiveEditModal(true);
                                                }}/>
                                                <MdDeleteForever
                                                    onClick={() => deletePayment({paymentId: payment.id})}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAddPayment active={activeAddModal} setActive={setActiveAddModal}/>
            <ModalAddPayment active={activeEditModal} setActive={setActiveEditModal} currentPayment={currentPayment}/>

        </div>
    );
});

export default Payments;