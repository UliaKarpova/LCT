import styles from "../TaskPopup/TaskPopup.module.css";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/index.js";
import {getDeclension} from "../../utils/helpers.js";

const Timer = (currentTask) => {
    const {user} = useContext(AppContext);

    const [time, setTime] = useState(currentTask.task.time * 3600000)

    const startedAt = user.tasks.find(task => task.id === currentTask.task.id).startedAt

    useEffect(() => {
        let timer;
        if (startedAt) {
            timer = setInterval(() => setTime(new Date() - startedAt), 1000);
        }
        return () => clearInterval(timer);
    }, [startedAt]);

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))

    return (
        <span className={styles.timeLeft}>Осталось: {`${hours} ${getDeclension(hours, ['час', 'часа', 'часов'])} ${minutes} мин`}</span>
    );
};

export default Timer;