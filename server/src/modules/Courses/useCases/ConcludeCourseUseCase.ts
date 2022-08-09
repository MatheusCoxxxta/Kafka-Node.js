import { ConcludeCourseDTO } from "../dto/ConcludeCourseDTO";
import { ICourseRepository } from "../repositories/ICourseRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ConcludeCourseUseCase {
  constructor(
    @inject("CourseRepository")
    private courseRepository: ICourseRepository
  ) {}

  async execute({ name, user, grade }: ConcludeCourseDTO): Promise<string> {
    const id = await this.courseRepository.add({ name, user, grade });

    return id;
  }
}

export { ConcludeCourseUseCase };
