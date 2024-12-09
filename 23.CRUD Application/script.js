// Get elements from the DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Initialize tasks from localStorage or start with an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render the tasks to the DOM
function renderTasks() {
  // Clear the current list
  taskList.innerHTML = '';

  // Loop through tasks and display them
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    
    // Task name
    const taskText = document.createElement('span');
    taskText.textContent = task.name;
    
    // Edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));
    
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to handle task creation
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get task input
  const taskName = taskInput.value.trim();
  
  if (taskName !== '') {
    // Create a new task and add it to the tasks array
    tasks.push({ name: taskName });
    
    // Clear the input field
    taskInput.value = '';
    
    // Save tasks to localStorage
    saveTasksToLocalStorage();

    // Re-render tasks
    renderTasks();
  } else {
    alert('Please enter a valid task.');
  }
});

// Function to handle task deletion
function deleteTask(index) {
  tasks.splice(index, 1);
  
  // Save updated tasks to localStorage
  saveTasksToLocalStorage();

  renderTasks();
}

// Function to handle task editing
function editTask(index) {
  const newTaskName = prompt('Edit your task:', tasks[index].name);
  
  // If the user cancels, newTaskName will be null, so check for that
  if (newTaskName !== null && newTaskName.trim() !== '') {
    tasks[index].name = newTaskName.trim();
    
    // Save updated tasks to localStorage
    saveTasksToLocalStorage();

    renderTasks();
  } else if (newTaskName === '') {
    alert('Task name cannot be empty.');
  }
}

// Initial rendering of tasks from localStorage
renderTasks();
