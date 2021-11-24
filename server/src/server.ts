import express, { Request } from "express";
import { Kafka, logLevel } from "kafkajs";
import routes from "./routes";

const app = express();

const kafka = new Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
  logLevel: logLevel.WARN,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "certificate-group-receiver" });
const topic = "certification-response";

app.use((request: Request, response, next) => {
  request.producer = producer;

  return next();
});

app.use(routes);

async function run() {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Response: ", String(message.value));
    },
  });

  console.log("Consumer connected!");

  app.listen(3333);
}

run().catch(console.error);
