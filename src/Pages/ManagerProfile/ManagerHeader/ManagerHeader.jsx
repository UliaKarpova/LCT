import { Link } from "react-router-dom";
import LogoutButton from "../../../components/LogoutButton/LogoutButton";
import logo from "../../../images/logo.png";
import avatar from "../../../images/photo.jpg";
import "./ManagerHeader.css";

function ManagerHeader(pathname) {
  return (
    <header className="header">
      <img className="header_logo" src={logo} alt="Логотип Совкомбанка" />
      <menu className="menu">
        <Link
          to="/manager/monitoring"
          className={
            pathname.path === "/manager/monitoring"
              ? "menu_link active"
              : "menu_link"
          }
        >
          Мониторинг
        </Link>
        <Link
          to="/manager/departments"
          className={
            pathname.path === "/manager/departments"
              ? "menu_link active"
              : "menu_link"
          }
        >
          Отделения и партнёры
        </Link>
        <Link
          to="/manager/workers"
          className={
            pathname.path === "/manager/workers"
              ? "menu_link active"
              : "menu_link"
          }
        >
          Сотрудники
        </Link>
      </menu>
      <div className="user">
        <img className="user_avatar" src={avatar} alt="Аватар пользователя" />
        <div className="user_info">
          <h4 className="user_name">Александр Новиков</h4>
          <span className="user_role">Менеджер</span>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}

export default ManagerHeader;
