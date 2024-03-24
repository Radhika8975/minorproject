// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    // Create new task item
    var taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = taskInput.value;

    // Add event listener to mark task as complete
    taskItem.addEventListener("click", function() {
        taskItem.classList.toggle("completed");
    });

    // Add button to remove task
    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = function() {
        taskItem.remove();
    };
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);
    taskInput.value = "";

    // Save tasks to local storage
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    var tasks = document.querySelectorAll(".task-item");
    var tasksArray = [];

    tasks.forEach(function(task) {
        tasksArray.push({
            task: task.innerText,
            completed: task.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// Function to load tasks from local storage
function loadTasks() {
    var tasks = localStorage.getItem("tasks");
    if (tasks) {
        var tasksArray = JSON.parse(tasks);
        tasksArray.forEach(function(task) {
            var taskItem = document.createElement("li");
            taskItem.className = "task-item";
            taskItem.innerHTML = task.task;
            if (task.completed) {
                taskItem.classList.add("completed");
            }
            taskItem.addEventListener("click", function() {
                taskItem.classList.toggle("completed");
                saveTasks();
            });
            var removeButton = document.createElement("button");
            removeButton.innerHTML = "Remove";
            removeButton.onclick = function() {
                taskItem.remove();
                saveTasks();
            };
            taskItem.appendChild(removeButton);
            document.getElementById("taskList").appendChild(taskItem);
        });
    }
}

// Load tasks when the page is loaded
window.onload = function() {
    loadTasks();
};
