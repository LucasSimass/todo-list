import type { JSX } from "react";
import "./tasks.css"

function Tasks({tasks} : {tasks: JSX.Element[]}) {
  return (
    <div className="tasks-div">
      {tasks.map((task) => {
          return task;
      })}
    </div>
  )
}

export default Tasks