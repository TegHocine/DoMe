import { useState } from 'react'

const HomeLogic = () => {
  const [todo, setTodo] = useState('')
  const [listTodos, setListTodos] = useState([])

  const onTodoChange = (e) => {
    setTodo(e.target.value)
  }

  const addTodo = () => {
    setListTodos([todo, ...listTodos])
    setTodo('')
  }

  return { todo, onTodoChange, listTodos, addTodo }
}

export default HomeLogic
