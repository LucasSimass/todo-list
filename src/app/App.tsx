import { useState, type JSX } from "react";
import Inputs from "../components/inputs/inputs";
import TodoLabel from "../components/todoLabel/todoLabel";
import "./App.css";
import Tasks from "../components/tasks/tasks";
import CreatorLabel from "../components/creatorLabel/creatorLabel";
import { getFinalTimeOfCurrentlyISO } from "../utils/time";

function App() {
  const [tasks, setTasks] = useState<JSX.Element[]>([]);
  const [taskValue, setTaskValue] = useState("");
  const [taskDateValue, setTaskDateValue] = useState(getFinalTimeOfCurrentlyISO());

  return (
    <>
      <TodoLabel />
      
      <Inputs 
      taskInput={taskValue} setTaskInput={setTaskValue} 
      tasks={tasks}
      setTasks={setTasks}
      taskDateValue={taskDateValue}
      setTaskDateValue={setTaskDateValue}
      />
      
      <Tasks tasks={tasks} />

      <CreatorLabel />
    </>
  )
}

export default App
