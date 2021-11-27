import { Kafka, logLevel } from "kafkajs";

interface IPayload {
  user: { id: number; user: string };
  name: string;
  grade: number;
}

const kafka = new Kafka({
  clientId: "certificate",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING,
});

const topic = "issue-certificate";
const consumer = kafka.consumer({ groupId: "certificate-group" });

const producer = kafka.producer();
async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      const payload: IPayload = JSON.parse(message.value);

      producer.send({
        topic: "certification-response",
        messages: [
          {
            value: `Certificate to user ${payload.user.user} from ${payload.name} course generated sucessfully!`,
          },
        ],
      });
    },
  });
}

export { run };
