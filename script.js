document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
 
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => addTask(taskText, false));
    }
 
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(listItem =>
            listItem.firstChild.textContent.trim()
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
    function addTask(taskText = null, save = true) {
        if (taskText === null) {
            taskText = taskInput.value.trim();  // Use input value if no argument provided
        }
 
        if (taskText === "") {
            alert('Enter a Task');
            return;
        }
 
        let listItem = document.createElement('li');
        listItem.textContent = taskText;
 
        let button = document.createElement('button');
        button.innerHTML = 'Remove';
        button.classList.add('remove-btn');
 
        button.addEventListener('click', function() {
            listItem.remove();
            saveTasks();  // Save tasks after removing
        });
 
        listItem.appendChild(button);
        taskList.appendChild(listItem);
 
        taskInput.value = "";  // Clear the input field
 
        if (save) saveTasks();  // Save only if adding a new task manually
    }
 
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
 
    // Load stored tasks on page load
    loadTasks();
 });