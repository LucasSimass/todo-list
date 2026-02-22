import type { Dispatch, JSX } from "react";
import Task from "../components/task/task";
import { formatISO as convertIsoToSimpleData, getFinalTimeOfCurrentlyISO } from "./time";
import React from "react";
import { capitalize } from "./text";


type addTaskType = {
  tasks: JSX.Element[], taskContent: string, 
  setTasks: Dispatch<React.SetStateAction<JSX.Element[]>>,
  taskDateToFinish: string,
  setTaskInput: Dispatch<React.SetStateAction<string>>,
  setTaskDataToFinish: Dispatch<React.SetStateAction<string>>,
};

export const addTask = ({tasks, taskContent, setTasks,taskDateToFinish, setTaskInput, setTaskDataToFinish}: addTaskType) => {
  if (taskContent.length == 0){ return; }
  
  const newTask = <Task 
    key={tasks.length.toString()}
    itemId={tasks.length.toString()}
    taskContent={capitalize(taskContent)} 
    setTasks={setTasks}
    taskDataToFinish={taskDateToFinish 
      ? convertIsoToSimpleData(taskDateToFinish)["time"] + " " + convertIsoToSimpleData(taskDateToFinish)["date"] 
      : "Indeterminado"   
    } />;


    saveTaskData({tasks, taskContent, taskDateToFinish})

    clearCurrentlyTaskData({
      setTaskDataToFinish, setTaskInput
    });


    setTasks(prev => [newTask, ...prev]);
}

const clearCurrentlyTaskData = ({setTaskInput, setTaskDataToFinish}: {setTaskInput: Dispatch<React.SetStateAction<string>>, setTaskDataToFinish: Dispatch<React.SetStateAction<string>>}) => {
  setTaskInput("");
  setTaskDataToFinish(getFinalTimeOfCurrentlyISO())
} 

const getAllTasksOnLocalStorage = (tasks: JSX.Element[]) => {
  const tasksLocalStorage: JSX.Element[] = []; 
  
  for (let i = 0; i < localStorage.length; i++) {
    const itemKey = localStorage.key(i);
    const itemObject = localStorage.getItem(itemKey)

    tasksLocalStorage.push(
      <Task
      itemId=""
      >
      </Task>      
    )

  }    
}


export const saveTaskData = ({tasks, taskContent, taskDateToFinish} : {tasks: JSX.Element[], taskContent: string, taskDateToFinish: string}) => {
  localStorage.setItem(tasks.length.toString(), JSON.stringify({taskContent, taskDateToFinish}))
}

export const isTasksEmpty: (tasks: JSX.Element[]) => boolean = (tasks) => {
  return tasks.length == 0;
}

export const isTasksNotEmpty: (tasks: JSX.Element[]) => boolean = (tasks) => {
  return tasks.length != 0;
}