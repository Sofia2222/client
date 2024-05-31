import React from 'react';
import Modal from "../../Modal/modal.jsx";

const ModalAddOrder = ({active, setActive}) => {
    return (
        <div>
            <Modal active={active} setActive={setActive}>
               <div>
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur assumenda exercitationem incidunt ipsam, modi molestiae nemo nesciunt nisi nobis numquam quibusdam quis quisquam rem repudiandae soluta tenetur veniam voluptatem.
               </div>
            </Modal>
        </div>
    );
};

export default ModalAddOrder;