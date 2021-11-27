import { Request, Response } from "express";
import { ConcludeCourseUseCase } from "../../useCases/ConcludeCourseUseCase";
import { container } from "tsyringe";

class CoursesController {
  public async concludeCourse(request: Request, response: Response) {
    const { name, user, grade } = request.body;
    const { producer } = request;

    const concludeCourseUseCase = container.resolve(ConcludeCourseUseCase);

    await concludeCourseUseCase.execute({ name, user, grade }, producer);

    return response.json({ ok: true });
  }
}

export { CoursesController };
