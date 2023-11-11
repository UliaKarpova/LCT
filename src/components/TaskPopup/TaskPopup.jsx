import Modal from "../Modal/Modal.jsx";
import styles from './TaskPopup.module.css'
import Done from "../../images/done.png";
import InWork from "../../images/inWork.png";
import Processing from "../../images/processing.png";
import Alert from "../../assets/images/icons/Ellipse-Allert.svg?react";
import Map from "../../assets/images/icons/Map.svg?react";
import classnames from "classnames";
import {getDeclension} from "../../common/helpers.js";
import Waiting from "../../assets/images/icons/waiting.svg?react";
import Process from "../../assets/images/icons/processing.svg?react";
import Closed from "../../assets/images/icons/Ellipse-check.svg?react";
import Button from "../ui/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/index.js";
import {statusChanger} from "../../common/constants.js";

const priorities = {
    Hight: 'высокий',
    Medium: 'средний',
    Low: 'низкий'
}

const status = {
    1: Processing,
    2: Processing,
    3: InWork,
    4: Done
}
const TaskPopup = ({task, setTask, closePopup, handleMapButton, isNoButton}) => {
    const {dailyTasks, setDailyTasks} = useContext(AppContext)

    const priorityClassname = classnames({
        [styles.priority]: true,
        [styles[task?.priority]]: true
    })

    const statusClassname = classnames({
        [styles.bottomStatus]: true,
        [styles[task?.status]]: true
    })

    console.log(task)
    console.log(dailyTasks)

    const statuses = {
        1:
            {
                text: 'В ожидании',
                logo: <Waiting/>
            },
        2: {
                text: 'В пути',
                logo: <Waiting/>
            },
        3:
            {
                text: 'В работе',
                logo: <Process/>
            },
        4:
            {
                text: 'Завершена',
                logo: <Closed/>
            },

    }

    const handleButtonClick = () => {
        setDailyTasks((prev) =>
            prev.map(item =>
                item.id === task.id
                    ? {...task, status: statusChanger[task.status].nextStatus}
                    : item))
        task.status = statusChanger[task.status].nextStatus
    }

    return (
        <Modal closeModal={closePopup}>
            <div className={styles.popup}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>{task.name}</h2>
                    <div className={styles.statuses}>
                        <span className={styles.statusWrapper}><img className={styles.status} src={status[task.status]} alt='Статус.'/></span>
                        <div className={priorityClassname}>
                            <Alert/>
                            <span>{`Приоритет ${priorities[task.priority]}`}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <p className={styles.point}>Точка прибытия:</p>
                    <p className={styles.address}>{task.branch.address}</p>
                    <div className={styles.timeWrapper}>
                        <p className={styles.time}>Время выполнения: <span className={styles.timer}>{`${task.time} ${getDeclension(task.time, ['час', 'часа', 'часов'])}`}</span></p>
                    </div>
                    <button className={styles.routeButton} onClick={handleMapButton}>
                        <Map/>
                        Маршрут на карте
                    </button>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.timerWrapper}>
                        <div className={styles.bottomStatusWrapper}>
                            {statuses[task.status].logo}
                            <span className={statusClassname}>{statuses[task.status].text}</span>
                        </div>
                        <span className={styles.timeLeft}>Осталось: 2 часа</span>
                    </div>
                    {
                        task.status !== 4 && !isNoButton &&
                        <Button
                            onClick={handleButtonClick}
                        >
                            {statusChanger[task.status].text}
                        </Button>
                    }
                </div>
            </div>
        </Modal>
    );
};

export default TaskPopup;