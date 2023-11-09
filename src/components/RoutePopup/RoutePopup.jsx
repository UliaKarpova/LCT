import Modal from "../Modal/Modal.jsx";
import styles from './RoutePopup.module.css'
import Mapgl from "../MapGl/Mapgl.jsx";

const RoutePopup = ({closeModal, center, tasks}) => {
    return (
        <Modal closeModal={closeModal} leftIcon>
            <div className={styles.popup}>
                <Mapgl center={center} tasks={tasks}/>
            </div>
        </Modal>
    );
};

export default RoutePopup;