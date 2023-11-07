import {useState} from "react";
import TabButton from "../TabButton/TabButton.jsx";
import styles from './TabPanel.module.css';
import classnames from "classnames";

const TabPanel = (props) => {
    const {
        className = '',
        setOption,
        tabs
    } = props

    const [active, setActive] = useState(1)

    const TabButtonClass = classnames({
        [className]: true,
        [styles.panel]: true,
    });

    return (
        <div className={TabButtonClass}>
            {tabs.map((tab) =>
                <TabButton key={tab.id}
                           isActive={active === tab.id}
                           onClick={() => {
                               setActive(tab.id);
                               setOption(tab.id)
                           }}
                >{tab.title}
                </TabButton>)
            }

        </div>
    );
};

export default TabPanel;