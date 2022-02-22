import { useState, useEffect } from 'react'
import { db } from '../../firebase-config'
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore'

const HomeLogic = () => {
  const [todo, setTodo] = useState('')
  const [listTodos, setListTodos] = useState([])

  const todoCollectionRef = collection(db, 'todos')

  // get list todos from firebase
  const getTodos = async () => {
    const data = await getDocs(todoCollectionRef)
    setListTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getTodos()
  }, [])

  // controle the input
  const onTodoChange = (e) => {
    setTodo(e.target.value)
  }

  // add a todo to the list
  const addTodo = async () => {
    if (todo.length !== 0) {
      setListTodos([{ todo, completed: false }, ...listTodos])
      await addDoc(todoCollectionRef, { todo, completed: false })
      setTodo('')
    }
  }

  // click to specify wich todo is completed
  const onComplete = async (idTodo) => {
    const todoDoc = doc(db, 'todos', idTodo)
    setListTodos(
      listTodos.map((listTodo) => {
        return {
          ...listTodo,
          completed:
            listTodo.id === idTodo ? !listTodo.completed : listTodo.completed,
        }
      }),
    )
    await updateDoc(todoDoc, { completed: true })
  }

  // click to specify wich todo is completed
  const onNotComplete = async (idTodo) => {
    const todoDoc = doc(db, 'todos', idTodo)
    setListTodos(
      listTodos.map((listTodo) => {
        return {
          ...listTodo,
          completed:
            listTodo.id === idTodo ? !listTodo.completed : listTodo.completed,
        }
      }),
    )
    await updateDoc(todoDoc, { completed: false })
  }

  // clear list of todo's
  const onClear = () => {
    setListTodos([])
  }

  return {
    todo,
    onTodoChange,
    listTodos,
    addTodo,
    onClear,
    onComplete,
    onNotComplete,
  }
}

export default HomeLogic
