import broker from "./configs/broker";

import CreateController from "./controllers/Create";

const createController = new CreateController(broker);

async function run() {
  await createController.handle();
}

run().catch(console.error);
