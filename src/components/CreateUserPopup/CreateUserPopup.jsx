import {useState} from 'react';
import TabPanel from "../ui/TabPanel/TabPanel.jsx";
import styles from './CreateUserPupup.module.css'
import Input from "../ui/Input/Input.jsx";
import Button from "../ui/Button/Button.jsx";
import {useForm} from "react-hook-form";
import Modal from "../Modal/Modal.jsx";

const userRole = [
    {id: 1, title: 'Менеджер'},
    {id: 2, title: 'Сотрудник'}
]

const workerGrade = [
    {id: 1, title: 'Джун'},
    {id: 2, title: 'Мидл'},
    {id: 3, title: 'Синьор'}
]

const CreateUserPopup = ({closeModal}) => {
    const [role, setRole] = useState(1)
    const [grade, setGrade] = useState(1)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

    return (
        <Modal closeModal={closeModal}>
                <>
                    <h2 className={styles.title}>Создать пользователя</h2>
                    <TabPanel tabs={userRole} setOption={setRole}/>
                    {role === 2 &&<TabPanel tabs={workerGrade} setOption={setGrade}/>}
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input
                            placeholder='Логин сотрудника'
                            {...register("login", {
                                required: 'Поле обязательно',
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа'
                                }
                            })}
                            hasError={Boolean(errors.login)}
                            errorMessage={errors.login?.message}
                        />
                        <Input
                            placeholder='Придумайте пароль'
                            forPassword
                            {...register("password", {
                                required: 'Поле обязательно',
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 8 символов'
                                }
                            })}
                            hasError={Boolean(errors.password)}
                            errorMessage={errors.password?.message}
                        />
                        <Button type='submit'>Создать пользователя</Button>
                    </form>
                </>
        </Modal>

    );
};

export default CreateUserPopup;