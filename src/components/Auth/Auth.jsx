import logo from '../../images/logo.png'
import allert from '../../images/allert.svg'
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Input/Input.jsx";
import './Auth.css'
import CreateUserPopup from "../CreateUserPopup/CreateUserPopup.jsx";
import {useState} from "react";

function Auth() {
    const [isPopupVivible, setIsPopupVisible] =useState(false)

  return (
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
        <Button className='bottom'>Войти</Button>
      </form>

    </div>
  )
}

export default Auth
