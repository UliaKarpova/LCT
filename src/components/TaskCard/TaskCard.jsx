import styles from './TaskCard.module.css'
import ArrowRight from '../../assets/images/icons/Arrow_right.svg?react'
import Location from '../../assets/images/icons/Location.svg?react'
import Alert from '../../assets/images/icons/Ellipse-Allert.svg?react'
import Waiting from '../../images/processing.png'
import InWork from '../../images/inWork.png'
import Done from '../../images/done.png'
import classnames from "classnames";

const priorities = {
    Hight: 'высокий',
    Medium: 'средний',
    Low: 'низкий'
}

const status = {
    1: Waiting,
    2: Waiting,
    3: InWork,
    4: Done
}

const TaskCard = ({number, task, onClick}) => {
    const priorityClassname = classnames({
        [styles.priority]: true,
        [styles[task.priority]]: true
    })

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.info}>
                <span>{`${number}.`}</span>
                <div>
                    <p>{task.name}</p>
                    <div className={styles.location}>
                        <Location/>
                        <p className={styles.address}>{task.branch.address}</p>
                    </div>
                </div>
                <button className={styles.rightArrow}><ArrowRight/></button>
            </div>
            <div className={styles.statuses}>
                <div className={priorityClassname}>
                    <Alert/>
                    <span>{`Приоритет ${priorities[task.priority]}`}</span>
                </div>
                <span className={styles.statusWrapper}><img className={styles.status} src={status[task.status]} alt='Статус.'/></span>
            </div>
        </div>
    );
};

export default TaskCard;