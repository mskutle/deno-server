export interface Feedback {
  id: string;
  subject: Subject;
  feedback: string | undefined;
  stars: Star | undefined;
}

export type Star = 1 | 2 | 3 | 4 | 5;

export enum Subject {
  "Workshop",
  "Middag",
  "Dagen der på",
}
