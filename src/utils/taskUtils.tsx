import type { Dispatch, JSX, SetStateAction } from "react";
import Task from "../components/task/task";
import { getFinalTimeOfCurrentlyISO } from "./time";
import React from "react";

type addTaskType = {
  tasks: JSX.Element[], taskContent: string, 
  setTasks: Dispatch<React.SetStateAction<JSX.Element[]>>,
  taskDateToFinish: string,
  setTaskInput: Dispatch<React.SetStateAction<string>>,
  setTaskDataToFinish: Dispatch<React.SetStateAction<string>>,
};

export const addTask = ({tasks, setTasks, taskContent, taskDateToFinish, setTaskInput, setTaskDataToFinish}: addTaskType) => {
  if (taskContent.length == 0){ return; }

  // save task on db
  saveTaskData({tasks, taskContent, taskDateToFinish});

  // clear currently task data
  clearCurrentlyTaskData({
    setTaskDataToFinish, setTaskInput
  });

  // get all tasks formated on local storage and set
  setTasks(getAllTasksFormatedOnLocalStorage(setTasks));
}

const clearCurrentlyTaskData = ({setTaskInput, setTaskDataToFinish}: {setTaskInput: Dispatch<React.SetStateAction<string>>, setTaskDataToFinish: Dispatch<React.SetStateAction<string>>}) => {
  setTaskInput("");
  setTaskDataToFinish(getFinalTimeOfCurrentlyISO())
} 

export const getLastTaskKeyOnLocalStorage = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(
      JSON.parse(
        localStorage.getItem(
          localStorage.key(i)!
        )!)["taskKey"]
      )
  }

  if (keys.length == 0){ return null; }

  return keys.reduce((a, b) => {
    return Number(b) > Number(a) ? b : a;
  });
}

export const getTasksRawDataOnLocalStorage: () => {taskKey: string, taskContent: string, taskDateToFinish: string}[] 
= () => {
  const rawTasksData: {taskKey: string, taskContent: string, taskDateToFinish: string}[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const itemKey: string = localStorage.key(i) || "";
    if (!itemKey){ continue; }
    
    const itemObject: {taskKey: string, taskContent: string, taskDateToFinish: string } = JSON.parse(localStorage.getItem(itemKey) || "");

    if (!itemObject || !itemObject["taskContent"] || !itemObject["taskDateToFinish"] || !itemObject["taskKey"]) { continue; }

    rawTasksData.push(itemObject);
  }
  return rawTasksData;
}

export const getAllTasksFormatedOnLocalStorage: (setTasks: Dispatch<SetStateAction<JSX.Element[]>>) => JSX.Element[] 
= (setTasks) => {
  const tasksLocalStorage: JSX.Element[] = []; 
  
  for (let i = 0; i < localStorage.length; i++) {
    const itemId: string = localStorage.key(i) || "";
    if (!itemId){ continue; }

    const itemObject: {taskKey: string, taskContent: string, taskDateToFinish: string } = JSON.parse(localStorage.getItem(itemId) || "");

    if (!itemObject || !itemObject["taskContent"] || !itemObject["taskDateToFinish"]) { continue; }

    tasksLocalStorage.push(
       <Task
        itemId={itemObject["taskKey"]}
        taskContent={itemObject['taskContent']}
        taskDataToFinish={itemObject["taskDateToFinish"]}
        setTasks={setTasks}
        key={itemObject["taskKey"]}
      >
       </Task>      
    )
  }


  return tasksLocalStorage.sort((a, b) => parseInt(b.props['itemId']) - parseInt(a.props['itemId']));    
}

// returns true if sucess
export const removeTaskOnLocalStorage: (itemId: string) => boolean = (itemId: string) => {
  // if item not found, returns false
  if (!localStorage.getItem(itemId)){ return false; }

  // else delete from local storage
  localStorage.removeItem(itemId);

  // recreate the local storage with the correct index
  saveRawTaskDataOnLocalStorage(getTasksRawDataOnLocalStorage());
  
  // true if the remove was sucessfuly
  return true;
}

export const saveRawTaskDataOnLocalStorage: (tasksRawData: {taskKey: string, taskContent: string,taskDateToFinish: string}[]) => void = (tasksRawData) => {
  tasksRawData.forEach((taskRawData) => {
    localStorage.setItem(
      taskRawData["taskKey"], 
      JSON.stringify({
        taskKey: taskRawData["taskKey"],
        taskContent: taskRawData['taskContent'], 
        taskDateToFinish: taskRawData['taskDateToFinish']
      }
      ))
  });
}

export const saveTaskData = ({tasks, taskContent, taskDateToFinish} : {tasks: JSX.Element[], taskContent: string, taskDateToFinish: string}) => {
  console.log(localStorage.length);
  
  const taskLastKey = getLastTaskKeyOnLocalStorage();
  
  const taskKey = taskLastKey 
  ? (parseInt(taskLastKey) + 1).toString() 
  : "0";
  
  console.log(taskKey);
  
  const taskDataJson = JSON.stringify({taskKey, taskContent, taskDateToFinish});
  
  console.log("saving... ");

  localStorage.setItem(taskKey, taskDataJson);
}

export const isTasksEmpty: (tasks: JSX.Element[]) => boolean = (tasks) => {
  return tasks.length == 0;
}

export const isTasksNotEmpty: (tasks: JSX.Element[]) => boolean = (tasks) => {
  return tasks.length != 0;
}