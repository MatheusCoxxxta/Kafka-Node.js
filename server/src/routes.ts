import { Router } from "express";

const routes = Router();

routes.post("/certifications", async (request, response) => {
  const { producer } = request;

  const message = {
    user: { id: 1, name: "Matheus Costa" },
    course: "Kafka com Node.js",
    grade: 10,
  };

  await producer.send({
    topic: "issue-certificate",
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });

  return response.json({ ok: true });
});

export default routes;
