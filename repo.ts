import { Feedback } from "./models.ts";
import * as db from "./db.ts";

function addFeedback(feedback: Feedback): Promise<Feedback> {
  return db.insert("feedback", feedback);
}

function removeFeedback(id: string): Promise<Feedback> {
  return db.remove("feedback_id", id);
}

function getAllFeedback(): Promise<Feedback[]> {
  return db.getAll("feedback_all");
}

function getFeedback(id: string): Promise<Feedback> {
  return db.get("feedback_id", id);
}

function updateFeedback(id: string, obj: Feedback): Promise<Feedback> {
  return db.update("feedback_id", id, obj);
}

export default {
  addFeedback,
  removeFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedback,
};
