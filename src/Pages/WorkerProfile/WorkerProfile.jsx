import Mapgl from "../../components/MapGl/Mapgl.jsx";
import styles from './WorkerProfile.module.css';
import Logo from '../../assets/images/icons/Logo.svg?react';
import users from '../../data/lct.users.json'
import WorkerTask from "../../components/WorkerTask/WorkerTask.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";

const WorkerProfile = () => {
    console.log(users[0].tasks)

    const tasks = users[0].tasks

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.name}>Никита В.</span>
                <span className={styles.logo}><Logo/></span>
            </div>
            <div>
                <h2 className={styles.title}>Задачи на день</h2>
                <ul className={styles.taskContainer}>
                    {tasks.map((task, index) =>
                        <li key={index}><TaskCard number={index + 1} task={task}/></li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default WorkerProfile;