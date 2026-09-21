export type SubjectId =
  | "physics"
  | "chemistry"
  | "maths"
  | "botany"
  | "zoology";

export type StreamId = "mpc" | "bipc";

export type ExamId = "ts-eamcet" | "jee-main" | "neet";

export type Subject = {
  id: SubjectId;
  name: string;
};

export type Chapter = {
  id: string;
  subjectId: SubjectId;
  name: string;
  /** TSBIE Intermediate year the chapter belongs to. */
  year: 1 | 2;
};

export type Stream = {
  id: StreamId;
  name: string;
  subjectIds: SubjectId[];
};

export type SubjectQuota = {
  subjectId: SubjectId;
  count: number;
};

export type Marking = {
  correct: number;
  wrong: number;
  unattempted: number;
};

export type Exam = {
  id: ExamId;
  name: string;
  authority: string;
  durationMinutes: number;
  marking: Marking;
  /** Question quota per subject, keyed by the streams this exam supports. */
  quotas: Partial<Record<StreamId, SubjectQuota[]>>;
};

export type PyqMeta = {
  appearCount: number;
  years: number[];
  exams: string[];
  /** False for bundled sample metadata, true once an imported source confirms it. */
  verified: boolean;
};

export type QuestionSource = {
  name: string;
  url?: string;
  license: string;
};

/** Diagrams shipped with a question, stored under public/questions/. */
export type QuestionImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type QuestionExam = "ts-eamcet" | "neet";

export type Question = {
  id: string;
  chapterId: string;
  subjectId: SubjectId;
  stem: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  images: QuestionImage[];
  pyq: PyqMeta;
  source: QuestionSource;
  difficulty?: QuestionDifficulty;
  conceptId?: string;
};

/** Question as delivered to the client during a live attempt: no answer key. */
export type ClientQuestion = {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  stem: string;
  options: string[];
  images: QuestionImage[];
  pyq: PyqMeta;
};

export type Owner =
  | { kind: "user"; id: string; email: string }
  | { kind: "guest"; id: string };

export type AttemptStatus = "in_progress" | "submitted";

export type Attempt = {
  id: string;
  examId: ExamId;
  streamId: StreamId;
  chapterIds: string[];
  questionIds: string[];
  durationMinutes: number;
  status: AttemptStatus;
  createdAt: string;
  submittedAt?: string;
  userId?: string;
  guestSessionId?: string;
  /** questionId -> chosen option index */
  answers: Record<string, number>;
  score?: AttemptScore;
};

export type SubjectScore = {
  subjectId: SubjectId;
  subjectName: string;
  total: number;
  correct: number;
  wrong: number;
  unattempted: number;
  marks: number;
  maxMarks: number;
};

export type AttemptScore = {
  marks: number;
  maxMarks: number;
  correct: number;
  wrong: number;
  unattempted: number;
  bySubject: SubjectScore[];
};
