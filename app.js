// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
	// Get references to DOM elements
	const taskInput = document.getElementById('taskInput');
	const addTaskBtn = document.getElementById('addTaskBtn');
	const taskList = document.getElementById('taskList');

	let tasks = []; // Array to store tasks
	let taskId = 0; // Unique ID for each task

	// Load tasks from localStorage if available
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks) {
		tasks = JSON.parse(savedTasks);
		// Set taskId to one more than the highest existing ID
		if (tasks.length > 0) {
			taskId = Math.max(...tasks.map((t) => t.id)) + 1;
		}
	}

	// Save the current tasks array to localStorage
	function saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Render the list of tasks in the DOM
	function renderTasks() {
		taskList.innerHTML = '';
		tasks.forEach((task, index) => {
			const li = document.createElement('li');
			li.className = 'task-item';
			// Create task item with name, toggle, and delete buttons
			li.innerHTML = `
        <span class="${task.done ? 'done' : ''}">${task.name}</span>
        <button class="toggle-btn" data-index="${index}">${
				task.done ? 'Undo' : 'Done'
			}</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
			taskList.appendChild(li);
		});
		saveTasks(); // Save tasks after rendering
	}

	// Add a new task to the list
	function addTask() {
		const taskName = taskInput.value.trim();
		if (taskName !== '') {
			tasks.push({ id: taskId++, name: taskName, done: false });
			taskInput.value = '';
			renderTasks();
		}
	}

	// Toggle the 'done' status of a task
	function toggleTask(index) {
		tasks[index].done = !tasks[index].done;
		renderTasks();
	}

	// Delete a task from the list
	function deleteTask(index) {
		tasks.splice(index, 1);
		renderTasks();
	}

	renderTasks(); // Initial rendering of tasks

	// Event listener for the Add Task button
	addTaskBtn.addEventListener('click', addTask);

	// Allow adding a task by pressing Enter in the input field
	taskInput.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') addTask();
	});

	// Event delegation for toggle and delete buttons in the task list
	taskList.addEventListener('click', function (e) {
		if (e.target.classList.contains('toggle-btn')) {
			toggleTask(e.target.getAttribute('data-index'));
		} else if (e.target.classList.contains('delete-btn')) {
			deleteTask(e.target.getAttribute('data-index'));
		}
	});

	// Periodically check if all tasks are done and log a message
	setInterval(() => {
		if (tasks.length > 0 && tasks.every((task) => task.done)) {
			console.log('All tasks done!');
		}
	}, 10000);
});
