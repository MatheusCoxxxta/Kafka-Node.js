import { ConcludeCourseDTO } from "../dto/ConcludeCourseDTO";

export interface ICourseRepository {
  add({ name, user, grade }: ConcludeCourseDTO): Promise<string>;
}
