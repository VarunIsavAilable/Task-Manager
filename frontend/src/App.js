import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const addTask = () => {
    if (!title.trim()) return;
    axios.post('http://localhost:5000/tasks', { title, description })
      .then(res => {
        setTasks(prevTasks => [...prevTasks, res.data]);
        setTitle('');
        setDescription('');
      })
      .catch(err => console.error('Error adding task:', err));
  };

  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed })
      .then(() => {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
      })
      .catch(err => console.error('Error updating task:', err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <div className="input-container">
        <input 
          className="input-box"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title"
        />
        <input 
          className="input-box"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description"
        />
        <button className="add-button" onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span>{task.title} - {task.description}</span>
            <div className="task-actions">
              <button className="toggle-button" onClick={() => toggleTask(task.id, task.completed)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
