
import face1 from '../../../images/face1.png'
import face2 from '../../../images/face2.png'
import face3 from '../../../images/face3.png'
import ManagerPanel from '../ManagerPanel/ManagerPanel'
import WorkersItem from './WorkersItem/WorkersItem';
import CreateUserPopup from '../../../components/CreateUserPopup/CreateUserPopup'
import './WorkersList.css'
// import users from '../../../data/lct.users.json'
import api from '../../../utils/api'
import { useState } from 'react';
import { useEffect } from 'react';
function WorkersList() {
  const [users, setUsers] = useState([])
  const [isPopupCreateUserOpen, setIsPopupCreateUserOpen] = useState(false)
    useEffect(() => {
    api.getEmployees().then((res) => {
      setUsers(res)
      data = res
    })
  }, [])
  console.log(users)
function onAddWorker() {
  setIsPopupCreateUserOpen(!isPopupCreateUserOpen)
}

  return (
    <main className='main'>
      {isPopupCreateUserOpen && <CreateUserPopup closeModal={onAddWorker}/>}
      {/* <h2 className='title'>Мои сотрудники</h2>
      <div className='panel'>
        <input disabled className='panel_finder' placeholder='Поиск по сотрудникам' />
        <img src={search} alt='Лупа' className='finder_img' /> */}
        <ManagerPanel title='Мои сотрудники' 
          btnText='Добавить сотрудника' 
          placeholderText='Поиск по сотрудникам'
          onClick={onAddWorker}>
          <select disabled className='grade_select'>
            <option className='grade placeholder' defaultValue=''>Грейд</option>
            <option className='grade' value='1'>Синьор</option>
            <option className='grade' value='2'>Мидл</option>
            <option className='grade' value='3'>Джун</option>
          </select>
        </ManagerPanel>
        
        {/* <button type='button' className='panel_add_btn'>
          <img src={plus} className='plus' />Добавить сотрудника</button>
      </div> */}
      <ul className='workers_list'>
        {users.map((user, index) => {
          user.avatar = index === 0 || index === 3 || index === 6 ? face1
            : index === 1 || index === 4 || index === 7 ? face2
              : face3;
          return <li key={user._id.$oid}><WorkersItem user={user} /></li>
        })}
      </ul>

    </main>
  )
}

export default WorkersList
