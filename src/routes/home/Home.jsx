import { BsPlus } from 'react-icons/bs'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import HomeLogic from './HomeLogic'
import Spinner from '../../components/spinner/Spinner'

import './style/home.css'

export default function home() {
  const {
    todo,
    onTodoChange,
    filterTodos,
    addTodo,
    onClear,
    onComplete,
    onNotComplete,
    onFilter,
    loading,
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
          {loading ? (
            <Spinner />
          ) : (
            <div className='home-todoItem-wrapper'>
              <div className='home-todoItem-container'>
                {filterTodos &&
                  filterTodos.map((listTodo) => (
                    <div key={listTodo.id} className='todoItem'>
                      <div className='todoItem-wrapper'>
                        <span className={`${listTodo.class && listTodo.class}`}>
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
                        </span>
                        <span className='todoItem-text'>{listTodo.todo}</span>
                      </div>
                    </div>
                  ))}
              </div>

              {filterTodos.length !== 0 && (
                <div className='home-todoItem-footer'>
                  <div> {filterTodos.length} todo left</div>
                  <div className='home-todoItem-footer-filter-wrapper'>
                    <span
                      tabIndex='0'
                      className='footer-filter-item active'
                      onClick={() => onFilter('all')}
                    >
                      All
                    </span>
                    <span
                      tabIndex='0'
                      className='footer-filter-item active'
                      onClick={() => onFilter('active')}
                    >
                      Active
                    </span>
                    <span
                      tabIndex='0'
                      className='footer-filter-item active'
                      onClick={() => onFilter('completed')}
                    >
                      Completed
                    </span>
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
          )}
        </div>
      </div>
    </div>
  )
}
