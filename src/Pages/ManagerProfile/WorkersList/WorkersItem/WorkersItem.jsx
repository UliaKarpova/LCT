// import { Link } from 'react-router-dom';
import senor from '../../../../images/senor.png'
import midl from '../../../../images/midl.png'
import junior from '../../../../images/junior.png'
// import editIcon from '../../../../images/edit.svg'
// import deleteIcon from '../../../../images/delete.svg'
// import eye from '../../../../images/eye-off-gray.svg'
// import dots from '../../../../images/dots.png'
// import i from '../../../../images/i.png'
import './WorkersItem.css'
// import { useState } from 'react'
import WorkerTask from './WorkerTask/WorkerTask'
import More from '../../../../components/ui/More/More'

function WorkersItem({ user }) {
  // const [openEdit, setOpenEdit] = useState(false)
  const gradeImg = user['Грейд'] === "Синьор" ? senor 
    : user['Грейд'] === "Мидл" ? midl : user['Грейд'] === 3 ? "Джун" : junior;

  // const openWorkerEdit = (e) => {
  //   setOpenEdit(!openEdit);
  // }

  return (
    <div className='worker'>
      <div className='worker_header'>
        <img src={user.avatar} alt='Фото сотрудника' className='worker_avatar' />
        <div className='worker_info'>
          <h4 className='worker_name'>{user['ФИО']}</h4>
          <img className='worker_grade' src={gradeImg} alt='Грейд сотрудника' />
        </div>
        <More />
        {/* <div className='worker_edit'>
          <button className='worker_more'>
            <img className='worker_i' src={i} alt='Восклицательный знак' />
            Подробнее</button>
          <button className='workers_dots' onClick={openWorkerEdit}>
            {openEdit && (<ul className='edit_menu'>
              <li className='edit-item'><img className='icon' src={editIcon} />Редактировать данные</li>
              <li className='edit-item'><img className='icon' src={eye} />Скрыть</li>
              <li className='edit-item'><img className='icon' src={deleteIcon} />Удалить</li>
            </ul>)}
          </button>
          
        </div> */}

      </div>
      <ul className='worker_tasks'>
        {user.assigned_offices.map((task, index) => {
          return <li key={index} className='task_li'><WorkerTask task={task} /></li>
        })

        }
      </ul>
    </div>

    // <header className='header'>
    //   <img className='header_logo'
    //     src={logo}
    //     alt='Логотип Совкомбанка' />
    //   <menu className="menu">
    //     <Link to='monitoring' className='menu_link'>Мониторинг</Link>
    //     <Link to='departments' className='menu_link'>Отделения и партнёры</Link>
    //     <Link to='workers' className='menu_link active'>Сотрудники</Link>
    //   </menu>
    //   <div className='user'>
    //     <img className='user_avatar' src={avatar} alt='Аватар пользователя' />
    //     <div className='user_info'>
    //       <h4 className='user_name'>Александр Новиков</h4>
    //       <span className='user_role'>Менеджер</span>
    //     </div>
    //     <button className='more' type='button'></button>
    //   </div>


    // </header>
  )
}

export default WorkersItem
