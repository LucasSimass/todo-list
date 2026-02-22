import { useState, type Dispatch, type JSX } from "react";
import "./task.css"
import TaskContent from "./taskContent/taskContent";
import type React from "react";
import DoneInput from "./doneInput/doneInput";
import { getAllTasksFormatedOnLocalStorage, removeTaskOnLocalStorage } from "../../utils/taskUtils";

function Task({
  taskContent, 
  taskDataToFinish, 
  setTasks, 
  itemId}
  : {
    taskContent: string, taskDataToFinish: string,setTasks: Dispatch<React.SetStateAction<JSX.Element[]>>, itemId: string}) {

  const [isExisting, setIsExisting] = useState(true);
  
  const deleteTask = () => {
    setIsExisting(false)
  }

  return (
    <div 
    className={"task " + (isExisting ? "fade-in" : "fade-out")}
    onAnimationEnd={() => {
      // stop to destroy animation if is being born
      if (isExisting){ return; }
      
      removeTaskOnLocalStorage(itemId);
      
      const tasksFormated = getAllTasksFormatedOnLocalStorage(setTasks);
      setTasks(tasksFormated);
    }}
    >
      <div className="task-left-side">
         
        <DoneInput deleteTask={deleteTask}/>

        <TaskContent 
          taskContentAdvice="Tarefa"
          taskContent={taskContent}
          isTaskAlignStart={true} 
        />
      </div>

      <TaskContent taskContentAdvice="Data para término" taskContent={taskDataToFinish} isTaskAlignStart={false}/>
    </div>
  )
}

export default Task;