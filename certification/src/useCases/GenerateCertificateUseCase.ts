import { GenerateCertificateDTO } from "../dto/GenerateCertificateDTO";
import { Certificate } from "../Providers/Certificate";

class GenerateCertificateUseCase {
  constructor(private certificateProvider: Certificate) {}

  public execute({ user, course, grade }: GenerateCertificateDTO): string {
    let level: string;

    if (grade === 10 || grade >= 7) {
      level = "Master";
    } else if (grade >= 5) {
      level = "Good student";
    } else {
      throw new Error("Reprovado! Certficado não pode ser gerado!");
    }

    const fileName = this.certificateProvider.create(user, course, level);

    return fileName;
  }
}

export { GenerateCertificateUseCase };
