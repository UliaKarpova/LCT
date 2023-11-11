import { useState, useEffect } from 'react'
import './Departments.css'
import DepsItem from './DepsItem/DepsItem'
import LocsItem from './LocsItem/LocsItem'
import api from '../../../utils/api'

import ManagerPanel from '../ManagerPanel/ManagerPanel'
// import { useState } from 'react'
// import departments from '../../../data/lct.departments.json'

function Departments() {
  const [departments, setDepartments] = useState([])
  
  useEffect(() => {
    api.getOffices().then((res) => {
      setDepartments(res)
    })
  }, [])

  console.log(departments)
  const locations = [{
      address: 'ул. Красная, д. 139',
      number: 3, 
      workers: 3
    }, {
      address: 'ул. В.Н. Мачуги, 41',
      number: 8, 
      workers: 3
    }, {
      address: 'ул. Красных Партизан, 321',
      number: 14, 
      workers: 3
  }]
  return (
    <main className='main'>
      <ManagerPanel title='Отделения и партнёры' btnText='Добавить отделение / Партнёра' placeholderText='Поиск по отделениям' />
      <table className='location_list'>
        <caption className='table-title'>Выездные локации</caption>
        <thead className='table_top'>
          <tr className='table_grid'>
          <th className='table_head'>№ точки</th>
          <th className='table_head'>Адрес</th>
          <th className='table_head'>Кол-во сотрудников</th>
          </tr>
        </thead>
        <tbody className='table_body'>
        {locations.map((loc) => {
          return <LocsItem key={loc.number} dep={loc} />
        })}
        </tbody>
      </table>
      <h5 className='dep_title'>Все точки</h5>
      <ul className='departments_list'>
        {departments.map((dep, index) => {
          return <li key={index}><DepsItem dep={dep} /></li>
        })}
      </ul>

  </main>
  )
}

export default Departments
