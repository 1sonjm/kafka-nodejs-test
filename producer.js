const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    await producer.send({
      topic: keyTopic,
      messages: [
        {
          key: "location-update",
          value: JSON.stringify({ inputText: line, datetime: new Date().getTime }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();