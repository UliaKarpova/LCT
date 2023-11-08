import styles from './TaskCard.module.css'
import ArrowRight from '../../assets/images/icons/Arrow_right.svg?react'
import Location from '../../assets/images/icons/Location.svg?react'

const TaskCard = ({number, task}) => {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <span>{`${number}.`}</span>
                <div>
                    <p>{task.name}</p>
                    <div className={styles.location}>
                        <Location/>
                        <p className={styles.address}>{task.address}</p>
                    </div>
                </div>
                <button className={styles.rightArrow}><ArrowRight/></button>
            </div>
            <div className={styles.statuses}>
                <span>

                </span>
            </div>
        </div>
    );
};

export default TaskCard;