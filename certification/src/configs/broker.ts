import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: "certificate",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING,
});

const consumer = kafka.consumer({ groupId: "certificate-group" });

export default consumer;
