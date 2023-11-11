import {forwardRef, useState} from "react";
import classnames from "classnames";
import styles from "./Input.module.css";

const InputField = forwardRef(
  (props, ref) => {
    const { labelId = "", forPassword = false,  hasError, errorMessage, disabled, ...rest } = props;

    const [isVisible, setVisible] = useState(false)

    const inputClassName = classnames({
      [styles.input]: true,
      [styles.inputError]: hasError,
      [styles.disabled]: disabled,
    });

    return (
      <div className={styles.inputWrapper}>
        <input
          {...(labelId && { id: labelId })}
          className={inputClassName}
          ref={ref}
          type={!isVisible ? 'password' : 'text'}
          {...rest}
        />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        {forPassword && <button type='button' onClick={() => setVisible(!isVisible)} className={styles.eyeButton}></button>}
      </div>
    );
  },
);

export default InputField;
