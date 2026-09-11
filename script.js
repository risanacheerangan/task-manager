const addTaskBtn = document.getElementById("addTaskBtn");

const taskModal = document.getElementById("taskModal");

const closeModal = document.getElementById("closeModal");


addTaskBtn.addEventListener("click", function () {

    taskModal.style.display = "flex";

});


closeModal.addEventListener("click", function () {

    taskModal.style.display = "none";

});


window.addEventListener("click", function (event) {

    if (event.target === taskModal) {

        taskModal.style.display = "none";

    }

});