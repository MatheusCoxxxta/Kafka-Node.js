import { GenerateCertificateDTO } from "../DTO/GenerateCertificateDTO";

class GenerateCertificateUseCase {
  constructor(private producer: Producer) {}

  async execute({ name, course, grade }: GenerateCertificateDTO) {
    const message = {
      user: { id: 1, name },
      course,
      grade,
    };

    await this.producer.send({
      topic: "issue-certificate",
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  }
}

export { GenerateCertificateUseCase };
