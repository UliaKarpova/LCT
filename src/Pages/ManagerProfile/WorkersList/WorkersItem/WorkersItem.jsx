import senor from '../../../../images/senor.png'
import midl from '../../../../images/midl.png'
import junior from '../../../../images/junior.png'
import './WorkersItem.css'
import WorkerTask from './WorkerTask/WorkerTask'
import More from '../../../../components/ui/More/More'

function WorkersItem({ user }) {
  const gradeImg = user['Грейд'] === "Синьор" ? senor 
    : user['Грейд'] === "Мидл" ? midl : user['Грейд'] === 3 ? "Джун" : junior;

  return (
    <div className='worker'>
      <div className='worker_header'>
        <img src={user.avatar} alt='Фото сотрудника' className='worker_avatar' />
        <div className='worker_info'>
          <h4 className='worker_name'>{user['ФИО']}</h4>
          <img className='worker_grade' src={gradeImg} alt='Грейд сотрудника' />
        </div>
        <More />
      </div>
      <ul className='worker_tasks'>
        {user.assigned_offices.map((task, index) => {
          return <li key={index} className='task_li'><WorkerTask task={task} /></li>
        })

        }
      </ul>
    </div>
  )
}

export default WorkersItem
