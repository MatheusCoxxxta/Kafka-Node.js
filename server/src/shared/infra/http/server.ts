import "reflect-metadata";
import express, { Request } from "express";
import "../../containers";
import { kafka } from "../../../config/kafka";
import "../typeorm";
import routes from "./routes";

const app = express();

app.use(express.json());

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
      console.log("Response: ", JSON.parse(message.value));
    },
  });

  console.log("Consumer connected!");

  app.listen(3333);
}

run().catch(console.error);
