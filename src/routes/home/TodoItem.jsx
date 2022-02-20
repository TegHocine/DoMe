import React from 'react'
import PropTypes from 'prop-types'

export default function TodoItem({ todo }) {
  return (
    <div className='todoItem'>
      <div className='todoItem-wrapper'>{todo}</div>
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
}
