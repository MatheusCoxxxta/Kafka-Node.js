import { ICourse } from "../ICourse";
import { v4 as uuidV4 } from "uuid";

export type CourseType = {
  id: string;
  name: string;
  course: string;
  grade: number;
};

class Course implements ICourse {
  private course: CourseType[];

  private static INSTANCE: Course;

  public static getInstance(): Course {
    if (!Course.INSTANCE) {
      Course.INSTANCE = new Course();
    }
    return Course.INSTANCE;
  }

  constructor() {
    this.course = [];
  }

  public add({ name, course, grade }: CourseType): string {
    const id = uuidV4();

    this.course.push({ id, name, course, grade });

    return id;
  }
}

export { Course };
