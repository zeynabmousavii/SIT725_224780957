const socket = io();

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

socket.on("loadTasks", (tasks) => {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>Status: <strong>${task.status}</strong></p>

      <button onclick="changeStatus(${task.id}, 'To Do')">To Do</button>
      <button onclick="changeStatus(${task.id}, 'In Progress')">In Progress</button>
      <button onclick="changeStatus(${task.id}, 'Done')">Done</button>
    `;

    taskList.appendChild(card);
  });
});

function addTask() {
  const title = taskInput.value.trim();

  if (title === "") {
    alert("Please enter a task");
    return;
  }

  socket.emit("addTask", title);
  taskInput.value = "";
}

function changeStatus(id, status) {
  socket.emit("updateStatus", { id, status });
}