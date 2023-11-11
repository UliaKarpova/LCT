import './WorkerTask.css'
// import { useState } from 'react'
import inWork from '../../../../../images/inWork.png'
import waiting from '../../../../../images/processing.png'
import done from '../../../../../images/done.png'
import arrowRight from '../../../../../images/arrowRight.svg'

function WorkerTask({ task }) {
  // const [openEdit, setOpenEdit] = useState(false)
  const statusTag = task.status === 1 ? waiting 
    : task.status === 2 ? inWork : task.status === 3 ? '#'
    : task.status === 4 ? done : '';

  return (
    <div className='task'>
      <h4 className='task_title'>{task.PriorityReason}</h4>
      <span className='task_address'>{task['Адрес точки, г. Краснодар']}</span>
      <span className='task_time'>{task.priority}</span>
      <img className='task_status' src={statusTag} alt='Статус задачи' />
      <img className='task_arrow' src={arrowRight} alt='Стрелка вправо' />
    </div>
  )
}

export default WorkerTask
