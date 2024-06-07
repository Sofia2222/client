import Modal from "../../Modal/modal.jsx";
import styles from "./modalAddProducts.module.scss";
import React from "react";
import productsStore from "../../../store/productsStore.js";

const ModalAddContact = ({active, setActive, currentProduct}) => {
    const [data, setData] = React.useState({
        title: null,
        price: null,
        firstCost: null,
        comment: null,
        categories: null,
    });
    const {addProduct, updateProduct} = productsStore;

    function onChangeInput (e, value){
        setData((prev) => { return {...prev, [`${value}`]: e.target.value}});
        if (currentProduct !== undefined) {
            currentProduct[`${value}`] = e.target.value;
        }
    }
    return (
        <div>
            <Modal active={active} setActive={setActive} about={currentProduct === undefined ? 'Створення товару' : 'Оновлення товару'}>
                <div className={styles.modal}>
                    <div className={styles.form}>
                        <div>
                            <span>Назва</span>
                            <input
                                onChange={e => onChangeInput(e, 'title')}
                                value={data.title || currentProduct?.title ||  ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Ціна</span>
                            <input
                                onChange={e => onChangeInput(e, 'price')}
                                value={data.price || currentProduct?.price || ''}
                                type='text'
                                placeholder=''
                                className=""/>
                        </div>
                        <div>
                            <span>Собівартість</span>
                            <input
                                onChange={e => onChangeInput(e, 'firstCost')}
                                value={data.firstCost || currentProduct?.firstCost || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Коментар</span>
                            <input
                                onChange={e => onChangeInput(e, 'comment')}
                                value={data.comment || currentProduct?.comment || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            <span>Категорії</span>
                            <input
                                onChange={e => onChangeInput(e, 'categories')}
                                value={data.categories || currentProduct?.categories || ''}
                                type='text'
                                placeholder=''/>
                        </div>
                        <div>
                            {currentProduct === undefined ?
                                <button onClick={() => {
                                    addProduct({product: data});
                                    setActive(false)
                                }}>
                                    Додати
                                </button> :
                                <button onClick={() => {
                                    updateProduct({product: currentProduct});
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