import { GenerateCertificateDTO } from "../dto/GenerateCertificateDTO";
import PDFDocument from "pdfkit";
import fs from "fs";
import { Certificate } from "../Providers/Certificate";

class GenerateCertificateUseCase {
  private certificateProvider: Certificate;

  constructor() {
    this.certificateProvider = new Certificate();
  }

  public execute({ user, course, grade }: GenerateCertificateDTO): string {
    let level: string;

    if (grade === 10 || grade >= 7) {
      level = "Master";
    } else {
      level = "Good student";
    }

    const fileName = this.certificateProvider.create(user, course, level);

    return fileName;
  }
}

export { GenerateCertificateUseCase };
