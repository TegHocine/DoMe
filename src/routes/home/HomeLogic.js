import { useState } from 'react'

const HomeLogic = () => {
  const [todo, setTodo] = useState('')
  const [listTodos, setListTodos] = useState([])

  const onTodoChange = (e) => {
    setTodo(e.target.value)
  }

  const addTodo = () => {
    if (todo.length !== 0) {
      setListTodos([todo, ...listTodos])
      setTodo('')
    }
  }
  const onClear = () => {
    setListTodos([])
  }

  return { todo, onTodoChange, listTodos, addTodo, onClear }
}

export default HomeLogic
