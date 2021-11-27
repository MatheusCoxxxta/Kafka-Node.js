import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { CoursesController } from "../../../modules/Courses/infra/controllers/CoursesController";

const coursesController = new CoursesController();

const routes = Router();

routes.post(
  "/certifications",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      user: Joi.string().required(),
      grade: Joi.number().required(),
    }),
  }),
  coursesController.concludeCourse
);

export default routes;
