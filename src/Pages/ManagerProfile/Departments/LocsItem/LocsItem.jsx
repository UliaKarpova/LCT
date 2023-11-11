import './LocsItem.css'

function LocsItem({ dep }) {
  return (
    <tr className='row'>
      <td className='cell'>{dep.number}</td>
      <td className='cell'>{dep.address}</td>
      <td className='cell'>{dep.workers}</td>
    </tr>
  )
}
export default LocsItem
