import Modal from "../../Modal/modal.jsx";
import styles from "./modalAddPayment.module.scss";
import React from "react";
import paymentsStore from "../../../store/paymentsStore.js";

const ModalAddPayment = ({active, setActive, currentPayment}) => {
    const [data, setData] = React.useState({
        orderId: null,
        method: null,
        amount: null,
        comment: null,
        holderName: null,
    });
    const {addPayment, updatePayment} = paymentsStore;

    function onChangeInput (e, value){
        setData((prev) => { return {...prev, [`${value}`]: e.target.value}});
        if (currentPayment !== undefined) {
            currentPayment[`${value}`] = e.target.value;
        }
    }

    return (
        <div>
            <Modal active={active} setActive={setActive} about={currentPayment === undefined ? 'Створення платежу' : 'Оновлення плаатежу'}>
                <div className={styles.modal}>
                    <div className={styles.form}>
                        <div>
                            <span>Номер замовлення</span>
                            <input
                                onChange={e => onChangeInput(e, 'orderId')}
                                value={data.orderId || currentPayment?.method || ''}
                                type='text'
                                placeholder=''
                                className=""/>
                        </div>
                        <div>
                            <span>Метод оплати</span>
                            <input
                                onChange={e => onChangeInput(e, 'method')}
                                value={data.method || currentPayment?.method || ''}
                                type='text'
                                placeholder=''
                                className=""/>
                        </div>
                        <div>
                            <span>Сума</span>
                            <input
                                onChange={e => onChangeInput(e, 'amount')}
                                value={data.amount || currentPayment?.amount || ''}
                                type='number'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Коментар</span>
                            <input
                                onChange={e => onChangeInput(e, 'comment')}
                                value={data.comment || currentPayment?.comment || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>ПІБ платника</span>
                            <input
                                onChange={e => onChangeInput(e, 'holderName')}
                                value={data.holderName || currentPayment?.holderName || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            {currentPayment === undefined ?
                                <button onClick={() => {
                                    addPayment({payment: data});
                                    setActive(false)
                                }}>
                                    Додати
                                </button> :
                                <button onClick={() => {
                                    updatePayment({payment: currentPayment});
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

export default ModalAddPayment;