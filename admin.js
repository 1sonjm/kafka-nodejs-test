const { kafka, keyTopic } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Admin Connection Success...");

  console.log("Creating Topic [new-topic]");
  await admin.createTopics({
    topics: [
      {
        topic: keyTopic,
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [new-topic]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();