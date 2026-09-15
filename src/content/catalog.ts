import type {
  Chapter,
  Exam,
  ExamId,
  Stream,
  StreamId,
  Subject,
  SubjectId,
} from "@/lib/types";

export const subjects: Subject[] = [
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "maths", name: "Mathematics" },
  { id: "botany", name: "Botany" },
  { id: "zoology", name: "Zoology" },
];

export const streams: Stream[] = [
  { id: "mpc", name: "MPC", subjectIds: ["maths", "physics", "chemistry"] },
  {
    id: "bipc",
    name: "BiPC",
    subjectIds: ["botany", "zoology", "physics", "chemistry"],
  },
];

export const exams: Exam[] = [
  {
    id: "ts-eamcet",
    name: "TS EAMCET",
    authority: "TSCHE",
    durationMinutes: 180,
    marking: { correct: 1, wrong: 0, unattempted: 0 },
    quotas: {
      mpc: [
        { subjectId: "maths", count: 80 },
        { subjectId: "physics", count: 40 },
        { subjectId: "chemistry", count: 40 },
      ],
      bipc: [
        { subjectId: "botany", count: 40 },
        { subjectId: "zoology", count: 40 },
        { subjectId: "physics", count: 40 },
        { subjectId: "chemistry", count: 40 },
      ],
    },
  },
  {
    id: "jee-main",
    name: "JEE Main",
    authority: "NTA",
    durationMinutes: 180,
    marking: { correct: 4, wrong: -1, unattempted: 0 },
    quotas: {
      mpc: [
        { subjectId: "physics", count: 25 },
        { subjectId: "chemistry", count: 25 },
        { subjectId: "maths", count: 25 },
      ],
    },
  },
  {
    id: "neet",
    name: "NEET",
    authority: "NTA",
    durationMinutes: 200,
    marking: { correct: 4, wrong: -1, unattempted: 0 },
    quotas: {
      bipc: [
        { subjectId: "physics", count: 45 },
        { subjectId: "chemistry", count: 45 },
        { subjectId: "botany", count: 45 },
        { subjectId: "zoology", count: 45 },
      ],
    },
  },
];

type ChapterSeed = [name: string, year: 1 | 2];

function buildChapters(subjectId: SubjectId, seeds: ChapterSeed[]): Chapter[] {
  return seeds.map(([name, year]) => ({
    id: chapterId(subjectId, name),
    subjectId,
    name,
    year,
  }));
}

export function chapterId(subjectId: SubjectId, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${subjectId}-${slug}`;
}

/**
 * Chapter lists follow the current TSBIE Intermediate first and second year
 * textbooks, which are also the syllabus base for TS EAMCET.
 */
export const chapters: Chapter[] = [
  ...buildChapters("physics", [
    ["Physical World", 1],
    ["Units and Measurements", 1],
    ["Motion in a Straight Line", 1],
    ["Motion in a Plane", 1],
    ["Laws of Motion", 1],
    ["Work, Energy and Power", 1],
    ["Systems of Particles and Rotational Motion", 1],
    ["Oscillations", 1],
    ["Gravitation", 1],
    ["Mechanical Properties of Solids", 1],
    ["Mechanical Properties of Fluids", 1],
    ["Thermal Properties of Matter", 1],
    ["Thermodynamics", 1],
    ["Kinetic Theory", 1],
    ["Waves", 2],
    ["Ray Optics and Optical Instruments", 2],
    ["Wave Optics", 2],
    ["Electric Charges and Fields", 2],
    ["Electrostatic Potential and Capacitance", 2],
    ["Current Electricity", 2],
    ["Moving Charges and Magnetism", 2],
    ["Magnetism and Matter", 2],
    ["Electromagnetic Induction", 2],
    ["Alternating Current", 2],
    ["Electromagnetic Waves", 2],
    ["Dual Nature of Radiation and Matter", 2],
    ["Atoms", 2],
    ["Nuclei", 2],
    ["Semiconductor Electronics", 2],
    ["Communication Systems", 2],
  ]),
  ...buildChapters("chemistry", [
    ["Atomic Structure", 1],
    ["Classification of Elements and Periodicity in Properties", 1],
    ["Chemical Bonding and Molecular Structure", 1],
    ["States of Matter: Gases and Liquids", 1],
    ["Stoichiometry", 1],
    ["Thermodynamics", 1],
    ["Chemical Equilibrium and Acids-Bases", 1],
    ["Hydrogen and its Compounds", 1],
    ["The s-Block Elements", 1],
    ["p-Block Elements Group 13 (Boron Family)", 1],
    ["p-Block Elements Group 14 (Carbon Family)", 1],
    ["Environmental Chemistry", 1],
    ["Organic Chemistry: Some Basic Principles and Techniques", 1],
    ["Solid State", 2],
    ["Solutions", 2],
    ["Electrochemistry and Chemical Kinetics", 2],
    ["Surface Chemistry", 2],
    ["General Principles of Metallurgy", 2],
    ["p-Block Elements Group 15 to 18", 2],
    ["d and f Block Elements", 2],
    ["Coordination Compounds", 2],
    ["Polymers", 2],
    ["Biomolecules", 2],
    ["Chemistry in Everyday Life", 2],
    ["Haloalkanes and Haloarenes", 2],
    ["Alcohols, Phenols and Ethers", 2],
    ["Aldehydes, Ketones and Carboxylic Acids", 2],
    ["Organic Compounds Containing Nitrogen", 2],
  ]),
  ...buildChapters("maths", [
    ["Functions", 1],
    ["Mathematical Induction", 1],
    ["Matrices", 1],
    ["Addition of Vectors", 1],
    ["Product of Vectors", 1],
    ["Trigonometric Ratios upto Transformations", 1],
    ["Trigonometric Equations", 1],
    ["Inverse Trigonometric Functions", 1],
    ["Hyperbolic Functions", 1],
    ["Properties of Triangles", 1],
    ["Locus", 1],
    ["Transformation of Axes", 1],
    ["The Straight Line", 1],
    ["Pair of Straight Lines", 1],
    ["Three Dimensional Coordinates", 1],
    ["Direction Cosines and Direction Ratios", 1],
    ["The Plane", 1],
    ["Limits and Continuity", 1],
    ["Differentiation", 1],
    ["Applications of Derivatives", 1],
    ["Complex Numbers", 2],
    ["De Moivre's Theorem", 2],
    ["Quadratic Expressions", 2],
    ["Theory of Equations", 2],
    ["Permutations and Combinations", 2],
    ["Binomial Theorem", 2],
    ["Partial Fractions", 2],
    ["Measures of Dispersion", 2],
    ["Probability", 2],
    ["Random Variables and Probability Distributions", 2],
    ["Circle", 2],
    ["System of Circles", 2],
    ["Parabola", 2],
    ["Ellipse", 2],
    ["Hyperbola", 2],
    ["Integration", 2],
    ["Definite Integrals", 2],
    ["Differential Equations", 2],
  ]),
  ...buildChapters("botany", [
    ["The Living World", 1],
    ["Biological Classification", 1],
    ["Science of Plants: Botany", 1],
    ["Plant Kingdom", 1],
    ["Morphology of Flowering Plants", 1],
    ["Modes of Nutrition", 1],
    ["Cell: The Unit of Life", 1],
    ["Internal Organisation of Plants", 1],
    ["Plant Ecology", 1],
    ["Transport in Plants", 2],
    ["Mineral Nutrition", 2],
    ["Enzymes", 2],
    ["Photosynthesis in Higher Plants", 2],
    ["Respiration in Plants", 2],
    ["Plant Growth and Development", 2],
    ["Reproduction in Plants", 2],
    ["Continuity of Life", 2],
    ["Molecular Basis of Inheritance", 2],
    ["Biotechnology", 2],
    ["Plants, Microbes and Human Welfare", 2],
  ]),
  ...buildChapters("zoology", [
    ["Diversity in the Living World", 1],
    ["Structural Organisation in Animals", 1],
    ["Animal Diversity I: Invertebrate Phyla", 1],
    ["Animal Diversity II: Phylum Chordata", 1],
    ["Locomotion and Reproduction in Protozoa", 1],
    ["Biology in Human Welfare", 1],
    ["Periplaneta americana (Cockroach)", 1],
    ["Ecology and Environment", 1],
    ["Digestion and Absorption", 2],
    ["Breathing and Respiration", 2],
    ["Body Fluids and Circulation", 2],
    ["Excretory Products and their Elimination", 2],
    ["Muscular and Skeletal System", 2],
    ["Neural Control and Coordination", 2],
    ["Endocrine System and Chemical Coordination", 2],
    ["Human Reproduction", 2],
    ["Genetics", 2],
    ["Organic Evolution", 2],
    ["Applied Biology", 2],
  ]),
];

const subjectById = new Map(subjects.map((s) => [s.id, s]));
const chapterById = new Map(chapters.map((c) => [c.id, c]));
const examById = new Map(exams.map((e) => [e.id, e]));
const streamById = new Map(streams.map((s) => [s.id, s]));

export function getSubject(id: SubjectId): Subject {
  const subject = subjectById.get(id);
  if (!subject) throw new Error(`Unknown subject: ${id}`);
  return subject;
}

export function getChapter(id: string): Chapter | undefined {
  return chapterById.get(id);
}

export function getExam(id: string): Exam | undefined {
  return examById.get(id as ExamId);
}

export function getStream(id: string): Stream | undefined {
  return streamById.get(id as StreamId);
}

export function chaptersForSubject(subjectId: SubjectId): Chapter[] {
  return chapters.filter((c) => c.subjectId === subjectId);
}

/** Streams an exam accepts, in catalog order. */
export function streamsForExam(exam: Exam): Stream[] {
  return streams.filter((s) => Boolean(exam.quotas[s.id]));
}

export function quotasFor(exam: Exam, streamId: StreamId): SubjectQuotaResolved[] {
  const quotas = exam.quotas[streamId] ?? [];
  return quotas.map((q) => ({ ...q, subject: getSubject(q.subjectId) }));
}

export type SubjectQuotaResolved = {
  subjectId: SubjectId;
  count: number;
  subject: Subject;
};
