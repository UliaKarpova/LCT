import { useEffect } from "react";
import { createPortal } from "react-dom";
import XIcon from '../../assets/images/icons/Ellipse-close.svg?react'
import CloseL from '../../assets/images/icons/Close-L.svg?react'
import ModalOverlay from "../ui/ModalOverlay/ModalOverlay.jsx";
import styles from './Modal.module.css'
import classnames from "classnames";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ closeModal, children, leftIcon }) => {
    useEffect(() => {
        const handleEscKeydown = (event) => {
            event.key === "Escape" && closeModal();
        };

        document.addEventListener("keydown", handleEscKeydown);

        return () => {
            document.removeEventListener("keydown", handleEscKeydown);
        };
    }, [closeModal]);

    const iconClassname = classnames({
        [styles.close]: true,
        [styles.rightIcon]: !leftIcon,
        [styles.leftIcon]: leftIcon
    })

    return createPortal(
        <>
            <div className={styles.modal}>
                {children}
                <button
                    type="button"
                    onClick={closeModal}
                    className={iconClassname}
                >
                    {!leftIcon
                    ? <XIcon/>
                    : <span className={styles.iconL} ><CloseL/></span>}
                </button>
            </div>
            <ModalOverlay onClick={closeModal} />
        </>,
        modalsContainer
    );
};

export default Modal;