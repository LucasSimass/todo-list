import "./taskContent.css";

function TaskContent({taskContent, taskContentAdvice, isTaskAlignStart} : {taskContent: string, taskContentAdvice: string, isTaskAlignStart: boolean}) {
  
  function taskStartAlign(isTaskAlignStart: boolean){
    return isTaskAlignStart 
          ? "task-content-start"
          : "task-content-end"
  }
  
  return (
      <div className={"task-content " + taskStartAlign(isTaskAlignStart)} >
          <div className="task-content-advice">
            {taskContentAdvice}: 
          </div>
          <div className="task-content-text">
            {taskContent}
          </div>
      </div>
  )
}

export default TaskContent;