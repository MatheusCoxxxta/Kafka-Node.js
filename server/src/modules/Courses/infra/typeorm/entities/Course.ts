import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("course")
class Course {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  user: string;

  @Column()
  grade: number;

  @Column()
  certificateUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Course };
