import { BsPlus } from 'react-icons/bs'
import './style/home.css'

export default function home() {
  return (
    <div className='home'>
      <div className='home-wrapper'>
        <div className='home-title'>DO-ME</div>
        <div className='home-input-wrapper'>
          <BsPlus className='home-add-icon' />
          <input
            type='text'
            placeholder='Create a new todo ...'
            className='home-input'
          />
        </div>
      </div>
    </div>
  )
}
