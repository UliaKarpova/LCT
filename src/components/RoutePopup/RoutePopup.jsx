import Modal from "../Modal/Modal.jsx";
import styles from "./RoutePopup.module.css";
import Mapgl from "../MapGl/Mapgl.jsx";
import Location from "../../assets/images/icons/Location.svg?react";
import classnames from "classnames";
import Button from "../ui/Button/Button.jsx";
import { useContext, useState } from "react";
import Waiting from "../../assets/images/icons/waiting.svg?react";
import Processing from "../../assets/images/icons/processing.svg?react";
import Done from "../../assets/images/icons/processing.svg?react.svg?react";
import {createUserObject, getDeclension} from "../../utils/helpers.js";
import { AppContext } from "../../context/index.js";
import { statusChanger } from "../../utils/constants.js";
import Timer from "../Timer/Timer.jsx";
import api from "../../utils/api.js";

const RoutePopup = ({ closeModal, nativeBranchLocation }) => {
  const { user, dailyTasks, setDailyTasks } = useContext(AppContext);

  const lastDoneLocation =
    dailyTasks.findLast((task) => task.status === 4 || task.status === 3)
      ?.branch.location || nativeBranchLocation;
  const tasksToDoLocations = dailyTasks
    .filter((task) => task.status !== 4)
    .map((task) => task.branch.location);
  const taskToDo = dailyTasks.find((task) => task.status !== 4);
  const points = [lastDoneLocation, ...tasksToDoLocations];

  const [refreshKey, setRefreshKey] = useState(1);
  function refreshMap() {
    setRefreshKey((oldKey) => oldKey + 1);
  }

  const statusClassname = classnames({
    [styles.status]: true,
    [styles[taskToDo?.status]]: true,
  });

  const status = {
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
      logo: <Processing />,
    },
    4: {
      text: "Завершена",
      logo: <Done />,
    },
  };

  const handleButtonClick = async () => {
    try {
      await api.updateStatus(
          user.id,
          taskToDo.id,
          statusChanger[taskToDo.status].nextStatus,
      );

      const updatedRes = await api.getUser(user.id);
      const updatedData = await updatedRes.json();

      setDailyTasks(createUserObject(updatedData).tasks);

      refreshMap();

    } catch (err) {
      console.log(`Произошла ошибка: ${err}`);
    }

  };

  return (
    <Modal closeModal={closeModal} leftIcon>
      <div className={styles.popup}>
        <Mapgl center={lastDoneLocation} points={points} key={refreshKey} />
        <div className={styles.wrapper}>
          {taskToDo ? (
            <div className={styles.cockpit}>
              <div className={styles.topWrapper}>
                <h2 className={styles.title}>{taskToDo.name}</h2>
                <p className={styles.time}>
                  Время выполнения:{" "}
                  <span className={styles.timer}>{`${
                    taskToDo.time
                  } ${getDeclension(taskToDo.time, [
                    "час",
                    "часа",
                    "часов",
                  ])}`}</span>
                </p>
              </div>
              <div className={styles.bottomWrapper}>
                <div className={styles.timeWrapper}>
                  <div className={styles.statusWrapper}>
                    {status[taskToDo.status].logo}
                    <span className={statusClassname}>
                      {status[taskToDo.status].text}
                    </span>
                  </div>
                  <Timer task={taskToDo} />
                </div>
                <div className={styles.buttonWrapper}>
                  {taskToDo.status === 2 && (
                    <div className={styles.onWay}>
                      <Location />
                      <span>Вы в пути</span>
                    </div>
                  )}
                  <Button onClick={handleButtonClick}>
                    {statusChanger[taskToDo.status].text}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className={styles.success}>Все задачи на сегодня выполнены</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RoutePopup;
