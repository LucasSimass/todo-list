import type { JSX } from "react";
import "./tasks.css"
import { getAllTasksFormatedOnLocalStorage } from "../../utils/taskUtils";

function Tasks({tasks, setTasks} : {tasks: JSX.Element[], setTasks: any}) {
  return (
    <div className="tasks-div">
      {getAllTasksFormatedOnLocalStorage(setTasks)}
    </div>
  )
}

export default Tasks