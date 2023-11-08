import search from '../../images/search.svg'
import plus from '../../images/plus.svg'
import face1 from '../../images/face1.png'
import face2 from '../../images/face2.png'
import face3 from '../../images/face3.png'

import ManagerHeader from '../ManagerHeader/ManagerHeader';
import WorkersItem from '../WorkersItem/WorkersItem';
import './WorkersList.css'
import users from '../../data/lct.users.json'

function WorkersList() {

  return (
    <>
      <ManagerHeader />
      <main className='workers'>

        <h2 className='workers_title'>Мои сотрудники</h2>
        <div className='panel'>
          <input disabled className='panel_finder' placeholder='Поиск по сотрудникам' />
          <img src={search} alt='Лупа' className='finder_img' />
          <select disabled className='grade_select'>
            <option className='grade placeholder' value selected>Грейд</option>
            <option className='grade' value='1'>Синьор</option>
            <option className='grade' value='2'>Мидл</option>
            <option className='grade' value='3'>Джун</option>
          </select>
          <button type='button' className='panel_add_worker_btn'>
            <img src={plus} className='plus' />Добавить сотрудника</button>
        </div>
        <ul className='workers_list'>
          {users.map((user, index) => {
            user.avatar = index === 0 || index === 3 || index === 6 ? face1 
              : index === 1 || index === 4 || index === 7 ? face2  
              : face3;
            return <li key={user._id}><WorkersItem user={user} /></li>
          })}
        </ul>

      </main>
    </>
  )
}

export default WorkersList
