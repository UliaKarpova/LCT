import { useEffect } from "react";
import { createPortal } from "react-dom";
import XIcon from '../../assets/images/icons/Ellipse-close.svg?react'
import ModalOverlay from "../ui/ModalOverlay/ModalOverlay.jsx";
import styles from './Modal.module.css'

const modalsContainer = document.querySelector("#modals");

const Modal = ({ closeModal, children }) => {
    useEffect(() => {
        const handleEscKeydown = (event) => {
            event.key === "Escape" && closeModal();
        };

        document.addEventListener("keydown", handleEscKeydown);

        return () => {
            document.removeEventListener("keydown", handleEscKeydown);
        };
    }, [closeModal]);

    return createPortal(
        <>
            <div className={styles.modal}>
                {children}
                <button
                    type="button"
                    onClick={closeModal}
                    className={styles.close}
                >
                    <XIcon/>
                </button>
            </div>
            <ModalOverlay onClick={closeModal} />
        </>,
        modalsContainer
    );
};

export default Modal;