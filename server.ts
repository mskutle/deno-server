import { Application, Router } from "./deps.ts";
import controller from "./controller.ts";

const app = new Application();
const router = new Router();

router.get("/feedback/:id", controller.getFeedback);
router.get("/feedback", controller.getAllFeedback);
router.post("/feedback", controller.addFeedback);
router.put("/feedback/:id", controller.updateFeedback);
router.delete("/feedback/:id", controller.deleteFeedback);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
