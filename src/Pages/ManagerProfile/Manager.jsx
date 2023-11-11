import "./Manager.css";
import { useLocation } from "react-router-dom";
import ManagerHeader from "./ManagerHeader/ManagerHeader";
import WorkersList from "./WorkersList/WorkersList";
import Departments from "./Departments/Departments";
import Monitoring from "./Monitoring/Monitoring";

function Manager() {
  const { pathname } = useLocation();

  const activeComponent = () => {
    switch (pathname) {
      case "/manager/workers":
        return <WorkersList />;
      case "/manager/departments":
        return <Departments />;
      case "/manager/monitoring":
        return <Monitoring />;
      default:
        return "";
    }
  };
  return (
    <>
      <ManagerHeader path={pathname} />
      {activeComponent()}
    </>
  );
}

export default Manager;
