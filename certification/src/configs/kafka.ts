import { Kafka, logLevel } from "kafkajs";
import { GenerateCertificateUseCase } from "../useCases/GenerateCertificateUseCase";
import { UploadCertificateUseCase } from "../useCases/UploadCertificateUseCase";

interface IPayload {
  user: { id: string; user: string };
  name: string;
  grade: number;
}

interface ICertificateMessage {
  courseId: string;
  certificateUrl: string;
}

const kafka = new Kafka({
  clientId: "certificate",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING,
});

const topic = "issue-certificate";
const consumer = kafka.consumer({ groupId: "certificate-group" });

const generateCertificateUseCase = new GenerateCertificateUseCase();
const uploadCertificateUseCase = new UploadCertificateUseCase();

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

      const fileName = generateCertificateUseCase.execute({
        course: payload.name,
        user: payload.user.user,
        grade: payload.grade,
      });

      const certificateUrl = await uploadCertificateUseCase.execute(fileName);

      const cerificateMessage: ICertificateMessage = {
        courseId: payload.user.id,
        certificateUrl: certificateUrl || "",
      };

      producer.send({
        topic: "certification-response",
        messages: [
          {
            value: JSON.stringify(cerificateMessage),
          },
        ],
      });
    },
  });
}

export { run };
