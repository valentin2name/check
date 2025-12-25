import { useState } from "react"
import styles from './index.module.css'
import { Button } from "../Button/Button"

interface Task {
  id: string,
  text: string,
  isCompleted: boolean
}


const Main = () => {

  const [taskText, setTaskText] = useState('')
  const [todos, setTodos] = useState<Task[]>([])
  

  const addToTask = () => {
    if(!taskText) {
      return
    }
    setTodos((prev) => [...prev, {
      id: Date.now().toString(),
      text: taskText,
      isCompleted: false}])
      setTaskText('')
  }

  const removeTask = (id: string) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }

  const toggleCompleted = (id: string) => {
    const newState = todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      } else {
        return todo
      }
    })
    
    setTodos(newState)
  }

  return (
    <div>
      <header>
        <h1>ToDo List</h1>
      </header>
      <main className={styles.complex}>
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)}/>
        <Button text="Добавить" onClick={addToTask} />
      </main>
      {todos.length ? todos.map(({id, text, isCompleted}) => (
        <div className={styles.todoBlock} key={id}>
          <div style={{display: 'flex', alignItems: 'center', columnGap: 12}}>
            <h2 className={`${isCompleted ? styles.done : ''}`} >{text}</h2>
            <input type="checkbox" checked={isCompleted} onChange={() => toggleCompleted(id)}/>
          </div>
          <Button text="Удалить" onClick={() => removeTask(id)}/>
        </div>
      )) : <h3>Список дел пуст.</h3>}
    </div>
  )
}

export default Main