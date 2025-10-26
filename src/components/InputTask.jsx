function InputTask({ inputValue, onChange, onAddTask }) {
    
  const handleInputEnter = (e) => {
    if(e.key === "Enter") {
      onAddTask();
    }
  }

  return (
    <div>
      <input 
        value={inputValue}
        onChange={onChange}
        onKeyDown={(e) => handleInputEnter(e)}
        type="text" 
        placeholder="Add new task in here..."
        className="bg-white text-black placeholder-gray-500 py-2 px-3 rounded-bl-xl rounded-tl-xl outline-none grow mb-8"
      />
      <button
        onClick={onAddTask}
        className="bg-gray-500 hover:bg-gray-700 py-2 px-2 rounded-br-xl rounded-tr-xl"
      >
        Add Task
      </button>
    </div>
  )
}

export default InputTask;