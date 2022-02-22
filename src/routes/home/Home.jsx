import { BsPlus } from 'react-icons/bs'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import HomeLogic from './HomeLogic'

import './style/home.css'

export default function home() {
  const {
    todo,
    onTodoChange,
    listTodos,
    addTodo,
    onClear,
    onComplete,
    onNotComplete,
  } = HomeLogic()

  return (
    <div className='home'>
      <div className='home-wrapper'>
        <h1 className='home-title'>DO-ME</h1>
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
            <div className='home-todoItem-container'>
              {listTodos &&
                listTodos.map((listTodo) => (
                  <div key={listTodo.id} className='todoItem'>
                    <div className='todoItem-wrapper'>
                      {listTodo.completed ? (
                        <FaRegCheckCircle
                          className='todoItem-completed'
                          onClick={() => onNotComplete(listTodo.id)}
                        />
                      ) : (
                        <FaRegCircle
                          className='todoItem-not-completed'
                          onClick={() => onComplete(listTodo.id)}
                        />
                      )}
                      <span className='todoItem-text'>{listTodo.todo}</span>
                    </div>
                  </div>
                ))}
            </div>

            {listTodos.length !== 0 && (
              <div className='home-todoItem-footer'>
                <div> {listTodos.length} todo left</div>
                <div className='home-todoItem-footer-filter-wrapper'>
                  <span className='footer-filter-item'>All</span>
                  <span className='footer-filter-item'>Active</span>
                  <span className='footer-filter-item'>Completed</span>
                </div>
                <button
                  className='todoItem-clear-btn'
                  type='button'
                  onClick={onClear}
                >
                  Clear completed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
