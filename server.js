const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/chatAppDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// middleware

// Express routes
app.get("/", (req, res) => {
  res.send("Chat App API");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
