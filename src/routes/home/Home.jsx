import { BsPlus } from 'react-icons/bs'
import HomeLogic from './HomeLogic'
import TodoItem from './TodoItem'

import './style/home.css'

export default function home() {
  const { todo, onTodoChange, listTodos, addTodo } = HomeLogic()

  return (
    <div className='home'>
      <div className='home-wrapper'>
        <div className='home-title'>DO-ME</div>
        <div className='home-input-wrapper'>
          <BsPlus className='home-add-icon' onClick={addTodo} />
          <input
            type='text'
            value={todo}
            placeholder='Create a new todo ...'
            className='home-input'
            onChange={onTodoChange}
          />
        </div>
        <div className='home-todoItem'>
          <div className='home-todoItem-wrapper'>
            {listTodos &&
              listTodos.map((listTodo) => (
                <TodoItem key={listTodo.length + 1} todo={listTodo} />
              ))}
            {listTodos.length !== 0 && (
              <div className='home-todoItem-footer'>
                <div>todo left</div>
                <div className='home-todoItem-footer-filter-wrapper'>
                  <span className='footer-filter-item'>All</span>
                  <span className='footer-filter-item'>Active</span>
                  <span className='footer-filter-item'>Completed</span>
                </div>
                <div>Clear completed</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
