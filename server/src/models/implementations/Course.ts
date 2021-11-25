import { ICourse } from "../ICourse";

export type CourseType = {
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

  public add({ name, course, grade }: CourseType): void {
    this.course.push({ name, course, grade });
  }
}

export { Course };
