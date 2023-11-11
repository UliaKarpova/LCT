import editIcon from '../../../images/edit.svg'
import deleteIcon from '../../../images/delete.svg'
import eye from '../../../images/eye-off-gray.svg'
import i from '../../../images/i.png'
import './More.css'
import { useState } from 'react'

function More() {
    const [openEdit, setOpenEdit] = useState(false)

    const openWorkerEdit = (e) => {
        setOpenEdit(!openEdit);
    }

    return (
        <div className='edit'>
            <button className='more'>
                <img className='i' src={i} alt='Восклицательный знак' />
                Подробнее</button>
            <button className='dots' onClick={openWorkerEdit}>
                {openEdit && (<ul className='edit_menu'>
                    <li className='edit-item'><img className='icon' src={editIcon} />Редактировать данные</li>
                    <li className='edit-item'><img className='icon' src={eye} />Скрыть</li>
                    <li className='edit-item'><img className='icon' src={deleteIcon} />Удалить</li>
                </ul>)}
            </button>
        </div>
    )
}

export default More
