const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

exports.groupId = 'message'
exports.keyTopic = 'notify'