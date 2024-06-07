import Modal from "../../Modal/modal.jsx";
import styles from "./modalAddContact.module.scss";
import React from "react";
import contactsStore from "../../../store/contactsStore.js";

const ModalAddContact = ({active, setActive, currentContact}) => {
    const [data, setData] = React.useState({
        firstName: null,
        lastName: null,
        middleName: null,
        phone: null,
        email: null,
        comment: null
    });
    const {addContact, updateContact} = contactsStore;

    function onChangeInput (e, value){
        setData((prev) => { return {...prev, [`${value}`]: e.target.value}});
        if (currentContact !== undefined) {
            currentContact[`${value}`] = e.target.value;
        }
    }

    return (
        <div>
            <Modal active={active} setActive={setActive} about={currentContact === undefined ? 'Створення клієнта' : 'Оновлення клієнта'}>
                <div className={styles.modal}>
                    <div className={styles.form}>
                        <div>
                            <span>Ім`я</span>
                            <input
                                onChange={e => onChangeInput(e, 'firstName')}
                                value={data.firstName || currentContact?.firstName ||  ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Призвище</span>
                            <input
                                onChange={e => onChangeInput(e, 'lastName')}
                                value={data.lastName || currentContact?.lastName || ''}
                                type='text'
                                placeholder=''
                                className=""/>
                        </div>
                        <div>
                            <span>По батькові</span>
                            <input
                                onChange={e => onChangeInput(e, 'middleName')}
                                value={data.middleName || currentContact?.middleName || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Телефон</span>
                            <input
                                onChange={e => onChangeInput(e, 'phone')}
                                value={data.phone || currentContact?.phone || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Пошта</span>
                            <input
                                onChange={e => onChangeInput(e, 'email')}
                                value={data.email || currentContact?.email || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Коментар</span>
                            <input
                                onChange={e => onChangeInput(e, 'comment')}
                                value={data.comment || currentContact?.comment || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            {currentContact === undefined ?
                                <button onClick={() => {
                                    addContact({contact: data});
                                    setActive(false)
                                }}>
                                    Додати
                                </button> :
                                <button onClick={() => {
                                    updateContact({contact: currentContact});
                                    setActive(false)
                                }}>
                                    Оновити
                                </button>
                            }

                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalAddContact;