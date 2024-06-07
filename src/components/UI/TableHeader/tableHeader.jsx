import styles from "./tableHeader.module.scss";
import {MdArrowForwardIos, MdOutlineArrowBackIos} from "react-icons/md";
import Select from "react-select";

const TableHeader = ({pages, currentPage, countPages, perPage, totalPages, setCurrentPage, setPerPage}) => {
    const optionPerPage = [
        { label: "15", value: "15" },
        { label: "25", value: "25" },
        { label: "30", value: "30" },
        { label: "40", value: "35" },
        { label: "50", value: "40" },
    ]
    return (
        <div className={styles.headerOrders}>
            <div className={styles.select}>
                <span>із обраним:</span>
                <span>Оберіть дію</span>
            </div>
            <div className={styles.pagination}>
                <MdOutlineArrowBackIos onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}/>
                <div className={styles.numbersPagination}>
                    {pages.map((page) => (
                        <span onClick={() => setCurrentPage(page)}
                              className={page === currentPage ? styles.pagNumberActive : ''} key={page}>
                                        {page}
                                    </span>
                    ))}
                </div>
                <MdArrowForwardIos
                    onClick={() => setCurrentPage(currentPage >= countPages ? currentPage : currentPage + 1)}/>
            </div>
            <div className={styles.pageInformation}>
                <div className={styles.perPage}>
                    <span>Елементів на сторінці</span>
                    <Select
                        defaultValue={{label: 15, value: 15}}
                        classNamePrefix={'perPage'}
                        options={optionPerPage}
                        onChange={(perPage) => setPerPage(perPage.value)}/>
                </div>
                <span>
                    {
                        `Показано ${currentPage === 1 ? 1 : perPage * (currentPage - 1)} 
                        - ${currentPage === countPages ? totalPages : perPage * currentPage}
                         з ${totalPages} результату`
                    }
                </span>

            </div>
        </div>
    );
};

export default TableHeader;