import type { Dispatch, JSX } from "react"
import "./sendInput.css"
import type React from "react"
import { addTask } from "../../../utils/taskUtils.tsx"

function SendInput({taskContent, taskDateToFinish, tasks, setTasks, setTaskInput, setTaskDataToFinish}: {taskContent: string, taskDateToFinish: string, tasks: JSX.Element[], setTasks: Dispatch<React.SetStateAction<JSX.Element[]>>, setTaskInput: Dispatch<React.SetStateAction<string>>, setTaskDataToFinish: Dispatch<React.SetStateAction<string>>}) {
  const createTask = () => {
    addTask({
      tasks, 
      taskContent, setTaskDataToFinish, setTaskInput, 
      setTasks,
      taskDateToFinish
    });
  }
  
  return (
    <>
      <button 
      type="button"
      className="todo-send-input"
      onClick={createTask}>
        Enviar
      </button>
    </>
  )
}

export default SendInput