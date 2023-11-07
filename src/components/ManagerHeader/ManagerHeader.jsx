import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import avatar from '../../images/photo.jpg'
import './ManagerHeader.css'

function ManagerHeader() {
  return (
    <header class='header'>
      <img class='header_logo'
        src={logo}
        alt='Логотип Совкомбанка' />
      <menu class="menu">
        <Link to='monitoring' class='menu_link'>Мониторинг</Link>
        <Link to='departments' class='menu_link'>Отделения и партнёры</Link>
        <Link to='workers' class='menu_link active'>Сотрудники</Link>
      </menu>
      <div class='user'>
        <img class='user_avatar' src={avatar} alt='Аватар пользователя' />
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
