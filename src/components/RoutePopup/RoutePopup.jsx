import Modal from "../Modal/Modal.jsx";
import styles from './RoutePopup.module.css'
import Mapgl from "../MapGl/Mapgl.jsx";
import Alert from "../../assets/images/icons/Ellipse-Allert.svg?react";
import Location from "../../assets/images/icons/Location.svg?react";
import classnames from "classnames";
import Button from "../ui/Button/Button.jsx";
import {useState} from "react";

const priorities = {
    Hight: 'высокий',
    Medium: 'средний',
    Low: 'низкий'
}

function getDeclension(number, words) {
    return words[
        Math.floor(number) % 100 > 4 && Math.floor(number) % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][Math.floor(number) % 10 < 5 ? Math.abs(Math.floor(number)) % 10 : 5]
        ];
}

const RoutePopup = ({closeModal, nativeBranchLocation, dailyTasks, patchDailyTasks}) => {
    const lastDoneLocation = dailyTasks.findLast(task => task.status === 'done' || task.status === 'processing')?.branch.location || nativeBranchLocation;
    const tasksToDoLocations = dailyTasks.filter(task => task.status !== 'done').map(task => task.branch.location)
    const taskToDo = dailyTasks.find(task => task.status !== 'done')
    const points = [lastDoneLocation, ...tasksToDoLocations];

    const [refreshKey, setRefreshKey] = useState(1)
    function refreshMap() {
        setRefreshKey(oldKey => oldKey + 1);
    }

    const [onWay, setOnWay] = useState(false)

    const priorityClassname = classnames({
        [styles.priority]: true,
        [styles[taskToDo?.priority]]: true
    })

    const statuses = {
        processing: {
            nextStatus: 'done',
            text: 'Завершил задачу'
        },
        waiting: {
            nextStatus: 'processing',
            text1: 'Я выехал',
            text2: 'Прибыл на точку'
        }
    }

    return (
        <Modal closeModal={closeModal} leftIcon>
            <div className={styles.popup}>
                <Mapgl center={lastDoneLocation} points={points} key={refreshKey}/>
                <div className={styles.wrapper}>
                    {taskToDo ? <div className={styles.cockpit}>
                        <div className={priorityClassname}>
                            <Alert/>
                            <span>{`Приоритет ${priorities[taskToDo.priority]}`}</span>
                        </div>
                        <h2 className={styles.title}>{taskToDo.name}</h2>
                        <p className={styles.time}>Время выполнения: <span className={styles.timer}>{`${taskToDo.time} ${getDeclension(taskToDo.time, ['час', 'часа', 'часов'])}`}</span></p>
                        <div className={styles.buttonWrapper}>
                            {onWay && <div className={styles.onWay}>
                                <Location/>
                                <span>Вы в пути</span>
                            </div>}
                            <Button onClick={() => {
                                taskToDo.status === 'waiting' && setOnWay(!onWay)
                                patchDailyTasks((prev) =>
                                    prev.map(item =>
                                        item.id === taskToDo.id && (onWay || taskToDo.status !== 'waiting')
                                            ? {...taskToDo, status: statuses[taskToDo.status].nextStatus}
                                            : item))
                                refreshMap();
                            }

                            }>{taskToDo.status === 'processing'
                                ? statuses[taskToDo.status].text
                                : (!onWay
                                    ? statuses[taskToDo.status].text1 : statuses[taskToDo.status].text2)}

                            </Button>
                        </div>
                   </div> :
                    <p className={styles.success}>Все задачи на сегодня выполнены</p>}
                </div>
            </div>
        </Modal>
    );
};

export default RoutePopup;