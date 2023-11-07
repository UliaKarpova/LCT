import logo from '../../images/logo.png'
import allert from '../../images/allert.svg'
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Input/Input.jsx";
import './Auth.css'

function Auth() {
  return (
    <div class='auth'>
      <img class='logo'
        src={logo}
        alt='Логотип Совкомбанка' />
      <h1 class='title'>Авторизация</h1>
      <form class='form'>
        <Input style={{ with: '100%' }} placeholder='Логин' />
        <Input placeholder='Пароль' forPassword />
        <div class='warning'>
          <img class='warning_img'
            src={allert}
            alt='Восклицательный знак' />
          <span class='warning_text'>
            Для регистрации в приложении<br />обратитесь к менеджеру
          </span>
        </div>
        <Button style={{marginTop: 'auto'}}>Войти</Button>

      </form>

    </div>
  )
}

export default Auth
