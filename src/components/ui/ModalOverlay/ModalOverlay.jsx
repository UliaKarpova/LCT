import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;
