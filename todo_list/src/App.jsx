import React, { useState } from 'react';
import './App.css'
function TodoList(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [newTask, setNewTask] = useState('');
  const [clickedTaskId, setClickedTaskId] = useState(null); // State to track clicked task ID

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const handleEditTask = (id, newText, completed) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText, completed: !completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id );
    setTasks(updatedTasks);
  };

  const handleEditButtonClick = (id, completed) => {
    setClickedTaskId(id);
    handleEditTask(id, tasks.find(task => task.id === id).text, completed);
  };

  const handleRemoveButtonClick = () => {
    setClickedTaskId(null);
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
            <button 
              onClick={() => handleEditButtonClick(task.id, task.completed)}
              style={{ backgroundColor: clickedTaskId === task.id && !task.completed ? 'red' : task.completed ? 'green' : 'initial' }}
            >
              {task.completed ? 'Complete' : 'Incomplete'}
            </button>
            <button 
              onClick={() => {
                handleRemoveButtonClick();
                handleRemoveTask(task.id);
              }}
              style={{ backgroundColor: clickedTaskId === task.id ? 'blue' : 'initial' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const initialTasks = [
    // You can initialize with some tasks here if needed
  ];

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList tasks={initialTasks} />
    </div>
  );
}

export default App;
