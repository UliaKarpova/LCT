import "./Monitoring.css";
import ManagerPanel from "../ManagerPanel/ManagerPanel";
import api from "../../../utils/api";
import inWork from "../../../images/inWork.png";
import processing from "../../../images/processing.png";
import done from "../../../images/done.png";
import inWay from "../../../images/inWay.png";
import { useState, useEffect } from "react";
import face1 from "../../../images/face1.png";
import face2 from "../../../images/face2.png";
import face3 from "../../../images/face3.png";

function Monitoring() {
  const [tasks, setTasks] = useState([]);
  const [ofs, setOfs] = useState([]);

  function getSrc(task) {
    return task.status === 1
      ? processing
      : task.status === 2
      ? inWay
      : task.status === 3
      ? inWork
      : task.status === 4
      ? done
      : processing;
  }

  useEffect(() => {
    api.getTasksStatus().then((res) => {
      setTasks(res);
    });
  }, []);

  useEffect(() => {
    api.getOffices().then((res) => {
      setOfs(res);
    });
  }, []);

  return (
    <main className="main">
      <ManagerPanel
        title="Ежедневный мониторинг"
        btnText="Редактировать распределение"
        placeholderText="Поиск по задачам"
        /*onClick={onAddWorker}*/
      />
      <div className="all_tasks">
        <div className="all_tasks_cell">
          <span style={{ color: "#0B0F14" }} className="number">
            {tasks.total_tasks}
          </span>
          <span className="caption">Всего задач</span>
        </div>
        <div className="all_tasks_cell">
          <span style={{ color: "#5AA300" }} className="number">
            {tasks.done_tasks}
          </span>
          <span className="caption">Завершены</span>
        </div>
        <div className="all_tasks_cell">
          <span style={{ color: "#003791" }} className="number">
            {tasks.in_progress_tasks}
          </span>
          <span className="caption">В работе</span>
        </div>
        <div className="all_tasks_cell">
          <span style={{ color: "#40474F" }} className="number">
            {tasks.waiting_tasks}
          </span>
          <span className="caption">Ожидают выполнения</span>
        </div>
      </div>

      <table className="of_list">
        <thead className="of_hd">
          <tr className="of_row">
            <th className="of_th">Задача</th>
            <th className="of_th">Исполнитель</th>
            <th className="of_th">Приоритет</th>
            <th className="of_th">Статус</th>
          </tr>
        </thead>
        <tbody>
          {ofs.map((of, index) => {
            if (of.employee_info.length > 0) {
              of.employee_info[0].avatar =
                index === 0 || index === 3 || index === 6
                  ? face1
                  : index === 1 || index === 4 || index === 7
                  ? face2
                  : face3;
              return (
                <tr key={of._id} className="of_row">
                  <td className="of_cell">
                    {of.employee_info[0].PriorityReason}
                  </td>
                  <td className="of_cell">
                    <img
                      className="cell_avatar"
                      src={of.employee_info[0].avatar}
                      alt="Аватар"
                    />
                    {of.employee_info[0]["ФИО"]}
                  </td>
                  <td className="of_cell">{of.employee_info[0].priority}</td>
                  <td className="of_cell">
                    <img
                      className="cell_img"
                      src={getSrc(of.employee_info[0])}
                      alt="Статус задачи"
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Monitoring;
