import { useState } from "react"

interface Task {
  id: string,
  text: string,
  isCompleted: boolean
}


const Main = () => {

    const [taskText, setTaskText] = useState('')
  const [todos, setTodos] = useState<Task[]>([])
  

  const addToTask = () => {
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
        <header className="header">
        <h1>ToDo List</h1>
      </header>
      <main>
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)}/>
        <button onClick={addToTask}>Добавить</button>
      </main>
      <h3>{taskText}</h3>
      {todos.map(({id, text, isCompleted}) => (
        <div key={id}>
          <h2>{text}</h2>
          <input type="checkbox" checked={isCompleted} onChange={() => toggleCompleted(id)}/>
          <button onClick={() => removeTask(id)}>удалить</button>
        </div>
      ))}
    </div>
  )
}

export default Main