import styles from './WorkerProfile.module.css';
import Logo from '../../assets/images/icons/Logo.svg?react';
import users from '../../data/lct.users.json'
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import RoutePopup from "../../components/RoutePopup/RoutePopup.jsx";
import {AppContext} from "../../context/index.js";

const WorkerProfile = () => {
    const [isVisiblePopup, setIsVisiblePopup] = useState(false)
    const { user, setUser, dailyTasks, setDailyTasks } = useContext(AppContext)

    useEffect(() => {
        setUser(users[0])
        if (!dailyTasks) {
            setDailyTasks(users[0].tasks)
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.name}>Никита В.</span>
                <span className={styles.logo}><Logo/></span>
            </div>
            <div>
                <h2 className={styles.title}>Задачи на день</h2>
                <ul className={styles.taskContainer}>
                    {dailyTasks && dailyTasks.map((task, index) =>
                        <li key={index}><TaskCard number={index + 1} task={task}/></li>
                    )}
                </ul>

            </div>
            <Button onClick={() => setIsVisiblePopup(true)}>Посмотреть маршрут</Button>
            {isVisiblePopup && <RoutePopup
                closeModal={() => setIsVisiblePopup(false)}
                nativeBranchLocation={user.nativeBranch.location}
                dailyTasks={dailyTasks}
                patchDailyTasks={setDailyTasks}
            />}
        </div>
    );
};

export default WorkerProfile;