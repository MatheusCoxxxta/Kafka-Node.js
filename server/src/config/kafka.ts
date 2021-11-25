import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
  logLevel: logLevel.WARN,
});

export { kafka };
