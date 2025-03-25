const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.json());
// app.use(cors());


app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend




const DATA_FILE = path.join(__dirname, 'tasks.json');

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
};

app.get('/', (req, res) => {
  res.send('Task Manager API is running.');
});

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(readData());
});

// POST new task
app.post('/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  let tasks = readData();
  const newTask = { id: Date.now(), title: req.body.title, description: req.body.description || '', completed: false };
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
});

// PUT (Update) a task
app.put('/tasks/:id', (req, res) => {
  let tasks = readData();
  const taskIndex = tasks.findIndex(task => task.id == req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  writeData(tasks);
  res.json({ message: 'Task updated' });
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  let tasks = readData();
  const newTasks = tasks.filter(task => task.id != req.params.id);
  if (tasks.length === newTasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }
  writeData(newTasks);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));