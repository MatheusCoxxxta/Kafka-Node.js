import { Request, Response } from "express";
import { ConcludeCourseUseCase } from "../useCases/ConcludeCourseUseCase";

class CoursesController {
  public async concludeCourse(request: Request, response: Response) {
    const { name, course, grade } = request.body;
    const { producer } = request;

    const concludeCourseUseCase = new ConcludeCourseUseCase(producer);
    await concludeCourseUseCase.execute({ name, course, grade });

    return response.json({ ok: true });
  }
}

export { CoursesController };
