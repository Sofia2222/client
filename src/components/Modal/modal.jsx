import styles from './modal.module.scss';

const Modal = ({active, setActive, about, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(setActive(false))}>
            <div className={active ? `${styles.modalContent} ${styles.active}` : styles.modalContent}
                 onClick={(e) => e.stopPropagation()}>
                <span className={styles.about}>{about}</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;