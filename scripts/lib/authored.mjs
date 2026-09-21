import { stemsClash } from "./stems.mjs";

export const EXAM_LABEL = {
  "ts-eamcet": "TS EAMCET",
  neet: "NEET",
};

export function collectCoverage(concepts, questions) {
  const missing = [];
  for (const concept of concepts) {
    for (const exam of ["ts-eamcet", "neet"]) {
      const hit = questions.some(
        (q) => q.conceptId === concept.id && q.exam === exam,
      );
      if (!hit) missing.push({ conceptId: concept.id, exam });
    }
  }
  return { missing };
}

export function mixShares(questions) {
  const total = questions.length || 1;
  const easy = questions.filter((q) => q.difficulty === "easy").length;
  const medium = questions.filter((q) => q.difficulty === "medium").length;
  const hard = questions.filter((q) => q.difficulty === "hard").length;
  return {
    easy: easy / total,
    medium: medium / total,
    hard: hard / total,
    counts: { easy, medium, hard, total: questions.length },
  };
}

function examLabel(exam) {
  return EXAM_LABEL[exam];
}

export function fileErrors(raw, { chapterId, concepts, existing }) {
  const errors = [];
  const questions = raw.questions ?? [];
  const conceptIds = new Set(concepts.map((c) => c.id));
  const seenIds = new Set((existing ?? []).map((q) => q.id));
  const existingStems = (existing ?? []).map((q) => q.stem);

  if (raw.subjectId && chapterId && !chapterId.startsWith(`${raw.subjectId}-`)) {
    errors.push(`subjectId ${raw.subjectId} does not match chapter ${chapterId}`);
  }

  for (const [index, question] of questions.entries()) {
    const where = question.id ?? `#${index}`;
    if (!question.id) errors.push(`${where}: missing id`);
    else if (seenIds.has(question.id)) errors.push(`${where}: id already in the bank`);
    seenIds.add(question.id);

    if (question.chapterId !== chapterId) {
      errors.push(`${where}: chapterId must be ${chapterId}`);
    }
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${where}: needs exactly 4 options`);
    } else if (new Set(question.options).size !== 4) {
      errors.push(`${where}: options must be distinct`);
    }
    if (
      typeof question.answerIndex !== "number" ||
      question.answerIndex < 0 ||
      question.answerIndex >= (question.options?.length ?? 0)
    ) {
      errors.push(`${where}: answerIndex out of range`);
    }
    const stem = String(question.stem ?? "");
    if (stem.length < 20 || stem.length > 420) {
      errors.push(`${where}: stem length ${stem.length}`);
    }
    if (!String(question.explanation ?? "").trim()) {
      errors.push(`${where}: explanation required`);
    }
    if (!examLabel(question.exam)) {
      errors.push(`${where}: exam must be ts-eamcet or neet`);
    }
    if (!["easy", "medium", "hard"].includes(question.difficulty)) {
      errors.push(`${where}: difficulty must be easy, medium, or hard`);
    }
    if (!conceptIds.has(question.conceptId)) {
      errors.push(`${where}: unknown conceptId ${question.conceptId}`);
    }

    const pyq = question.pyq ?? {};
    const label = examLabel(question.exam);
    if (pyq.appearCount !== 0) errors.push(`${where}: appearCount must be 0`);
    if ((pyq.years ?? []).length !== 0) errors.push(`${where}: years must be empty`);
    if (pyq.verified) errors.push(`${where}: verified must be false`);
    if (!label || !Array.isArray(pyq.exams) || pyq.exams.length !== 1 || pyq.exams[0] !== label) {
      errors.push(`${where}: pyq.exams must be exactly ["${label}"]`);
    }

    for (const other of questions) {
      if (other === question) continue;
      if (other.stem && question.stem && stemsClash(other.stem, question.stem)) {
        errors.push(`${where}: duplicate stem of ${other.id}`);
        break;
      }
    }
    for (const stem of existingStems) {
      if (question.stem && stemsClash(question.stem, stem)) {
        errors.push(`${where}: duplicate stem of an existing bank item`);
        break;
      }
    }
  }

  const { missing } = collectCoverage(concepts, questions);
  for (const gap of missing) {
    errors.push(`missing ${gap.exam} item for concept ${gap.conceptId}`);
  }

  for (const exam of ["ts-eamcet", "neet"]) {
    const slice = questions.filter((q) => q.exam === exam);
    if (slice.length < 8) continue;
    const mix = mixShares(slice);
    if (mix.easy < 0.6 || mix.easy > 0.8) {
      errors.push(`${exam} easy share ${mix.easy.toFixed(2)} is outside 0.60–0.80`);
    }
    if (mix.hard > 0.15) {
      errors.push(`${exam} hard share ${mix.hard.toFixed(2)} exceeds 0.15`);
    }
  }

  return errors;
}

/** Chemistry wave: shared pool, empty PYQ exams, 60/30/10 mix, concept quotas. */
export function chemFileErrors(raw, { chapterId, concepts, existing }) {
  const errors = [];
  const questions = raw.questions ?? [];
  const conceptIds = new Set(concepts.map((c) => c.id));
  const seenIds = new Set((existing ?? []).map((q) => q.id));
  const existingStems = (existing ?? []).map((q) => q.stem);

  if (raw.subjectId !== "chemistry") {
    errors.push(`subjectId must be chemistry`);
  }
  if (raw.subjectId && chapterId && !chapterId.startsWith(`${raw.subjectId}-`)) {
    errors.push(`subjectId ${raw.subjectId} does not match chapter ${chapterId}`);
  }

  for (const [index, question] of questions.entries()) {
    const where = question.id ?? `#${index}`;
    if (!question.id) errors.push(`${where}: missing id`);
    else if (seenIds.has(question.id)) errors.push(`${where}: id already in the bank`);
    seenIds.add(question.id);

    if (question.chapterId !== chapterId) {
      errors.push(`${where}: chapterId must be ${chapterId}`);
    }
    if (question.exam) {
      errors.push(`${where}: Chemistry items must not set exam (shared pool)`);
    }
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${where}: needs exactly 4 options`);
    } else if (new Set(question.options).size !== 4) {
      errors.push(`${where}: options must be distinct`);
    }
    if (
      typeof question.answerIndex !== "number" ||
      question.answerIndex < 0 ||
      question.answerIndex >= (question.options?.length ?? 0)
    ) {
      errors.push(`${where}: answerIndex out of range`);
    }
    const stem = String(question.stem ?? "");
    if (stem.length < 20 || stem.length > 420) {
      errors.push(`${where}: stem length ${stem.length}`);
    }
    if (!String(question.explanation ?? "").trim()) {
      errors.push(`${where}: explanation required`);
    }
    if (!["easy", "medium", "hard"].includes(question.difficulty)) {
      errors.push(`${where}: difficulty must be easy, medium, or hard`);
    }
    if (!conceptIds.has(question.conceptId)) {
      errors.push(`${where}: unknown conceptId ${question.conceptId}`);
    }

    const pyq = question.pyq ?? {};
    if (pyq.appearCount !== 0) errors.push(`${where}: appearCount must be 0`);
    if ((pyq.years ?? []).length !== 0) errors.push(`${where}: years must be empty`);
    if (pyq.verified) errors.push(`${where}: verified must be false`);
    if ((pyq.exams ?? []).length !== 0) {
      errors.push(`${where}: pyq.exams must be empty for Chemistry`);
    }

    for (const other of questions) {
      if (other === question) continue;
      if (other.stem && question.stem && stemsClash(other.stem, question.stem)) {
        errors.push(`${where}: duplicate stem of ${other.id}`);
        break;
      }
    }
    for (const stemText of existingStems) {
      if (question.stem && stemsClash(question.stem, stemText)) {
        errors.push(`${where}: duplicate stem of an existing bank item`);
        break;
      }
    }
  }

  for (const concept of concepts) {
    const slice = questions.filter((q) => q.conceptId === concept.id);
    if (slice.length === 0) {
      errors.push(`missing items for concept ${concept.id}`);
    } else if (!slice.some((q) => q.difficulty === "easy")) {
      errors.push(`concept ${concept.id} needs at least one easy item`);
    }
    if (typeof concept.quota === "number" && slice.length < concept.quota) {
      errors.push(
        `concept ${concept.id} has ${slice.length} items, quota ${concept.quota}`,
      );
    }
  }

  if (questions.length >= 20) {
    const mix = mixShares(questions);
    if (mix.easy < 0.5 || mix.easy > 0.7) {
      errors.push(`easy share ${mix.easy.toFixed(2)} is outside 0.50–0.70`);
    }
    if (mix.medium < 0.2 || mix.medium > 0.4) {
      errors.push(`medium share ${mix.medium.toFixed(2)} is outside 0.20–0.40`);
    }
    if (mix.hard > 0.2) {
      errors.push(`hard share ${mix.hard.toFixed(2)} exceeds 0.20`);
    }
  }

  return errors;
}
