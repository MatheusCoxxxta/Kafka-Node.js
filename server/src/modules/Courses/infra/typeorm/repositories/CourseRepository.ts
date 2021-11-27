import { v4 as uuidV4 } from "uuid";
import { ConcludeCourseDTO } from "../../../dto/ConcludeCourseDTO";
import { ICourseRepository } from "../../../repositories/ICourseRepository";
import { Course } from "../entities/Course";
import { Repository, getRepository } from "typeorm";

export type CourseType = {
  id: string;
  user: string;
  name: string;
  grade: number;
};

class CourseRepository implements ICourseRepository {
  private repository: Repository<Course>;

  constructor() {
    this.repository = getRepository(Course);
  }

  public async add({ name, user, grade }: ConcludeCourseDTO): Promise<string> {
    const createdCourse = this.repository.create({
      user,
      name,
      grade,
    });

    await this.repository.save(createdCourse);

    return createdCourse.id;
  }
}

export { CourseRepository };
