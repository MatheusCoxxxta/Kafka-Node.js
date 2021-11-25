import { Request, Response } from "express";
import { GenerateCertificateUseCase } from "../useCases/GenerateCertificateUseCase";

class CoursesController {
  public async concludeCourse(request: Request, response: Response) {
    const { name, course, grade } = request.body;
    const { producer } = request;

    const generateCertificateUseCase = new GenerateCertificateUseCase(producer);

    await generateCertificateUseCase.execute({ name, course, grade });

    return response.json({ ok: true });
  }
}

export { CoursesController };
