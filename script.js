document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false: don't save again while loading
        });
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get current tasks from DOM
    function getCurrentTasks() {
        const items = taskList.querySelectorAll('li');
        return Array.from(items).map(li => li.firstChild.textContent);
    }

    // Add a new task to the list and optionally to Local Storage
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function () {
            taskList.removeChild(listItem);

            // Update Local Storage after removal
            const updatedTasks = getCurrentTasks();
            saveTasks(updatedTasks);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            const updatedTasks = getCurrentTasks();
            updatedTasks.push(taskText);
            saveTasks(updatedTasks);
        }

        taskInput.value = '';
    }

    // Event: Add task on button click
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Event: Add task on pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks on page load
    loadTasks();
});
