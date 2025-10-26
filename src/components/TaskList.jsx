import { useState } from "react"

function TaskList({ taskList, onDelete, onComplete, onEdit }) {

  const [taskId, setTaskId] = useState("");
  const [newText, setNewtext] = useState("");

  const handleTaskId = (taskId, status) => {
    if(status === true) {
      alert("Can't edit complete task!")
      return;
    }

    setTaskId(taskId);
  }

  const handleSaveEdit = () => {
    onEdit(taskId, newText);
    setTaskId("");
  }

  const handleSaveEditEnter = (e, taskText) => {
    if (e.key === "Enter") {
      handleSaveEdit()
    }
    if (e.key === "Escape") {
      setNewtext(taskText)
      onEdit(taskId, taskText)
      setTaskId("");
    }
  }

  const handleCancelEdit = (taskText) => {
    setNewtext(taskText)
    onEdit(taskId, taskText)
    setTaskId("");
  }


  const handleDeleteButton = (taskId) => {
    onDelete(taskId)
  }

  const handleCompleteButton = (taskId) => {
    onComplete(taskId)
  }

  return (
    <div
      className="flex flex-row w-full"
    >
      <ul
        className="flex flex-col w-full gap-3"
      >
        {taskList.map((task) => (
          <li
          key={task.id}
            className={`flex flex-row items-center justify-between ${task.isComplete === true ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-500 hover:bg-gray-700"} w-full py-2 px-3 rounded-xl`}
          >
            {task.id === taskId ? (
              <input
              autoFocus
              placeholder={task.text}
              onChange={(e) => setNewtext(e.target.value)}
              onKeyDown={(e) => handleSaveEditEnter(e, task.text)}
              onBlur={() => handleCancelEdit(task.text)}
              type="text"
              className="placeholder-gray-400"
              />
            ) : (
            <span
              onClick={() => handleCompleteButton(task.id)}
              className={`cursor-pointer ${task.isComplete === true ? "line-through" : ""}`}
            >
              {task.text}
            </span>

            )}
          {task.id === taskId ? (
            <div
              className="flex flex-row items-center justify-center gap-2"
            >
              <button
                onClick={() => {handleSaveEdit()}}
                className=""
              >
                Done
              </button>
            </div>
          ) : (
            <div
              className="flex flex-row items-center justify-center gap-2"
            >
              <button
                onClick={() => handleTaskId(task.id, task.isComplete)}
                className="cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteButton(task.id)}
                className="cursor-pointer"
              >
                Delete
              </button>
            </div>
              )}
          </li>

        ))}







      </ul>
    </div>
  )
}

export default TaskList;