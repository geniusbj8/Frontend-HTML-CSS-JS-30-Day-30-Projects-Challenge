// Select DOM Elements
const taskInput = document.getElementById('task-input');
const taskTime = document.getElementById('task-time');
const taskLocation = document.getElementById('task-location');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToDOM);
};

// Save tasks to localStorage
const saveTasks = () => {
  const tasks = Array.from(document.querySelectorAll('#task-list li')).map(li => ({
    task: li.querySelector('.task-text').textContent,
    time: li.querySelector('.task-time').textContent,
    location: li.querySelector('.task-location').textContent,
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add task to DOM
const addTaskToDOM = ({ task, time, location }) => {
  const li = document.createElement('li');

  li.innerHTML = `
    <div class="task-details">
      <span class="task-text">${task}</span> 
      <p><strong>Time:</strong> <span class="task-time">${time}</span></p>
      <p><strong>Location:</strong> <span class="task-location">${location}</span></p>
    </div>
    <div class="task-actions">
      <button class="edit-task">Edit</button>
      <button class="delete-task">Delete</button>
    </div>
  `;

  // Handle task deletion
  li.querySelector('.delete-task').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  // Handle task editing
  li.querySelector('.edit-task').addEventListener('click', () => {
    taskInput.value = task;
    taskTime.value = time;
    taskLocation.value = location;
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
};

// Add new task
addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const time = taskTime.value;
  const location = taskLocation.value.trim();

  if (task === '' || time === '' || location === '') return alert('Please fill in all fields!');

  addTaskToDOM({ task, time, location });
  saveTasks();
  taskInput.value = '';
  taskTime.value = '';
  taskLocation.value = '';
});

// Initialize App
loadTasks();
