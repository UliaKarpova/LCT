import logo from '../../images/logo.png'
import allert from '../../images/allert.svg'
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import './Auth.css'
import CreateUserPopup from "../.../../../components/CreateUserPopup/CreateUserPopup";
import {useState} from "react";
import {useForm} from "react-hook-form";
import CreateOfficePopup from "../../components/CreateOfficePopup/CreateOfficePopup.jsx";

function Auth() {
    const [isPopupVisible, setIsPopupVisible] =useState(false)

    console.log(isPopupVisible)

  return (
      <>
          <div className='auth'>
              <img className='logo'
                   src={logo}
                   alt='Логотип Совкомбанка' />
              <h1 className='title'>Авторизация</h1>
              <form className='form'>
                  <Input style={{ with: '100%' }} placeholder='Логин' />
                  <Input placeholder='Пароль' forPassword />
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
          {isPopupVisible && <CreateOfficePopup closeModal={() => setIsPopupVisible(false)}/>}
      </>
  )
}

export default Auth
