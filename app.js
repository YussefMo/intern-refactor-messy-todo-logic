document.addEventListener('DOMContentLoaded', function () {
	const taskInput = document.getElementById('taskInput');
	const addTaskBtn = document.getElementById('addTaskBtn');
	const taskList = document.getElementById('taskList');

	let tasks = [];
	let taskId = 0;

	// Load tasks from localStorage if available
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks) {
		tasks = JSON.parse(savedTasks);
		if (tasks.length > 0) {
			taskId = Math.max(...tasks.map((t) => t.id)) + 1;
		}
	}

	function saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function renderTasks() {
		taskList.innerHTML = '';
		tasks.forEach((task, index) => {
			const li = document.createElement('li');
			li.className = 'task-item';
			li.innerHTML = `
        <span class="${task.done ? 'done' : ''}">${task.name}</span>
        <button class="toggle-btn" data-index="${index}">${
				task.done ? 'Undo' : 'Done'
			}</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
			taskList.appendChild(li);
		});
		saveTasks();
	}

	function addTask() {
		const taskName = taskInput.value.trim();
		if (taskName !== '') {
			tasks.push({ id: taskId++, name: taskName, done: false });
			taskInput.value = '';
			renderTasks();
		}
	}

	function toggleTask(index) {
		tasks[index].done = !tasks[index].done;
		renderTasks();
	}

	function deleteTask(index) {
		tasks.splice(index, 1);
		renderTasks();
	}

	renderTasks();
	addTaskBtn.addEventListener('click', addTask);
	taskInput.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') addTask();
	});

	taskList.addEventListener('click', function (e) {
		if (e.target.classList.contains('toggle-btn')) {
			toggleTask(e.target.getAttribute('data-index'));
		} else if (e.target.classList.contains('delete-btn')) {
			deleteTask(e.target.getAttribute('data-index'));
		}
	});

	setInterval(() => {
		if (tasks.length > 0 && tasks.every((task) => task.done)) {
			console.log('All tasks done!');
		}
	}, 10000);
});
