import styles from "./section.module.scss";
import {TbFilterPlus} from "react-icons/tb";
import {LuPlusSquare, LuSearch} from "react-icons/lu";

const FilterAndAddSection = ({setActiveModal, onChangeSearch}) => {
    return (
        <div className={styles.filterSection}>
            <div className={styles.filter}><TbFilterPlus/></div>
            <div className={styles.searchOrders}>
                <LuSearch/>
                <input type="text" placeholder='Пошук'/>
            </div>
            <div className={styles.addOrder}>
                <LuPlusSquare onClick={() => setActiveModal(true)}/>
            </div>
        </div>
    );
};

export default FilterAndAddSection;