import classnames from "classnames";
import styles from "./Button.module.css";

const Button = (props) => {
  const { className = "", children, ...rest } = props;

  const buttonClass = classnames({
    [className]: true,
    [styles.button]: true,
  });

  return (
    <button type="button" className={buttonClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
