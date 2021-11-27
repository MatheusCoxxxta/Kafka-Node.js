import { Kafka, logLevel } from "kafkajs";
import { GenerateCertificateUseCase } from "../useCases/GenerateCertificateUseCase";

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

const generateCertificateUseCase = new GenerateCertificateUseCase();

const producer = kafka.producer();
async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let payload: IPayload;

      if (message.value === null) {
        payload = {} as IPayload;
      } else {
        payload = JSON.parse(message.value.toString());
      }

      const filePath = generateCertificateUseCase.execute({
        course: payload.name,
        user: payload.user.user,
        grade: payload.grade,
      });

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
