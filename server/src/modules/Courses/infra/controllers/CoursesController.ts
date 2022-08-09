import { Request, Response } from "express";
import { ConcludeCourseUseCase } from "../../useCases/ConcludeCourseUseCase";
import { container } from "tsyringe";

class CoursesController {
  public async concludeCourse(request: Request, response: Response) {
    const { name, user, grade } = request.body;
    const { producer } = request;

    const concludeCourseUseCase = container.resolve(ConcludeCourseUseCase);

    const id = await concludeCourseUseCase.execute({ name, user, grade });

    const message = {
      user: { id, user },
      name,
      grade,
    };

    await producer.send({
      topic: "issue-certificate",
      messages: [
        {
          key: id,
          value: JSON.stringify(message),
        },
      ],
    });

    return response.json({ ok: true });
  }
}

export { CoursesController };
