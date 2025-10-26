import InputTask from "./components/InputTask"
import TaskList from "./components/TaskList"
import TheTitle from "./components/TheTitle"
import { useEffect, useState } from "react";

function App() {

  const [taskList, setTaskList] = useState(() => {
    const loadedTaskList = JSON.parse(localStorage.getItem("taskList"))
    return loadedTaskList || [];
  })

  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if(inputValue.trim() === "") {
      alert("New task can't be empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      isComplete: false,
    }

    setTaskList([...taskList, newTask])
    setInputValue("")
  }

  const handleDeleteTask = (taskId) => {
    const updatedTask = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTask);
  }

  const handleCompleteTask = (taskId) => {
    const updatedTask = taskList.map((task) => (
      task.id === taskId ? {...task, isComplete: !task.isComplete} : task
    ))

    const sortedTaskList = updatedTask.sort((a, b) => a.isComplete - b.isComplete)

    setTaskList(sortedTaskList);
  }

  const handleEditTask = (taskId, newText) => {
    if(newText.trim() === "") {
      alert("Task can't be empty!")
      return;
    }

    const updatedTask = taskList.map((task) => (
      task.id === taskId ? {...task, text: newText} : task
    ))
    setTaskList(updatedTask);
  }

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }), [taskList]

  return (
    <div
      className="container w-full flex flex-col items-center justify-center"
    >

      <TheTitle/>

      <InputTask
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onAddTask={handleAddTask}
      />

      <TaskList 
        taskList={taskList}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
        onEdit={handleEditTask}
      />

    </div>
  )
}

export default App
