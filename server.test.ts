import {
  assertEquals,
  assertExists,
  assert,
} from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { Feedback } from "./models.ts";

const { test } = Deno;
const baseUrl = "http://localhost:8000";

test("I should get all posts", async () => {
  const res = await fetch(`${baseUrl}/feedback`);
  assert(res.ok);
  const data = (await res.json()) as Feedback[];
  assertExists(data);
  assert(data?.length > 0);
});

test("I should get a single post", async () => {
  const id = "c4116fda-7cd5-40c2-bc74-6225420de464";
  const res = await fetch(`${baseUrl}/feedback/${id}`);
  assert(res.ok);
  const data = (await res.json()) as Feedback;
  assertExists(data);
  assertEquals(data.id, id);
});

test("I should add a single post", async () => {
  const document = {
    subject: 2,
    stars: 3,
    feedback: "Det var greit nok",
  };
  const res = await fetch(`${baseUrl}/feedback`, {
    method: "POST",
    body: JSON.stringify(document),
    headers: [["content-type", "application/json"]],
  });
  assert(res.ok);
  const data = (await res.json()) as Feedback;
  assertExists(data);
  const { subject, stars, feedback } = data;
  assertEquals({ subject, stars, feedback }, document);
});

test("I should add and update a post", async () => {
  const document = {
    subject: 2,
    stars: 1,
    feedback: "Det var ikke bra",
  };
  const posted = await fetch(`${baseUrl}/feedback`, {
    method: "POST",
    body: JSON.stringify(document),
    headers: [["content-type", "application/json"]],
  });
  assert(posted.ok, "Created");
  const postedData = (await posted.json()) as Feedback;
  assertExists(postedData, "Created has data");
  const updatedDocument = {
    ...postedData,
    subject: 2,
    stars: 5,
    feedback: "Jeg ombestemte meg. Det var dritbra.",
  };
  const updated = await fetch(`${baseUrl}/feedback/${postedData?.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedDocument),
    headers: [["content-type", "application/json"]],
  });
  assert(updated.ok, "Updates");
  const updatedData = (await updated.json()) as Feedback;
  assertExists(updatedData, "Update has data");
  assertEquals(updatedData, updatedDocument);
});
