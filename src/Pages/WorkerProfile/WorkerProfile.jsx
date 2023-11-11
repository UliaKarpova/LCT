import styles from './WorkerProfile.module.css';
import Logo from '../../assets/images/icons/Logo.svg?react';
import users from '../../data/lct.users.json'
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import RoutePopup from "../../components/RoutePopup/RoutePopup.jsx";
import {AppContext} from "../../context/index.js";
import TaskPopup from "../../components/TaskPopup/TaskPopup.jsx";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";

const WorkerProfile = () => {
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [detailedTask, setDetailedTask] = useState(null)
    const { user, dailyTasks, setDailyTasks } = useContext(AppContext)

    useEffect(() => {
        if (!dailyTasks) {
            setDailyTasks(user.tasks)
        }
    });

    const nextTask = dailyTasks?.find(task => task.status !== 4);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.name}>Никита В.</span>
                <LogoutButton/>
            </div>
            <div>
                <h2 className={styles.title}>Задачи на день</h2>
                <ul className={styles.taskContainer}>
                    {dailyTasks && dailyTasks.map((task, index) =>
                        <li className={styles.cardWrapper} key={index}><TaskCard number={index + 1} task={task} onClick={() => setDetailedTask(task)}/></li>
                    )}
                </ul>

            </div>
            <Button className={styles.button} onClick={() => setIsVisibleMap(true)}>Посмотреть маршрут</Button>
            {isVisibleMap && <RoutePopup
                closeModal={() => setIsVisibleMap(false)}
                nativeBranchLocation={user.nativeBranch.location}
            />}
            {detailedTask && <TaskPopup
                setTask={setDetailedTask}
                task={detailedTask}
                closePopup={() => setDetailedTask(null)}
                handleMapButton={() => {
                    setDetailedTask(null);
                    setIsVisibleMap(true)
                }}
                isNoButton={detailedTask.id !== nextTask?.id}
            />}
        </div>
    );
};

export default WorkerProfile;