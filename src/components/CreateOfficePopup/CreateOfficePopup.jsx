import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal.jsx";
import styles from "../CreateUserPopup/CreateUserPupup.module.css";
import Input from "../ui/Input/Input.jsx";
import Button from "../ui/Button/Button.jsx";
import { getCoordinates } from "../../utils/api.js";

const CreateOfficePopup = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const res = await getCoordinates(data.address);
      const postBody = { ...data, coordinates: res };
      console.log(postBody);
      closeModal();
      reset();
    } catch (err) {
      console.log(`Произошла ошибка ${err}`);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.container}>
        <h2 className={styles.title}>Добавить отделение</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            placeholder="Адрес отделения"
            {...register("address", {
              required: "Поле обязательно",
            })}
            hasError={Boolean(errors.login)}
            errorMessage={errors.login?.message}
          />
          <Button type="submit">Создать отделение</Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateOfficePopup;
