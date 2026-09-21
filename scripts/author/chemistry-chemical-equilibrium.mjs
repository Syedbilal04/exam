import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { item, pack } from "../lib/author-chem.mjs";
import { stemsClash } from "../lib/stems.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const chapterId = "chemistry-chemical-equilibrium-and-acids-bases";
const prefix = "che-eq";
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

// --- dynamic-equilibrium: 6 easy, 3 medium, 1 hard ---
q(
  "dynamic-equilibrium",
  "easy",
  "In a reversible chemical process sitting at dynamic equilibrium, the forward rate compared with the reverse rate is",
  ["equal", "zero in both directions", "much larger for the forward step", "much larger for the reverse step"],
  0,
  "Dynamic equilibrium means both reactions continue, but their rates match so there is no net change.",
);
q(
  "dynamic-equilibrium",
  "easy",
  "Once chemical equilibrium is established in a closed vessel, the amounts of reactants and products",
  [
    "become constant, though not necessarily equal",
    "must become exactly equal",
    "keep rising until the vessel is full",
    "fall to zero for the reactants",
  ],
  0,
  "Equilibrium concentrations stay constant with time. Equality of concentrations is not required.",
);
q(
  "dynamic-equilibrium",
  "easy",
  "A true chemical equilibrium can be approached",
  [
    "from either the reactant side or the product side",
    "only by starting with pure reactants",
    "only by starting with pure products",
    "only after a catalyst is added",
  ],
  0,
  "The same equilibrium state is reached whether one begins with reactants or with products, at a given temperature.",
);
q(
  "dynamic-equilibrium",
  "easy",
  "A necessary condition for a chemical equilibrium to be set up is that the reacting system remains",
  ["closed", "open to the air", "continuously stirred with fresh feed", "at a pressure of 1 atm only"],
  0,
  "Matter must not leave or enter; otherwise concentrations never settle to a true equilibrium.",
);
q(
  "dynamic-equilibrium",
  "easy",
  "At chemical equilibrium the colour, density and other bulk properties of the mixture",
  ["stay unchanged with time", "oscillate periodically", "drift slowly toward the products", "become identical to those of the pure reactant"],
  0,
  "Macroscopic properties are constant at equilibrium even though molecules still react microscopically.",
);
q(
  "dynamic-equilibrium",
  "easy",
  "The dynamic character of chemical equilibrium is shown by the observation that",
  [
    "forward and reverse reactions continue at equal speeds",
    "all molecular motion stops",
    "only the forward reaction survives",
    "the reaction quotient becomes undefined",
  ],
  0,
  "Isotopic tracing shows both directions remain active; their rates are equal, so composition is steady.",
);
q(
  "dynamic-equilibrium",
  "medium",
  "Introducing a catalyst into a gaseous mixture that is already at equilibrium",
  [
    "leaves the equilibrium composition unaltered",
    "raises the equilibrium constant",
    "shifts the mixture toward products",
    "destroys the reverse reaction",
  ],
  0,
  "A catalyst speeds both directions equally. K and the equilibrium amounts stay the same; only the time to reach equilibrium falls.",
);
q(
  "dynamic-equilibrium",
  "medium",
  "The numerical size of an equilibrium constant informs us about",
  [
    "how far the reaction proceeds, not how rapidly it occurs",
    "the activation energy alone",
    "the order of the reaction",
    "the molecularity of the slow step",
  ],
  0,
  "K measures the extent of reaction at equilibrium. Rate is a kinetic quantity and is not given by K.",
);
q(
  "dynamic-equilibrium",
  "medium",
  "For a reaction at chemical equilibrium at constant temperature and pressure, the change in Gibbs energy $\\Delta G$ is",
  ["zero", "always negative", "always positive", "equal to $\\Delta G^\\circ$"],
  0,
  "Equilibrium is the state of minimum G at given T and P, so $\\Delta G = 0$. $\\Delta G^\\circ$ is related to K and need not be zero.",
);
q(
  "dynamic-equilibrium",
  "hard",
  "A sealed flask holds N2, H2 and NH3 already at equilibrium. Ammonia molecules in that flask",
  [
    "keep forming and decomposing at equal rates",
    "stop forming completely",
    "are converted entirely back into N2 and H2",
    "increase steadily because the vessel is closed",
  ],
  0,
  "Closure keeps the total amounts fixed, but the Haber reactions remain active in both directions at matching rates.",
);

// --- kc-kp: 14 easy, 7 medium, 3 hard ---
q(
  "kc-kp",
  "easy",
  "According to the law of mass action, $K_c$ for $a\\mathrm{A} + b\\mathrm{B} \\rightleftharpoons c\\mathrm{C} + d\\mathrm{D}$ is",
  [
    "$[\\mathrm{C}]^c[\\mathrm{D}]^d / [\\mathrm{A}]^a[\\mathrm{B}]^b$",
    "$[\\mathrm{A}]^a[\\mathrm{B}]^b / [\\mathrm{C}]^c[\\mathrm{D}]^d$",
    "$[\\mathrm{C}][\\mathrm{D}] / [\\mathrm{A}][\\mathrm{B}]$",
    "$a[\\mathrm{A}] + b[\\mathrm{B}]$",
  ],
  0,
  "Kc is the quotient of product active masses over reactant active masses, each raised to its stoichiometric coefficient.",
);
q(
  "kc-kp",
  "easy",
  "The standard relation connecting $K_p$ and $K_c$ for a gas reaction is",
  [
    "$K_p = K_c(RT)^{\\Delta n}$",
    "$K_p = K_c + RT$",
    "$K_p = K_c / \\Delta n$",
    "$K_p = K_c^{\\Delta n}$",
  ],
  0,
  "Partial pressures and concentrations are linked by $p = CRT$, which produces the factor $(RT)^{\\Delta n}$.",
);
q(
  "kc-kp",
  "easy",
  "In $K_p = K_c(RT)^{\\Delta n}$, the exponent $\\Delta n$ is",
  [
    "gaseous moles of products minus gaseous moles of reactants",
    "total moles of all species including solids",
    "the change in oxidation number",
    "the molecularity of the forward step",
  ],
  0,
  "Only gaseous species contribute to $\\Delta n$ because Kp is built from partial pressures.",
);
q(
  "kc-kp",
  "easy",
  "For $\\mathrm{H_2}(g) + \\mathrm{I_2}(g) \\rightleftharpoons 2\\mathrm{HI}(g)$, $K_p$ compared with $K_c$ is",
  ["$K_p = K_c$", "$K_p = K_c(RT)$", "$K_p = K_c/(RT)$", "$K_p = K_c(RT)^2$"],
  0,
  "There are two moles of gas on each side, so $\\Delta n = 0$ and $K_p = K_c$.",
);
q(
  "kc-kp",
  "easy",
  "For the Haber equation $\\mathrm{N_2}(g) + 3\\mathrm{H_2}(g) \\rightleftharpoons 2\\mathrm{NH_3}(g)$, $\\Delta n$ in the $K_p$–$K_c$ formula is",
  ["$-2$", "$+2$", "$0$", "$-1$"],
  0,
  "Gaseous moles: products 2, reactants 4, so $\\Delta n = 2 - 4 = -2$.",
);
q(
  "kc-kp",
  "easy",
  "A very large numerical value of $K_c$ for a reaction means that at equilibrium",
  [
    "products predominate",
    "reactants predominate",
    "the reaction is extremely slow",
    "the reaction cannot occur",
  ],
  0,
  "Large K means the numerator (products) is much greater than the denominator (reactants) at equilibrium.",
);
q(
  "kc-kp",
  "easy",
  "If the equilibrium constant of a written reaction is $K$, the equilibrium constant of the reverse writing is",
  ["$1/K$", "$K$", "$2K$", "$K^2$"],
  0,
  "Reversing the reaction inverts the concentration quotient, so the constant becomes $1/K$.",
);
q(
  "kc-kp",
  "easy",
  "If a balanced chemical equation is multiplied through by 2, the new equilibrium constant is",
  ["$K^2$", "$2K$", "$K/2$", "$\\sqrt{K}$"],
  0,
  "Each concentration is raised to twice the original power, which squares the original K.",
);
q(
  "kc-kp",
  "easy",
  "Active mass in the law of mass action, for a dilute solution, is taken as the",
  ["molar concentration", "mass in grams", "mole fraction only", "volume in litres"],
  0,
  "For solutions the active mass is the molarity (mol L^{-1}), often written in square brackets.",
);
q(
  "kc-kp",
  "easy",
  "For $\\mathrm{PCl_5}(g) \\rightleftharpoons \\mathrm{PCl_3}(g) + \\mathrm{Cl_2}(g)$, the value of $\\Delta n$ is",
  ["$+1$", "$0$", "$-1$", "$+2$"],
  0,
  "Two moles of gas appear from one mole, so $\\Delta n = +1$.",
);
q(
  "kc-kp",
  "easy",
  "The SI-style units of $K_c$ for $\\mathrm{N_2} + 3\\mathrm{H_2} \\rightleftharpoons 2\\mathrm{NH_3}$ are",
  [
    "$\\mathrm{L^2\\ mol^{-2}}$",
    "$\\mathrm{mol\\ L^{-1}}$",
    "dimensionless only",
    "$\\mathrm{atm^{-1}}$",
  ],
  0,
  "Kc = [NH3]^2 / ([N2][H2]^3) has concentration units of (mol L^{-1})^{-2}, i.e. L^2 mol^{-2}.",
);
q(
  "kc-kp",
  "easy",
  "The $K_c$ expression for $2\\mathrm{SO_2}(g) + \\mathrm{O_2}(g) \\rightleftharpoons 2\\mathrm{SO_3}(g)$ is",
  [
    "$[\\mathrm{SO_3}]^2 / ([\\mathrm{SO_2}]^2[\\mathrm{O_2}])$",
    "$[\\mathrm{SO_2}]^2[\\mathrm{O_2}] / [\\mathrm{SO_3}]^2$",
    "$[\\mathrm{SO_3}] / [\\mathrm{SO_2}][\\mathrm{O_2}]$",
    "$[\\mathrm{SO_3}]^2 / [\\mathrm{SO_2}][\\mathrm{O_2}]$",
  ],
  0,
  "Products over reactants with stoichiometric exponents: two for SO3, two for SO2, one for O2.",
);
q(
  "kc-kp",
  "easy",
  "Whenever $\\Delta n = 0$ for a gas-phase equilibrium, $K_p$ and $K_c$ are",
  ["numerically equal", "related by $RT$", "related by $(RT)^2$", "unrelated"],
  0,
  "$(RT)^{\\Delta n} = 1$ when $\\Delta n = 0$, so the two constants coincide numerically.",
);
q(
  "kc-kp",
  "easy",
  "The constant $K_p$ built from partial pressures is the natural choice for",
  ["gaseous equilibria", "aqueous ionic equilibria only", "solid–solid reactions only", "electrolysis cells"],
  0,
  "Kp uses partial pressures, so it applies to equilibria in which gases appear.",
);
q(
  "kc-kp",
  "medium",
  "At $300\\ \\mathrm{K}$, for a gas reaction with $\\Delta n = +1$ and $R = 0.082\\ \\mathrm{L\\ atm\\ K^{-1}\\ mol^{-1}}$, the ratio $K_p/K_c$ equals about",
  ["$24.6\\ \\mathrm{L\\ atm\\ mol^{-1}}$", "$0.082$", "$300$", "$1$"],
  0,
  "$K_p/K_c = (RT)^{\\Delta n} = RT = 0.082 \\times 300 = 24.6$.",
);
q(
  "kc-kp",
  "medium",
  "For $\\mathrm{A}(g) + \\mathrm{B}(g) \\rightleftharpoons \\mathrm{C}(g)$, equilibrium concentrations are $[\\mathrm{A}] = 1$, $[\\mathrm{B}] = 1$, $[\\mathrm{C}] = 2$ (all in mol L^{-1}). $K_c$ is",
  ["$2$", "$0.5$", "$1$", "$4$"],
  0,
  "$K_c = [C]/([A][B]) = 2/(1 \\times 1) = 2$ (units L mol^{-1}).",
);
q(
  "kc-kp",
  "medium",
  "For $\\mathrm{PCl_5} \\rightleftharpoons \\mathrm{PCl_3} + \\mathrm{Cl_2}$, $K_c = 0.04\\ \\mathrm{mol\\ L^{-1}}$. If $[\\mathrm{PCl_3}] = [\\mathrm{Cl_2}] = 0.20\\ \\mathrm{mol\\ L^{-1}}$, the equilibrium $[\\mathrm{PCl_5}]$ is",
  ["$1.0\\ \\mathrm{mol\\ L^{-1}}$", "$0.04\\ \\mathrm{mol\\ L^{-1}}$", "$0.20\\ \\mathrm{mol\\ L^{-1}}$", "$0.008\\ \\mathrm{mol\\ L^{-1}}$"],
  0,
  "$K_c = [PCl3][Cl2]/[PCl5] = (0.20)(0.20)/[PCl5] = 0.04$, so $[PCl5] = 1.0\\ \\mathrm{mol\\ L^{-1}}$.",
);
q(
  "kc-kp",
  "medium",
  "The equilibrium $2\\mathrm{HI} \\rightleftharpoons \\mathrm{H_2} + \\mathrm{I_2}$ has $K_c = 0.25$. Starting with $1.0$ mol HI in a $1.0$ L bulb, the equilibrium amount of H2 is",
  ["$0.25\\ \\mathrm{mol}$", "$0.50\\ \\mathrm{mol}$", "$0.125\\ \\mathrm{mol}$", "$1.0\\ \\mathrm{mol}$"],
  0,
  "If $x$ mol of H2 form, $K_c = x^2/(1-2x)^2 = 0.25$, so $x/(1-2x) = 1/2$, hence $x = 0.25$.",
);
q(
  "kc-kp",
  "medium",
  "If $K_1$ is the constant for $\\mathrm{A} \\rightleftharpoons \\mathrm{B}$ and $K_2$ for $\\mathrm{B} \\rightleftharpoons \\mathrm{C}$, the constant for $\\mathrm{A} \\rightleftharpoons \\mathrm{C}$ is",
  ["$K_1 K_2$", "$K_1 + K_2$", "$K_1/K_2$", "$K_2/K_1$"],
  0,
  "The overall quotient is the product of the stepwise quotients, so overall $K = K_1 K_2$.",
);
q(
  "kc-kp",
  "medium",
  "For Haber synthesis $\\Delta n = -2$, so at a given temperature $K_p$ is",
  [
    "smaller than $K_c$ by a factor $(RT)^2$",
    "equal to $K_c$",
    "larger than $K_c$ by $(RT)^2$",
    "independent of $K_c$",
  ],
  0,
  "$K_p = K_c(RT)^{-2} = K_c/(RT)^2$, hence $K_p < K_c$ at ordinary T where $RT > 1$ in L atm mol^{-1}.",
);
q(
  "kc-kp",
  "medium",
  "At $500\\ \\mathrm{K}$ with $R = 0.082\\ \\mathrm{L\\ atm\\ K^{-1}\\ mol^{-1}}$, a gas reaction has $\\Delta n = -1$. The ratio $K_c/K_p$ equals",
  ["$41$", "$0.082$", "$500$", "$1$"],
  0,
  "$K_p = K_c/(RT)$, so $K_c/K_p = RT = 0.082 \\times 500 = 41$.",
);
q(
  "kc-kp",
  "hard",
  "The reaction $2\\mathrm{SO_2} + \\mathrm{O_2} \\rightleftharpoons 2\\mathrm{SO_3}$ has $K_c = 4$. For $\\mathrm{SO_3} \\rightleftharpoons \\mathrm{SO_2} + \\tfrac{1}{2}\\mathrm{O_2}$, the new $K_c$ is",
  ["$0.50$", "$4$", "$2$", "$0.25$"],
  0,
  "Reversing gives $1/4$. Halving the equation takes the square root: $\\sqrt{1/4} = 1/2$.",
);
q(
  "kc-kp",
  "hard",
  "For $\\mathrm{PCl_5}(g) \\rightleftharpoons \\mathrm{PCl_3}(g) + \\mathrm{Cl_2}(g)$ at $300\\ \\mathrm{K}$, $K_p = 24.6\\ \\mathrm{atm}$. With $R = 0.082\\ \\mathrm{L\\ atm\\ K^{-1}\\ mol^{-1}}$, $K_c$ in mol L^{-1} is",
  ["$1.0$", "$24.6$", "$0.082$", "$300$"],
  0,
  "$\\Delta n = +1$, so $K_c = K_p/(RT) = 24.6/(0.082 \\times 300) = 24.6/24.6 = 1.0$.",
);
q(
  "kc-kp",
  "hard",
  "Given $2\\mathrm{NO}(g) + \\mathrm{O_2}(g) \\rightleftharpoons 2\\mathrm{NO_2}(g)$ with $K_c = 100$, the constant for $\\mathrm{NO_2}(g) \\rightleftharpoons \\mathrm{NO}(g) + \\tfrac{1}{2}\\mathrm{O_2}(g)$ is",
  ["$0.10$", "$10$", "$0.01$", "$100$"],
  0,
  "The target equation is the reverse of the original, halved. New $K = 1/\\sqrt{100} = 0.10$.",
);

// --- homo-hetero-k: 5 easy, 2 medium, 1 hard ---
q(
  "homo-hetero-k",
  "easy",
  "An equilibrium in which every participating species is in the same physical state is called",
  ["homogeneous", "heterogeneous", "irreversible", "photochemical"],
  0,
  "Homogeneous equilibrium: one phase throughout, e.g. all gases or all aqueous species.",
);
q(
  "homo-hetero-k",
  "easy",
  "Thermal decomposition of limestone $\\mathrm{CaCO_3}(s) \\rightleftharpoons \\mathrm{CaO}(s) + \\mathrm{CO_2}(g)$ is classified as",
  ["heterogeneous equilibrium", "homogeneous gas equilibrium", "ionic equilibrium in water", "a photochemical equilibrium"],
  0,
  "Solids and a gas coexist, so more than one phase is present: heterogeneous.",
);
q(
  "homo-hetero-k",
  "easy",
  "When $K_c$ is written for a heterogeneous equilibrium, concentrations of pure solids are",
  ["omitted (taken as unity)", "raised to the second power", "replaced by their densities in g mL^{-1}", "set equal to the total pressure"],
  0,
  "The active mass of a pure solid is constant and is absorbed into K, so solids do not appear in the K expression.",
);
q(
  "homo-hetero-k",
  "easy",
  "For $\\mathrm{CaCO_3}(s) \\rightleftharpoons \\mathrm{CaO}(s) + \\mathrm{CO_2}(g)$, $K_p$ reduces to",
  ["$p_{\\mathrm{CO_2}}$", "$p_{\\mathrm{CaO}}$", "$1/p_{\\mathrm{CO_2}}$", "$p_{\\mathrm{CO_2}}^2$"],
  0,
  "Both solids drop out, leaving $K_p = p_{CO_2}$. At a fixed temperature the CO2 pressure is fixed.",
);
q(
  "homo-hetero-k",
  "easy",
  "Pure liquid water is left out of many $K_c$ expressions because its concentration is",
  ["essentially constant", "zero", "equal to $K_w$", "undefined"],
  0,
  "The molarity of the pure liquid is fixed (~55.5 mol L^{-1}) and is built into the constant.",
);
q(
  "homo-hetero-k",
  "medium",
  "For $\\mathrm{Fe_3O_4}(s) + 4\\mathrm{H_2}(g) \\rightleftharpoons 3\\mathrm{Fe}(s) + 4\\mathrm{H_2O}(g)$, $K_c$ is",
  [
    "$[\\mathrm{H_2O}]^4 / [\\mathrm{H_2}]^4$",
    "$[\\mathrm{Fe}]^3[\\mathrm{H_2O}]^4 / [\\mathrm{Fe_3O_4}][\\mathrm{H_2}]^4$",
    "$[\\mathrm{H_2}]^4 / [\\mathrm{H_2O}]^4$",
    "$[\\mathrm{Fe_3O_4}] / [\\mathrm{Fe}]$",
  ],
  0,
  "Pure solids Fe3O4 and Fe are omitted. Only the four moles of steam and hydrogen remain.",
);
q(
  "homo-hetero-k",
  "medium",
  "Dumping extra solid CaO into a vessel where $\\mathrm{CaCO_3}(s) \\rightleftharpoons \\mathrm{CaO}(s) + \\mathrm{CO_2}(g)$ is already at equilibrium",
  [
    "does not change the equilibrium CO2 pressure",
    "raises $p_{\\mathrm{CO_2}}$ in proportion to the mass added",
    "lowers $K_p$",
    "forces all CO2 back to carbonate",
  ],
  0,
  "K_p = p_CO2 depends only on temperature. Extra pure solid does not alter that pressure.",
);
q(
  "homo-hetero-k",
  "hard",
  "At a fixed temperature, increasing the amount of CaCO3(s) in a closed crucible containing CaO(s) and CO2(g) at equilibrium does not raise $p_{\\mathrm{CO_2}}$ because",
  [
    "$K_p = p_{\\mathrm{CO_2}}$ is a function of T alone",
    "the reaction becomes irreversible",
    "solids have infinite vapour pressure",
    "CO2 liquefies immediately",
  ],
  0,
  "Heterogeneous K_p contains only p_CO2. Once both solids are present, that pressure is fixed by T.",
);

// --- degree-dissociation: 7 easy, 4 medium, 1 hard ---
q(
  "degree-dissociation",
  "easy",
  "The degree of dissociation $\\alpha$ of a substance is the",
  [
    "fraction of the original molecules that have dissociated",
    "number of moles of product only",
    "equilibrium constant itself",
    "total pressure of the mixture",
  ],
  0,
  "$\\alpha$ = (moles that dissociate) / (moles taken initially). It is a fraction, often between 0 and 1.",
);
q(
  "degree-dissociation",
  "easy",
  "Starting with 1 mol of PCl5 that dissociates as $\\mathrm{PCl_5} \\rightleftharpoons \\mathrm{PCl_3} + \\mathrm{Cl_2}$, the total number of moles at equilibrium is",
  ["$1 + \\alpha$", "$1 - \\alpha$", "$2\\alpha$", "$1$"],
  0,
  "PCl5 left = $1-\\alpha$; PCl3 = $\\alpha$; Cl2 = $\\alpha$; sum = $1+\\alpha$.",
);
q(
  "degree-dissociation",
  "easy",
  "The numerical value of the degree of dissociation $\\alpha$ always lies between",
  ["$0$ and $1$", "$-1$ and $+1$", "$1$ and $100$", "$0$ and $\\infty$"],
  0,
  "None dissociated: $\\alpha = 0$. Completely dissociated: $\\alpha = 1$.",
);
q(
  "degree-dissociation",
  "easy",
  "For the gas reaction $\\mathrm{A} \\rightleftharpoons \\mathrm{B} + \\mathrm{C}$ starting with 1 mol of A in volume $V$, $K_c$ equals",
  [
    "$\\alpha^2 / ((1-\\alpha)V)$",
    "$\\alpha / V$",
    "$(1-\\alpha)/\\alpha^2$",
    "$\\alpha^2 V$",
  ],
  0,
  "[B] = [C] = $\\alpha/V$, [A] = $(1-\\alpha)/V$, so $K_c = (\\alpha/V)^2 / ((1-\\alpha)/V) = \\alpha^2/((1-\\alpha)V)$.",
);
q(
  "degree-dissociation",
  "easy",
  "If the theoretical vapour density of undissociated N2O4 is $D$ and the observed vapour density is $d$, then $\\alpha$ for $\\mathrm{N_2O_4} \\rightleftharpoons 2\\mathrm{NO_2}$ is",
  ["$(D - d)/d$", "$(d - D)/d$", "$D/d$", "$d/D$"],
  0,
  "For $n = 2$, $\\alpha = (D - d)/((n-1)d) = (D - d)/d$. Observed density falls as more moles form.",
);
q(
  "degree-dissociation",
  "easy",
  "Ostwald's dilution law connects the degree of ionisation of a weak electrolyte with",
  [
    "its concentration and the ionisation constant",
    "only the applied voltage",
    "the boiling point of the solvent",
    "the colour of the solution",
  ],
  0,
  "For a weak binary electrolyte, $K_a \\approx \\alpha^2 C$, so $\\alpha$ rises as the solution is diluted.",
);
q(
  "degree-dissociation",
  "easy",
  "One mole of N2O4 that is $\\alpha$-dissociated according to $\\mathrm{N_2O_4} \\rightleftharpoons 2\\mathrm{NO_2}$ produces a total of",
  ["$1 + \\alpha$ moles of gas", "$1 - \\alpha$ moles of gas", "$2$ moles of gas always", "$\\alpha$ moles of gas"],
  0,
  "N2O4 left = $1-\\alpha$; NO2 = $2\\alpha$; total = $1+\\alpha$.",
);
q(
  "degree-dissociation",
  "medium",
  "If PCl5 is fifty percent dissociated at equilibrium, the value of $\\alpha$ to substitute in $K_c$ formulae is",
  ["$0.50$", "$50$", "$2$", "$0.05$"],
  0,
  "Fifty percent means half the original molecules have split, so $\\alpha = 0.50$ (not 50).",
);
q(
  "degree-dissociation",
  "medium",
  "For $\\mathrm{PCl_5} \\rightleftharpoons \\mathrm{PCl_3} + \\mathrm{Cl_2}$, $K_p$ in terms of $\\alpha$ and the total pressure $P$ is",
  [
    "$\\alpha^2 P / (1 - \\alpha^2)$",
    "$\\alpha P$",
    "$(1 - \\alpha)/P$",
    "$4\\alpha^2 P / (1 - \\alpha^2)$",
  ],
  0,
  "Mole fractions give $p_{PCl3} = p_{Cl2} = \\alpha P/(1+\\alpha)$ and $p_{PCl5} = (1-\\alpha)P/(1+\\alpha)$, whence $K_p = \\alpha^2 P/(1-\\alpha^2)$.",
);
q(
  "degree-dissociation",
  "medium",
  "Raising the total pressure on $\\mathrm{N_2O_4}(g) \\rightleftharpoons 2\\mathrm{NO_2}(g)$ causes the degree of dissociation to",
  ["decrease", "increase", "become exactly 1", "become independent of T"],
  0,
  "The product side has more moles of gas, so Le Chatelier predicts less dissociation at higher P.",
);
q(
  "degree-dissociation",
  "medium",
  "A 1 L flask is charged with 1 mol of A, which dissociates as $\\mathrm{A} \\rightleftharpoons 2\\mathrm{B}$ with $\\alpha = 0.50$. $K_c$ is",
  ["$2.0$", "$0.50$", "$1.0$", "$0.25$"],
  0,
  "[A] = 0.50 mol L^{-1}, [B] = 1.0 mol L^{-1}, $K_c = [B]^2/[A] = 1/0.50 = 2.0$.",
);
q(
  "degree-dissociation",
  "hard",
  "For $\\mathrm{N_2O_4} \\rightleftharpoons 2\\mathrm{NO_2}$ at total pressure $1\\ \\mathrm{atm}$, $K_p = 4/3\\ \\mathrm{atm}$. The degree of dissociation $\\alpha$ is",
  ["$0.50$", "$0.25$", "$0.75$", "$1.00$"],
  0,
  "$K_p = 4\\alpha^2 P/(1-\\alpha^2)$. With $P = 1$ and $K_p = 4/3$, $4\\alpha^2 = (4/3)(1-\\alpha^2)$ gives $\\alpha = 1/2$.",
);

// --- le-chatelier: 12 easy, 6 medium, 2 hard ---
q(
  "le-chatelier",
  "easy",
  "In the Haber equilibrium $\\mathrm{N_2} + 3\\mathrm{H_2} \\rightleftharpoons 2\\mathrm{NH_3}$, raising the total pressure at constant T shifts the mixture",
  ["toward ammonia", "toward N2 and H2", "not at all", "until K becomes 1"],
  0,
  "Fewer moles of gas sit on the ammonia side, so high pressure favours NH3.",
);
q(
  "le-chatelier",
  "easy",
  "Haber synthesis of ammonia is exothermic. Raising the temperature at equilibrium therefore",
  [
    "favours decomposition of ammonia",
    "favours more ammonia",
    "leaves K unchanged",
    "stops the reverse reaction",
  ],
  0,
  "Heat is a product of the forward Haber step. Extra heat drives the endothermic reverse reaction.",
);
q(
  "le-chatelier",
  "easy",
  "The iron catalyst used in Haber synthesis",
  [
    "does not change the equilibrium yield of NH3",
    "increases Kp",
    "shifts equilibrium to the right",
    "is consumed as a reactant",
  ],
  0,
  "The catalyst shortens the time to equilibrium without altering K or the equilibrium composition.",
);
q(
  "le-chatelier",
  "easy",
  "Admission of an inert gas at constant volume to a gaseous equilibrium mixture",
  [
    "does not shift the equilibrium position",
    "always favours the product side",
    "always favours the reactant side",
    "doubles Kc",
  ],
  0,
  "Partial pressures of the reacting gases stay the same at constant V and T, so the position is unchanged.",
);
q(
  "le-chatelier",
  "easy",
  "Admission of an inert gas at constant pressure to $\\mathrm{PCl_5} \\rightleftharpoons \\mathrm{PCl_3} + \\mathrm{Cl_2}$",
  [
    "shifts the equilibrium toward greater dissociation",
    "shifts toward PCl5",
    "has no effect",
    "makes $\\alpha = 0$",
  ],
  0,
  "The volume must increase to keep P fixed, which dilutes the gases and favours the side with more moles.",
);
q(
  "le-chatelier",
  "easy",
  "Adding extra nitrogen to a Haber mixture at constant volume",
  ["shifts the equilibrium forward", "shifts it backward", "does not affect the position", "lowers the temperature"],
  0,
  "Increasing a reactant concentration drives the net reaction toward products until Q again equals K.",
);
q(
  "le-chatelier",
  "easy",
  "The Contact oxidation $2\\mathrm{SO_2} + \\mathrm{O_2} \\rightleftharpoons 2\\mathrm{SO_3}$ is favoured by",
  [
    "high pressure and a moderately low temperature",
    "low pressure and very high temperature",
    "low pressure and a catalyst only",
    "vacuum and 1000 °C",
  ],
  0,
  "$\\Delta n$ is negative and the forward reaction is exothermic, so high P and moderate T help SO3.",
);
q(
  "le-chatelier",
  "easy",
  "Liquefying and removing ammonia as it forms in the Haber converter",
  [
    "drives the net reaction toward more NH3",
    "stops the forward reaction",
    "increases Kp",
    "is forbidden by Le Chatelier's principle",
  ],
  0,
  "Removing a product lowers Q, so the system makes more product to restore equilibrium.",
);
q(
  "le-chatelier",
  "easy",
  "For an endothermic dissociation already at equilibrium, heating the mixture",
  [
    "increases the product yield",
    "decreases the product yield",
    "cannot change $\\alpha$",
    "makes K smaller",
  ],
  0,
  "Heat is a reactant of an endothermic step, so extra heat is consumed by forming more products.",
);
q(
  "le-chatelier",
  "easy",
  "Compressing the volume of an $\\mathrm{N_2O_4} \\rightleftharpoons 2\\mathrm{NO_2}$ mixture at constant T",
  ["favours N2O4", "favours NO2", "does not shift the equilibrium", "doubles Kp"],
  0,
  "The left side has fewer moles of gas, so a smaller volume (higher P) favours N2O4.",
);
q(
  "le-chatelier",
  "easy",
  "Typical industrial Haber conditions taught at Intermediate level are about",
  [
    "200 atm, 450 °C, finely divided iron",
    "1 atm, 25 °C, no catalyst",
    "1000 atm, 1000 °C, platinum gauze",
    "0.1 atm, 800 °C, nickel",
  ],
  0,
  "High pressure favours NH3; a compromise temperature near 450 °C with an Fe catalyst gives a usable rate.",
);
q(
  "le-chatelier",
  "easy",
  "The solid catalyst employed in the Contact process for sulphur trioxide is",
  ["V2O5", "Fe", "Ni", "MnO2"],
  0,
  "Vanadium(V) oxide is the Contact-process catalyst; it does not change the equilibrium constant.",
);
q(
  "le-chatelier",
  "medium",
  "A very high temperature is avoided in Haber manufacture even though the rate would rise, because",
  [
    "the equilibrium yield of ammonia falls",
    "iron melts at 100 °C",
    "Kp becomes infinite",
    "hydrogen liquefies",
  ],
  0,
  "The forward Haber reaction is exothermic, so K falls as T rises and less NH3 is present at equilibrium.",
);
q(
  "le-chatelier",
  "medium",
  "Raising the temperature of the Contact equilibrium $2\\mathrm{SO_2} + \\mathrm{O_2} \\rightleftharpoons 2\\mathrm{SO_3}$ (exothermic forward)",
  [
    "shifts the mixture toward SO2 and O2",
    "shifts it toward SO3",
    "does not affect composition",
    "converts V2O5 into a reactant",
  ],
  0,
  "Heat is a product of SO3 formation, so extra heat is absorbed by the reverse reaction.",
);
q(
  "le-chatelier",
  "medium",
  "Enriching a Contact-process mixture with extra oxygen at constant T and V",
  [
    "increases the equilibrium amount of SO3",
    "decreases Kc",
    "has no effect because O2 is a catalyst",
    "forces all SO3 back to SO2",
  ],
  0,
  "Adding a reactant drives the net reaction forward until Q = K once more.",
);
q(
  "le-chatelier",
  "medium",
  "For the dissociation of PCl5, the degree of dissociation $\\alpha$ falls when the pressure is raised because",
  [
    "the product side has more moles of gas",
    "Kp increases with P",
    "the reaction is endothermic",
    "PCl5 is a solid",
  ],
  0,
  "Le Chatelier: extra pressure is relieved by forming fewer gas molecules, i.e. undissociated PCl5.",
);
q(
  "le-chatelier",
  "medium",
  "A compromise temperature is chosen for Haber synthesis because",
  [
    "low T favours yield but makes the reaction slow",
    "high T always maximises both yield and rate",
    "temperature does not affect ammonia",
    "the catalyst works only at 0 °C",
  ],
  0,
  "K is larger at low T (exothermic) but molecules react slowly; ~450 °C with a catalyst is the industrial compromise.",
);
q(
  "le-chatelier",
  "medium",
  "Adding argon at constant pressure to Haber gas, as opposed to adding it at constant volume,",
  [
    "shifts the equilibrium toward N2 and H2",
    "has the same (null) effect as constant-volume addition",
    "increases Kp",
    "liquefies ammonia instantly",
  ],
  0,
  "Constant-P dilution increases volume and favours the side with more moles (reactants). Constant-V addition of inert gas does not shift the position.",
);
q(
  "le-chatelier",
  "hard",
  "If both the pressure is increased and the temperature is lowered on a Haber mixture already at equilibrium, the ammonia yield",
  [
    "rises, because both changes favour NH3",
    "falls, because the two changes cancel",
    "is unaffected because K is constant",
    "becomes zero",
  ],
  0,
  "High P favours the fewer-moles side (NH3) and low T favours the exothermic forward step. Both act in the same direction.",
);
q(
  "le-chatelier",
  "hard",
  "Compare inert-gas addition to Haber gas: constant volume versus constant pressure. The equilibrium shifts backward only in the",
  [
    "constant-pressure case",
    "constant-volume case",
    "both cases equally",
    "neither case",
  ],
  0,
  "At constant V partial pressures of N2, H2 and NH3 are unchanged. At constant P the mixture expands, favouring more moles (N2 + H2).",
);

// --- acid-base-theories: 8 easy, 5 medium, 1 hard ---
q(
  "acid-base-theories",
  "easy",
  "Arrhenius defined an acid as a substance that, in water, furnishes",
  ["hydrogen ions", "hydroxide ions", "electron pairs", "oxide ions only"],
  0,
  "In the Arrhenius picture an acid ionises in water to give H+ (more precisely H3O+).",
);
q(
  "acid-base-theories",
  "easy",
  "According to Arrhenius, a base dissolved in water produces",
  ["OH- ions", "H+ ions", "electrons", "protons only"],
  0,
  "Arrhenius bases (NaOH, KOH) release hydroxide ions in aqueous solution.",
);
q(
  "acid-base-theories",
  "easy",
  "In the Bronsted–Lowry sense an acid is a",
  ["proton donor", "proton acceptor", "electron-pair donor", "electron-pair acceptor"],
  0,
  "Bronsted acids donate H+. This definition also covers non-aqueous proton transfers.",
);
q(
  "acid-base-theories",
  "easy",
  "In the Bronsted–Lowry sense a base is a",
  ["proton acceptor", "proton donor", "substance that must contain OH", "electron-pair acceptor"],
  0,
  "A Bronsted base accepts H+. Ammonia is a base even though it has no hydroxide to start with.",
);
q(
  "acid-base-theories",
  "easy",
  "A Lewis acid is defined as an",
  ["electron-pair acceptor", "electron-pair donor", "proton donor only", "OH- donor"],
  0,
  "Lewis acids (BF3, AlCl3, H+) have a vacant orbital and accept a lone pair.",
);
q(
  "acid-base-theories",
  "easy",
  "A Lewis base is defined as an",
  ["electron-pair donor", "electron-pair acceptor", "proton donor only", "substance that must be ionic"],
  0,
  "Lewis bases (NH3, H2O, Cl-) have a lone pair available for sharing.",
);
q(
  "acid-base-theories",
  "easy",
  "BF3 is classified as a Lewis acid because the boron atom",
  [
    "is electron-deficient and can accept a lone pair",
    "donates a lone pair to fluorine",
    "releases H+ in water",
    "contains hydroxide",
  ],
  0,
  "Boron in BF3 has only six electrons in its valence shell and accepts a pair from a base.",
);
q(
  "acid-base-theories",
  "easy",
  "Ammonia acts as a Lewis base because the nitrogen atom",
  [
    "carries a lone pair that can be donated",
    "has a vacant d orbital",
    "releases H+ readily",
    "is electron-deficient",
  ],
  0,
  "The lone pair on N is donated to H+ or to a Lewis acid such as BF3.",
);
q(
  "acid-base-theories",
  "medium",
  "A limitation of Arrhenius theory is that it",
  [
    "applies only to aqueous solutions",
    "cannot explain HCl in water",
    "rejects the existence of OH-",
    "treats BF3 as a base",
  ],
  0,
  "Arrhenius acids and bases are defined through H+ and OH- in water, so the theory is silent on gas-phase or non-aqueous proton transfer.",
);
q(
  "acid-base-theories",
  "medium",
  "The gas-phase combination of HCl with NH3 to give solid NH4Cl is accounted for by",
  [
    "Bronsted proton transfer, not by the Arrhenius definition",
    "Arrhenius ionisation in water",
    "Lewis acidity of NH3",
    "oxidation of chlorine",
  ],
  0,
  "No water is present, so Arrhenius language does not apply. HCl donates a proton to NH3 (Bronsted).",
);
q(
  "acid-base-theories",
  "medium",
  "AlCl3 behaves as a Lewis acid in many organic reactions because aluminium",
  [
    "is electron-deficient and accepts a lone pair",
    "donates three lone pairs",
    "releases three H+ ions",
    "is a Bronsted base",
  ],
  0,
  "Al in AlCl3 has a vacant orbital. It accepts a pair from a chloride ion or from a π bond.",
);
q(
  "acid-base-theories",
  "medium",
  "Which of the following species is amphiprotic?",
  ["HCO3-", "Cl-", "Na+", "BF3"],
  0,
  "HCO3- can donate a proton (to give CO3^{2-}) or accept one (to give H2CO3).",
);
q(
  "acid-base-theories",
  "medium",
  "Which of the following is not a Lewis acid?",
  ["NH3", "BF3", "AlCl3", "H+"],
  0,
  "NH3 donates a lone pair, so it is a Lewis base. BF3, AlCl3 and H+ accept pairs.",
);
q(
  "acid-base-theories",
  "hard",
  "In the adduct-forming step $\\mathrm{BF_3} + \\mathrm{NH_3} \\rightarrow \\mathrm{H_3N{\\text{–}}BF_3}$, the bond created is a",
  [
    "coordinate bond, with BF3 as Lewis acid and NH3 as Lewis base",
    "ionic bond between F- and NH4+",
    "metallic bond",
    "hydrogen bond only",
  ],
  0,
  "Nitrogen donates its lone pair into the vacant orbital on boron: a coordinate (dative) Lewis acid–base bond.",
);

// --- ph-strong: 12 easy, 6 medium, 2 hard ---
q(
  "ph-strong",
  "easy",
  "Taking hydrochloric acid of concentration $0.01\\ \\mathrm{mol\\ L^{-1}}$ as fully ionised, its pH is",
  ["$2$", "$1$", "$12$", "$7$"],
  0,
  "For a strong monobasic acid, $[H+] = 0.01 = 10^{-2}$, so $\\mathrm{pH} = 2$.",
);
q(
  "ph-strong",
  "easy",
  "A nitric acid sample whose molarity is $10^{-3}$ has a hydrogen-ion exponent of",
  ["$3$", "$1$", "$11$", "$7$"],
  0,
  "HNO3 is strong, so $[H+] = 10^{-3}$ and pH = 3.",
);
q(
  "ph-strong",
  "easy",
  "Complete ionisation of a $0.1$ molar HCl sample produces a pH equal to",
  ["$1$", "$0.1$", "$13$", "$7$"],
  0,
  "$[H+] = 0.1 = 10^{-1}$, hence pH = 1.",
);
q(
  "ph-strong",
  "easy",
  "Sodium hydroxide at $0.01\\ \\mathrm{M}$ is a strong base; the pOH of this liquor is",
  ["$2$", "$12$", "$7$", "$0.01$"],
  0,
  "$[OH-] = 0.01 = 10^{-2}$, so pOH = 2.",
);
q(
  "ph-strong",
  "easy",
  "The pH corresponding to a $0.01$ molar NaOH solution at $25\\ ^{\\circ}\\mathrm{C}$ is",
  ["$12$", "$2$", "$7$", "$14$"],
  0,
  "pOH = 2 and pH + pOH = 14, so pH = 12.",
);
q(
  "ph-strong",
  "easy",
  "Potassium hydroxide of molarity $10^{-3}$ at $25\\ ^{\\circ}\\mathrm{C}$ registers a pH of",
  ["$11$", "$3$", "$7$", "$1$"],
  0,
  "pOH = 3, therefore pH = 14 − 3 = 11.",
);
q(
  "ph-strong",
  "easy",
  "The ionic product of water $K_w$ at $25\\ ^{\\circ}\\mathrm{C}$ is",
  ["$1.0 \\times 10^{-14}$", "$1.0 \\times 10^{-7}$", "$14$", "$1.0 \\times 10^{14}$"],
  0,
  "$K_w = [H+][OH-] = 1.0 \\times 10^{-14}$ at 25 °C.",
);
q(
  "ph-strong",
  "easy",
  "At $25\\ ^{\\circ}\\mathrm{C}$, the sum of pH and pOH of any aqueous solution is",
  ["$14$", "$7$", "$0$", "$1$"],
  0,
  "pH + pOH = pKw = 14 when Kw = 10^{-14}.",
);
q(
  "ph-strong",
  "easy",
  "Pure water at $25\\ ^{\\circ}\\mathrm{C}$ is neutral because $[H+] = [OH-]$; its pH is therefore",
  ["$7$", "$0$", "$14$", "$1$"],
  0,
  "$[H+] = 10^{-7}$ in pure water at 25 °C, so pH = 7. Neutrality means [H+] = [OH-], not a fixed number at every T.",
);
q(
  "ph-strong",
  "easy",
  "A strong acid such as HCl in dilute aqueous solution is regarded as",
  ["completely ionised", "unionised", "a weak electrolyte", "only 1% ionised"],
  0,
  "Strong acids are fully dissociated, so [H+] equals the analytical concentration (unless extremely dilute).",
);
q(
  "ph-strong",
  "easy",
  "If the pH of a solution is 4, the hydrogen-ion concentration is",
  ["$10^{-4}\\ \\mathrm{mol\\ L^{-1}}$", "$4\\ \\mathrm{mol\\ L^{-1}}$", "$10^{4}\\ \\mathrm{mol\\ L^{-1}}$", "$10^{-10}\\ \\mathrm{mol\\ L^{-1}}$"],
  0,
  "By definition $[H+] = 10^{-\\mathrm{pH}} = 10^{-4}\\ \\mathrm{mol\\ L^{-1}}$.",
);
q(
  "ph-strong",
  "easy",
  "Among the following, the strong bases commonly used in Intermediate calculations are",
  ["NaOH and KOH", "NH4OH and CH3NH2", "H2O and CH3OH", "CH3COOH and HCOOH"],
  0,
  "Alkali-metal hydroxides are fully ionised. Aqueous ammonia is a weak base.",
);
q(
  "ph-strong",
  "medium",
  "Treating dilute sulphuric acid as fully providing two H+ per formula unit, a $0.005\\ \\mathrm{M}$ H2SO4 bath has pH about",
  ["$2$", "$2.3$", "$5$", "$12$"],
  0,
  "$[H+] \\approx 2 \\times 0.005 = 0.010$, so pH = 2.",
);
q(
  "ph-strong",
  "medium",
  "A $0.05\\ \\mathrm{M}$ NaOH solution at $25\\ ^{\\circ}\\mathrm{C}$ has pOH = 1.3; its pH is therefore about",
  ["$12.7$", "$1.3$", "$7.0$", "$0.05$"],
  0,
  "pH = 14 − pOH = 14 − 1.3 = 12.7.",
);
q(
  "ph-strong",
  "medium",
  "Equal volumes of $0.20\\ \\mathrm{M}$ HCl and $0.20\\ \\mathrm{M}$ NaOH are mixed. The pH of the resulting liquor is",
  ["$7$", "$1$", "$13$", "$0$"],
  0,
  "Equimolar strong acid and strong base cancel. The mixture is a solution of NaCl, which is neutral at 25 °C.",
);
q(
  "ph-strong",
  "medium",
  "Barium hydroxide of concentration $0.005\\ \\mathrm{M}$ supplies two OH- per formula unit. Its pOH is",
  ["$2$", "$0.005$", "$12$", "$5$"],
  0,
  "$[OH-] = 2 \\times 0.005 = 0.010 = 10^{-2}$, so pOH = 2.",
);
q(
  "ph-strong",
  "medium",
  "If a solution has pH = 3, the hydroxide-ion concentration at $25\\ ^{\\circ}\\mathrm{C}$ is",
  ["$10^{-11}\\ \\mathrm{mol\\ L^{-1}}$", "$10^{-3}\\ \\mathrm{mol\\ L^{-1}}$", "$3\\ \\mathrm{mol\\ L^{-1}}$", "$10^{-7}\\ \\mathrm{mol\\ L^{-1}}$"],
  0,
  "$[H+] = 10^{-3}$, so $[OH-] = K_w/[H+] = 10^{-11}\\ \\mathrm{mol\\ L^{-1}}$.",
);
q(
  "ph-strong",
  "medium",
  "Kw of water increases as the temperature is raised. The pH of pure water at 50 °C is therefore",
  [
    "less than 7, yet the water remains neutral",
    "greater than 7 and the water is alkaline",
    "fixed at 7 at every temperature",
    "equal to 14",
  ],
  0,
  "Both [H+] and [OH-] rise equally when Kw rises, so the liquid is still neutral, but pH = −log[H+] falls below 7.",
);
q(
  "ph-strong",
  "hard",
  "Fifty millilitres of $0.10\\ \\mathrm{M}$ hydrochloric acid is combined with fifty millilitres of $0.10\\ \\mathrm{M}$ nitric acid. The pH of the blend is",
  ["$1.0$", "$2.0$", "$7.0$", "$0.10$"],
  0,
  "Each acid contributes 5 mmol of H+. Total H+ = 10 mmol in 100 mL, so [H+] = 0.10 and pH = 1.0.",
);
q(
  "ph-strong",
  "hard",
  "Thirty millilitres of $0.10\\ \\mathrm{M}$ HCl is mixed with twenty millilitres of $0.10\\ \\mathrm{M}$ NaOH. The pH of the leftover acidic solution is about",
  ["$1.7$", "$7.0$", "$12.3$", "$1.0$"],
  0,
  "H+ supplied = 3.0 mmol; OH- = 2.0 mmol. Excess H+ = 1.0 mmol in 50 mL, so [H+] = 0.020 and pH = 1.7.",
);

// --- weak-ka-kb: 10 easy, 5 medium, 1 hard ---
q(
  "weak-ka-kb",
  "easy",
  "A weak acid in water is only",
  ["partially ionised", "fully ionised", "completely converted to H2", "unable to donate a proton"],
  0,
  "Weak acids establish an equilibrium HA ⇌ H+ + A-; a large fraction of HA remains undissociated.",
);
q(
  "weak-ka-kb",
  "easy",
  "The acid dissociation constant $K_a$ of a weak acid HA is",
  ["$[H+][A-]/[HA]$", "$[HA]/[H+][A-]$", "$[H+] + [A-]$", "$[HA][H+]$"],
  0,
  "Ka is the equilibrium constant of HA ⇌ H+ + A-, with water omitted as the solvent.",
);
q(
  "weak-ka-kb",
  "easy",
  "Among acids of the same type, the larger the $K_a$",
  ["the stronger the acid", "the weaker the acid", "the smaller the [H+]", "the larger the pKa always means stronger"],
  0,
  "A bigger Ka means a larger fraction is ionised at equilibrium, so the acid is stronger.",
);
q(
  "weak-ka-kb",
  "easy",
  "Ostwald's approximation for a weak acid of concentration C is $\\alpha \\approx$",
  ["$\\sqrt{K_a/C}$", "$K_a C$", "$C/K_a$", "$K_a^2 C$"],
  0,
  "From $K_a = \\alpha^2 C/(1-\\alpha) \\approx \\alpha^2 C$ when $\\alpha \\ll 1$, so $\\alpha \\approx \\sqrt{K_a/C}$.",
);
q(
  "weak-ka-kb",
  "easy",
  "The familiar Intermediate example of a weak monobasic acid is",
  ["acetic acid", "hydrochloric acid", "nitric acid", "perchloric acid"],
  0,
  "CH3COOH is only slightly ionised in water (Ka ≈ 1.8 × 10^{-5}). HCl, HNO3 and HClO4 are strong.",
);
q(
  "weak-ka-kb",
  "easy",
  "Aqueous ammonia (NH4OH) is treated in Intermediate chemistry as a",
  ["weak base", "strong base like NaOH", "strong acid", "neutral salt"],
  0,
  "NH3 + H2O ⇌ NH4+ + OH- has a small Kb, so ammonia is a weak base.",
);
q(
  "weak-ka-kb",
  "easy",
  "The base ionisation constant $K_b$ of a weak base B is written",
  ["$[BH+][OH-]/[B]$", "$[B]/[BH+][OH-]$", "$[OH-] only$", "$K_w / [B]$"],
  0,
  "For B + H2O ⇌ BH+ + OH-, $K_b = [BH+][OH-]/[B]$.",
);
q(
  "weak-ka-kb",
  "easy",
  "The quantity pKa of a weak acid is defined as",
  ["$-\\log K_a$", "$\\log K_a$", "$-K_a$", "$K_a / 14$"],
  0,
  "pKa = −log Ka, analogous to pH = −log[H+].",
);
q(
  "weak-ka-kb",
  "easy",
  "A smaller pKa corresponds to",
  ["a stronger acid", "a weaker acid", "a stronger conjugate base always being more concentrated", "a larger pH of the pure acid always"],
  0,
  "Small pKa means large Ka, hence a stronger acid.",
);
q(
  "weak-ka-kb",
  "easy",
  "For a conjugate acid–base pair in water, $K_a \\times K_b$ equals",
  ["$K_w$", "$1$", "$14$", "$K_a + K_b$"],
  0,
  "Multiplying the two ionisation equilibria regenerates the auto-ionisation of water, so $K_a K_b = K_w$.",
);
q(
  "weak-ka-kb",
  "medium",
  "For $0.10\\ \\mathrm{M}$ acetic acid with $K_a = 1.8 \\times 10^{-5}$, Ostwald's $\\alpha$ is about",
  ["$0.013$", "$0.18$", "$1.8$", "$0.10$"],
  0,
  "$\\alpha \\approx \\sqrt{K_a/C} = \\sqrt{1.8 \\times 10^{-4}} \\approx 0.013$.",
);
q(
  "weak-ka-kb",
  "medium",
  "The hydrogen-ion concentration of a weak acid of concentration C (with $\\alpha \\ll 1$) is approximately",
  ["$\\sqrt{K_a C}$", "$K_a C$", "$C$", "$K_a / C$"],
  0,
  "$[H+] = \\alpha C \\approx C\\sqrt{K_a/C} = \\sqrt{K_a C}$.",
);
q(
  "weak-ka-kb",
  "medium",
  "A $0.10\\ \\mathrm{M}$ solution of a weak acid with $K_a = 1.8 \\times 10^{-5}$ has [H+] ≈ $1.34 \\times 10^{-3}$. Its pH is about",
  ["$2.87$", "$1.00$", "$7.00$", "$4.74$"],
  0,
  "pH = −log(1.34 × 10^{-3}) ≈ 2.87, far from the pH 1 that a strong acid of the same C would give.",
);
q(
  "weak-ka-kb",
  "medium",
  "If Ka of acetic acid is $1.8 \\times 10^{-5}$, Kb of acetate ion at 25 °C is about",
  ["$5.6 \\times 10^{-10}$", "$1.8 \\times 10^{-5}$", "$1.0 \\times 10^{-14}$", "$1.8 \\times 10^{9}$"],
  0,
  "$K_b = K_w/K_a = 10^{-14}/(1.8 \\times 10^{-5}) \\approx 5.6 \\times 10^{-10}$.",
);
q(
  "weak-ka-kb",
  "medium",
  "Diluting a weak acid (Ostwald) causes its degree of ionisation $\\alpha$ to",
  ["increase", "decrease", "remain exactly constant", "jump to 1 at once"],
  0,
  "$\\alpha \\approx \\sqrt{K_a/C}$ grows as C falls. That is the content of Ostwald's dilution law.",
);
q(
  "weak-ka-kb",
  "hard",
  "A weak monobasic acid has $K_a = 1.0 \\times 10^{-5}$. For a $0.10\\ \\mathrm{M}$ solution of this acid, the pH is about",
  ["$3.0$", "$1.0$", "$5.0$", "$7.0$"],
  0,
  "$[H+] \\approx \\sqrt{K_a C} = \\sqrt{1.0 \\times 10^{-6}} = 1.0 \\times 10^{-3}$, so pH = 3.0.",
);

// --- conjugate-pairs: 6 easy, 3 medium, 1 hard ---
q(
  "conjugate-pairs",
  "easy",
  "The conjugate base obtained when HCl donates a proton is",
  ["Cl-", "H3O+", "OH-", "HCl2-"],
  0,
  "HA and A- differ by one proton. For HCl the conjugate base is Cl-.",
);
q(
  "conjugate-pairs",
  "easy",
  "The conjugate acid formed when NH3 accepts a proton is",
  ["NH4+", "NH2-", "H3O+", "OH-"],
  0,
  "Adding H+ to ammonia produces the ammonium ion, the conjugate acid of NH3.",
);
q(
  "conjugate-pairs",
  "easy",
  "The conjugate base of water, when water acts as a Bronsted acid, is",
  ["OH-", "H3O+", "O2", "H2O2"],
  0,
  "H2O → H+ + OH-, so OH- is the conjugate base of water.",
);
q(
  "conjugate-pairs",
  "easy",
  "The conjugate acid of water, when water acts as a Bronsted base, is",
  ["H3O+", "OH-", "O^{2-}", "H2"],
  0,
  "H2O + H+ → H3O+. Hydronium is the conjugate acid of water.",
);
q(
  "conjugate-pairs",
  "easy",
  "A strong acid has a conjugate base that is",
  ["very weak", "equally strong", "also a strong acid", "amphiprotic always"],
  0,
  "The stronger the acid, the more weakly its conjugate base holds the proton.",
);
q(
  "conjugate-pairs",
  "easy",
  "Acetic acid and sodium acetate furnish the conjugate pair",
  ["CH3COOH / CH3COO-", "CH3COOH / Na+", "CH3COO- / OH-", "Na+ / H3O+"],
  0,
  "CH3COOH and CH3COO- differ by one proton and are the classic Intermediate conjugate pair.",
);
q(
  "conjugate-pairs",
  "medium",
  "When HSO4- donates a proton, the conjugate base produced is",
  ["SO4^{2-}", "H2SO4", "H3SO4+", "OH-"],
  0,
  "HSO4- ⇌ H+ + SO4^{2-}. Hydrogen sulfate and sulfate form a conjugate pair.",
);
q(
  "conjugate-pairs",
  "medium",
  "In $\\mathrm{NH_3} + \\mathrm{H_2O} \\rightleftharpoons \\mathrm{NH_4^+} + \\mathrm{OH^-}$, one Bronsted pair is",
  ["NH3 and NH4+", "NH3 and OH-", "H2O and NH4+", "NH4+ and H2O"],
  0,
  "NH3 (base) / NH4+ (conjugate acid) is one pair; H2O / OH- is the other.",
);
q(
  "conjugate-pairs",
  "medium",
  "Hydrogen carbonate ion HCO3- is amphiprotic. Its conjugate acid and conjugate base are respectively",
  ["H2CO3 and CO3^{2-}", "CO3^{2-} and H2CO3", "H3O+ and OH-", "H2O and CO2"],
  0,
  "Accepting H+ gives H2CO3; donating H+ gives CO3^{2-}.",
);
q(
  "conjugate-pairs",
  "hard",
  "For $\\mathrm{CH_3COOH} + \\mathrm{NH_3} \\rightleftharpoons \\mathrm{CH_3COO^-} + \\mathrm{NH_4^+}$, the two conjugate pairs are",
  [
    "CH3COOH/CH3COO- and NH4+/NH3",
    "CH3COOH/NH3 and CH3COO-/NH4+",
    "CH3COOH/NH4+ and CH3COO-/NH3",
    "CH3COO-/OH- and NH4+/H3O+",
  ],
  0,
  "Each pair differs by a single proton: the acetic pair and the ammonia–ammonium pair.",
);

// --- buffer-henderson: 7 easy, 4 medium, 1 hard ---
q(
  "buffer-henderson",
  "easy",
  "A buffer mixture is one that",
  [
    "resists a large change in pH on adding a little strong acid or base",
    "always has pH 7",
    "contains only a strong acid",
    "cannot contain a salt",
  ],
  0,
  "The weak acid (or base) and its salt consume added OH- or H+, so pH stays nearly steady.",
);
q(
  "buffer-henderson",
  "easy",
  "An acidic buffer of the Intermediate type is a mixture of",
  [
    "a weak acid and the salt of its conjugate base",
    "a strong acid and a strong base in equal moles",
    "two strong acids",
    "NaCl and KCl only",
  ],
  0,
  "The textbook acidic buffer is CH3COOH plus CH3COONa (the salt supplying CH3COO-).",
);
q(
  "buffer-henderson",
  "easy",
  "The standard Intermediate acidic buffer is prepared from",
  ["acetic acid and sodium acetate", "HCl and NaCl", "H2SO4 and Na2SO4", "HNO3 and KNO3"],
  0,
  "Only a weak acid plus its salt (not a strong acid plus its salt) gives a buffer.",
);
q(
  "buffer-henderson",
  "easy",
  "A basic buffer of the Intermediate type is a mixture of",
  [
    "aqueous ammonia and ammonium chloride",
    "NaOH and NaCl",
    "KOH and K2SO4",
    "HCl and NH4Cl",
  ],
  0,
  "A weak base plus the salt of its conjugate acid (NH4OH + NH4Cl) is the usual basic buffer.",
);
q(
  "buffer-henderson",
  "easy",
  "The Henderson–Hasselbalch equation for an acidic buffer is",
  [
    "$\\mathrm{pH} = \\mathrm{p}K_a + \\log([\\mathrm{salt}]/[\\mathrm{acid}])$",
    "$\\mathrm{pH} = \\mathrm{p}K_a - \\log([\\mathrm{salt}]/[\\mathrm{acid}])$",
    "$\\mathrm{pH} = \\mathrm{p}K_a + [\\mathrm{salt}]$",
    "$\\mathrm{pH} = 14 - \\mathrm{p}K_a$",
  ],
  0,
  "From Ka = [H+][salt]/[acid] one obtains pH = pKa + log([salt]/[acid]).",
);
q(
  "buffer-henderson",
  "easy",
  "When an acidic buffer has equal molar concentrations of the weak acid and its salt, the pH equals",
  ["the pKa of the acid", "7 always", "0", "14"],
  0,
  "log(1) = 0, so Henderson gives pH = pKa.",
);
q(
  "buffer-henderson",
  "easy",
  "The role of sodium acetate in an acetic acid buffer is to supply",
  ["the conjugate base CH3COO-", "extra H+", "a strong acid", "only Na+ as the buffering species"],
  0,
  "The salt is fully ionised; CH3COO- is the conjugate base that consumes added H+.",
);
q(
  "buffer-henderson",
  "medium",
  "An acetic buffer with [CH3COOH] = [CH3COONa] = $0.10\\ \\mathrm{M}$ and $\\mathrm{p}K_a = 4.74$ has pH",
  ["$4.74$", "$2.87$", "$7.00$", "$9.26$"],
  0,
  "Equal concentrations make the log term zero, so pH = pKa = 4.74.",
);
q(
  "buffer-henderson",
  "medium",
  "If [salt]/[acid] = 10 in a Henderson buffer, the pH is",
  ["$\\mathrm{p}K_a + 1$", "$\\mathrm{p}K_a - 1$", "$\\mathrm{p}K_a$", "$7$"],
  0,
  "log(10) = 1, therefore pH = pKa + 1.",
);
q(
  "buffer-henderson",
  "medium",
  "A small amount of strong acid added to an acetic acid–acetate buffer is consumed mainly by",
  [
    "acetate ion, lowering the [salt]/[acid] ratio slightly",
    "water, giving a jump of several pH units",
    "Na+ ions",
    "undissociated acetic acid acting as a base toward HCl",
  ],
  0,
  "CH3COO- + H+ → CH3COOH. The ratio salt/acid falls a little, so pH dips only slightly.",
);
q(
  "buffer-henderson",
  "medium",
  "If an acetic acid–acetate buffer is diluted tenfold with water, its pH",
  [
    "stays nearly the same because the [salt]/[acid] ratio is unchanged",
    "falls by 1 unit",
    "rises by 10 units",
    "becomes 7 immediately",
  ],
  0,
  "Both concentrations are scaled by the same factor, so their ratio — and thus Henderson pH — is almost unaltered (until the solution is extremely dilute).",
);
q(
  "buffer-henderson",
  "hard",
  "Fifty millilitres of $0.20\\ \\mathrm{M}$ acetic acid is mixed with fifty millilitres of $0.10\\ \\mathrm{M}$ sodium acetate ($\\mathrm{p}K_a = 4.74$). The pH of the buffer is about",
  ["$4.44$", "$4.74$", "$5.04$", "$7.00$"],
  0,
  "After mixing, [acid] = 0.10 M and [salt] = 0.05 M. pH = 4.74 + log(0.05/0.10) = 4.74 − 0.30 = 4.44.",
);

// --- salt-hydrolysis: 6 easy, 3 medium, 1 hard ---
q(
  "salt-hydrolysis",
  "easy",
  "An aqueous solution of sodium acetate CH3COONa is",
  ["alkaline", "acidic", "neutral like pure water at every concentration", "strongly oxidising"],
  0,
  "Acetate hydrolyses: CH3COO- + H2O ⇌ CH3COOH + OH-, so [OH-] > [H+] and the solution is alkaline.",
);
q(
  "salt-hydrolysis",
  "easy",
  "An aqueous solution of ammonium chloride NH4Cl is",
  ["acidic", "alkaline", "neutral", "basic because of Cl-"],
  0,
  "NH4+ hydrolyses: NH4+ + H2O ⇌ NH3 + H3O+, so the solution is acidic.",
);
q(
  "salt-hydrolysis",
  "easy",
  "An aqueous solution of sodium chloride is",
  ["neutral", "acidic", "alkaline", "a buffer of pH 4"],
  0,
  "NaCl is the salt of a strong acid and a strong base. Neither ion hydrolyses, so the solution is neutral.",
);
q(
  "salt-hydrolysis",
  "easy",
  "Salt hydrolysis is the reaction of the ions of a salt with water to give",
  [
    "the parent acid and/or the parent base",
    "only hydrogen gas",
    "only the metal",
    "a precipitate of the salt",
  ],
  0,
  "The weak-acid anion or weak-base cation pulls H+ or OH- from water, regenerating the weak parent.",
);
q(
  "salt-hydrolysis",
  "easy",
  "The salt of a strong acid and a strong base in water undergoes",
  ["no hydrolysis", "anionic hydrolysis only", "cationic hydrolysis only", "complete conversion to the acid"],
  0,
  "Both ions are spectators (e.g. Na+, Cl-). There is nothing to hydrolyse.",
);
q(
  "salt-hydrolysis",
  "easy",
  "Sodium acetate in water illustrates",
  [
    "anionic hydrolysis, producing OH-",
    "cationic hydrolysis, producing H+",
    "no hydrolysis",
    "oxidation of acetate to CO2 only",
  ],
  0,
  "The anion of a weak acid is a base toward water and generates hydroxide.",
);
q(
  "salt-hydrolysis",
  "medium",
  "For the salt of a weak acid and a strong base, the hydrolysis constant is",
  ["$K_h = K_w / K_a$", "$K_h = K_a / K_w$", "$K_h = K_a K_b$", "$K_h = K_w K_a$"],
  0,
  "Hydrolysis A- + H2O ⇌ HA + OH- has $K_h = [HA][OH-]/[A-] = K_w/K_a$.",
);
q(
  "salt-hydrolysis",
  "medium",
  "The pH of a moderately concentrated aqueous solution of a salt of a weak acid and a strong base is",
  ["greater than 7", "less than 7", "exactly 0", "exactly 14"],
  0,
  "Anionic hydrolysis produces OH-, so the solution is alkaline (pH > 7 at 25 °C).",
);
q(
  "salt-hydrolysis",
  "medium",
  "Cationic hydrolysis of NH4Cl in water produces",
  [
    "H3O+ and aqueous ammonia",
    "only OH-",
    "metallic sodium",
    "a strongly alkaline solution",
  ],
  0,
  "NH4+ + H2O ⇌ NH3 + H3O+. The hydronium ion makes the solution acidic.",
);
q(
  "salt-hydrolysis",
  "hard",
  "For $0.10\\ \\mathrm{M}$ CH3COONa with $K_a(\\mathrm{CH_3COOH}) = 1.0 \\times 10^{-5}$, the Intermediate formula $\\mathrm{pH} = 7 + \\tfrac{1}{2}\\mathrm{p}K_a + \\tfrac{1}{2}\\log C$ gives pH",
  ["$9.0$", "$5.0$", "$7.0$", "$3.0$"],
  0,
  "pKa = 5, log C = log(0.10) = −1. pH = 7 + 2.5 + ½(−1) = 9.0.",
);

// --- ksp-common-ion: 6 easy, 3 medium, 1 hard ---
q(
  "ksp-common-ion",
  "easy",
  "The solubility product of AgCl in water is written",
  ["$[Ag+][Cl-]$", "$[Ag+] + [Cl-]$", "$[AgCl(s)]$", "$[Ag+]/[Cl-]$"],
  0,
  "For AgCl(s) ⇌ Ag+ + Cl-, Ksp = [Ag+][Cl-]. The solid does not appear.",
);
q(
  "ksp-common-ion",
  "easy",
  "The common-ion effect on a sparingly soluble salt",
  [
    "decreases its solubility",
    "increases its solubility",
    "has no effect on solubility",
    "converts Ksp into Ka",
  ],
  0,
  "Extra Cl- from NaCl, for example, shifts AgCl(s) ⇌ Ag+ + Cl- to the left, so less AgCl dissolves.",
);
q(
  "ksp-common-ion",
  "easy",
  "In a saturated solution of a sparingly soluble salt the ionic product compared with Ksp is",
  ["equal to Ksp", "always much smaller than Ksp", "always much larger than Ksp", "undefined"],
  0,
  "Saturation means equilibrium with the solid, so the ionic product equals Ksp.",
);
q(
  "ksp-common-ion",
  "easy",
  "Precipitation of a salt from solution is expected when the ionic product",
  ["exceeds Ksp", "equals zero", "is smaller than Ksp", "equals Kw"],
  0,
  "If IP > Ksp the solution is supersaturated and the solid tends to separate.",
);
q(
  "ksp-common-ion",
  "easy",
  "Barium sulfate is a classic sparingly soluble salt. Its Ksp expression is",
  ["$[Ba^{2+}][SO_4^{2-}]$", "$[Ba^{2+}]^2[SO_4^{2-}]$", "$[BaSO4(s)]$", "$[Ba^{2+}]/[SO_4^{2-}]$"],
  0,
  "BaSO4(s) ⇌ Ba^{2+} + SO4^{2-}, so Ksp is the product of the two ion concentrations.",
);
q(
  "ksp-common-ion",
  "easy",
  "For a sparingly soluble salt of type AB2 (e.g. CaF2) with molar solubility s, Ksp equals",
  ["$4s^3$", "$s^2$", "$s$", "$2s$"],
  0,
  "[A^{2+}] = s, [B-] = 2s, so Ksp = (s)(2s)^2 = 4s^3.",
);
q(
  "ksp-common-ion",
  "medium",
  "Silver chloride is less soluble in aqueous NaCl than in pure water because of",
  [
    "the common Cl- ion pushing the AgCl equilibrium toward the solid",
    "complexation of Na+ with Ag+",
    "an increase of Ksp in salt water",
    "oxidation of silver",
  ],
  0,
  "NaCl supplies Cl-. Le Chatelier then suppresses dissolution of AgCl. Ksp itself is unchanged at a given T.",
);
q(
  "ksp-common-ion",
  "medium",
  "If Ksp of AgCl is $1.0 \\times 10^{-10}$, its molar solubility in pure water is",
  [
    "$1.0 \\times 10^{-5}\\ \\mathrm{mol\\ L^{-1}}$",
    "$1.0 \\times 10^{-10}\\ \\mathrm{mol\\ L^{-1}}$",
    "$1.0 \\times 10^{-20}\\ \\mathrm{mol\\ L^{-1}}$",
    "$10\\ \\mathrm{mol\\ L^{-1}}$",
  ],
  0,
  "For AgCl, s = √Ksp = √(10^{-10}) = 10^{-5} mol L^{-1}.",
);
q(
  "ksp-common-ion",
  "medium",
  "Adding Na2SO4 to a saturated BaSO4 mixture",
  [
    "reduces the dissolved Ba^{2+} concentration",
    "increases Ksp of BaSO4",
    "dissolves all of the BaSO4",
    "has no common ion with BaSO4",
  ],
  0,
  "Sulfate is the common ion. Extra SO4^{2-} lowers [Ba^{2+}] required to satisfy Ksp.",
);
q(
  "ksp-common-ion",
  "hard",
  "Silver chloride has $K_{\\mathrm{sp}} = 1.0 \\times 10^{-10}$. In a $0.10\\ \\mathrm{M}$ sodium chloride medium its molar solubility is",
  [
    "$1.0 \\times 10^{-9}\\ \\mathrm{mol\\ L^{-1}}$",
    "$1.0 \\times 10^{-5}\\ \\mathrm{mol\\ L^{-1}}$",
    "$0.10\\ \\mathrm{mol\\ L^{-1}}$",
    "$1.0 \\times 10^{-11}\\ \\mathrm{mol\\ L^{-1}}$",
  ],
  0,
  "[Cl-] ≈ 0.10 from NaCl, so s = Ksp / [Cl-] = 10^{-10}/0.10 = 10^{-9} mol L^{-1}, much smaller than in pure water.",
);

const quotas = {
  "dynamic-equilibrium": { easy: 6, medium: 3, hard: 1 },
  "kc-kp": { easy: 14, medium: 7, hard: 3 },
  "homo-hetero-k": { easy: 5, medium: 2, hard: 1 },
  "degree-dissociation": { easy: 7, medium: 4, hard: 1 },
  "le-chatelier": { easy: 12, medium: 6, hard: 2 },
  "acid-base-theories": { easy: 8, medium: 5, hard: 1 },
  "ph-strong": { easy: 12, medium: 6, hard: 2 },
  "weak-ka-kb": { easy: 10, medium: 5, hard: 1 },
  "conjugate-pairs": { easy: 6, medium: 3, hard: 1 },
  "buffer-henderson": { easy: 7, medium: 4, hard: 1 },
  "salt-hydrolysis": { easy: 6, medium: 3, hard: 1 },
  "ksp-common-ion": { easy: 6, medium: 3, hard: 1 },
};

const bankStems = JSON.parse(
  readFileSync(path.join(root, "scripts", ".bank-stems.json"), "utf8"),
).map((row) => row.stem);

for (const question of questions) {
  const len = String(question.stem ?? "").length;
  if (len < 20 || len > 420) {
    throw new Error(`${question.id}: stem length ${len}`);
  }
  for (const other of questions) {
    if (other !== question && stemsClash(question.stem, other.stem)) {
      throw new Error(`internal clash ${question.id} vs ${other.id}`);
    }
  }
  for (const stem of bankStems) {
    if (stemsClash(question.stem, stem)) {
      throw new Error(`${question.id} clashes with bank stem: ${stem}`);
    }
  }
}

for (const [conceptId, want] of Object.entries(quotas)) {
  const slice = questions.filter((row) => row.conceptId === conceptId);
  for (const difficulty of ["easy", "medium", "hard"]) {
    const got = slice.filter((row) => row.difficulty === difficulty).length;
    if (got !== want[difficulty]) {
      throw new Error(
        `${conceptId} ${difficulty}: got ${got}, want ${want[difficulty]}`,
      );
    }
  }
}

if (questions.length !== 166) {
  throw new Error(`expected 166 questions, got ${questions.length}`);
}

const firstId = questions[0].id;
const lastId = questions.at(-1).id;
if (firstId !== "che-eq-101" || lastId !== "che-eq-266") {
  throw new Error(`id range ${firstId}..${lastId}, expected che-eq-101..che-eq-266`);
}

const outFile = path.join(root, "content", "seed", "chemistry__chemical-equilibrium.json");
writeFileSync(outFile, `${JSON.stringify(pack(questions), null, 2)}\n`, "utf8");

const mix = { easy: 0, medium: 0, hard: 0 };
for (const row of questions) mix[row.difficulty] += 1;
console.log(
  `wrote ${questions.length} items ${firstId}..${lastId} to ${path.relative(root, outFile)}`,
);
console.log(`mix easy=${mix.easy} medium=${mix.medium} hard=${mix.hard}`);
