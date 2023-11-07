import search from '../../images/search.svg'
import plus from '../../images/plus.svg'

import ManagerHeader from '../ManagerHeader/ManagerHeader';
import './WorkersList.css'

function WorkersList() {
  return (
    <>
      <ManagerHeader />
      <main class='workers'>

        <h2 class='workers_title'>Мои сотрудники</h2>
        <div class='panel'>
          <input className='panel_finder' placeholder='Поиск по сотрудникам' />
          <img src={search} alt='Лупа' className='finder_img' />
          <select className='grade_select'>
            <option className='grade placeholder' value selected>Грейд</option>
            <option className='grade' value='1'>Синьор</option>
            <option className='grade' value='2'>Мидл</option>
            <option className='grade' value='3'>Джун</option>
          </select>
          <button type='button' className='panel_add_worker_btn'>
            <img src={plus} className='plus' />Добавить сотрудника</button>
        </div>
      </main>

      {/* <img class='logo'
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

      </form> */}

    </>
  )
}

export default WorkersList
