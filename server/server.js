const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3001;

io.on('connection', (socket) => {
  console.log('Новый пользователь подключился');

  socket.on('assignAgent', ({ userId }) => {
    const agentId = 123;
    socket.emit('agentAssigned', agentId);
  });

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
