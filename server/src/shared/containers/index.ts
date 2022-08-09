import { container } from "tsyringe";
import FakeCourseRepository from "../../modules/Courses/repositories/fakes/FakeCourseRepository";
import { ICourseRepository } from "../../modules/Courses/repositories/ICourseRepository";

container.registerSingleton<ICourseRepository>(
  "CourseRepository",
  FakeCourseRepository
);
