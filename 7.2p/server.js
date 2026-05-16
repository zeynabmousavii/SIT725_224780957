const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let tasks = [
  { id: 1, title: "Design login page", status: "To Do" },
  { id: 2, title: "Create database model", status: "In Progress" },
  { id: 3, title: "Test dashboard UI", status: "Done" }
];

app.get('/api/message', (req, res) => {
    res.json({
        message: "Socket.IO server is running"
    });
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("loadTasks", tasks);

  socket.on("addTask", (taskTitle) => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      status: "To Do"
    };

    tasks.push(newTask);
    io.emit("loadTasks", tasks);
  });

  socket.on("updateStatus", ({ id, status }) => {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );

    io.emit("loadTasks", tasks);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 3000;

if (require.main === module) {
    server.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;