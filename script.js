// Get HTML elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");

const pendingTasks = document.getElementById("pendingTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const completedTasks = document.getElementById("completedTasks");

// Get saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;


// Open Add Task window
addTaskBtn.onclick = function () {
    taskModal.style.display = "flex";
};


// Close Add Task window
closeModal.onclick = function () {
    taskModal.style.display = "none";
};


// Close when clicking outside the box
window.onclick = function (event) {
    if (event.target == taskModal) {
        taskModal.style.display = "none";
    }
};


// Add a new task
taskForm.onsubmit = function (event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let assignedTo = document.getElementById("assignedTo").value;
    let status = document.getElementById("status").value;

    if (title == "" || description == "" || assignedTo == "") {
        alert("Please fill all fields");
        return;
    }

    // EDIT EXISTING TASK
    if (editingTaskId != null) {

        let task = tasks.find(function (task) {
            return task.id == editingTaskId;
        });

        task.title = title;
        task.description = description;
        task.assignedTo = assignedTo;
        task.status = status;

        // Created time stays unchanged
        // Only Updated time changes
        task.updatedAt = new Date().toLocaleString();

        editingTaskId = null;

    }

    // ADD NEW TASK
    else {

        let newTask = {
            id: Date.now(),
            title: title,
            description: description,
            assignedTo: assignedTo,
            status: status,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        };

        tasks.push(newTask);
    }

    saveTasks();
    displayTasks();

    taskForm.reset();

    taskModal.style.display = "none";
};


// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display all tasks
function displayTasks() {

    // Clear columns first
    pendingTasks.innerHTML = "";
    inProgressTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach(function (task) {

        let card = document.createElement("div");

        card.className = "task-card";

        card.innerHTML = `
            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <p><strong>Assigned To:</strong> ${task.assignedTo}</p>

            <p><strong>Status:</strong> ${task.status}</p>

            <p><strong>Created:</strong> ${task.createdAt}</p>

            <p><strong>Updated:</strong> ${task.updatedAt}</p>

            <button onclick="editTask(${task.id})">Edit</button>

            <button onclick="deleteTask(${task.id})">Delete</button>

            <select onchange="changeStatus(${task.id}, this.value)">
                <option value="Pending" ${task.status == "Pending" ? "selected" : ""}>
                    Pending
                </option>

                <option value="In Progress" ${task.status == "In Progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option value="Completed" ${task.status == "Completed" ? "selected" : ""}>
                    Completed
                </option>
            </select>
        `;

        // Put task in correct column
        if (task.status == "Pending") {
            pendingTasks.appendChild(card);
        }

        else if (task.status == "In Progress") {
            inProgressTasks.appendChild(card);
        }

        else {
            completedTasks.appendChild(card);
        }
    });
}


// Delete task
function deleteTask(id) {

    if (confirm("Delete this task?")) {

        tasks = tasks.filter(function (task) {
            return task.id != id;
        });

        saveTasks();
        displayTasks();
    }
}


// Edit task
function editTask(id) {

    let task = tasks.find(function (task) {
        return task.id == id;
    });

    let newTitle = prompt("Enter new title:", task.title);

    if (newTitle == null || newTitle == "") {
        return;
    }

    let newDescription = prompt(
        "Enter new description:",
        task.description
    );

    if (newDescription == null || newDescription == "") {
        return;
    }

    task.title = newTitle;
    task.description = newDescription;

    // Update time
    task.updatedAt = new Date().toLocaleString();

    saveTasks();
    displayTasks();
}


// Change task status
function changeStatus(id, newStatus) {

    let task = tasks.find(function (task) {
        return task.id == id;
    });

    task.status = newStatus;

    // Update time
    task.updatedAt = new Date().toLocaleString();

    saveTasks();
    displayTasks();
}


// Display saved tasks when page opens
displayTasks();