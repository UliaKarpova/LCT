import Modal from "../Modal/Modal.jsx";
import styles from "./TaskPopup.module.css";
import Done from "../../images/done.png";
import InWork from "../../images/inWork.png";
import Processing from "../../images/processing.png";
import OnWay from "../../images/inWay.png";
import Alert from "../../assets/images/icons/Ellipse-Allert.svg?react";
import Map from "../../assets/images/icons/Map.svg?react";
import classnames from "classnames";
import { createUserObject, getDeclension } from "../../utils/helpers.js";
import Waiting from "../../assets/images/icons/waiting.svg?react";
import Process from "../../assets/images/icons/processing.svg?react";
import Closed from "../../assets/images/icons/Ellipse-check.svg?react";
import Button from "../ui/Button/Button.jsx";
import { useContext } from "react";
import { AppContext } from "../../context/index.js";
import { statusChanger } from "../../utils/constants.js";
import api from "../../utils/api.js";
import Timer from "../Timer/Timer.jsx";

const priorities = {
  HighPriority: "высокий",
  MediumPriority: "средний",
  LowPriority: "низкий",
};

const status = {
  1: Processing,
  2: OnWay,
  3: InWork,
  4: Done,
};
const TaskPopup = ({ task, closePopup, handleMapButton, isNoButton }) => {
  const { user, setDailyTasks } = useContext(AppContext);

  const priorityClassname = classnames({
    [styles.priority]: true,
    [styles[task?.priority]]: true,
  });

  const statusClassname = classnames({
    [styles.bottomStatus]: true,
    [styles[task?.status]]: true,
  });

  const statuses = {
    1: {
      text: "В ожидании",
      logo: <Waiting />,
    },
    2: {
      text: "В пути",
      logo: <Waiting />,
    },
    3: {
      text: "В работе",
      logo: <Process />,
    },
    4: {
      text: "Завершена",
      logo: <Closed />,
    },
  };

  const handleButtonClick = async () => {
    try {
      const update = await api.updateStatus(
        user.id,
        task.id,
        statusChanger[task.status].nextStatus,
      );

      const updatedRes = await api.getUser(user.id);
      const updatedData = await updatedRes.json();

      setDailyTasks(createUserObject(updatedData).tasks);

      if (update && updatedData) {
        task.status = statusChanger[task.status].nextStatus;
      }
    } catch (err) {
      console.log(`Произошла ошибка: ${err}`);
    }
  };

  return (
    <Modal closeModal={closePopup}>
      <div className={styles.popup}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{task.name}</h2>
          <div className={styles.statuses}>
            <span className={styles.statusWrapper}>
              <img
                className={styles.status}
                src={status[task.status]}
                alt="Статус."
              />
            </span>
            <div className={priorityClassname}>
              <Alert />
              <span>{`Приоритет ${priorities[task.priority]}`}</span>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <p className={styles.point}>Точка прибытия:</p>
          <p className={styles.address}>{task.branch.address}</p>
          <div className={styles.timeWrapper}>
            <p className={styles.time}>
              Время выполнения:{" "}
              <span className={styles.timer}>{`${task.time} ${getDeclension(
                task.time,
                ["час", "часа", "часов"],
              )}`}</span>
            </p>
          </div>
          <button className={styles.routeButton} onClick={handleMapButton}>
            <Map />
            Маршрут на карте
          </button>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.timerWrapper}>
            <div className={styles.bottomStatusWrapper}>
              {statuses[task.status].logo}
              <span className={statusClassname}>
                {statuses[task.status].text}
              </span>
            </div>
            <Timer task={task} />
          </div>
          {task.status !== 4 && !isNoButton && (
            <Button onClick={handleButtonClick}>
              {statusChanger[task.status].text}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskPopup;
