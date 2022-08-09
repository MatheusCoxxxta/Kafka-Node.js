import { Consumer } from "kafkajs";
import { GenerateCertificateUseCase } from "../useCases/GenerateCertificateUseCase";

const generateCertificateUseCase = new GenerateCertificateUseCase();

interface IPayload {
  user: { id: string; user: string };
  name: string;
  grade: number;
}

class Controller {
  constructor(private broker: Consumer) {
    this.init();
  }

  private async init() {
    await this.broker.subscribe({ topic: "issue-certificate" });
    await this.broker.connect();
  }

  public async handle() {
    await this.broker.run({
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

        console.log(fileName);
      },
    });
  }
}

export default Controller;
