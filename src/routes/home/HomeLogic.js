import { useState } from 'react'

const HomeLogic = () => {
  const [todo, setTodo] = useState('')
  const [listTodos, setListTodos] = useState([])

  // controle the input
  const onTodoChange = (e) => {
    setTodo(e.target.value)
  }

  // add a todo to the list
  const addTodo = () => {
    if (todo.length !== 0) {
      setListTodos([{ todo, completed: false }, ...listTodos])
      setTodo('')
    }
  }

  // clear list of todo's
  const onClear = () => {
    setListTodos([])
  }

  // click to specify wich todo is completed
  const onComplete = () => {
    // empty
  }

  return { todo, onTodoChange, listTodos, addTodo, onClear, onComplete }
}

export default HomeLogic
