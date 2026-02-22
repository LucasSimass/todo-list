import type { Dispatch, JSX } from "react";
import "./textInput.css"
import { addTask } from "../../../utils/taskUtils.tsx";
import type React from "react";

function TextInput({
  isTextAbove, 
  taskValue, 
  setTaskInput,
  tasks,
  taskDateToFinish,
  setTaskDataToFinish,
  setTasks,
  taskContent
}
  : 
  {
    isTextAbove: boolean, 
    taskValue: string, setTaskInput: Dispatch<React.SetStateAction<string>>,
    tasks: JSX.Element[],
    taskDateToFinish: string,
    setTaskDataToFinish: Dispatch<React.SetStateAction<string>>,
    setTasks: Dispatch<React.SetStateAction<JSX.Element[]>>,
    taskContent: string
  }) {
  const createTask = (k) => {
    if (k.key != "Enter"){ 
      return; 
    }

    addTask({
      tasks, 
      taskDateToFinish, 
      setTaskDataToFinish, 
      setTaskInput,
      setTasks,
      taskContent
    })
  }
  
  return (
    <div className="todo-textField">
    {isTextAbove && (
      <div className="todo-textfield-text">
        Tarefa: 
      </div>
    )}
      <input type="text" className="todo-input-text"
      id="todo-input-text"
      placeholder="Exemplo: Arrumar a cama"
      onKeyDown={createTask}
      value={taskValue} 
      onChange={(e) => setTaskInput(e.target.value)}
      />
    </div>
  )
}

export default TextInput;