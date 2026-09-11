const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");

const taskForm = document.getElementById("taskForm");

const pendingTasks = document.getElementById("pendingTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const completedTasks = document.getElementById("completedTasks");


// Open modal
addTaskBtn.addEventListener("click", function () {
    taskModal.style.display = "flex";
});


// Close modal
closeModal.addEventListener("click", function () {
    taskModal.style.display = "none";
});


// Close modal when clicking outside
window.addEventListener("click", function (event) {

    if (event.target === taskModal) {
        taskModal.style.display = "none";
    }

});


// Add task
taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const assignedTo = document.getElementById("assignedTo").value.trim();
    const status = document.getElementById("status").value;


    // Basic validation
    if (title === "" || description === "" || assignedTo === "") {

        alert("Please fill in all fields.");

        return;
    }


    // Create task card
    const taskCard = document.createElement("div");

    taskCard.className = "task-card";

    taskCard.innerHTML = `
        <h3>${title}</h3>

        <p>${description}</p>

        <p><strong>Assigned To:</strong> ${assignedTo}</p>

        <p><strong>Status:</strong> ${status}</p>

        <button>Edit</button>
        <button>Delete</button>
    `;


    // Add task to correct section
    if (status === "Pending") {

        pendingTasks.appendChild(taskCard);

    }
    else if (status === "In Progress") {

        inProgressTasks.appendChild(taskCard);

    }
    else if (status === "Completed") {

        completedTasks.appendChild(taskCard);

    }


    // Clear form
    taskForm.reset();


    // Close modal
    taskModal.style.display = "none";

});