import classnames from "classnames";
import styles from "./TabButton.module.css";

const TabButton = (props) => {
    const {
        className = "",
        children,
        isActive,
        ...rest
    } = props;

    const TabButtonClass = classnames({
        [className]: true,
        [styles.button]: true,
        [styles.active]: isActive
    });

    return (
        <button className={TabButtonClass} {...rest}>
            {children}
        </button>
    );
};

export default TabButton;