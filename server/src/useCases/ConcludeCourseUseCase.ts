import { ConcludeCourseDTO } from "../dto/ConcludeCourseDTO";
import { ICourse } from "../models/ICourse";
import { Course } from "../models/implementations/Course";

class ConcludeCourseUseCase {
  private course: ICourse;
  constructor(private producer: Producer) {
    this.course = Course.getInstance();
  }

  async execute({ name, course, grade }: ConcludeCourseDTO): Promise<void> {
    this.course.add({ name, course, grade });

    const message = {
      user: { id: 1, name },
      course,
      grade,
    };

    await this.producer.send({
      topic: "issue-certificate",
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  }
}

export { ConcludeCourseUseCase };
