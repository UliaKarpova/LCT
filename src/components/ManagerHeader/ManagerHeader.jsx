import logo from '../../images/logo.png'
import allert from '../../images/allert.svg'
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Input/Input.jsx";
import './ManagerHeader.css'

function ManagerHeader() {
  return (
    <header class='header'>
      <img class='logo'
        src={logo}
        alt='Логотип Совкомбанка' />
      <menu class="menu">
        <li class='menu_item'><a class='menu_link' href="#">Мониторинг</a></li>
        <li class='menu_item'><a class='menu_link' href="#">Отделения и партнёры</a></li>
        <li class='menu_item'><a class='menu_link' href="#">Сотрудники</a></li>
      </menu>
      <div class='user'>
        <img class='user_avatar' src='#' alt='Аватар пользователя' />
        <div class='user_info'>
          <h4 class='user_name'>Александр Новиков</h4>
          <span class='user_role'>Менеджер</span>
        </div>
        <button class='more' type='button'></button>
      </div>


    </header>
  )
}

export default ManagerHeader
