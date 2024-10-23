const { kafka, groupId, keyTopic } = require("./client");

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Express setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId });

// topic 등록
(async () => {
  const admin = kafka.admin();
  admin.connect();
  loggger('[kafka] Admin Connection Success');

  await admin.createTopics({
    topics: [
      {
        topic: keyTopic,
        numPartitions: 2,
      },
    ],
  });
  loggger(`[kafka] Created Topic [${keyTopic}]`);
})();

(async () => {
  // pub / sub 연결
  await producer.connect();
  await consumer.connect();

  // topic 구독
  await consumer.subscribe({ topics: [keyTopic], fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const receivedMessage = message.value.toString();
      loggger(`[kafka >> socket] message - ${groupId}: [${topic}]: PART:${partition}: receivedMessage`);

      // socket 메세지 발송
      io.emit('reciveMessage', receivedMessage);
    },
  });
})();

// Socket.IO connection
io.on('connection', (socket) => {
  loggger(`[socket] client connected: ${socket.id}`);

  socket.on('sendMessage', async (msg) => {
    loggger(`[socket][socket >> kafka] message - ${msg}`);

    // kafka 메세지 발송
    await producer.send({
      topic: keyTopic,
      messages: [{ value: msg }],
    });
  });

  socket.on('disconnect', () => {
    loggger(`[socket] client disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  loggger(`[socket] running on port: ${PORT}`);
});

function loggger(message) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(2, '0');

  console.log(`[${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}]${message}`);
}