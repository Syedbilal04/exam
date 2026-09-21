/**
 * Writes content/seed/chemistry__stoichiometry.json
 * TSBIE Intermediate 1st year — Some Basic Concepts / Stoichiometry (original practice MCQs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { item, pack } from "../lib/author-chem.mjs";
import { stemsClash } from "../lib/stems.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const outFile = path.join(root, "content", "seed", "chemistry__stoichiometry.json");
const stemsFile = path.join(root, "scripts", ".bank-stems.json");

const chapterId = "chemistry-stoichiometry";
const prefix = "che-st";
let n = 101;
const questions = [];

function q(conceptId, difficulty, stem, options, answerIndex, explanation) {
  questions.push(
    item({
      prefix,
      index: n++,
      chapterId,
      conceptId,
      difficulty,
      stem,
      options,
      answerIndex,
      explanation,
    }),
  );
}

// —— laws-combination: 10 (6 easy, 3 medium, 1 hard) ——
q(
  "laws-combination",
  "easy",
  "Lavoisier’s law of conservation of mass states that, in a closed chemical change, the total mass of reactants compared with products is",
  ["always greater", "always smaller", "exactly the same", "unrelated"],
  2,
  "Mass is neither created nor destroyed in ordinary chemical reactions, so reactant and product masses match.",
);
q(
  "laws-combination",
  "easy",
  "Proust’s law of definite proportions says that a given pure compound always contains the same elements combined in",
  [
    "any convenient ratio",
    "a fixed mass ratio",
    "a ratio that depends on how it was prepared",
    "equal numbers of grams only",
  ],
  1,
  "The elemental composition by mass of a pure compound is constant, independent of source.",
);
q(
  "laws-combination",
  "easy",
  "Dalton’s law of multiple proportions applies when two elements form more than one compound. The masses of one element that combine with a fixed mass of the other stand in",
  ["a simple whole-number ratio", "an irrational ratio", "the ratio of their densities", "a 1:1 mass ratio always"],
  0,
  "Different compounds of the same two elements show small-integer mass ratios for one element at fixed mass of the other.",
);
q(
  "laws-combination",
  "easy",
  "Gay-Lussac’s law of combining volumes concerns gases measured at the same temperature and pressure. Their reacting volumes are",
  [
    "in simple whole-number ratios",
    "always equal to one litre",
    "inversely proportional to molar mass only",
    "unrelated to the chemical equation",
  ],
  0,
  "Gaseous reactants and products combine or form in small integer volume ratios under identical T and P.",
);
q(
  "laws-combination",
  "easy",
  "Avogadro’s hypothesis, used with Gay-Lussac’s volume data, states that equal volumes of gases at the same T and P contain",
  [
    "equal numbers of molecules",
    "equal masses of gas",
    "equal numbers of atoms in every case",
    "one mole only if the gas is monatomic",
  ],
  0,
  "Equal gas volumes at the same T and P hold the same number of molecules, which explains simple volume ratios.",
);
q(
  "laws-combination",
  "easy",
  "The law of reciprocal proportions (Richter) compares how two elements A and B each combine with a fixed mass of a third element C. The A:B mass ratio so obtained is",
  [
    "the same as, or a simple multiple of, the ratio in which A and B combine with each other",
    "always 1:1 by mass",
    "equal to their atomic numbers",
    "independent of any compound of A with B",
  ],
  0,
  "Masses of A and B that combine with a fixed mass of C match the combining ratio of A with B, or a simple multiple of it.",
);
q(
  "laws-combination",
  "medium",
  "In a sealed tube, 12 g of carbon is burnt completely in 32 g of oxygen to give carbon dioxide only. The mass of $\\mathrm{CO_2}$ that must be collected is",
  ["12 g", "32 g", "44 g", "16 g"],
  2,
  "Conservation of mass requires $12 + 32 = 44$ g of product when nothing else is formed.",
);
q(
  "laws-combination",
  "medium",
  "Carbon forms two oxides. With 12 g of carbon, one oxide contains 16 g of oxygen and the other contains 32 g of oxygen. These oxygen masses illustrate multiple proportions because their ratio is",
  ["1 : 2", "2 : 3", "3 : 4", "1 : 1"],
  0,
  "For a fixed 12 g of carbon the oxygen masses 16 g and 32 g stand in the simple ratio 1 : 2.",
);
q(
  "laws-combination",
  "medium",
  "At the same T and P, two volumes of hydrogen gas combine with one volume of oxygen gas to give steam. The volume of steam formed, if measured under the same conditions, is",
  ["1 volume", "2 volumes", "3 volumes", "4 volumes"],
  1,
  "Gay-Lussac’s ratio for $2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O(g)}$ is 2 : 1 : 2 by volume.",
);
q(
  "laws-combination",
  "hard",
  "Two oxides of copper are analysed. In the first, 6.35 g of copper is combined with 0.80 g of oxygen; in the second, 6.35 g of copper is combined with 1.60 g of oxygen. The oxygen masses that combine with the same mass of copper are in the ratio",
  ["1 : 2", "2 : 3", "3 : 4", "4 : 5"],
  0,
  "Fixed 6.35 g Cu takes 0.80 g then 1.60 g of oxygen, a 1 : 2 ratio, which is Dalton’s multiple-proportion test.",
);

// —— mole-avogadro: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "mole-avogadro",
  "easy",
  "Avogadro’s constant $N_A$ is accepted as approximately",
  ["$6.022 \\times 10^{23}\\ \\mathrm{mol^{-1}}$", "$6.022 \\times 10^{22}\\ \\mathrm{mol^{-1}}$", "$3.011 \\times 10^{23}\\ \\mathrm{mol^{-1}}$", "$1.602 \\times 10^{-19}\\ \\mathrm{mol^{-1}}$"],
  0,
  "One mole contains $6.022 \\times 10^{23}$ specified elementary entities.",
);
q(
  "mole-avogadro",
  "easy",
  "The SI mole is defined so that 12 g of the carbon-12 nuclide contains",
  [
    "one atom of carbon-12",
    "$6.022 \\times 10^{23}$ carbon-12 atoms",
    "12 carbon-12 atoms",
    "$12 \\times 6.022 \\times 10^{23}$ atoms",
  ],
  1,
  "By definition, 12 g of $^{12}\\mathrm{C}$ is 1 mol and therefore holds $N_A$ atoms.",
);
q(
  "mole-avogadro",
  "easy",
  "The amount of substance $n$ and the number of elementary entities $N$ are linked by",
  ["$n = N \\times N_A$", "$n = N / N_A$", "$n = N_A / N$", "$n = N + N_A$"],
  1,
  "Dividing the particle count by Avogadro’s constant converts it to moles.",
);
q(
  "mole-avogadro",
  "easy",
  "One unified atomic mass unit (1 u) is defined as",
  [
    "the mass of one hydrogen atom",
    "one-twelfth of the mass of a carbon-12 atom",
    "the mass of one oxygen-16 atom",
    "1 g exactly",
  ],
  1,
  "The u (or amu) is $1/12$ of the mass of a single $^{12}\\mathrm{C}$ atom.",
);
q(
  "mole-avogadro",
  "easy",
  "Gram-atomic mass of an element is the mass, in grams, of",
  ["one atom of the element", "one mole of its atoms", "one molecule only", "Avogadro’s number of molecules of any compound"],
  1,
  "The gram-atomic mass is numerically equal to the atomic mass and is the mass of $N_A$ atoms.",
);
q(
  "mole-avogadro",
  "easy",
  "At 273 K and 1 atm (classic STP), the molar volume of an ideal gas is taken in Intermediate tables as",
  ["11.2 L", "22.4 L", "24.0 L", "44.8 L"],
  1,
  "One mole of ideal gas occupies 22.4 L at 273 K and 1 atm.",
);
q(
  "mole-avogadro",
  "easy",
  "A pair of samples that must contain the same number of molecules is",
  [
    "1 mol of $\\mathrm{O_2}$ and 1 mol of $\\mathrm{O_3}$",
    "16 g of $\\mathrm{O_2}$ and 16 g of $\\mathrm{O_3}$",
    "1 mol of $\\mathrm{O_2}$ and 2 mol of $\\mathrm{He}$",
    "22.4 L of $\\mathrm{H_2}$ at STP and 11.2 L of $\\mathrm{He}$ at STP",
  ],
  0,
  "Equal amounts in moles contain equal numbers of molecules, whatever the formula.",
);
q(
  "mole-avogadro",
  "easy",
  "Half a mole of dioxygen molecules contains oxygen atoms numbering",
  ["$0.5\\,N_A$", "$N_A$", "$2\\,N_A$", "$0.25\\,N_A$"],
  1,
  "Each $\\mathrm{O_2}$ molecule has two atoms, so $0.5\\,N_A$ molecules hold $N_A$ atoms.",
);
q(
  "mole-avogadro",
  "easy",
  "The numerical value $1.66 \\times 10^{-24}$ g is the approximate mass of",
  ["one mole of protons", "one unified atomic mass unit", "one electron", "one mole of $^{12}\\mathrm{C}$"],
  1,
  "1 u $\\approx 1.66 \\times 10^{-24}$ g, which is $1/N_A$ grams.",
);
q(
  "mole-avogadro",
  "easy",
  "Twelve grams of carbon-12 and eighteen grams of water both represent",
  ["the same number of atoms", "one mole of the stated substance", "two moles of molecules", "half a mole of each"],
  1,
  "12 g of $^{12}\\mathrm{C}$ is 1 mol of atoms; 18 g of $\\mathrm{H_2O}$ is 1 mol of molecules.",
);
q(
  "mole-avogadro",
  "easy",
  "If a flask holds $3.011 \\times 10^{23}$ molecules of nitrogen, the amount of $\\mathrm{N_2}$ in that flask is",
  ["0.25 mol", "0.50 mol", "1.00 mol", "2.00 mol"],
  1,
  "$N / N_A = 3.011 \\times 10^{23} / 6.022 \\times 10^{23} = 0.50$ mol.",
);
q(
  "mole-avogadro",
  "easy",
  "One mole of helium atoms and one mole of hydrogen molecules agree in",
  [
    "total mass",
    "number of elementary entities counted as ‘one mole’",
    "number of atoms",
    "density at STP",
  ],
  1,
  "A mole always contains $N_A$ of the named entities: He atoms or $\\mathrm{H_2}$ molecules.",
);
q(
  "mole-avogadro",
  "medium",
  "An STP sample of ammonia occupying 11.2 L contains molecules numbering",
  ["$6.022 \\times 10^{23}$", "$3.011 \\times 10^{23}$", "$1.505 \\times 10^{23}$", "$12.044 \\times 10^{23}$"],
  1,
  "11.2 L at STP is 0.50 mol, so the molecule count is $0.50\\,N_A = 3.011 \\times 10^{23}$.",
);
q(
  "mole-avogadro",
  "medium",
  "A 4.4 g portion of carbon dioxide is analysed for atoms. Taking $M(\\mathrm{CO_2}) = 44\\ \\mathrm{g\\,mol^{-1}}$, the total number of atoms present is",
  ["$0.1\\,N_A$", "$0.3\\,N_A$", "$N_A$", "$3\\,N_A$"],
  1,
  "4.4 g is 0.10 mol of $\\mathrm{CO_2}$; each molecule has 3 atoms, giving $0.30\\,N_A$ atoms.",
);
q(
  "mole-avogadro",
  "medium",
  "Compare 16 g of methane with 16 g of dioxygen. The sample that holds more molecules is",
  [
    "the methane sample",
    "the dioxygen sample",
    "neither; the molecule counts are equal",
    "impossible to decide without density",
  ],
  0,
  "16 g $\\mathrm{CH_4}$ is 1.0 mol of molecules; 16 g $\\mathrm{O_2}$ is only 0.50 mol, so methane has twice as many molecules.",
);
q(
  "mole-avogadro",
  "medium",
  "A gas burette delivers 2.24 L of hydrogen, measured at STP. The amount of $\\mathrm{H_2}$ collected is",
  ["0.010 mol", "0.10 mol", "1.0 mol", "2.0 mol"],
  1,
  "Moles $= 2.24 / 22.4 = 0.10$ mol at STP.",
);
q(
  "mole-avogadro",
  "medium",
  "A sealed ampoule contains $3.011 \\times 10^{23}$ molecules of dinitrogen. The mass of that $\\mathrm{N_2}$ sample is",
  ["7 g", "14 g", "28 g", "56 g"],
  1,
  "The count is 0.50 mol; mass $= 0.50 \\times 28 = 14$ g.",
);
q(
  "mole-avogadro",
  "medium",
  "Eight grams of dioxygen and seven grams of dinitrogen are compared atom by atom. The two samples contain",
  [
    "equal numbers of molecules and equal numbers of atoms",
    "equal numbers of molecules but different numbers of atoms",
    "different numbers of molecules but equal numbers of atoms",
    "neither equal molecules nor equal atoms",
  ],
  0,
  "Both are 0.25 mol of diatomic molecules, so both have $0.25\\,N_A$ molecules and $0.50\\,N_A$ atoms.",
);
q(
  "mole-avogadro",
  "hard",
  "A 0.25 mol sample of $\\mathrm{Ca_3(PO_4)_2}$ is examined. The number of oxygen atoms in the sample is",
  ["$0.25\\,N_A$", "$1.00\\,N_A$", "$2.00\\,N_A$", "$8.00\\,N_A$"],
  2,
  "Each formula unit has 8 oxygen atoms, so $0.25 \\times 8 = 2.00$ mol of O atoms, i.e. $2.00\\,N_A$.",
);
q(
  "mole-avogadro",
  "hard",
  "Among 8 g $\\mathrm{O_2}$, 7 g $\\mathrm{N_2}$, 4 g $\\mathrm{He}$ and 9 g $\\mathrm{H_2O}$, the largest number of atoms is present in",
  ["8 g $\\mathrm{O_2}$", "7 g $\\mathrm{N_2}$", "4 g $\\mathrm{He}$", "9 g $\\mathrm{H_2O}$"],
  3,
  "Atom amounts are 0.50, 0.50, 1.0 and 1.5 mol respectively; 9 g water therefore has the most atoms.",
);

// —— molar-mass-percent: 14 (8 easy, 4 medium, 2 hard) ——
q(
  "molar-mass-percent",
  "easy",
  "Using H = 1, S = 32 and O = 16, the molar mass of sulphuric acid $\\mathrm{H_2SO_4}$ is",
  ["82 g mol$^{-1}$", "98 g mol$^{-1}$", "114 g mol$^{-1}$", "64 g mol$^{-1}$"],
  1,
  "$2(1) + 32 + 4(16) = 98$ g mol$^{-1}$.",
);
q(
  "molar-mass-percent",
  "easy",
  "Calcium carbonate $\\mathrm{CaCO_3}$ (Ca = 40, C = 12, O = 16) has a formula mass of",
  ["50 u", "84 u", "100 u", "116 u"],
  2,
  "$40 + 12 + 48 = 100$ u.",
);
q(
  "molar-mass-percent",
  "easy",
  "The percentage by mass of oxygen in water is closest to",
  ["11.1%", "50%", "88.9%", "94.1%"],
  2,
  "Oxygen contributes 16 of the 18 g in one mole of $\\mathrm{H_2O}$, i.e. $16/18 \\times 100 = 88.9\\%$.",
);
q(
  "molar-mass-percent",
  "easy",
  "In methane, the mass percent of carbon (C = 12, H = 1) works out to",
  ["25%", "50%", "75%", "80%"],
  2,
  "Carbon is 12 g in 16 g of $\\mathrm{CH_4}$, so $12/16 \\times 100 = 75\\%$.",
);
q(
  "molar-mass-percent",
  "easy",
  "Carbon dioxide is assigned a molecular mass of 44 u because that value equals",
  [
    "12 + 16",
    "12 + 2(16)",
    "2(12) + 16",
    "12 + 32 + 16",
  ],
  1,
  "One C and two O atoms give $12 + 32 = 44$ u.",
);
q(
  "molar-mass-percent",
  "easy",
  "Ammonia’s gram-molecular mass, with N = 14 and H = 1, is",
  ["15 g", "16 g", "17 g", "18 g"],
  2,
  "$14 + 3(1) = 17$ g mol$^{-1}$.",
);
q(
  "molar-mass-percent",
  "easy",
  "Hydrogen’s share of the mass of water, expressed as a percentage, is",
  ["5.6%", "11.1%", "16.0%", "18.0%"],
  1,
  "Two grams of H in 18 g of water give $2/18 \\times 100 = 11.1\\%$.",
);
q(
  "molar-mass-percent",
  "easy",
  "Solid sodium hydroxide (Na = 23, O = 16, H = 1) has a molar mass of",
  ["23 g mol$^{-1}$", "39 g mol$^{-1}$", "40 g mol$^{-1}$", "58 g mol$^{-1}$"],
  2,
  "$23 + 16 + 1 = 40$ g mol$^{-1}$.",
);
q(
  "molar-mass-percent",
  "medium",
  "The calcium content of pure $\\mathrm{CaCO_3}$ (M = 100 g mol$^{-1}$) by mass percent is",
  ["12%", "40%", "48%", "60%"],
  1,
  "40 g of Ca in 100 g of carbonate is a 40% calcium assay.",
);
q(
  "molar-mass-percent",
  "medium",
  "Urea, $\\mathrm{NH_2CONH_2}$ (M = 60 g mol$^{-1}$), is valued as a fertiliser for nitrogen. The nitrogen mass percent in urea is",
  ["23.3%", "46.7%", "53.3%", "60.0%"],
  1,
  "Two N atoms contribute 28 g in 60 g, so $28/60 \\times 100 = 46.7\\%$.",
);
q(
  "molar-mass-percent",
  "medium",
  "Potassium chlorate $\\mathrm{KClO_3}$ (M = 122.5 g mol$^{-1}$) releases oxygen on heating. Oxygen’s mass percent in $\\mathrm{KClO_3}$ is nearest to",
  ["13.1%", "26.1%", "39.2%", "52.2%"],
  2,
  "Three oxygen atoms weigh 48 g in 122.5 g, giving $48/122.5 \\times 100 \\approx 39.2\\%$.",
);
q(
  "molar-mass-percent",
  "medium",
  "From a 50 g laboratory sample of pure $\\mathrm{CaCO_3}$, the mass of oxygen that can be accounted for in the formula is",
  ["16 g", "24 g", "32 g", "48 g"],
  1,
  "Oxygen is 48% of $\\mathrm{CaCO_3}$, so $0.48 \\times 50 = 24$ g.",
);
q(
  "molar-mass-percent",
  "hard",
  "Blue vitriol $\\mathrm{CuSO_4 \\cdot 5H_2O}$ (M = 249.5 g mol$^{-1}$) loses its water of crystallisation on strong heating. The mass percent of water in the pentahydrate is nearest to",
  ["18.0%", "25.0%", "36.1%", "45.2%"],
  2,
  "Five water molecules weigh 90 g in 249.5 g, so $90/249.5 \\times 100 \\approx 36.1\\%$.",
);
q(
  "molar-mass-percent",
  "hard",
  "Haematite $\\mathrm{Fe_2O_3}$ (M = 160 g mol$^{-1}$) is 70% iron by mass. An 80 g ore sample that is 80% pure $\\mathrm{Fe_2O_3}$ (rest gangue) contains iron weighing",
  ["44.8 g", "56.0 g", "64.0 g", "70.0 g"],
  0,
  "Pure oxide in the ore is $0.80 \\times 80 = 64$ g; iron in that oxide is $0.70 \\times 64 = 44.8$ g.",
);

// —— empirical-molecular: 14 (8 easy, 5 medium, 1 hard) ——
q(
  "empirical-molecular",
  "easy",
  "The empirical formula of a compound is the formula that shows",
  [
    "the actual number of atoms in one molecule",
    "the simplest whole-number ratio of the atoms present",
    "only the metals in the compound",
    "the percentage by mass of each element",
  ],
  1,
  "Empirical formulae give the smallest integer atom ratio, not necessarily the molecular formula.",
);
q(
  "empirical-molecular",
  "easy",
  "A molecular formula is related to the empirical formula by a positive integer $n$ such that",
  [
    "molecular formula $= n \\times$ empirical formula",
    "empirical formula $= n \\times$ molecular formula",
    "$n$ equals the number of elements",
    "$n$ is always 1 for covalent compounds",
  ],
  0,
  "$n = M / $ (empirical formula mass), and the molecular formula is that multiple of the empirical set.",
);
q(
  "empirical-molecular",
  "easy",
  "Benzene has molecular formula $\\mathrm{C_6H_6}$. Its empirical formula is therefore",
  ["$\\mathrm{CH}$", "$\\mathrm{C_2H_2}$", "$\\mathrm{C_6H_6}$", "$\\mathrm{C_3H_3}$"],
  0,
  "Dividing $\\mathrm{C_6H_6}$ by 6 gives the simplest ratio CH.",
);
q(
  "empirical-molecular",
  "easy",
  "Glucose, $\\mathrm{C_6H_{12}O_6}$, reduces to the empirical set",
  ["$\\mathrm{CHO}$", "$\\mathrm{CH_2O}$", "$\\mathrm{C_2H_4O_2}$", "$\\mathrm{C_6H_{12}O_6}$"],
  1,
  "Each subscript is divisible by 6, leaving CH$_2$O.",
);
q(
  "empirical-molecular",
  "easy",
  "Hydrogen peroxide $\\mathrm{H_2O_2}$ has the empirical formula",
  ["$\\mathrm{HO}$", "$\\mathrm{H_2O}$", "$\\mathrm{HO_2}$", "$\\mathrm{H_2O_2}$"],
  0,
  "The simplest H : O ratio in hydrogen peroxide is 1 : 1, written HO.",
);
q(
  "empirical-molecular",
  "easy",
  "An organic gas has empirical formula $\\mathrm{CH_2}$ and a molar mass of 56 g mol$^{-1}$. Its molecular formula is",
  ["$\\mathrm{C_2H_4}$", "$\\mathrm{C_3H_6}$", "$\\mathrm{C_4H_8}$", "$\\mathrm{C_5H_{10}}$"],
  2,
  "Empirical mass is 14; $n = 56/14 = 4$, so the molecule is $\\mathrm{C_4H_8}$.",
);
q(
  "empirical-molecular",
  "easy",
  "The integer $n$ that converts an empirical formula into the molecular formula is calculated as",
  [
    "empirical mass / molecular mass",
    "molecular mass / empirical formula mass",
    "atomic number / mass number",
    "percentage of carbon / 12",
  ],
  1,
  "$n = M / E$, then each empirical subscript is multiplied by $n$.",
);
q(
  "empirical-molecular",
  "easy",
  "For an ionic solid such as $\\mathrm{Na_2CO_3}$, the formula written on the bottle is already",
  [
    "a molecular formula that can be halved",
    "the empirical formula of the compound",
    "only a percentage composition",
    "an unbalanced equation",
  ],
  1,
  "Ionic compounds are represented by the simplest ratio of ions, which is the empirical formula.",
);
q(
  "empirical-molecular",
  "medium",
  "A hydrocarbon analyses as 80% carbon and 20% hydrogen by mass. Its empirical formula is",
  ["$\\mathrm{CH}$", "$\\mathrm{CH_2}$", "$\\mathrm{CH_3}$", "$\\mathrm{C_2H_5}$"],
  2,
  "Mole ratio C : H $= (80/12) : (20/1) = 6.67 : 20 = 1 : 3$, so $\\mathrm{CH_3}$.",
);
q(
  "empirical-molecular",
  "medium",
  "A compound contains 40.0% C, 6.7% H and 53.3% O. The empirical formula matching these percentages is",
  ["$\\mathrm{CHO}$", "$\\mathrm{CH_2O}$", "$\\mathrm{C_2H_2O}$", "$\\mathrm{C_2H_6O}$"],
  1,
  "Moles C : H : O $= 3.33 : 6.7 : 3.33 = 1 : 2 : 1$, which is $\\mathrm{CH_2O}$.",
);
q(
  "empirical-molecular",
  "medium",
  "A vapour has empirical formula CH and a vapour density corresponding to $M = 78$ g mol$^{-1}$. The molecular formula of the vapour is",
  ["$\\mathrm{C_2H_2}$", "$\\mathrm{C_3H_3}$", "$\\mathrm{C_6H_6}$", "$\\mathrm{C_{12}H_{12}}$"],
  2,
  "Empirical mass 13; $n = 78/13 = 6$, giving $\\mathrm{C_6H_6}$.",
);
q(
  "empirical-molecular",
  "medium",
  "An iron oxide is 70% Fe and 30% O by mass (Fe = 56, O = 16). The oxide’s empirical formula is",
  ["$\\mathrm{FeO}$", "$\\mathrm{Fe_2O_3}$", "$\\mathrm{Fe_3O_4}$", "$\\mathrm{FeO_2}$"],
  1,
  "Moles Fe : O $= (70/56) : (30/16) = 1.25 : 1.875 = 2 : 3$, so $\\mathrm{Fe_2O_3}$.",
);
q(
  "empirical-molecular",
  "medium",
  "A hydrocarbon is 85.7% carbon, the rest hydrogen. The empirical formula of that hydrocarbon is",
  ["$\\mathrm{CH}$", "$\\mathrm{CH_2}$", "$\\mathrm{CH_3}$", "$\\mathrm{C_2H_2}$"],
  1,
  "C : H moles $= (85.7/12) : (14.3/1) \\approx 7.14 : 14.3 = 1 : 2$, hence $\\mathrm{CH_2}$.",
);
q(
  "empirical-molecular",
  "hard",
  "A chloro-compound is 24.24% C, 4.04% H and 71.72% Cl. Its molar mass is 99 g mol$^{-1}$. The molecular formula is",
  ["$\\mathrm{CH_2Cl}$", "$\\mathrm{C_2H_4Cl_2}$", "$\\mathrm{C_2H_3Cl}$", "$\\mathrm{C_3H_6Cl_2}$"],
  1,
  "Empirical moles give $\\mathrm{CH_2Cl}$ (E = 49.5); $n = 99/49.5 = 2$, so $\\mathrm{C_2H_4Cl_2}$.",
);

// —— equation-mole-ratio: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "equation-mole-ratio",
  "easy",
  "In the Haber equation $\\mathrm{N_2} + 3\\mathrm{H_2} \\rightarrow 2\\mathrm{NH_3}$, each mole of nitrogen that reacts consumes hydrogen amounting to",
  ["1 mol", "2 mol", "3 mol", "6 mol"],
  2,
  "The coefficient of $\\mathrm{H_2}$ is 3, so the mole ratio N$_2$ : H$_2$ is 1 : 3.",
);
q(
  "equation-mole-ratio",
  "easy",
  "According to $2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}$, complete use of 1 mol of oxygen produces water equal to",
  ["1 mol", "2 mol", "0.5 mol", "4 mol"],
  1,
  "One mole of $\\mathrm{O_2}$ corresponds to two moles of $\\mathrm{H_2O}$.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Thermal decomposition $\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}$ is 1 : 1 : 1 in moles. From 1 mol of limestone the carbon dioxide obtained is",
  ["0.5 mol", "1 mol", "2 mol", "3 mol"],
  1,
  "Each mole of $\\mathrm{CaCO_3}$ yields one mole of $\\mathrm{CO_2}$.",
);
q(
  "equation-mole-ratio",
  "easy",
  "The laboratory oxygen preparation $2\\mathrm{KClO_3} \\rightarrow 2\\mathrm{KCl} + 3\\mathrm{O_2}$ gives, from 2 mol of chlorate, oxygen amounting to",
  ["2 mol", "3 mol", "4 mol", "6 mol"],
  1,
  "The O$_2$ coefficient is 3 when 2 mol of $\\mathrm{KClO_3}$ decompose.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Complete combustion $\\mathrm{C} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2}$ links carbon and carbon dioxide in the mole ratio",
  ["1 : 1", "1 : 2", "2 : 1", "1 : 4"],
  0,
  "Coefficients of C and $\\mathrm{CO_2}$ are both 1.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Magnesium burns as $2\\mathrm{Mg} + \\mathrm{O_2} \\rightarrow 2\\mathrm{MgO}$. Oxygen amounting to 1 mol therefore requires magnesium equal to",
  ["1 mol", "2 mol", "0.5 mol", "4 mol"],
  1,
  "Two moles of Mg are needed for each mole of $\\mathrm{O_2}$.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Methane burns as $\\mathrm{CH_4} + 2\\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + 2\\mathrm{H_2O}$. The oxygen-to-methane mole ratio demanded by the equation is",
  ["1 : 1", "2 : 1", "1 : 2", "4 : 1"],
  1,
  "Two moles of $\\mathrm{O_2}$ are required for every mole of $\\mathrm{CH_4}$.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Contact-process oxidation $2\\mathrm{SO_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{SO_3}$ converts 1 mol of oxygen into sulphur trioxide amounting to",
  ["1 mol", "2 mol", "0.5 mol", "4 mol"],
  1,
  "One mole of $\\mathrm{O_2}$ produces two moles of $\\mathrm{SO_3}$.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Aluminium burns in oxygen: $4\\mathrm{Al} + 3\\mathrm{O_2} \\rightarrow 2\\mathrm{Al_2O_3}$. Four moles of aluminium therefore form alumina equal to",
  ["1 mol", "2 mol", "3 mol", "4 mol"],
  1,
  "The product coefficient is 2 when 4 mol of Al react.",
);
q(
  "equation-mole-ratio",
  "easy",
  "Hydrogen chloride is formed by $\\mathrm{H_2} + \\mathrm{Cl_2} \\rightarrow 2\\mathrm{HCl}$. One mole of hydrogen gas yields HCl equal to",
  ["1 mol", "2 mol", "0.5 mol", "4 mol"],
  1,
  "The HCl coefficient is 2 for each mole of $\\mathrm{H_2}$.",
);
q(
  "equation-mole-ratio",
  "medium",
  "Propane burns as $\\mathrm{C_3H_8} + 5\\mathrm{O_2} \\rightarrow 3\\mathrm{CO_2} + 4\\mathrm{H_2O}$. Complete combustion of 2 mol of propane releases carbon dioxide amounting to",
  ["2 mol", "3 mol", "6 mol", "8 mol"],
  2,
  "Each mole of $\\mathrm{C_3H_8}$ gives 3 mol $\\mathrm{CO_2}$, so 2 mol give 6 mol.",
);
q(
  "equation-mole-ratio",
  "medium",
  "A Haber converter is charged with 10 mol of hydrogen and surplus nitrogen. The maximum ammonia that can form is",
  ["6.67 mol", "10 mol", "15 mol", "20 mol"],
  0,
  "From $3\\mathrm{H_2} \\rightarrow 2\\mathrm{NH_3}$, 10 mol H$_2$ produce $(10 \\times 2)/3 = 20/3 \\approx 6.67$ mol NH$_3$.",
);
q(
  "equation-mole-ratio",
  "medium",
  "Two moles of $\\mathrm{KClO_3}$ are fully decomposed to KCl and O$_2$. The STP volume of oxygen collected is",
  ["22.4 L", "44.8 L", "67.2 L", "89.6 L"],
  2,
  "2 mol chlorate give 3 mol O$_2$; $3 \\times 22.4 = 67.2$ L at STP.",
);
q(
  "equation-mole-ratio",
  "medium",
  "A bunsen flame consumes 16 g of methane completely (M = 16 g mol$^{-1}$). The STP volume of $\\mathrm{CO_2}$ produced is",
  ["11.2 L", "16.0 L", "22.4 L", "44.8 L"],
  2,
  "16 g is 1 mol $\\mathrm{CH_4}$ and gives 1 mol $\\mathrm{CO_2}$, which occupies 22.4 L at STP.",
);
q(
  "equation-mole-ratio",
  "medium",
  "A 50 g charge of $\\mathrm{CaCO_3}$ (M = 100 g mol$^{-1}$) is heated until decomposition is complete. The lime $\\mathrm{CaO}$ (M = 56 g mol$^{-1}$) obtained weighs",
  ["28 g", "50 g", "56 g", "44 g"],
  0,
  "0.50 mol of carbonate yields 0.50 mol of CaO, i.e. 28 g.",
);
q(
  "equation-mole-ratio",
  "hard",
  "Ethane burns as $2\\mathrm{C_2H_6} + 7\\mathrm{O_2} \\rightarrow 4\\mathrm{CO_2} + 6\\mathrm{H_2O}$. A 15 g sample of ethane (M = 30) is burnt in 64 g of oxygen. The mass of $\\mathrm{CO_2}$ formed and the unused $\\mathrm{O_2}$ are",
  ["44 g and 8 g", "22 g and 16 g", "88 g and 0 g", "44 g and 0 g"],
  0,
  "0.50 mol ethane needs 1.75 mol (56 g) O$_2$ and makes 1.0 mol (44 g) CO$_2$; 64 − 56 = 8 g O$_2$ remains.",
);

// —— limiting-reagent: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "limiting-reagent",
  "easy",
  "After a reaction stops, the starting material that is left unused is called the",
  ["limiting reagent", "excess reagent", "catalyst", "theoretical product"],
  1,
  "The excess reagent remains because the other reactant ran out first.",
);
q(
  "limiting-reagent",
  "easy",
  "One mole of $\\mathrm{H_2}$ is mixed with one mole of $\\mathrm{O_2}$ and sparked to form water. The reactant that is used up completely is",
  ["oxygen", "hydrogen", "both equally", "neither"],
  1,
  "Water needs H$_2$ : O$_2$ = 2 : 1, so 1 mol H$_2$ is finished while 0.5 mol O$_2$ is still unused.",
);
q(
  "limiting-reagent",
  "easy",
  "A flask is charged with 1 mol of $\\mathrm{N_2}$ and 1 mol of $\\mathrm{H_2}$ for the Haber reaction. Ammonia production is limited by",
  ["nitrogen", "hydrogen", "both together", "the catalyst only"],
  1,
  "The 1 : 3 nitrogen-to-hydrogen requirement means 1 mol H$_2$ is exhausted long before the nitrogen.",
);
q(
  "limiting-reagent",
  "easy",
  "Two moles of carbon are heated with one mole of oxygen to give only $\\mathrm{CO_2}$. The reagent that decides the amount of $\\mathrm{CO_2}$ is",
  ["carbon", "oxygen", "neither; both finish together", "the vessel volume"],
  1,
  "Each mole of $\\mathrm{CO_2}$ needs 1 mol O$_2$; only 1 mol O$_2$ is supplied, so oxygen limits.",
);
q(
  "limiting-reagent",
  "easy",
  "Equal molar amounts of $\\mathrm{H_2}$ and $\\mathrm{Cl_2}$ are allowed to form HCl. At the end of the reaction",
  [
    "hydrogen remains unused",
    "chlorine remains unused",
    "both gases are completely consumed",
    "no HCl forms",
  ],
  2,
  "$\\mathrm{H_2} + \\mathrm{Cl_2} \\rightarrow 2\\mathrm{HCl}$ uses the two gases in a 1 : 1 mole ratio.",
);
q(
  "limiting-reagent",
  "easy",
  "Three moles of magnesium ribbon are burnt in one mole of oxygen. Formation of $\\mathrm{MgO}$ is limited by",
  ["magnesium", "oxygen", "both equally", "air moisture"],
  1,
  "$2\\mathrm{Mg} + \\mathrm{O_2}$ needs Mg : O$_2$ = 2 : 1; 1 mol O$_2$ can consume only 2 mol Mg, so oxygen limits.",
);
q(
  "limiting-reagent",
  "easy",
  "The quantity of product that can form in a given run is fixed by",
  [
    "the reagent present in greater mass, always",
    "the reagent that is consumed first",
    "the reagent with the larger molar mass",
    "whichever reagent is added last",
  ],
  1,
  "The limiting reagent is used up first and therefore caps the product.",
);
q(
  "limiting-reagent",
  "easy",
  "If a balanced equation is 1 : 1 and the two reactants are supplied in unequal moles, the leftover substance is",
  ["always the product", "the reactant that was supplied in smaller moles", "the reactant that was supplied in larger moles", "a catalyst"],
  2,
  "The reactant present in fewer moles is limiting; the one in larger moles is excess and remains.",
);
q(
  "limiting-reagent",
  "easy",
  "One mole of sulphur is burnt in two moles of oxygen to give only $\\mathrm{SO_2}$. The unused oxygen at the end is",
  ["0 mol", "1 mol", "2 mol", "0.5 mol"],
  1,
  "$\\mathrm{S} + \\mathrm{O_2} \\rightarrow \\mathrm{SO_2}$ uses 1 mol O$_2$, leaving 1 mol unused.",
);
q(
  "limiting-reagent",
  "easy",
  "Aluminium and chlorine are mixed as 2 mol Al + 3 mol $\\mathrm{Cl_2}$ to form $\\mathrm{AlCl_3}$ ($2\\mathrm{Al} + 3\\mathrm{Cl_2} \\rightarrow 2\\mathrm{AlCl_3}$). The limiting reagent is",
  ["aluminium only", "chlorine only", "neither; the mixture is stoichiometric", "impossible to decide"],
  2,
  "The supplied amounts match the 2 : 3 coefficients, so both finish together.",
);
q(
  "limiting-reagent",
  "medium",
  "Four grams of hydrogen (M = 2) are sparked with 32 g of oxygen (M = 32) to form water. The mass of water that can form is",
  ["18 g", "36 g", "16 g", "4 g"],
  1,
  "2 mol H$_2$ and 1 mol O$_2$ match $2\\mathrm{H_2} + \\mathrm{O_2}$; both are used and give 2 mol (36 g) of water.",
);
q(
  "limiting-reagent",
  "medium",
  "A converter is loaded with 14 g of nitrogen and 6 g of hydrogen for ammonia synthesis. The reagent that runs out first is",
  ["nitrogen", "hydrogen", "both at the same instant", "neither"],
  0,
  "14 g N$_2$ is 0.50 mol and would need 1.5 mol H$_2$; 6 g H$_2$ is 3.0 mol, so nitrogen is consumed first.",
);
q(
  "limiting-reagent",
  "medium",
  "Twelve grams of carbon are heated with 16 g of oxygen, forming only $\\mathrm{CO_2}$. The mass of carbon dioxide obtained is",
  ["22 g", "28 g", "44 g", "16 g"],
  0,
  "1.0 mol C needs 1.0 mol (32 g) O$_2$; only 0.50 mol O$_2$ is present, so 0.50 mol (22 g) of $\\mathrm{CO_2}$ forms.",
);
q(
  "limiting-reagent",
  "medium",
  "Eight grams of hydrogen are burnt in 32 g of oxygen. After water has formed, the unused hydrogen weighs",
  ["0 g", "2 g", "4 g", "8 g"],
  2,
  "1 mol O$_2$ consumes 2 mol (4 g) H$_2$; 8 g H$_2$ was supplied, so 4 g of hydrogen remains.",
);
q(
  "limiting-reagent",
  "medium",
  "Two moles of $\\mathrm{SO_2}$ are oxidised with two moles of $\\mathrm{O_2}$ to $\\mathrm{SO_3}$. The oxygen left unreacted is",
  ["0 mol", "0.5 mol", "1 mol", "2 mol"],
  2,
  "$2\\mathrm{SO_2}$ need only 1 mol O$_2$; of the 2 mol supplied, 1 mol remains.",
);
q(
  "limiting-reagent",
  "hard",
  "Marble chips (25 g $\\mathrm{CaCO_3}$, M = 100) are treated with 14.6 g of HCl (M = 36.5) according to $\\mathrm{CaCO_3} + 2\\mathrm{HCl} \\rightarrow \\mathrm{CaCl_2} + \\mathrm{H_2O} + \\mathrm{CO_2}$. The mass of $\\mathrm{CO_2}$ that can escape is",
  ["4.4 g", "8.8 g", "11.0 g", "22.0 g"],
  1,
  "0.25 mol carbonate would need 0.50 mol HCl, but only 0.40 mol HCl is present, so HCl limits and $0.20$ mol (8.8 g) of $\\mathrm{CO_2}$ forms.",
);

// —— yield: 8 (5 easy, 2 medium, 1 hard) ——
q(
  "yield",
  "easy",
  "Theoretical yield is the mass of product calculated by assuming that",
  [
    "the limiting reagent is completely converted as the equation is written",
    "half the reactant is lost",
    "no reaction occurs",
    "the excess reagent alone reacts",
  ],
  0,
  "Theoretical yield is the stoichiometric maximum from the limiting reagent.",
);
q(
  "yield",
  "easy",
  "Percentage yield is obtained from the relation",
  [
    "(theoretical / actual) $\\times 100$",
    "(actual / theoretical) $\\times 100$",
    "actual $-$ theoretical",
    "theoretical $\\times$ actual",
  ],
  1,
  "Percent yield $= (\\text{actual yield}/\\text{theoretical yield}) \\times 100$.",
);
q(
  "yield",
  "easy",
  "When the mass collected on the filter equals the mass predicted from the equation, the percentage yield is",
  ["0%", "50%", "100%", "200%"],
  2,
  "Actual = theoretical gives a 100% yield.",
);
q(
  "yield",
  "easy",
  "In the school laboratory the isolated product is usually lighter than the theoretical mass because of",
  [
    "creation of extra atoms",
    "incomplete reaction, side products and handling losses",
    "a change in Avogadro’s number",
    "the law of conservation of mass being false",
  ],
  1,
  "Real recoveries suffer from incomplete conversion, competing reactions and transfer losses.",
);
q(
  "yield",
  "easy",
  "A statement that the yield is 100% means that",
  [
    "no product was obtained",
    "every mole of limiting reagent appeared in the isolated product as written",
    "the excess reagent disappeared completely",
    "the reaction was endothermic",
  ],
  1,
  "A quantitative isolation matching the stoichiometric prediction is a 100% yield.",
);
q(
  "yield",
  "medium",
  "A preparation is calculated to give 50 g of crystals; the dried crop actually weighs 40 g. The percentage yield of that run is",
  ["40%", "50%", "80%", "125%"],
  2,
  "$(40/50) \\times 100 = 80\\%$.",
);
q(
  "yield",
  "medium",
  "A process is known to run at 80% yield. If the equation predicts 25 g of product, the mass a student should expect to isolate is",
  ["5 g", "20 g", "25 g", "31.25 g"],
  1,
  "Actual $= 0.80 \\times 25 = 20$ g.",
);
q(
  "yield",
  "hard",
  "Excess oxygen is used to burn 4.0 g of hydrogen. The equation predicts 36 g of water, but only 27 g is condensed. The percentage yield of water is",
  ["27%", "67%", "75%", "133%"],
  2,
  "4.0 g H$_2$ is 2.0 mol and can give 2.0 mol (36 g) of water; $27/36 \\times 100 = 75\\%$.",
);

// —— oxidation-number: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "oxidation-number",
  "easy",
  "An uncombined free element, whether atom or molecule, is assigned an oxidation number of",
  ["$+1$", "$-1$", "$0$", "$+2$"],
  2,
  "The oxidation number of an element in its elemental form is zero.",
);
q(
  "oxidation-number",
  "easy",
  "Except in peroxides, superoxides and $\\mathrm{OF_2}$, oxygen in compounds is assigned the oxidation number",
  ["$-1$", "$-2$", "$+2$", "$0$"],
  1,
  "The common oxidation number of oxygen in oxides and oxo-salts is $-2$.",
);
q(
  "oxidation-number",
  "easy",
  "Hydrogen combined with a non-metal is assigned the oxidation number",
  ["$+1$", "$-1$", "$0$", "$+2$"],
  0,
  "In hydrides of non-metals (HCl, H$_2$O, NH$_3$) hydrogen is $+1$.",
);
q(
  "oxidation-number",
  "easy",
  "In their compounds the alkali metals (Li, Na, K, …) show the oxidation number",
  ["$0$", "$+1$", "$+2$", "$-1$"],
  1,
  "Group 1 metals lose one valence electron and are $+1$ in compounds.",
);
q(
  "oxidation-number",
  "easy",
  "Fluorine, being the most electronegative element, has in all its compounds the oxidation number",
  ["$0$", "$+1$", "$-1$", "$+2$"],
  2,
  "Fluorine is always $-1$ in compounds.",
);
q(
  "oxidation-number",
  "easy",
  "In hydrogen chloride the oxidation number of chlorine is",
  ["$+1$", "$-1$", "$0$", "$+7$"],
  1,
  "H is $+1$ and the molecule is neutral, so Cl is $-1$.",
);
q(
  "oxidation-number",
  "easy",
  "Sulphur in hydrogen sulphide $\\mathrm{H_2S}$ has the oxidation number",
  ["$+2$", "$-2$", "$+6$", "$0$"],
  1,
  "Two hydrogens at $+1$ force sulphur to $-2$ in the neutral molecule.",
);
q(
  "oxidation-number",
  "easy",
  "Nitrogen in ammonia $\\mathrm{NH_3}$ is assigned the oxidation number",
  ["$+3$", "$-3$", "$+5$", "$0$"],
  1,
  "Three hydrogens at $+1$ give nitrogen $-3$.",
);
q(
  "oxidation-number",
  "easy",
  "Carbon in methane $\\mathrm{CH_4}$ carries the oxidation number",
  ["$+4$", "$-4$", "$0$", "$+2$"],
  1,
  "Four hydrogens at $+1$ leave carbon at $-4$.",
);
q(
  "oxidation-number",
  "easy",
  "In hydrogen peroxide $\\mathrm{H_2O_2}$ the oxidation number of each oxygen atom is",
  ["$-2$", "$-1$", "$0$", "$+1$"],
  1,
  "Peroxidic oxygen is $-1$; two H at $+1$ and two O at $-1$ balance the molecule.",
);
q(
  "oxidation-number",
  "medium",
  "Sulphur in sulphuric acid $\\mathrm{H_2SO_4}$ has the oxidation number",
  ["$+2$", "$+4$", "$+6$", "$-2$"],
  2,
  "$2(+1) + \\mathrm{S} + 4(-2) = 0$ gives S $= +6$.",
);
q(
  "oxidation-number",
  "medium",
  "Chromium in potassium dichromate $\\mathrm{K_2Cr_2O_7}$ has the oxidation number",
  ["$+3$", "$+6$", "$+7$", "$+2$"],
  1,
  "$2(+1) + 2\\mathrm{Cr} + 7(-2) = 0$ gives each Cr $= +6$.",
);
q(
  "oxidation-number",
  "medium",
  "Manganese in potassium permanganate $\\mathrm{KMnO_4}$ is assigned",
  ["$+2$", "$+4$", "$+6$", "$+7$"],
  3,
  "$+1 + \\mathrm{Mn} + 4(-2) = 0$ gives Mn $= +7$.",
);
q(
  "oxidation-number",
  "medium",
  "Nitrogen in nitric acid $\\mathrm{HNO_3}$ has the oxidation number",
  ["$-3$", "$+3$", "$+5$", "$+1$"],
  2,
  "$+1 + \\mathrm{N} + 3(-2) = 0$ gives N $= +5$.",
);
q(
  "oxidation-number",
  "medium",
  "The average oxidation number of sulphur in sodium thiosulphate $\\mathrm{Na_2S_2O_3}$ is",
  ["$+2$", "$+4$", "$+6$", "$-2$"],
  0,
  "$2(+1) + 2\\mathrm{S} + 3(-2) = 0$ gives $2\\mathrm{S} = +4$, so each S averages $+2$.",
);
q(
  "oxidation-number",
  "hard",
  "In magnetite $\\mathrm{Fe_3O_4}$ iron is present in two oxidation states. The average oxidation number of iron in $\\mathrm{Fe_3O_4}$ is",
  ["$+2$", "$+8/3$", "$+3$", "$+4$"],
  1,
  "Four oxide ions contribute $-8$; three Fe atoms share $+8$, so the average is $+8/3$ (one Fe$^{2+}$ and two Fe$^{3+}$).",
);

// —— redox-balancing: 14 (8 easy, 5 medium, 1 hard) ——
q(
  "redox-balancing",
  "easy",
  "Oxidation, in electronic language, is the process in which a species",
  ["gains electrons", "loses electrons", "gains protons", "loses neutrons"],
  1,
  "Loss of electrons raises the oxidation number and is oxidation.",
);
q(
  "redox-balancing",
  "easy",
  "Reduction is identified as a",
  ["gain of electrons", "loss of electrons", "gain of oxygen only", "loss of hydrogen only"],
  0,
  "Gain of electrons lowers the oxidation number and is reduction.",
);
q(
  "redox-balancing",
  "easy",
  "An oxidising agent is the species that",
  ["is itself oxidised", "is itself reduced", "does not change oxidation number", "always contains hydrogen"],
  1,
  "The oxidising agent accepts electrons and is reduced.",
);
q(
  "redox-balancing",
  "easy",
  "A reducing agent is the species that",
  ["is itself reduced", "is itself oxidised", "only dilutes the mixture", "must be a metal ion"],
  1,
  "The reducing agent donates electrons and is oxidised.",
);
q(
  "redox-balancing",
  "easy",
  "When magnesium ribbon burns, $2\\mathrm{Mg} + \\mathrm{O_2} \\rightarrow 2\\mathrm{MgO}$. The element that is oxidised is",
  ["oxygen", "magnesium", "neither", "both equally as oxidant"],
  1,
  "Mg goes from 0 to $+2$ (loses electrons) and is oxidised; oxygen is reduced.",
);
q(
  "redox-balancing",
  "easy",
  "In $\\mathrm{Zn} + \\mathrm{Cu^{2+}} \\rightarrow \\mathrm{Zn^{2+}} + \\mathrm{Cu}$, the reducing agent is",
  ["$\\mathrm{Cu^{2+}}$", "Zn metal", "the $\\mathrm{Zn^{2+}}$ ion formed", "water"],
  1,
  "Zinc metal loses electrons (0 to $+2$) and therefore reduces $\\mathrm{Cu^{2+}}$.",
);
q(
  "redox-balancing",
  "easy",
  "A disproportionation reaction is one in which the same element is",
  [
    "only oxidised",
    "only reduced",
    "simultaneously oxidised and reduced",
    "left with an unchanged oxidation number",
  ],
  2,
  "Part of the element’s atoms rise in ON and part fall, as in $2\\mathrm{H_2O_2} \\rightarrow 2\\mathrm{H_2O} + \\mathrm{O_2}$.",
);
q(
  "redox-balancing",
  "easy",
  "The combination $\\mathrm{H_2} + \\mathrm{Cl_2} \\rightarrow 2\\mathrm{HCl}$ is classified as redox because",
  [
    "no oxidation number changes",
    "hydrogen is oxidised (0 to $+1$) and chlorine is reduced (0 to $-1$)",
    "it is only an acid–base reaction",
    "both elements are oxidised",
  ],
  1,
  "H$_2$ loses electrons and Cl$_2$ gains them, so the combination is a redox process.",
);
q(
  "redox-balancing",
  "medium",
  "Which of the following laboratory changes is not a redox reaction?",
  [
    "$2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}$",
    "$\\mathrm{Zn} + \\mathrm{H_2SO_4} \\rightarrow \\mathrm{ZnSO_4} + \\mathrm{H_2}$",
    "$\\mathrm{HCl} + \\mathrm{NaOH} \\rightarrow \\mathrm{NaCl} + \\mathrm{H_2O}$",
    "$\\mathrm{Fe_2O_3} + 3\\mathrm{CO} \\rightarrow 2\\mathrm{Fe} + 3\\mathrm{CO_2}$",
  ],
  2,
  "Acid–base neutralisation exchanges H$^+$ and OH$^-$ with no change in oxidation numbers.",
);
q(
  "redox-balancing",
  "medium",
  "In acid solution $\\mathrm{MnO_4^-}$ is reduced to $\\mathrm{Mn^{2+}}$. The number of electrons gained by one permanganate ion is",
  ["2", "3", "5", "7"],
  2,
  "Mn goes from $+7$ to $+2$, a gain of five electrons.",
);
q(
  "redox-balancing",
  "medium",
  "Dichromate $\\mathrm{Cr_2O_7^{2-}}$ is reduced to two $\\mathrm{Cr^{3+}}$ ions in acid. Electrons consumed per dichromate ion are",
  ["3", "4", "6", "8"],
  2,
  "Two chromium atoms each fall from $+6$ to $+3$, a total of six electrons.",
);
q(
  "redox-balancing",
  "medium",
  "The balanced acidic half-change $\\mathrm{MnO_4^-} + 8\\mathrm{H^+} + n\\,e^- \\rightarrow \\mathrm{Mn^{2+}} + 4\\mathrm{H_2O}$ requires $n$ equal to",
  ["3", "4", "5", "8"],
  2,
  "Charge balance and the $+7 \\rightarrow +2$ change both fix $n = 5$.",
);
q(
  "redox-balancing",
  "medium",
  "Titration of $\\mathrm{Fe^{2+}}$ with acidic $\\mathrm{MnO_4^-}$ uses the mole ratio $\\mathrm{MnO_4^-} : \\mathrm{Fe^{2+}}$ equal to",
  ["1 : 1", "1 : 5", "5 : 1", "1 : 2"],
  1,
  "One $\\mathrm{MnO_4^-}$ takes five electrons; each $\\mathrm{Fe^{2+}}$ supplies one, so five Fe$^{2+}$ are needed.",
);
q(
  "redox-balancing",
  "hard",
  "In acid, dichromate oxidises $\\mathrm{H_2S}$ to sulphur: $\\mathrm{Cr_2O_7^{2-}} + 3\\mathrm{H_2S} + 8\\mathrm{H^+} \\rightarrow 2\\mathrm{Cr^{3+}} + 3\\mathrm{S} + 7\\mathrm{H_2O}$. The coefficient 3 in front of $\\mathrm{H_2S}$ appears because",
  [
    "each H$_2$S loses 2 e$^-$ and dichromate gains 6 e$^-$",
    "sulphur has atomic number 16",
    "three oxygen atoms are present in dichromate",
    "the reaction is not redox",
  ],
  0,
  "H$_2$S (S = $-2$ to 0) is a 2-electron reductant; Cr$_2$O$_7^{2-}$ is a 6-electron oxidant, so three H$_2$S balance one dichromate.",
);

// —— equivalents-normality: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "equivalents-normality",
  "easy",
  "Gram-equivalent mass of a substance is obtained from",
  [
    "molar mass $\\times$ $n$-factor",
    "molar mass / $n$-factor",
    "molar mass + $n$-factor",
    "molarity / $n$-factor",
  ],
  1,
  "Equivalent mass $= M / n$, where $n$ is the $n$-factor of the reaction.",
);
q(
  "equivalents-normality",
  "easy",
  "Hydrochloric acid donates one H$^+$ per formula unit, so its $n$-factor in acid–base work is",
  ["1", "2", "3", "0"],
  0,
  "Monobasic HCl has $n = 1$.",
);
q(
  "equivalents-normality",
  "easy",
  "Sulphuric acid is dibasic. In complete neutralisation its $n$-factor is",
  ["1", "2", "3", "4"],
  1,
  "H$_2$SO$_4$ can furnish two H$^+$ ions, so $n = 2$.",
);
q(
  "equivalents-normality",
  "easy",
  "Normality $N$ and molarity $M$ of the same solution are related by",
  ["$N = M / n$", "$N = M \\times n$", "$N = M + n$", "$N = n / M$"],
  1,
  "Each mole contributes $n$ equivalents, so $N = M \\times n$.",
);
q(
  "equivalents-normality",
  "easy",
  "Sodium hydroxide has molar mass 40 g mol$^{-1}$ and $n = 1$. Its gram-equivalent mass is",
  ["20 g eq$^{-1}$", "40 g eq$^{-1}$", "80 g eq$^{-1}$", "23 g eq$^{-1}$"],
  1,
  "For a monoacidic base, equivalent mass equals the molar mass, 40 g eq$^{-1}$.",
);
q(
  "equivalents-normality",
  "easy",
  "Calcium hydroxide $\\mathrm{Ca(OH)_2}$ is a diacidic base, so its $n$-factor is",
  ["1", "2", "3", "4"],
  1,
  "Two OH$^-$ ions per formula unit give $n = 2$.",
);
q(
  "equivalents-normality",
  "easy",
  "The number of gram-equivalents in a weighed sample equals",
  [
    "mass $\\times$ equivalent mass",
    "mass / equivalent mass",
    "molar mass / mass",
    "volume / normality",
  ],
  1,
  "Equivalents $= m / E$, just as moles $= m / M$.",
);
q(
  "equivalents-normality",
  "medium",
  "Complete neutralisation of sulphuric acid uses $n = 2$. The equivalent mass of $\\mathrm{H_2SO_4}$ (M = 98) is therefore",
  ["24.5 g eq$^{-1}$", "49 g eq$^{-1}$", "98 g eq$^{-1}$", "196 g eq$^{-1}$"],
  1,
  "$E = 98/2 = 49$ g eq$^{-1}$.",
);
q(
  "equivalents-normality",
  "medium",
  "A bottle labelled 0.50 M $\\mathrm{H_2SO_4}$ is used as a dibasic acid. The normality of that solution is",
  ["0.25 N", "0.50 N", "1.0 N", "2.0 N"],
  2,
  "$N = M \\times n = 0.50 \\times 2 = 1.0$ N.",
);
q(
  "equivalents-normality",
  "medium",
  "In acidic medium $\\mathrm{KMnO_4}$ is reduced to $\\mathrm{Mn^{2+}}$. The $n$-factor of permanganate in that change is",
  ["1", "3", "5", "7"],
  2,
  "Mn falls from $+7$ to $+2$, a five-electron change, so $n = 5$.",
);
q(
  "equivalents-normality",
  "medium",
  "Potassium permanganate (M = 158 g mol$^{-1}$) used in acidic titration has equivalent mass",
  ["31.6 g eq$^{-1}$", "52.7 g eq$^{-1}$", "79.0 g eq$^{-1}$", "158 g eq$^{-1}$"],
  0,
  "$E = 158/5 = 31.6$ g eq$^{-1}$ for the five-electron acidic reduction.",
);
q(
  "equivalents-normality",
  "hard",
  "Twenty-five millilitres of 0.20 N $\\mathrm{H_2SO_4}$ are titrated with 0.10 N NaOH. The volume of alkali required for complete neutralisation is",
  ["12.5 mL", "25 mL", "50 mL", "100 mL"],
  2,
  "$N_1V_1 = N_2V_2$ gives $V(\\mathrm{NaOH}) = (0.20 \\times 25)/0.10 = 50$ mL.",
);

// —— molarity-dilution: 8 (5 easy, 2 medium, 1 hard) ——
q(
  "molarity-dilution",
  "easy",
  "A one-molar aqueous solution is prepared so that one litre of the finished solution contains",
  [
    "1 mol of solute",
    "1 mol of solvent only",
    "1 g of solute",
    "1 kg of solute",
  ],
  0,
  "Molarity is moles of solute per litre of solution; 1 M means 1 mol in 1 L of solution.",
);
q(
  "molarity-dilution",
  "easy",
  "Half a mole of glucose is dissolved and the solution is made up to 250 mL. The molarity of that solution is",
  ["0.50 M", "1.0 M", "2.0 M", "4.0 M"],
  2,
  "$M = 0.50 / 0.250 = 2.0$ mol L$^{-1}$.",
);
q(
  "molarity-dilution",
  "easy",
  "When a solution is diluted with solvent, the product $M_1V_1$ compared with $M_2V_2$ is",
  ["larger after dilution", "smaller after dilution", "unchanged, because solute moles stay the same", "equal to the density"],
  2,
  "Dilution conserves the amount of solute, so $M_1V_1 = M_2V_2$.",
);
q(
  "molarity-dilution",
  "easy",
  "Two moles of NaOH pellets are dissolved and the solution is made up to 1.00 L. The molarity of the alkali is",
  ["0.50 M", "1.0 M", "2.0 M", "4.0 M"],
  2,
  "$M = 2.0\\ \\mathrm{mol} / 1.00\\ \\mathrm{L} = 2.0$ M.",
);
q(
  "molarity-dilution",
  "easy",
  "Four grams of NaOH (M = 40 g mol$^{-1}$) are dissolved and made up to 500 mL. The molarity of the solution is",
  ["0.10 M", "0.20 M", "0.40 M", "2.0 M"],
  1,
  "Moles of NaOH $= 4/40 = 0.10$; $M = 0.10 / 0.50 = 0.20$ M.",
);
q(
  "molarity-dilution",
  "medium",
  "A 100 mL portion of 2.0 M HCl is diluted with water to 500 mL. The molarity after dilution is",
  ["0.20 M", "0.40 M", "1.0 M", "2.0 M"],
  1,
  "$M_2 = (2.0 \\times 100)/500 = 0.40$ M.",
);
q(
  "molarity-dilution",
  "medium",
  "A student must prepare 250 mL of 1.0 M $\\mathrm{H_2SO_4}$ from a 5.0 M stock. The volume of stock that should be pipetted is",
  ["25 mL", "50 mL", "100 mL", "200 mL"],
  1,
  "$V_1 = (1.0 \\times 250)/5.0 = 50$ mL of stock, then diluted to 250 mL.",
);
q(
  "molarity-dilution",
  "hard",
  "200 mL of 0.50 M NaCl is mixed with 300 mL of 1.50 M NaCl (volumes additive). The molarity of the blended solution is",
  ["0.90 M", "1.00 M", "1.10 M", "1.20 M"],
  2,
  "Solute moles $= 0.10 + 0.45 = 0.55$; total volume $= 0.50$ L, so $M = 1.10$.",
);

const expected = {
  "laws-combination": { total: 10, easy: 6, medium: 3, hard: 1 },
  "mole-avogadro": { total: 20, easy: 12, medium: 6, hard: 2 },
  "molar-mass-percent": { total: 14, easy: 8, medium: 4, hard: 2 },
  "empirical-molecular": { total: 14, easy: 8, medium: 5, hard: 1 },
  "equation-mole-ratio": { total: 16, easy: 10, medium: 5, hard: 1 },
  "limiting-reagent": { total: 16, easy: 10, medium: 5, hard: 1 },
  yield: { total: 8, easy: 5, medium: 2, hard: 1 },
  "oxidation-number": { total: 16, easy: 10, medium: 5, hard: 1 },
  "redox-balancing": { total: 14, easy: 8, medium: 5, hard: 1 },
  "equivalents-normality": { total: 12, easy: 7, medium: 4, hard: 1 },
  "molarity-dilution": { total: 8, easy: 5, medium: 2, hard: 1 },
};

const problems = [];
if (questions.length !== 148) problems.push(`count ${questions.length} !== 148`);
if (questions[0]?.id !== "che-st-101") problems.push(`first id ${questions[0]?.id}`);
if (questions.at(-1)?.id !== "che-st-248") problems.push(`last id ${questions.at(-1)?.id}`);

for (const [conceptId, quota] of Object.entries(expected)) {
  const slice = questions.filter((row) => row.conceptId === conceptId);
  const easy = slice.filter((row) => row.difficulty === "easy").length;
  const medium = slice.filter((row) => row.difficulty === "medium").length;
  const hard = slice.filter((row) => row.difficulty === "hard").length;
  if (slice.length !== quota.total || easy !== quota.easy || medium !== quota.medium || hard !== quota.hard) {
    problems.push(
      `${conceptId}: ${slice.length} (e${easy}/m${medium}/h${hard}) expected ${quota.total} (e${quota.easy}/m${quota.medium}/h${quota.hard})`,
    );
  }
}

for (const question of questions) {
  const stem = question.stem;
  if (stem.length < 20 || stem.length > 420) {
    problems.push(`${question.id}: stem length ${stem.length}`);
  }
  if (new Set(question.options).size !== 4) {
    problems.push(`${question.id}: options not distinct`);
  }
}

const bankStems = JSON.parse(readFileSync(stemsFile, "utf8"));
for (const question of questions) {
  for (const other of questions) {
    if (other === question) continue;
    if (stemsClash(question.stem, other.stem)) {
      problems.push(`${question.id} clashes with ${other.id}`);
      break;
    }
  }
  for (const row of bankStems) {
    if (stemsClash(question.stem, row.stem)) {
      problems.push(`${question.id} clashes with bank ${row.id}`);
      break;
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

writeFileSync(outFile, `${JSON.stringify(pack(questions), null, 2)}\n`);

const easy = questions.filter((row) => row.difficulty === "easy").length;
const medium = questions.filter((row) => row.difficulty === "medium").length;
const hard = questions.filter((row) => row.difficulty === "hard").length;
console.log(`Wrote ${questions.length} items (${easy} easy / ${medium} medium / ${hard} hard)`);
console.log(path.relative(root, outFile));
