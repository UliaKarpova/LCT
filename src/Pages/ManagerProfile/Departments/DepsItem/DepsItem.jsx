// import { useState, useEffect } from 'react'
import './DepsItem.css'
import good from '../../../../images/taskStatus.png'
import bad from '../../../../images/taskStatusErr.png'
import inWork from '../../../../images/inWork.png'
import processing from '../../../../images/processing.png'
import done from '../../../../images/done.png'
import More from '../../../../components/ui/More/More'

function DepsItem({ dep }) {
  
const src = dep.isDelivered ? good : bad;
const statusSrc = dep.new_status === 3 ? done : dep.new_status === 2 ? inWork : processing
  return (
<>
    <div className='dep_header'>
        <span className='dep_number'>№ {dep.number}</span>
        <div className='dep_info'>
          <span className='dep_address'>{dep.address}</span>
          <img className='dep_status' src={src} alt='Статус' />
        </div>
        <More />
      </div>
      <table className='dep_list'>
        <thead className='table_hd'>
          <tr className='table_row'>
            <th className='table_th'>Задача</th>
            <th className='table_th'>Исполнитель</th>
            <th className='table_th'>Статус</th>
          </tr>
        </thead>
        <tbody>
      <tr className='row'>
      <td className='cell'></td>
      <td className='cell'>???</td>
      <td className='cell'>statusSrc</td>
    </tr>
    </tbody>
    </table>

</>      
    )
}

export default DepsItem
