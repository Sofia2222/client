import SaidBar from "../SideBar/saidBar.jsx";
import styles from './products.module.scss'
import HeaderBar from "../HeaderBar/headerBar.jsx";
import {useEffect, useState} from "react";
import productsStore from '../../store/productsStore.js'
import tableHead from "./tableValue.js";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import 'reactjs-popup/dist/index.css';
import ModalAddContact from "./ModalAddProduct/modalAddProducts.jsx";
import Preloader from "../Preloader/preloader.jsx";
import createArrayFromNumber from "../../utils/createArrayFromNumber.js";
import FilterAndAddSection from "../UI/FilterAndAddSection/filterAndAddSection.jsx";
import TableHeader from "../UI/TableHeader/tableHeader.jsx";
import {GrUpdate} from "react-icons/gr";
import {MdDeleteForever} from "react-icons/md";

const Products = observer(() => {
    const [perPage, setPerPage] = useState(15);
    const { products, totalProducts, isLoading, fetchProducts, deleteProduct} = productsStore;
    const [activeAddModal, setActiveAddModal] = useState(false);
    const [activeEditModal, setActiveEditModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(0);
    const countPages = Math.ceil(totalProducts/perPage);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = createArrayFromNumber(countPages)
    // const [searchText, setSearchText] = useState("");
    useEffect(() => {
        fetchProducts({limit: perPage, offset: currentPage === 1 ? 0 : perPage * (currentPage - 1)})
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
                <HeaderBar title='Товари' aboutPage='Детальна інформація про товари.'/>
                <FilterAndAddSection setActiveModal={setActiveAddModal}/>
                <div className={styles.productsBar}>
                    <TableHeader countPages={countPages} currentPage={currentPage} pages={pages} perPage={perPage} setCurrentPage={setCurrentPage} totalPages={totalProducts} setPerPage={setPerPage}/>
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
                                {products.map((product, i) => {
                                    return (
                                        <div className={styles.bRow} key={i}>
                                            <div className={styles.bCell}>
                                                <input type="checkbox"/>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{dayjs(product.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{product.title}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{product.price}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{product.firstCost}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{product.comment}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <span>{product.categories}</span>
                                            </div>
                                            <div className={styles.bCell}>
                                                <GrUpdate onClick={() => {setCurrentProduct(product); setActiveEditModal(true);}}/>
                                                <MdDeleteForever onClick={() => deleteProduct({productId: product.id})}/>
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
            <ModalAddContact active={activeEditModal} setActive={setActiveEditModal} currentProduct={currentProduct}/>

        </div>
    );
});

export default Products;