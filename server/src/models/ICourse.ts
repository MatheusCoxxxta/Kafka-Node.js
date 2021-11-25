import { ConcludeCourseDTO } from "../DTO/ConcludeCourseDTO";

export interface ICourse {
  add({ name, course, grade }: ConcludeCourseDTO): void;
}
