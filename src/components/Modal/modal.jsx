import styles from './modal.module.scss';

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(setActive(false))}>
            <div className={active ? `${styles.modalContent} ${styles.active}` : styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;