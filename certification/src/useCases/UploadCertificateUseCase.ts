import fs from "fs/promises";
import { FileUpload } from "../Providers/FileUpload";

class UploadCertificateUseCase {
  private uploadProvider: FileUpload;

  constructor() {
    this.uploadProvider = new FileUpload();
  }

  async execute(filePath: string): Promise<string | undefined> {
    const certificateUrl = await this.uploadProvider.execute(filePath);

    fs.unlink(`tmp/${filePath}`);

    return certificateUrl;
  }
}

export { UploadCertificateUseCase };
