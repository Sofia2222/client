import SaidBar from "../SideBar/saidBar.jsx";
import styles from './contacts.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {useEffect, useState} from "react";
import contactsStore from '../../store/contactsStore.js'
import tableHead from "./tableValue.js";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import 'reactjs-popup/dist/index.css';
import ModalAddContact from "./ModalAddContact/modalAddContact.jsx";
import Preloader from "../Preloader/preloader.jsx";
import createArrayFromNumber from "../../utils/createArrayFromNumber.js";
import FilterAndAddSection from "../UI/FilterAndAddSection/filterAndAddSection.jsx";
import TableHeader from "../UI/TableHeader/tableHeader.jsx";
import {GrUpdate} from "react-icons/gr";
import {MdDeleteForever} from "react-icons/md";

const Contacts = observer(() => {
    const [perPage, setPerPage] = useState(15);
    const { contacts, totalContacts, isLoading, fetchContacts, deleteContact} = contactsStore;
    const [activeAddModal, setActiveAddModal] = useState(false);
    const [activeEditModal, setActiveEditModal] = useState(false);
    const [currentContact, setCurrentContact] = useState(0);
    const countPages = Math.ceil(totalContacts/perPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = createArrayFromNumber(countPages)
    // const [searchText, setSearchText] = useState("");
    useEffect(() => {
        fetchContacts({limit: perPage, offset: currentPage === 1 ? 0 : perPage * (currentPage - 1)})
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
                <HeaderBar title='Клієнти' aboutPage='Детальна інформація про клієнтів.'/>
                <FilterAndAddSection setActiveModal={setActiveAddModal}/>
                <div className={styles.contactsBar}>
                    <TableHeader countPages={countPages} currentPage={currentPage} pages={pages} perPage={perPage} setCurrentPage={setCurrentPage} totalPages={totalContacts} setPerPage={setPerPage}/>
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
                                {contacts.map((contact, i) => {
                                    return (
                                        <div className={styles.bRow} key={i}>
                                            <div className={styles.bCell}>
                                                <input type="checkbox"/>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{dayjs(contact.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{contact.firstName}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{contact.lastName}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{contact.middleName}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{contact.phone}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{contact.email}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{contact.comment}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <GrUpdate onClick={() => {setCurrentContact(contact); setActiveEditModal(true);}}/>
                                                <MdDeleteForever onClick={() => deleteContact({contactId: contact.id})}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAddContact active={activeAddModal} setActive={setActiveAddModal}/>
            <ModalAddContact active={activeEditModal} setActive={setActiveEditModal} currentContact={currentContact}/>

        </div>
    );
});

export default Contacts;