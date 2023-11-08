import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import avatar from '../../images/photo.jpg'
import './ManagerHeader.css'

function ManagerHeader() {
  return (
    <header className='header'>
      <img className='header_logo'
        src={logo}
        alt='Логотип Совкомбанка' />
      <menu className="menu">
        <Link to='monitoring' className='menu_link'>Мониторинг</Link>
        <Link to='departments' className='menu_link'>Отделения и партнёры</Link>
        <Link to='workers' className='menu_link active'>Сотрудники</Link>
      </menu>
      <div className='user'>
        <img className='user_avatar' src={avatar} alt='Аватар пользователя' />
        <div className='user_info'>
          <h4 className='user_name'>Александр Новиков</h4>
          <span className='user_role'>Менеджер</span>
        </div>
        <button className='more' type='button'></button>
      </div>


    </header>
  )
}

export default ManagerHeader
