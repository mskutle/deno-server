import { RouterContext, State, Status } from "./deps.ts";
import { Feedback } from "./models.ts";
import repo from "./repo.ts";

async function getFeedback(
  ctx: RouterContext<"/feedback/:id", { id: string }>
) {
  const { id } = ctx.params;
  ctx.response.body = await repo.getFeedback(id);
}

async function getAllFeedback(ctx: RouterContext<"/feedback", State>) {
  ctx.response.body = await repo.getAllFeedback();
}

async function addFeedback(ctx: RouterContext<"/feedback", State>) {
  const body = await ctx.request.body();
  const value = (await body.value) as Feedback;
  if (!value?.id) {
    value.id = crypto.randomUUID();
  }
  const written = await repo.addFeedback(value);
  ctx.response.body = written;
}

async function updateFeedback(
  ctx: RouterContext<"/feedback/:id", { id: string }>
) {
  const { id } = ctx.params;
  const body = await ctx.request.body();
  const value = (await body.value) as Feedback;
  if (value?.id && value?.id !== id) {
    ctx.response.status = Status.BadRequest;
    return;
  }
  const written = await repo.updateFeedback(id, value);
  ctx.response.body = written;
}

async function deleteFeedback(
  ctx: RouterContext<"/feedback/:id", { id: string }>
) {
  const { id } = ctx.params;
  ctx.response.body = await repo.removeFeedback(id);
}

export default {
  getFeedback,
  getAllFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};
