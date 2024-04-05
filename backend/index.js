const express = require("express");
const userModel = require("./models");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const cors = require("cors");
const PORT = process.env.PORT || 4001;
database.connect();
const multer = require("multer");
const path = require("path");
const { socket } = require("socket.io");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const server = require('http').Server(app);
app.use("/uploads", express.static("uploads"))
require("./socket/socket")(server)
app.use("/api", require("./routes"));
server.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
let users = [];
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
// io.on("connection", (socket) => {
//   console.log("Connected to socket.io", socket.id);
//   socket.on("addUser", (userId) => {
//     const isUserExist = users.find((user) => user.userId);
//     if (!isUserExist) {
//       const user = { userId, socketId: socket.id };
//       console.log("userawqdege",user)
//       users.push(user);
//       io.emit("getUser", users);
//       console.log("userssssssss",users)
//     }
//     socket.userId = userId;
//   });
//   socket.on(
    // "sendMessage",
    // async ({ senderId, receiverId, message, conversationId }) => {
    //   console.log("RecieverId",receiverId)
    //   const receiver = users.find((user) => user.userId === receiverId);
    //   const sender = users.find((user) => user.userId === senderId);
    //   console.log("senderWCFDWEGFER", sender);
    //   console.log("RECEIWCFDWEGFER", receiver);
    //   const user = await userModel.userModel.findById(senderId);
    //   if (receiver) {
  //       io.to(receiver?.socketId)
  //         .to(sender?.socketId)
  //         .emit("getMessage", {
  //           senderId,
  //           message,
  //           conversationId,
  //           receiverId,
  //           user: {
  //             id: user._id,
  //             firstName: user.firstName,
  //             email: user.email,
  //           },
  //         });
  //     }
  //   }
  // );
  // socket.on("disconnect", () => {
  //   users = users.filter((user) => user.socketId !== socket.id);
  //   io.emit("getUsers", users);
  // });
  // io.emit('getUser' ,socket.userId)
  // socket.on("join chat", (room) => {
  //   socket.join(room);
  //   console.log("User Joined Room: " + room);
  // });
  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  // socket.on("new message", (newMessageRecieved) => {
  //   var chat = newMessageRecieved.chat;
  // if (!chat.users) return console.log("chat.users not defined");
  //   chat.users.forEach((user) => {
  //     if (user._id == newMessageRecieved.sender._id) return;
  //     socket.in(user._id).emit("message recieved", newMessageRecieved);
  //   });
  // });

  // socket.off("setup", () => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData._id);
// });
