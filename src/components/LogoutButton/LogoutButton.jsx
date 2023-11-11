import { useContext } from "react";
import { deleteCookie } from "../../utils/helpers.js";
import Exit from "../../assets/images/icons/Exit.svg?react";
import { AppContext } from "../../context/index.js";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const { setUser } = useContext(AppContext);

  const logout = () => {
    deleteCookie("userId");
    setUser(null);
  };

  return (
    <button className={styles.button} type="button" onClick={logout}>
      <Exit />
    </button>
  );
};

export default LogoutButton;
