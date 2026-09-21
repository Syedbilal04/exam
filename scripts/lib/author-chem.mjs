export const SOURCE = {
  name: "ASTRA chemistry practice set",
  license:
    "Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)",
};

export const EMPTY_PYQ = {
  appearCount: 0,
  years: [],
  exams: [],
  verified: false,
};

export function item({
  prefix,
  index,
  chapterId,
  conceptId,
  difficulty,
  stem,
  options,
  answerIndex,
  explanation,
}) {
  return {
    id: `${prefix}-${String(index).padStart(3, "0")}`,
    chapterId,
    conceptId,
    difficulty,
    stem,
    options,
    answerIndex,
    explanation,
    pyq: { ...EMPTY_PYQ },
  };
}

export function pack(questions) {
  return {
    subjectId: "chemistry",
    source: SOURCE,
    questions,
  };
}
