    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const notification = document.getElementById('notification');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // show notification
    const showNotification = (message) => {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };

    // render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            const completeBtn = li.querySelector('.complete-btn');

            editBtn.addEventListener('click', () => editTask(index));
            deleteBtn.addEventListener('click', () => deleteTask(index));
            completeBtn.addEventListener('click', () => toggleComplete(index));

            taskList.appendChild(li);
        });
    };

    // add a new task
    const addTask = (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        console.log(taskInput);
        if (text) {
            tasks.push({
                text,
                completed: false
                });
            saveTasks();
            taskInput.value = '';
            renderTasks();
            showNotification('Task added successfully');
        }
    };

    // edit a task
    const editTask = (index) => {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
            showNotification('Task edited successfully');
        }
    };

    // delete a task
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        showNotification('Task deleted successfully');
    };

    // toggle task completion
    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
        showNotification(`Task marked as ${tasks[index].completed ? 'completed' : 'incomplete'}`);
    };

    // Submit form
    taskForm.addEventListener('submit', addTask);

    // Initial render on application startup
    renderTasks();

