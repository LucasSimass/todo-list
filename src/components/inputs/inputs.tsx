import DateInput from "./dateInput/dateInput";
import SendInput from "./sendInput/sendInput";
import TextInput from "./textInput/textInput";
import "./inputs.css"
import type React from "react";
import type { Dispatch, JSX } from "react";

function Inputs({taskInput, setTaskInput, taskDateValue, setTaskDateValue, setTasks, tasks}: {taskInput: string, setTaskInput: Dispatch<React.SetStateAction<string>>, taskDateValue: string, setTaskDateValue: Dispatch<React.SetStateAction<string>> , setTasks: Dispatch<React.SetStateAction<JSX.Element[]>>, tasks: JSX.Element[]}) {
  return (
    <div className="todo-inputs">
      <TextInput 
      isTextAbove={true} 
      taskValue={taskInput}
      setTaskInput={setTaskInput}
      setTaskDataToFinish={setTaskDateValue}
      setTasks={setTasks}
      taskContent={taskInput}
      tasks={tasks}    
      taskDateToFinish={taskDateValue}
      />
      <DateInput 
      isTextAbove={true}
      setDataValue={setTaskDateValue}
      dataValue={taskDateValue}
      />
      <SendInput 
      taskContent={taskInput} taskDateToFinish={taskDateValue} 
      tasks={tasks}
      setTasks={setTasks} 
      setTaskInput={setTaskInput} 
      setTaskDataToFinish={setTaskDateValue} />
    </div>
  )
}

export default Inputs;