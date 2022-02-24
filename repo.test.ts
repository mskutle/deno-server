import {
  assertEquals,
  assertExists,
  assert,
} from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { Feedback, Subject } from "./models.ts";
import repo from "./repo.ts";

const { test } = Deno;

const createTestDocument = (): Feedback => ({
  id: crypto.randomUUID(),
  subject: Subject.Middag,
  stars: 5,
  feedback: "Det beste måltidet i mitt liv 🦀",
});

test("A feedback can be saved to the database", async () => {
  const userFeedback = createTestDocument();
  const res = await repo.addFeedback(userFeedback);
  assertEquals(res, userFeedback);
});

test("A feedback can be saved and then deleted from the database", async () => {
  const userFeedback = createTestDocument();
  const addRes = await repo.addFeedback(userFeedback);
  const deleteRes = await repo.removeFeedback(userFeedback.id);
  assertEquals(deleteRes, userFeedback);
  assertEquals(deleteRes, addRes);
});

test("Can list all documents", async () => {
  const res = await repo.getAllFeedback();
  assertExists(res);
  assert(res?.length > 0);
  res?.forEach((o: any) => assertExists(o.id));
});

test("Can get a single document", async () => {
  const id = "c4116fda-7cd5-40c2-bc74-6225420de464";
  const res = await repo.getFeedback(id);
  assertExists(res);
  assertEquals(res?.id, id);
});

test("Can update a document", async () => {
  const userFeedback = createTestDocument();
  await repo.addFeedback(userFeedback);
  const update: Feedback = { ...userFeedback, stars: 1, feedback: "It is ok" };
  const updatedFeedback = await repo.updateFeedback(userFeedback.id, update);
  assertEquals(updatedFeedback, update);
});
