import logo from '../../images/logo.png'
import allert from '../../images/allert.svg'
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import './Auth.css'
import {useForm} from "react-hook-form";
import api from "../../utils/api.js";
import {useContext, useEffect} from "react";
import {AppContext} from "../../context/index.js";
import {useNavigate} from "react-router-dom";
import {setCookie} from "../../utils/helpers.js";

function Auth() {
    const navigate = useNavigate()

    const {user, setUser} = useContext(AppContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: "onChange" });

    const onSubmit = async (data) => {
        try {
            const res = await api.login(data)
            const user = await res.json()
            await setUser(user)
            setCookie("userId", user.role === 'worker' ? user._id : 'admin')
            reset()
        }
        catch (err) {
            console.log(`Произошла ошибка: ${err}`)
        }
    }


    useEffect(() => {
        if (user) {
            navigate(user.role === 'worker' ? 'worker' : 'manager/workers')
        }
    }, [user, navigate]);

  return (
      <>
          <div className='auth'>
              <img className='logo'
                   src={logo}
                   alt='Логотип Совкомбанка' />
              <h1 className='title'>Авторизация</h1>
              <form className='form' onSubmit={handleSubmit(onSubmit)}>
                  <Input
                      placeholder='Логин'
                      {...register("username", {
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
                  <Button type='submit' className='bottom'>Войти</Button>
              </form>
          </div>
      </>
  )
}

export default Auth
