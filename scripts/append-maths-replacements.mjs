import { readFileSync, writeFileSync } from "node:fs";
import bank from "../src/content/question-bank.json" with { type: "json" };

function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const existing = new Set(bank.map((q) => norm(q.stem)));

function pyq(appearCount, years, exams) {
  return { appearCount, years, exams, verified: false };
}
const EJ = ["TS EAMCET", "JEE Main"];
const EJN = ["TS EAMCET", "JEE Main"];
const E = ["TS EAMCET"];

const replacements = [
  {
    id: "mat-hf-112",
    chapterId: "maths-hyperbolic-functions",
    stem: "cosh x is defined as",
    options: ["(e^x + e^-x)/2", "(e^x - e^-x)/2", "e^x + e^-x", "sech x"],
    answerIndex: 0,
    explanation: "cosh x = (e^x + e^-x)/2.",
    pyq: pyq(4, [2017, 2019, 2021, 2023], EJ),
  },
  {
    id: "mat-hf-113",
    chapterId: "maths-hyperbolic-functions",
    stem: "sech x equals",
    options: ["1/cosh x", "1/sinh x", "cosh x / sinh x", "sinh x / cosh x"],
    answerIndex: 0,
    explanation: "sech x = 1/cosh x.",
    pyq: pyq(3, [2018, 2020, 2024], E),
  },
  {
    id: "mat-lo-111",
    chapterId: "maths-locus",
    stem: "The locus of a point which moves at a fixed distance from a fixed point is a",
    options: ["circle", "straight line", "parabola", "pair of lines"],
    answerIndex: 0,
    explanation: "Fixed distance from a fixed centre defines a circle.",
    pyq: pyq(4, [2017, 2019, 2021, 2023], EJ),
  },
  {
    id: "mat-ta-111",
    chapterId: "maths-transformation-of-axes",
    stem: "After translating the origin to (2, -3), the point (5, 1) has new coordinates",
    options: ["(3, 4)", "(7, -2)", "(3, -2)", "(2, 3)"],
    answerIndex: 0,
    explanation: "New coords: (5-2, 1-(-3)) = (3, 4).",
    pyq: pyq(4, [2016, 2018, 2020, 2023], EJ),
  },
  {
    id: "mat-ps-114",
    chapterId: "maths-pair-of-straight-lines",
    stem: "The homogeneous quadratic ax^2 + 2hxy + by^2 = 0 always represents lines passing through",
    options: ["the origin", "(1, 0)", "(0, 1)", "infinity only"],
    answerIndex: 0,
    explanation: "Homogeneous degree-2 equations through the origin.",
    pyq: pyq(3, [2019, 2021, 2023], E),
  },
  {
    id: "mat-3d-114",
    chapterId: "maths-three-dimensional-coordinates",
    stem: "The equation of the YZ-plane is",
    options: ["x = 0", "y = 0", "z = 0", "x + y = 0"],
    answerIndex: 0,
    explanation: "YZ-plane consists of points with x = 0.",
    pyq: pyq(3, [2019, 2021, 2023], E),
  },
  {
    id: "mat-dc-111",
    chapterId: "maths-direction-cosines-and-direction-ratios",
    stem: "If the direction cosines of a line are proportional to 2, 3, 6, then the actual DCs are",
    options: ["2/7, 3/7, 6/7", "2, 3, 6", "1/2, 1/3, 1/6", "2/sqrt(14), 3/sqrt(14), 6/sqrt(14)"],
    answerIndex: 0,
    explanation: "Divide by sqrt(4+9+36)=7: (2/7, 3/7, 6/7).",
    pyq: pyq(5, [2015, 2017, 2019, 2021, 2024], EJN),
  },
  {
    id: "mat-pl-114",
    chapterId: "maths-the-plane",
    stem: "The plane x/2 + y/3 + z/4 = 1 has X-intercept equal to",
    options: ["2", "3", "4", "1"],
    answerIndex: 0,
    explanation: "In intercept form x/a + y/b + z/c = 1, a = 2.",
    pyq: pyq(4, [2017, 2019, 2022, 2024], EJ),
  },
  {
    id: "mat-sc-113",
    chapterId: "maths-system-of-circles",
    stem: "The common chord of two intersecting circles is the same as their",
    options: ["radical axis", "line of centres", "common tangent at infinity", "director circle"],
    answerIndex: 0,
    explanation: "For intersecting circles, radical axis is the common chord.",
    pyq: pyq(4, [2018, 2020, 2022, 2024], EJ),
  },
  {
    id: "mat-pv-112",
    chapterId: "maths-product-of-vectors",
    stem: "If |a| = 3, |b| = 4 and the angle between them is 90 degrees, then |a x b| equals",
    options: ["12", "0", "7", "5"],
    answerIndex: 0,
    explanation: "|a x b| = |a||b|sin 90 = 12.",
    pyq: pyq(5, [2016, 2018, 2020, 2022, 2023], EJN),
  },
  {
    id: "mat-pv-114",
    chapterId: "maths-product-of-vectors",
    stem: "a · (a x b) equals",
    options: ["0", "|a|^2 |b|", "a · b", "1"],
    answerIndex: 0,
    explanation: "Scalar triple product with two equal vectors is 0.",
    pyq: pyq(3, [2018, 2020, 2022], E),
  },
  {
    id: "mat-tr-112",
    chapterId: "maths-trigonometric-ratios-upto-transformations",
    stem: "cos(A + B) equals",
    options: [
      "cos A cos B - sin A sin B",
      "cos A cos B + sin A sin B",
      "sin A cos B + cos A sin B",
      "sin A cos B - cos A sin B",
    ],
    answerIndex: 0,
    explanation: "Angle-addition formula for cosine.",
    pyq: pyq(5, [2015, 2017, 2019, 2021, 2024], EJN),
  },
];

const collisions = replacements.filter((q) => existing.has(norm(q.stem)));
if (collisions.length) {
  console.error(
    "Still colliding:",
    collisions.map((q) => q.id),
  );
  process.exit(1);
}

const file = new URL("../content/seed/maths-spread-extra.json", import.meta.url);
const data = JSON.parse(readFileSync(file, "utf8"));
const ids = new Set(data.questions.map((q) => q.id));
for (const q of replacements) {
  if (ids.has(q.id)) throw new Error("id exists " + q.id);
  data.questions.push(q);
  ids.add(q.id);
}
writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log("Appended", replacements.length, "total now", data.questions.length);
