import logo from '../../images/logo.png'
import allert from '../../images/allert.svg'
import Button from "../../components/ui/Button/Button.jsx";
import Input from "../../components/ui/Input/Input.jsx";
import './Auth.css'
import CreateUserPopup from "../../components/CreateUserPopup/CreateUserPopup.jsx";
import {useState} from "react";
import {useForm} from "react-hook-form";

function Auth() {
    const [isPopupVisible, setIsPopupVisible] =useState(false)

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
      <>
          <div className='auth' onSubmit={handleSubmit(onSubmit)}>
              <img className='logo'
                   src={logo}
                   alt='Логотип Совкомбанка' />
              <h1 className='title'>Авторизация</h1>
              <form className='form'>
                  <Input
                      placeholder='Логин'
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
                      placeholder='Пароль'
                      forPassword
                      {...register("password", {
                          required: 'Поле обязательно',
                          minLength: {
                              value: 8,
                              message: 'Минимум 8 символов'
                          }
                      })}
                      hasError={Boolean(errors.password)}
                      errorMessage={errors.password?.message}
                  />
                  <div className='warning'>
                      <img className='warning_img'
                           src={allert}
                           alt='Восклицательный знак' />
                      <span className='warning_text'>
            Для регистрации в приложении<br />обратитесь к менеджеру
          </span>
                  </div>
                  <Button type='button' className='bottom' onClick={() => setIsPopupVisible(true)}>Войти</Button>
              </form>
          </div>
          {isPopupVisible && <CreateUserPopup closeModal={() => setIsPopupVisible(false)}/>}
      </>
  )
}

export default Auth
