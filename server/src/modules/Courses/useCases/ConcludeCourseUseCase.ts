import { ConcludeCourseDTO } from "../dto/ConcludeCourseDTO";
import { ICourseRepository } from "../repositories/ICourseRepository";

class ConcludeCourseUseCase {
  constructor(
    private producer: Producer,
    private courseRepository: ICourseRepository
  ) {}

  async execute({ name, user, grade }: ConcludeCourseDTO): Promise<void> {
    const id = this.courseRepository.add({ name, user, grade });

    const message = {
      user: { id, user },
      name,
      grade,
    };

    await this.producer.send({
      topic: "issue-certificate",
      messages: [
        {
          key: id,
          value: JSON.stringify(message),
        },
      ],
    });
  }
}

export { ConcludeCourseUseCase };
