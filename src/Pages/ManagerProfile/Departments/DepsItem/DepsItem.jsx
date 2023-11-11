import "./DepsItem.css";
import good from "../../../../images/taskStatus.png";
import bad from "../../../../images/taskStatusErr.png";
import inWork from "../../../../images/inWork.png";
import processing from "../../../../images/processing.png";
import done from "../../../../images/done.png";
import inWay from "../../../../images/inWay.png";
import More from "../../../../components/ui/More/More";

function DepsItem({ dep }) {
  const src = dep["Карты и материалы доставлены?"] === "да" ? good : bad;

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

  return (
    <>
      <div className="dep_header">
        <span className="dep_number">№ {dep["№ точки"]}</span>
        <div className="dep_info">
          <span className="dep_address">
            {dep["Адрес точки, г. Краснодар"]}
          </span>
          <img className="dep_status" src={src} alt="Статус" />
        </div>
        <More />
      </div>
      {dep.employee_info.length > 0 && (
        <table className="dep_list">
          <thead className="table_hd">
            <tr className="table_row">
              <th className="table_th">Задача</th>
              <th className="table_th">Исполнитель</th>
              <th className="table_th">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr className="dep_row">
              <td className="dep_cell">
                {dep.employee_info[0].PriorityReason}
              </td>
              <td className="dep_cell">
                <img src={dep.avatar} className="dep_avatar" alt="Аватар" />
                {dep.employee_info[0]["ФИО"]}
              </td>
              <td className="dep_cell">
                <img
                  className="dep_cell_img"
                  src={getSrc(dep.employee_info[0])}
                  alt="Статус задачи"
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default DepsItem;
