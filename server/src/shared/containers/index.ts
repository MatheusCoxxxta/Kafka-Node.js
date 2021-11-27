import { container } from "tsyringe";
import { CourseRepository } from "../../modules/Courses/infra/typeorm/repositories/CourseRepository";
import { ICourseRepository } from "../../modules/Courses/repositories/ICourseRepository";

container.registerSingleton<ICourseRepository>(
  "CourseRepository",
  CourseRepository
);
