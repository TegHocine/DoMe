import { useState, useEffect } from 'react'
import { db } from '../../firebase-config'
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore'

const HomeLogic = () => {
  const [todo, setTodo] = useState('')
  const [listTodos, setListTodos] = useState([])
  const [filterTodos, setFilterTodos] = useState([])

  const todoColRef = collection(db, 'todos')
  const q = query(todoColRef, orderBy('timestamp', 'desc'))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setListTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setFilterTodos(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      )
    })
  }, [])

  // controle the input
  const onTodoChange = (e) => {
    setTodo(e.target.value)
  }

  // add a todo to the list
  const addTodo = async () => {
    if (todo.length !== 0) {
      setListTodos([
        { id: 1, todo, completed: false, date: new Date() },
        ...listTodos,
      ])
      setFilterTodos(listTodos)
      const todoToAdd = { todo, completed: false, timestamp: serverTimestamp() }
      await addDoc(todoColRef, todoToAdd)
      setTodo('')
      // getTodos()
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
    setFilterTodos(listTodos)
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
    setFilterTodos(listTodos)
    await updateDoc(todoDoc, { completed: false })
  }

  // clear list of completed todo's
  const onClear = () => {
    // return all todo's that have completed === false
    const toClear = listTodos.filter((listTodo) => listTodo.completed === false)

    // return all todo's that have completed === true
    const toDelete = listTodos.filter((listTodo) => listTodo.completed === true)

    // loop to delete all the todo's that are completed from firebase
    toDelete.forEach(async (toDelete) => {
      const todoDoc = doc(db, 'todos', toDelete.id)
      await deleteDoc(todoDoc)
    })

    setListTodos(toClear)
    setFilterTodos(listTodos)
  }

  // filter todo's by :all :completed :active
  const onFilter = (arg) => {
    const completed = listTodos.filter(
      (listTodo) => listTodo.completed === true,
    )
    const active = listTodos.filter((listTodo) => listTodo.completed === false)

    if (arg === 'all') {
      setFilterTodos(listTodos)
    }
    if (arg === 'completed') {
      completed.length !== 0
        ? setFilterTodos(completed)
        : setFilterTodos([
            {
              id: 1,
              todo: 'You have not completed a todo yet :(',
              class: 'inactive',
            },
          ])
    }
    if (arg === 'active') {
      active.length !== 0
        ? setFilterTodos(active)
        : setFilterTodos([
            {
              id: 1,
              todo: "You have completed all your todo 's :)",
              class: 'inactive',
            },
          ])
    }
  }

  return {
    todo,
    onTodoChange,
    filterTodos,
    addTodo,
    onClear,
    onComplete,
    onNotComplete,
    onFilter,
  }
}

export default HomeLogic
