document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const progressElement = document.getElementById('task-progress');
    const progressPercentage = document.getElementById('progress-percentage');
    const tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskInput = document.getElementById('task-input');
        const deadlineInput = document.getElementById('deadline-input');
        const priorityInput = document.getElementById('priority-input');
        const labelInput = document.getElementById('label-input');

        const task = {
            description: taskInput.value,
            deadline: deadlineInput.value,
            priority: priorityInput.value,
            label: labelInput.value,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        updateProgress();
        taskForm.reset();
    });

    function renderTasks() {
        taskList.innerHTML = '';
        
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task', task.priority);
            if (task.completed) {
                taskElement.classList.add('completed');
            }

            taskElement.innerHTML = `
                <div>
                    <label>Task:</label> ${task.description} <br>
                    <label>Deadline:</label> ${task.deadline} <br>
                    <label>Priority:</label> ${task.priority} <br>
                    <label>Label:</label> ${task.label}
                </div>
                <div>
                    <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;

            taskList.appendChild(taskElement);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteTask);
        });

        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', toggleComplete);
        });
    }

    function deleteTask(e) {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
        updateProgress();
    }

    function toggleComplete(e) {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        updateProgress();
    }

    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
        progressElement.value = progress;
        progressPercentage.textContent = `${progress.toFixed(0)}%`;
    }
});
