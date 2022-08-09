import { ConcludeCourseDTO } from "../../dto/ConcludeCourseDTO";
import { ICourseRepository } from "../ICourseRepository";
import { v4 as uuid } from "uuid";

class FakeCourseRepository implements ICourseRepository {
  public add({ name, user, grade }: ConcludeCourseDTO): Promise<string> {
    return Promise.resolve(uuid());
  }
}

export default FakeCourseRepository;
