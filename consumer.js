const { kafka, groupId } = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: groupId });
  await consumer.connect();

  await consumer.subscribe({ topics: [keyTopic], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${groupId}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();