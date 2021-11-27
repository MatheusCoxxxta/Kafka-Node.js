import { ConcludeCourseDTO } from "../dto/ConcludeCourseDTO";

export interface ICourse {
  add({ name, course, grade }: ConcludeCourseDTO): string;
}
