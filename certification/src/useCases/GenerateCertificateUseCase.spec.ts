import { FakeCertificate } from "../Providers/fakes/FakeCertificate";
import ICertificate from "../Providers/ICertificate";
import { GenerateCertificateUseCase } from "./GenerateCertificateUseCase";

let fakeCertificate: ICertificate;
let generateCertificateUseCase: GenerateCertificateUseCase;

describe("GenerateCertificateUseCase", () => {
  beforeEach(() => {
    fakeCertificate = new FakeCertificate();
    generateCertificateUseCase = new GenerateCertificateUseCase(
      fakeCertificate
    );
  });

  it("should return a string file name", () => {
    const fileName = generateCertificateUseCase.execute({
      user: "Matheus",
      course: "Node.js Event Driven Architecture",
      grade: 10,
    });

    console.log(typeof fileName);

    expect(typeof fileName).toBe(typeof "string");
  });

  it("should return error because user reproved", () => {
    try {
      generateCertificateUseCase.execute({
        user: "Matheus",
        course: "Node.js Event Driven Architecture",
        grade: 4,
      });
    } catch (error: any) {
      expect(error.message).toEqual(
        "Reprovado! Certficado não pode ser gerado!"
      );
    }
  });
});
