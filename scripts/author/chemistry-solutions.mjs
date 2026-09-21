/**
 * Writes content/seed/chemistry__solutions.json
 * TSBIE Intermediate 2nd year — Solutions (original practice MCQs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { item, pack } from "../lib/author-chem.mjs";
import { stemsClash } from "../lib/stems.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const outFile = path.join(root, "content", "seed", "chemistry__solutions.json");
const stemsFile = path.join(root, "scripts", ".bank-stems.json");

const chapterId = "chemistry-solutions";
const prefix = "che-so";
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

// —— types-solubility: 14 (8 easy, 5 medium, 1 hard) ——
q(
  "types-solubility",
  "easy",
  "A homogeneous mixture whose composition is uniform at the molecular scale is called a",
  ["compound with fixed mass ratio only", "solution", "coarse suspension", "heterogeneous colloid only"],
  1,
  "A solution is a single-phase homogeneous mixture of solute and solvent.",
);
q(
  "types-solubility",
  "easy",
  "Ordinary air is best classified as a solution of the type",
  ["gas dissolved in a liquid", "gas mixed with gas", "liquid droplets in a gas", "solid smoke in a gas"],
  1,
  "Nitrogen, oxygen and the other constituents form a gaseous solution.",
);
q(
  "types-solubility",
  "easy",
  "Brass (copper plus zinc) is a textbook example of a",
  ["liquid–liquid blend", "gas–solid hydride", "solid–solid alloy solution", "gas–liquid soda"],
  2,
  "Alloys such as brass are solid solutions of metals in metals.",
);
q(
  "types-solubility",
  "easy",
  "Solubility of a solid in a liquid is the largest amount that dissolves to give a",
  ["unsaturated mix", "saturated solution at the stated temperature", "gaseous aerosol", "pure molten solute"],
  1,
  "The saturated composition at that temperature is the solubility.",
);
q(
  "types-solubility",
  "easy",
  "Raising the external pressure over a liquid changes the solubility most for a",
  ["solid salt", "liquid hydrocarbon solute", "gaseous solute", "network covalent crystal"],
  2,
  "Gas solubility is strongly pressure-dependent; solids and liquids are almost unaffected.",
);
q(
  "types-solubility",
  "easy",
  "Hydrogen taken up by palladium metal is classified as a",
  ["liquid-in-solid amalgam", "gas-in-solid solution", "solid aerosol", "gas-in-gas mixture"],
  1,
  "H2/Pd is the usual Intermediate example of a gas dissolved in a solid.",
);
q(
  "types-solubility",
  "easy",
  "Undissolved crystals remaining in contact with a solution at equilibrium show that the solution is",
  ["unsaturated", "saturated", "supersaturated", "colloidal"],
  1,
  "Saturation is the equilibrium state with excess undissolved solute present.",
);
q(
  "types-solubility",
  "easy",
  "Ethanol and water dissolve in each other in every proportion, so they are",
  ["immiscible", "only partially miscible", "completely miscible", "insoluble solids"],
  2,
  "Complete miscibility means a single liquid phase at all compositions.",
);
q(
  "types-solubility",
  "medium",
  "Most ionic solids dissolve in water endothermically. Warming a saturated sample of such a salt typically",
  ["decreases the dissolved amount", "increases the solubility", "leaves solubility unchanged", "converts the salt into a gas"],
  1,
  "Le Chatelier’s principle: heat is a reactant for endothermic dissolution, so solubility rises with T.",
);
q(
  "types-solubility",
  "medium",
  "Oxygen is poorer in warm pond water than in cold water because dissolving a gas is usually",
  ["exothermic, so heating drives gas out", "endothermic, so heating pulls gas in", "athermal", "a nuclear capture"],
  0,
  "Gas dissolution releases heat; raising T lowers the equilibrium solubility.",
);
q(
  "types-solubility",
  "medium",
  "A cooled solution that still holds more solute than the equilibrium value at that temperature is",
  ["unsaturated", "exactly saturated", "supersaturated", "ideal by definition"],
  2,
  "Supersaturation is a metastable state above the equilibrium solubility.",
);
q(
  "types-solubility",
  "medium",
  "The rule “like dissolves like” predicts that molecular iodine dissolves readily in",
  ["water", "carbon tetrachloride", "molten sodium chloride", "liquid hydrogen fluoride only"],
  1,
  "I2 is non-polar and is far more soluble in CCl4 than in water.",
);
q(
  "types-solubility",
  "medium",
  "Dental and laboratory amalgams are solutions in which the solvent is",
  ["mercury dissolving a metal", "water dissolving sugar", "ethanol dissolving iodine", "air dissolving water vapour"],
  0,
  "An amalgam is a metal (or metals) dissolved in mercury.",
);
q(
  "types-solubility",
  "hard",
  "A sealed soda is opened and then left in the sun. CO2 escapes more freely because",
  [
    "both the pressure drop and the temperature rise lower gas solubility",
    "only the pressure change matters; heat raises gas solubility",
    "heating alone increases the Henry solubility",
    "solids and gases respond identically to pressure",
  ],
  0,
  "Henry’s law: less partial pressure means less dissolved gas, and warming further decreases gas solubility.",
);

// —— concentration-terms: 24 (14 easy, 7 medium, 3 hard) ——
q(
  "concentration-terms",
  "easy",
  "Mass percent of a dissolved substance is 100 times the ratio of",
  [
    "mass of solute to mass of solution",
    "moles of solute to litres of solution",
    "moles of solute to kilograms of solvent",
    "volume of solute to volume of solvent",
  ],
  0,
  "w/w % = (mass of solute / mass of solution) × 100.",
);
q(
  "concentration-terms",
  "easy",
  "Mole fraction of component A in a binary mixture equals",
  ["$n_A / (n_A + n_B)$", "$n_A / n_B$", "mass of A / mass of B", "$M_A / M_B$"],
  0,
  "Mole fraction is the mole share of that component among all moles present.",
);
q(
  "concentration-terms",
  "easy",
  "Molarity counts the moles of solute present in",
  ["one litre of solution", "one kilogram of solvent", "one litre of pure solvent", "one kilogram of solution"],
  0,
  "M = moles of solute / volume of solution in litres.",
);
q(
  "concentration-terms",
  "easy",
  "Molality places in the denominator the",
  [
    "volume of solution in litres",
    "mass of solvent in kilograms",
    "mass of the whole solution in grams",
    "volume of the solute",
  ],
  1,
  "m = moles of solute / kilograms of solvent, so it is independent of solution volume.",
);
q(
  "concentration-terms",
  "easy",
  "Parts per million by mass is defined as",
  [
    "$10^6$ times (mass of solute / mass of solution)",
    "$10^3$ times (mass of solute / mass of solution)",
    "100 times (moles of solute / litres)",
    "moles of solute per kilogram of solvent",
  ],
  0,
  "ppm (w/w) = $10^6 \\times w_{\\mathrm{solute}} / w_{\\mathrm{solution}}$.",
);
q(
  "concentration-terms",
  "easy",
  "Among the usual concentration units, the one that does not shift when the solution is warmed is",
  ["molarity", "normality", "molality", "formality based on volume"],
  2,
  "Molality uses solvent mass, which does not expand with temperature; molarity uses volume.",
);
q(
  "concentration-terms",
  "easy",
  "Adding the mole fractions of every component of a solution yields",
  ["zero", "exactly one", "one hundred", "the molarity"],
  1,
  "Mole fractions are fractions of a whole, so $\\sum x_i = 1$.",
);
q(
  "concentration-terms",
  "easy",
  "Volume percent is the concentration unit most often quoted for",
  ["solid metal alloys", "liquid–liquid mixtures", "gas occluded in a metal", "ionic unit cells"],
  1,
  "v/v % is convenient when both solute and solvent are liquids.",
);
q(
  "concentration-terms",
  "easy",
  "A 1.0 molal aqueous preparation contains 1.0 mol of solute dissolved in",
  ["1.0 L of solution", "1.0 kg of water", "1.0 kg of solution", "1.0 L of water"],
  1,
  "Molality is moles per kilogram of solvent, not per litre of solution.",
);
q(
  "concentration-terms",
  "easy",
  "Mass/volume percent is 100 times the ratio of",
  [
    "mass of solute to volume of solution",
    "volume of solute to mass of solvent",
    "moles of solute to kilograms of solvent",
    "mass of solvent to mass of solute",
  ],
  0,
  "w/v % = (mass of solute / volume of solution) × 100, with consistent units.",
);
q(
  "concentration-terms",
  "easy",
  "For a very dilute aqueous sample, 1 ppm is nearly the same as",
  ["1 mg of solute in one litre of solution", "1 g in one litre", "1 mol in one litre", "1% by mass"],
  0,
  "1 L of dilute aqueous solution has a mass of about 10³ g, so 1 ppm ≈ 1 mg L⁻¹.",
);
q(
  "concentration-terms",
  "easy",
  "Molarity of a sealed bottle of solution falls slightly on heating because",
  [
    "moles of solute decrease",
    "the solution volume expands",
    "the solvent mass vanishes",
    "mole fraction becomes undefined",
  ],
  1,
  "Thermal expansion increases V while n stays fixed, so M = n/V drops.",
);
q(
  "concentration-terms",
  "easy",
  "Normality of a solution is the number of",
  [
    "gram equivalents of solute in one litre of solution",
    "moles of solute in one kilogram of solvent",
    "mole fraction units per litre",
    "ppm units per kilogram",
  ],
  0,
  "N = gram equivalents of solute / litres of solution.",
);
q(
  "concentration-terms",
  "easy",
  "Mole fraction is a concentration that is",
  ["measured in mol L⁻¹", "dimensionless", "reported in kg mol⁻¹", "identical to ppm"],
  1,
  "It is a pure number — a ratio of moles to moles.",
);
q(
  "concentration-terms",
  "medium",
  "A student dissolves 10 g of NaOH in 90 g of water. The mass percent of NaOH is",
  ["10%", "11.1%", "9.0%", "90%"],
  0,
  "Mass of solution = 100 g, so w/w % = 10/100 × 100 = 10%.",
);
q(
  "concentration-terms",
  "medium",
  "Two moles of ethanol are mixed with three moles of water. Mole fraction of ethanol is",
  ["0.40", "0.60", "0.50", "0.67"],
  0,
  "$x_{\\mathrm{EtOH}} = 2 / (2 + 3) = 0.40$.",
);
q(
  "concentration-terms",
  "medium",
  "4.9 g of H2SO4 (98 g mol⁻¹) made up to 500 mL of solution has molarity",
  ["0.10 M", "0.20 M", "0.05 M", "1.0 M"],
  0,
  "Moles = 4.9/98 = 0.050; volume = 0.50 L, so M = 0.10 mol L⁻¹.",
);
q(
  "concentration-terms",
  "medium",
  "Dissolving 6.0 g of urea (60 g mol⁻¹) in 250 g of water produces molality",
  ["0.40 m", "0.25 m", "0.10 m", "1.0 m"],
  0,
  "Moles of urea = 0.10; kilograms of water = 0.250, so m = 0.40 mol kg⁻¹.",
);
q(
  "concentration-terms",
  "medium",
  "A 100 ppm aqueous impurity corresponds, in 1.0 kg of solution, to a solute mass of",
  ["100 mg", "100 g", "1.0 g", "10 mg"],
  0,
  "100 × 10⁻⁶ × 1000 g = 0.100 g = 100 mg.",
);
q(
  "concentration-terms",
  "medium",
  "Glucose (180 g mol⁻¹), 9.0 g, sits together with 81 g of water. Mole fraction of glucose is nearest",
  ["0.011", "0.10", "0.050", "0.90"],
  0,
  "n(glucose) = 0.050, n(water) = 4.50, so x = 0.050/4.55 ≈ 0.011.",
);
q(
  "concentration-terms",
  "medium",
  "An aqueous bottle labelled 2.0 M NaCl occupies 250 mL. Moles of NaCl inside are",
  ["0.50", "2.0", "0.25", "8.0"],
  0,
  "n = M V = 2.0 mol L⁻¹ × 0.250 L = 0.50 mol.",
);
q(
  "concentration-terms",
  "hard",
  "Aqueous HCl is 36.5% (w/w) with density 1.18 g mL⁻¹. Using molar mass 36.5 g mol⁻¹, the molarity is nearest",
  ["11.8 M", "10.0 M", "1.18 M", "36.5 M"],
  0,
  "One litre has mass 1180 g and contains 0.365 × 1180 = 431 g HCl, i.e. 11.8 mol, so M ≈ 11.8.",
);
q(
  "concentration-terms",
  "hard",
  "A flask holds 8.0 g of CH3OH (32 g mol⁻¹) plus 36 g of water. Molality of methanol is nearest",
  ["6.9 m", "0.25 m", "4.0 m", "2.2 m"],
  0,
  "n(CH3OH) = 0.25 mol in 0.036 kg of water, so m = 0.25/0.036 ≈ 6.9 mol kg⁻¹.",
);
q(
  "concentration-terms",
  "hard",
  "Mixing 200 mL of 0.60 M H2SO4 with 300 mL of 0.20 M H2SO4, taking volumes as additive, gives a blend of",
  ["0.36 M", "0.40 M", "0.80 M", "0.24 M"],
  0,
  "Moles = 0.12 + 0.06 = 0.18 in 0.50 L, so M = 0.36 mol L⁻¹.",
);

// —— henrys-law: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "henrys-law",
  "easy",
  "Henry linked the partial pressure of a dissolved gas to its",
  ["mole fraction in the liquid", "mass percent alone", "molality squared", "normal boiling point"],
  0,
  "One form is $p = K_H x$, with x the mole fraction of the dissolved gas.",
);
q(
  "henrys-law",
  "easy",
  "The Henry-law constant $K_H$ is dimensionally a",
  ["pressure", "volume", "molality", "entropy"],
  0,
  "Because $p = K_H x$ and x is dimensionless, $K_H$ has the unit of pressure.",
);
q(
  "henrys-law",
  "easy",
  "At a fixed temperature, a larger $K_H$ for a gas means that gas is",
  ["more soluble", "less soluble", "exactly as soluble as every other gas", "always immiscible"],
  1,
  "x = p / $K_H$, so a large constant implies a small dissolved mole fraction.",
);
q(
  "henrys-law",
  "easy",
  "Soft-drink bottles are packed under extra carbon-dioxide pressure so that",
  [
    "more CO2 remains dissolved until the cap is opened",
    "$K_H$ becomes zero",
    "the drink freezes in the bottle",
    "oxygen is chemically removed",
  ],
  0,
  "Higher p(CO2) forces a larger x(CO2) in the liquid (Henry’s law).",
);
q(
  "henrys-law",
  "easy",
  "Deep-sea divers risk decompression sickness because nitrogen",
  [
    "dissolves more at high pressure and bubbles out on a rapid ascent",
    "is insoluble at depth",
    "binds irreversibly to haemoglobin only",
    "forms an azeotrope with blood plasma",
  ],
  0,
  "High p(N2) loads the blood; a sudden drop in pressure releases bubbles in the tissues.",
);
q(
  "henrys-law",
  "easy",
  "Warming a solvent generally",
  [
    "raises $K_H$ and lowers gas solubility",
    "lowers $K_H$ and raises gas solubility",
    "leaves gas solubility untouched",
    "ionises the dissolved gas",
  ],
  0,
  "Gas dissolution is exothermic, so $K_H$ increases and x falls as T rises.",
);
q(
  "henrys-law",
  "easy",
  "A compact statement of Henry’s law for a sparingly soluble gas is",
  ["$p = K_H x$", "$p = K_H / x$", "$p = x / K_H^2$", "$\\pi = CRT$"],
  0,
  "Partial pressure of the gas is proportional to its mole fraction in the solution.",
);
q(
  "henrys-law",
  "medium",
  "At 298 K, $K_H$ for N2 in water is 8.0 × 10⁴ atm. Under 0.80 atm of nitrogen the dissolved mole fraction is",
  ["1.0 × 10⁻⁵", "8.0 × 10⁻⁴", "0.80", "1.0 × 10⁻³"],
  0,
  "x = p / $K_H$ = 0.80 / 8.0 × 10⁴ = 1.0 × 10⁻⁵.",
);
q(
  "henrys-law",
  "medium",
  "Two gases have $K_H$ values 2 × 10³ atm and 5 × 10⁴ atm. At the same partial pressure the more soluble gas is the one with",
  ["$K_H$ = 2 × 10³ atm", "$K_H$ = 5 × 10⁴ atm", "equal solubility in both cases", "neither gas dissolving"],
  0,
  "Solubility falls as $K_H$ rises, so the smaller constant marks the more soluble gas.",
);
q(
  "henrys-law",
  "medium",
  "A mountaineer takes up less oxygen at high altitude mainly because",
  [
    "the partial pressure of O2 in the air is lower",
    "$K_H$ of oxygen becomes zero",
    "blood volume instantly doubles",
    "nitrogen is absent from the atmosphere",
  ],
  0,
  "Henry’s law: dissolved x(O2) tracks p(O2), which falls as total air pressure falls.",
);
q(
  "henrys-law",
  "medium",
  "If the partial pressure of CO2 above a drink is doubled at constant temperature, the dissolved mole fraction of CO2",
  ["doubles", "halves", "becomes four times", "stays exactly the same"],
  0,
  "x ∝ p at fixed T, so doubling p doubles the dissolved mole fraction.",
);
q(
  "henrys-law",
  "hard",
  "Dry air is 0.21 mole fraction oxygen. With $K_H$(O2) = 3.3 × 10⁷ torr and a total air pressure of 760 torr, dissolved x(O2) is nearest",
  ["4.8 × 10⁻⁶", "2.1 × 10⁻¹", "3.3 × 10⁻⁷", "1.6 × 10⁻⁴"],
  0,
  "p(O2) = 0.21 × 760 = 160 torr; x = 160 / 3.3 × 10⁷ ≈ 4.8 × 10⁻⁶.",
);

// —— raoult-vapour: 22 (13 easy, 7 medium, 2 hard) ——
q(
  "raoult-vapour",
  "easy",
  "For volatile component A in an ideal liquid mixture, Raoult’s relation is written",
  ["$p_A = p_A^\\circ x_A$", "$p_A = p_A^\\circ / x_A$", "$p_A = p_A^\\circ + x_A$", "$p_A = K_H x_A$"],
  0,
  "Partial pressure equals the pure-liquid vapour pressure times the liquid mole fraction.",
);
q(
  "raoult-vapour",
  "easy",
  "Total vapour pressure over an ideal binary liquid equals",
  [
    "$p_A^\\circ x_A + p_B^\\circ x_B$",
    "$p_A^\\circ + p_B^\\circ$",
    "$x_A + x_B$",
    "$K_H(x_A + x_B)$",
  ],
  0,
  "Each component contributes independently: $p_{\\mathrm{total}} = \\sum p_i^\\circ x_i$.",
);
q(
  "raoult-vapour",
  "easy",
  "Dissolving a non-volatile solute in a pure solvent",
  [
    "lowers the solvent vapour pressure",
    "raises the solvent vapour pressure",
    "leaves the vapour pressure unchanged",
    "always doubles the vapour pressure",
  ],
  0,
  "Solvent mole fraction falls below 1, so $p = p^\\circ x_{\\mathrm{solvent}} < p^\\circ$.",
);
q(
  "raoult-vapour",
  "easy",
  "Vapour in equilibrium with an ideal A–B liquid is richer in the component that has the",
  [
    "higher pure-liquid vapour pressure",
    "lower pure-liquid vapour pressure",
    "larger molar mass only",
    "zero Henry constant",
  ],
  0,
  "The more volatile liquid (larger $p^\\circ$) contributes a larger partial pressure, so $y > x$ for that component.",
);
q(
  "raoult-vapour",
  "easy",
  "A graph of total vapour pressure against liquid mole fraction for an ideal binary pair is",
  [
    "the straight line joining $p_A^\\circ$ and $p_B^\\circ$",
    "a curve with a maximum",
    "a curve with a minimum",
    "a parabola through the origin",
  ],
  0,
  "Ideal $p_{\\mathrm{total}}$ varies linearly between the two pure-liquid vapour pressures.",
);
q(
  "raoult-vapour",
  "easy",
  "Dalton’s law applied to the vapour above a solution gives the vapour mole fraction of A as",
  ["$y_A = p_A / p_{\\mathrm{total}}$", "$y_A = x_A$", "$y_A = p_A^\\circ$", "$y_A = 1 - p_A$"],
  0,
  "Each partial pressure is that component’s mole fraction in the gas times the total pressure.",
);
q(
  "raoult-vapour",
  "easy",
  "Raoult’s law for the solvent becomes exact in the limit of a solution that is",
  ["very dilute in solute", "very concentrated in solute", "frozen solid", "an emulsion"],
  0,
  "The solvent then has $x \\approx 1$ and behaves as a nearly pure liquid obeying Raoult’s law.",
);
q(
  "raoult-vapour",
  "easy",
  "A closed flask of pure liquid A at equilibrium exerts",
  ["its saturation vapour pressure $p_A^\\circ$", "zero pressure", "only $K_H$", "osmotic pressure"],
  0,
  "The equilibrium vapour pressure of the pure liquid is the $p^\\circ$ used in Raoult’s law.",
);
q(
  "raoult-vapour",
  "easy",
  "When the liquid is pure A ($x_A = 1$), Raoult’s law reduces to",
  ["$p_A = p_A^\\circ$", "$p_A = 0$", "$p_A = K_H$", "$p_A = \\pi$"],
  0,
  "The partial pressure of a pure liquid is just its own vapour pressure.",
);
q(
  "raoult-vapour",
  "easy",
  "Two liquids that obey Raoult’s law at every composition are said to form",
  ["an ideal solution", "an azeotrope in every case", "a colloid", "a suspension"],
  0,
  "Ideal solutions follow $p_i = p_i^\\circ x_i$ over the whole composition range.",
);
q(
  "raoult-vapour",
  "easy",
  "A clear drop in vapour pressure is used as a colligative effect when the added solute is",
  ["non-volatile (or far less volatile than the solvent)", "more volatile than the solvent", "a catalyst", "always a noble gas"],
  0,
  "Only then does the total pressure fall below $p^\\circ$ of the pure solvent.",
);
q(
  "raoult-vapour",
  "easy",
  "For an ideal mix the vapour mole fraction of A is related to the liquid composition by",
  [
    "$y_A = (p_A^\\circ x_A) / p_{\\mathrm{total}}$",
    "$y_A = x_A$",
    "$y_A = p_A^\\circ$",
    "$y_A = K_H x_A$",
  ],
  0,
  "Combine Raoult ($p_A = p_A^\\circ x_A$) with Dalton ($y_A = p_A / p_{\\mathrm{total}}$).",
);
q(
  "raoult-vapour",
  "easy",
  "At a given temperature, the liquid with the larger $p^\\circ$ is described as",
  ["more volatile", "less volatile", "non-volatile", "ideal only"],
  0,
  "Volatility tracks the equilibrium vapour pressure of the pure liquid.",
);
q(
  "raoult-vapour",
  "medium",
  "Pure toluene has vapour pressure 30 torr. In an ideal mix with $x_{\\mathrm{toluene}} = 0.40$, the partial pressure of toluene is",
  ["12 torr", "30 torr", "18 torr", "70 torr"],
  0,
  "$p = p^\\circ x = 30 \\times 0.40 = 12$ torr.",
);
q(
  "raoult-vapour",
  "medium",
  "An ideal pair has $p_A^\\circ = 80$ mm Hg and $p_B^\\circ = 20$ mm Hg. At $x_A = 0.50$ the total pressure is",
  ["50 mm Hg", "100 mm Hg", "80 mm Hg", "20 mm Hg"],
  0,
  "$p = 80 \\times 0.50 + 20 \\times 0.50 = 50$ mm Hg.",
);
q(
  "raoult-vapour",
  "medium",
  "Benzene ($p^\\circ = 75$ torr) plus a non-volatile solute form a liquid with $x_{\\mathrm{benzene}} = 0.90$. The vapour pressure of that solution is",
  ["67.5 torr", "75 torr", "7.5 torr", "83 torr"],
  0,
  "Only benzene contributes: $p = 75 \\times 0.90 = 67.5$ torr.",
);
q(
  "raoult-vapour",
  "medium",
  "Above an ideal liquid the partial pressure of A is 24 kPa while the total pressure is 60 kPa. The vapour mole fraction of A is",
  ["0.40", "0.24", "0.60", "1.0"],
  0,
  "$y_A = p_A / p_{\\mathrm{total}} = 24/60 = 0.40$.",
);
q(
  "raoult-vapour",
  "medium",
  "Component B is non-volatile. If $x_{\\mathrm{solvent}} = 0.95$ and $p^\\circ_{\\mathrm{solvent}} = 20$ kPa, the solution vapour pressure equals",
  ["19 kPa", "20 kPa", "1 kPa", "21 kPa"],
  0,
  "$p = 20 \\times 0.95 = 19$ kPa.",
);
q(
  "raoult-vapour",
  "medium",
  "Two ideal liquids are present in equal mole fractions. $p_A^\\circ = 90$ torr and $p_B^\\circ = 60$ torr. Total vapour pressure is",
  ["75 torr", "150 torr", "90 torr", "30 torr"],
  0,
  "$p = 0.50 \\times 90 + 0.50 \\times 60 = 75$ torr.",
);
q(
  "raoult-vapour",
  "medium",
  "Vapour over an ideal mix is analysed as $y_A = 0.70$ when $p_{\\mathrm{total}} = 100$ torr. Partial pressure of A in that vapour is",
  ["70 torr", "30 torr", "100 torr", "0.70 torr"],
  0,
  "$p_A = y_A p_{\\mathrm{total}} = 0.70 \\times 100 = 70$ torr.",
);
q(
  "raoult-vapour",
  "hard",
  "An ideal blend has $x_A = 0.30$, $p_A^\\circ = 200$ torr and $p_B^\\circ = 100$ torr. Mole fraction of A in the vapour is nearest",
  ["0.46", "0.30", "0.67", "0.23"],
  0,
  "$p_A = 60$ torr, $p_B = 70$ torr, $p = 130$ torr, so $y_A = 60/130 \\approx 0.46$.",
);
q(
  "raoult-vapour",
  "hard",
  "At 350 K the liquid mole fraction of hexane is 0.25 ($p^\\circ_{\\mathrm{hex}} = 90$ kPa, $p^\\circ_{\\mathrm{hept}} = 30$ kPa). Total vapour pressure of this ideal pair is",
  ["45 kPa", "60 kPa", "30 kPa", "120 kPa"],
  0,
  "$p = 90 \\times 0.25 + 30 \\times 0.75 = 22.5 + 22.5 = 45$ kPa.",
);

// —— ideal-nonideal: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "ideal-nonideal",
  "easy",
  "An ideal liquid solution is characterised by",
  [
    "$\\Delta H_{\\mathrm{mix}} = 0$ and $\\Delta V_{\\mathrm{mix}} = 0$",
    "$\\Delta H_{\\mathrm{mix}} > 0$ only",
    "$\\Delta G_{\\mathrm{mix}} = 0$",
    "$\\Delta S_{\\mathrm{mix}} = 0$",
  ],
  0,
  "No heat is absorbed or evolved and the volumes are strictly additive for an ideal mix.",
);
q(
  "ideal-nonideal",
  "easy",
  "Molecular interactions in an ideal A–B solution satisfy",
  [
    "A–A, B–B and A–B forces of similar strength",
    "A–B much stronger than like pairs",
    "A–B much weaker than like pairs",
    "no A–B contacts at all",
  ],
  0,
  "Equal interaction energies make the mixture obey Raoult’s law at all compositions.",
);
q(
  "ideal-nonideal",
  "easy",
  "Benzene and toluene form a nearly ideal pair because they have",
  [
    "similar size and intermolecular forces",
    "opposite polarity",
    "hydrogen bonds of very different strength",
    "ionic lattices",
  ],
  0,
  "Both are non-polar aromatics of comparable size, so A–B forces match A–A and B–B.",
);
q(
  "ideal-nonideal",
  "easy",
  "A non-ideal solution is one that",
  [
    "deviates from Raoult’s law",
    "obeys Raoult’s law at every mole fraction",
    "has $\\Delta H_{\\mathrm{mix}}$ exactly zero",
    "never boils",
  ],
  0,
  "Any measurable departure of vapour pressure from $p_i^\\circ x_i$ marks non-ideality.",
);
q(
  "ideal-nonideal",
  "easy",
  "Positive deviation from Raoult’s law means the observed vapour pressure is",
  ["higher than the ideal value", "lower than the ideal value", "exactly zero", "equal to $K_H$"],
  0,
  "Weaker A–B forces let molecules escape more easily, so $p > p_{\\mathrm{ideal}}$.",
);
q(
  "ideal-nonideal",
  "easy",
  "Negative deviation from Raoult’s law is accompanied by",
  [
    "$\\Delta H_{\\mathrm{mix}} < 0$",
    "$\\Delta H_{\\mathrm{mix}} > 0$",
    "$\\Delta H_{\\mathrm{mix}} = 0$",
    "$\\Delta V_{\\mathrm{mix}} > 0$ in every case",
  ],
  0,
  "Stronger A–B attractions release heat on mixing (exothermic).",
);
q(
  "ideal-nonideal",
  "easy",
  "For a positively deviating pair, mixing typically causes the volume to",
  ["increase ($\\Delta V_{\\mathrm{mix}} > 0$)", "decrease", "stay exactly additive", "collapse to zero"],
  0,
  "Weaker unlike attractions leave a slightly expanded, less tightly packed liquid.",
);
q(
  "ideal-nonideal",
  "easy",
  "Chloroform and acetone show negative deviation because",
  [
    "a hydrogen-bond-like attraction forms between the two molecules",
    "the liquids repel strongly",
    "they are immiscible",
    "they ionise completely",
  ],
  0,
  "The chloroform hydrogen interacts with the acetone oxygen, strengthening A–B forces.",
);
q(
  "ideal-nonideal",
  "easy",
  "Ethanol–acetone is a common Intermediate example of",
  ["positive deviation", "negative deviation", "an ideal mix", "a solid solution"],
  0,
  "Mixing breaks some ethanol hydrogen bonds, so A–B is weaker than A–A and the pair shows positive deviation.",
);
q(
  "ideal-nonideal",
  "easy",
  "n-Hexane and n-heptane are expected to behave as",
  ["an ideal solution", "a strongly positive pair", "a strongly negative pair", "an azeotrope only"],
  0,
  "Adjacent homologues have nearly identical London forces, so the mix is essentially ideal.",
);
q(
  "ideal-nonideal",
  "medium",
  "When A–B attractions are weaker than A–A and B–B, the mixture shows",
  [
    "positive deviation and often a minimum-boiling azeotrope",
    "negative deviation and a maximum-boiling azeotrope",
    "strictly ideal behaviour",
    "zero vapour pressure",
  ],
  0,
  "Weaker unlike forces raise vapour pressure; a maximum in p versus x gives a minimum-boiling azeotrope.",
);
q(
  "ideal-nonideal",
  "medium",
  "Nitric acid and water mix with heat released and a vapour-pressure curve below the Raoult line. The deviation is",
  ["negative", "positive", "ideal", "undefined"],
  0,
  "Exothermic mixing plus $p < p_{\\mathrm{ideal}}$ is the signature of negative deviation.",
);
q(
  "ideal-nonideal",
  "medium",
  "Carbon disulphide and acetone form a pair with weaker unlike interactions, so one expects",
  ["positive deviation", "negative deviation", "$\\Delta H_{\\mathrm{mix}} = 0$", "i = 2"],
  0,
  "CS2–acetone is a standard positively deviating pair.",
);
q(
  "ideal-nonideal",
  "medium",
  "For an ideal solution the plot of $p_A$ versus $x_A$ is",
  ["linear from 0 to $p_A^\\circ$", "concave upward", "concave downward", "a horizontal line"],
  0,
  "Raoult’s law $p_A = p_A^\\circ x_A$ is a straight line through the origin and $(1, p_A^\\circ)$.",
);
q(
  "ideal-nonideal",
  "medium",
  "A liquid pair with $\\Delta V_{\\mathrm{mix}}$ negative and $p$ below the ideal line is classified as",
  ["non-ideal with negative deviation", "ideal", "positively deviating", "colloidal"],
  0,
  "Volume contraction and lowered vapour pressure both point to stronger A–B attractions.",
);
q(
  "ideal-nonideal",
  "hard",
  "A binary liquid shows $\\Delta H_{\\mathrm{mix}}$ negative and total vapour pressure below the Raoult prediction at every composition. Distillation of this pair commonly yields",
  [
    "a maximum-boiling azeotrope",
    "a minimum-boiling azeotrope",
    "an ideal vapour of unchanged composition",
    "no condensate at any temperature",
  ],
  0,
  "Negative deviation produces a minimum in p versus x and therefore a maximum-boiling azeotrope.",
);

// —— relative-lowering: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "relative-lowering",
  "easy",
  "Colligative properties of a dilute solution depend on",
  [
    "the number of solute particles, not their chemical identity",
    "the colour of the solute",
    "the charge of the solute only",
    "the solvent density only",
  ],
  0,
  "Particle count (mole fraction or molality) fixes the size of a colligative effect for a given solvent.",
);
q(
  "relative-lowering",
  "easy",
  "Relative lowering of vapour pressure is defined as",
  ["$(p^\\circ - p) / p^\\circ$", "$p^\\circ - p$", "$p / p^\\circ$", "$p^\\circ / p$"],
  0,
  "It is the fractional drop in solvent vapour pressure caused by the solute.",
);
q(
  "relative-lowering",
  "easy",
  "For a dilute solution of a non-volatile non-electrolyte, $(p^\\circ - p) / p^\\circ$ equals",
  ["the mole fraction of the solute", "the molality", "the molarity", "the mass percent"],
  0,
  "Raoult’s law gives $(p^\\circ - p)/p^\\circ = x_{\\mathrm{solute}}$ in the dilute non-volatile limit.",
);
q(
  "relative-lowering",
  "easy",
  "The four classical colligative properties include relative lowering of vapour pressure, boiling-point elevation, freezing-point depression and",
  ["osmotic pressure", "viscosity", "surface tension", "refractive index"],
  0,
  "Those four effects depend on the number of solute particles, not on their nature.",
);
q(
  "relative-lowering",
  "easy",
  "Relative lowering of vapour pressure does not depend on",
  [
    "the chemical identity of a non-electrolyte solute",
    "the mole fraction of that solute",
    "the vapour pressure of the pure solvent",
    "whether the solute is present at all",
  ],
  0,
  "Any non-volatile non-electrolyte at the same $x_B$ produces the same relative lowering.",
);
q(
  "relative-lowering",
  "easy",
  "A non-volatile solute reduces vapour pressure because",
  [
    "the mole fraction of solvent molecules at the surface falls",
    "the solute evaporates faster than the solvent",
    "$K_H$ becomes infinite",
    "the solution must freeze",
  ],
  0,
  "Fewer solvent molecules occupy the surface, so the escape rate into the vapour falls.",
);
q(
  "relative-lowering",
  "easy",
  "In the dilute limit the vapour pressure of a solution of a non-volatile solute is $p^\\circ$ multiplied by",
  ["the mole fraction of the solvent", "the mole fraction of the solute", "the molality", "$1 - M$"],
  0,
  "$p = p^\\circ x_{\\mathrm{solvent}}$ is Raoult’s law for the solvent.",
);
q(
  "relative-lowering",
  "easy",
  "The molar mass of a non-volatile solute can be estimated from a measurement of",
  [
    "relative lowering of vapour pressure",
    "the colour of the solution",
    "the density of the pure solute alone",
    "$K_H$ of an unrelated gas",
  ],
  0,
  "$(p^\\circ - p)/p^\\circ = n_B / (n_A + n_B)$ can be solved for $M_B$.",
);
q(
  "relative-lowering",
  "easy",
  "The Ostwald–Walker dynamic method is a classical experiment for measuring",
  ["relative lowering of vapour pressure", "osmotic pressure", "Henry’s constant", "pH"],
  0,
  "Air is passed through solution and then through pure solvent; the mass losses give $(p^\\circ - p)/p^\\circ$.",
);
q(
  "relative-lowering",
  "easy",
  "Two dilute solutions that share the same mole fraction of non-electrolyte solute in the same solvent show",
  [
    "the same relative lowering",
    "different relative lowerings proportional to solute mass only",
    "zero lowering",
    "lowering equal to $K_b$",
  ],
  0,
  "Relative lowering tracks $x_B$, which is identical for the two solutions.",
);
q(
  "relative-lowering",
  "medium",
  "A solvent has $p^\\circ = 80$ torr. After a non-volatile solute is added the pressure is 76 torr. Relative lowering is",
  ["0.050", "4.0", "76", "0.95"],
  0,
  "$(80 - 76)/80 = 0.050$.",
);
q(
  "relative-lowering",
  "medium",
  "Relative lowering of 0.020 is recorded for a dilute non-electrolyte. The mole fraction of solute is",
  ["0.020", "0.980", "2.0", "0.20"],
  0,
  "For a dilute non-volatile non-electrolyte, $(p^\\circ - p)/p^\\circ = x_B$.",
);
q(
  "relative-lowering",
  "medium",
  "Water (18 g mol⁻¹), 180 g, holds 6.0 g of a non-volatile solute. If relative lowering is 0.010, the molar mass of the solute is nearest",
  ["60 g mol⁻¹", "180 g mol⁻¹", "6.0 g mol⁻¹", "18 g mol⁻¹"],
  0,
  "n(water) = 10 mol; $x_B \\approx n_B / n_A = 0.010$ gives $n_B = 0.10$ mol, so $M = 6.0 / 0.10 = 60$ g mol⁻¹.",
);
q(
  "relative-lowering",
  "medium",
  "Pure solvent vapour pressure 50 kPa falls to 49 kPa on adding a non-volatile solute. The mole fraction of solvent is",
  ["0.98", "0.02", "0.50", "1.02"],
  0,
  "$x_{\\mathrm{solvent}} = p / p^\\circ = 49/50 = 0.98$.",
);
q(
  "relative-lowering",
  "medium",
  "Urea and glucose solutions that are equimolal in the same solvent exhibit",
  [
    "equal relative lowering, both being non-electrolytes",
    "urea twice the lowering of glucose",
    "zero lowering",
    "lowering equal to i = 2",
  ],
  0,
  "Equal molality in a dilute aqueous pair means essentially equal $x_B$ and therefore equal $(p^\\circ - p)/p^\\circ$.",
);
q(
  "relative-lowering",
  "hard",
  "A flask contains 3.0 g of a non-volatile solute ($M = 60$) together with 117 g of a solvent ($M = 78$). Relative lowering of vapour pressure is nearest",
  ["0.032", "0.050", "0.20", "0.967"],
  0,
  "$n_B = 0.050$, $n_A = 1.50$, so $x_B = 0.050 / 1.55 \\approx 0.032 = (p^\\circ - p)/p^\\circ$.",
);

// —— boiling-elevation: 18 (11 easy, 5 medium, 2 hard) ——
q(
  "boiling-elevation",
  "easy",
  "A non-volatile solute causes the boiling point of a liquid to",
  ["rise", "fall", "stay fixed", "equal the freezing point"],
  0,
  "The solution must be hotter before its vapour pressure reaches the external pressure.",
);
q(
  "boiling-elevation",
  "easy",
  "The molal boiling-point elevation constant $K_b$ is also called the",
  ["ebullioscopic constant", "cryoscopic constant", "Henry constant", "Rydberg constant"],
  0,
  "$K_b$ is the ebullioscopic (boiling-point) constant of the solvent.",
);
q(
  "boiling-elevation",
  "easy",
  "$\\Delta T_b$ for a dilute non-electrolyte solution is proportional to",
  ["the molality of the solute", "the molarity only", "the mole fraction of solvent only", "the charge of the solute"],
  0,
  "The working relation is $\\Delta T_b = K_b m$.",
);
q(
  "boiling-elevation",
  "easy",
  "$K_b$ is a characteristic of",
  ["the solvent", "the chemical identity of the solute", "the volume of the flask", "the colour of the solution"],
  0,
  "Each solvent has its own molal elevation constant, independent of the non-electrolyte used.",
);
q(
  "boiling-elevation",
  "easy",
  "Boiling point rises because the solution must be heated until its",
  [
    "vapour pressure again equals the external pressure",
    "freezing point equals 0 °C",
    "osmotic pressure vanishes",
    "$K_H$ is zero",
  ],
  0,
  "A non-volatile solute lowers p, so a higher T is needed to restore p = 1 atm.",
);
q(
  "boiling-elevation",
  "easy",
  "A convenient unit of $K_b$ is",
  ["K kg mol⁻¹", "K L mol⁻¹", "atm kg mol⁻¹", "J mol⁻¹"],
  0,
  "$\\Delta T_b = K_b m$ with m in mol kg⁻¹, so $K_b$ has unit K kg mol⁻¹.",
);
q(
  "boiling-elevation",
  "easy",
  "For water, the usual textbook $K_b$ is about",
  ["0.52 K kg mol⁻¹", "1.86 K kg mol⁻¹", "0.0821 L atm K⁻¹ mol⁻¹", "13.6 eV"],
  0,
  "The ebullioscopic constant of water is 0.512 K kg mol⁻¹ (often rounded to 0.52).",
);
q(
  "boiling-elevation",
  "easy",
  "Molar mass of a non-volatile solute follows from $\\Delta T_b$ if one also knows",
  ["$K_b$ and the masses (or molality)", "only the colour of the solution", "only $K_H$", "only the density of air"],
  0,
  "$m = \\Delta T_b / K_b$ and $m = (w_B / M_B) / w_A$ together give $M_B$.",
);
q(
  "boiling-elevation",
  "easy",
  "Elevation of boiling point is classified as a",
  ["colligative property", "chemical property of the solute", "nuclear property", "surface property only"],
  0,
  "It depends on the number of solute particles, not on their identity (for a non-electrolyte).",
);
q(
  "boiling-elevation",
  "easy",
  "Between two dilute aqueous non-electrolytes, the larger boiling-point elevation belongs to the solution of",
  ["higher molality", "lower molality", "smaller $K_b$", "zero mole fraction"],
  0,
  "$\\Delta T_b = K_b m$ with the same $K_b$ (water), so the more molal solution boils higher.",
);
q(
  "boiling-elevation",
  "easy",
  "A 1 molal aqueous non-electrolyte, taking $K_b = 0.52$ K kg mol⁻¹, is expected to boil near",
  ["100.52 °C", "98.14 °C", "100.00 °C", "0.52 °C"],
  0,
  "$\\Delta T_b = 0.52$ K, so the boiling point is about 100.52 °C at 1 atm.",
);
q(
  "boiling-elevation",
  "medium",
  "Glucose at 0.50 mol kg⁻¹ in water ($K_b = 0.512$ K kg mol⁻¹) elevates the boiling point by",
  ["0.256 K", "0.512 K", "1.02 K", "0.128 K"],
  0,
  "$\\Delta T_b = 0.512 \\times 0.50 = 0.256$ K.",
);
q(
  "boiling-elevation",
  "medium",
  "A solution boils 0.208 °C above the pure solvent. If $K_b = 0.52$ K kg mol⁻¹, the molality is",
  ["0.40 m", "0.208 m", "2.5 m", "0.52 m"],
  0,
  "$m = \\Delta T_b / K_b = 0.208 / 0.52 = 0.40$ mol kg⁻¹.",
);
q(
  "boiling-elevation",
  "medium",
  "Urea 3.0 g (60 g mol⁻¹) in 250 g water ($K_b = 0.52$ K kg mol⁻¹) gives $\\Delta T_b$ of",
  ["0.104 K", "0.52 K", "0.208 K", "1.04 K"],
  0,
  "m = (3.0/60) / 0.250 = 0.20 mol kg⁻¹; $\\Delta T_b = 0.52 \\times 0.20 = 0.104$ K.",
);
q(
  "boiling-elevation",
  "medium",
  "Solvent X has $K_b$ twice that of water. The same molal non-electrolyte in X, compared with water, shows $\\Delta T_b$ that is",
  ["twice as large", "half as large", "equal", "zero"],
  0,
  "$\\Delta T_b$ scales directly with $K_b$ at fixed molality.",
);
q(
  "boiling-elevation",
  "medium",
  "A non-volatile solute of molar mass 180 g mol⁻¹, 9.0 g, in 200 g of a solvent ($K_b = 2.5$ K kg mol⁻¹) raises the boiling point by",
  ["0.625 K", "2.5 K", "0.25 K", "1.25 K"],
  0,
  "n = 0.050 mol in 0.200 kg, so m = 0.25 mol kg⁻¹ and $\\Delta T_b = 2.5 \\times 0.25 = 0.625$ K.",
);
q(
  "boiling-elevation",
  "hard",
  "Fully ionised KCl (i = 2) at 0.10 mol kg⁻¹ in water ($K_b = 0.52$ K kg mol⁻¹) produces a boiling-point elevation of",
  ["0.104 K", "0.052 K", "0.208 K", "0.52 K"],
  0,
  "$\\Delta T_b = i K_b m = 2 \\times 0.52 \\times 0.10 = 0.104$ K.",
);
q(
  "boiling-elevation",
  "hard",
  "A 0.20 m Na2SO4 solution is 80% dissociated. Taking three ions per formula unit, $K_b = 0.512$ K kg mol⁻¹, $\\Delta T_b$ is nearest",
  ["0.27 K", "0.10 K", "0.51 K", "0.80 K"],
  0,
  "$i = 1 + (3 - 1)(0.80) = 2.60$; $\\Delta T_b = 2.60 \\times 0.512 \\times 0.20 \\approx 0.27$ K.",
);

// —— freezing-depression: 18 (11 easy, 5 medium, 2 hard) ——
q(
  "freezing-depression",
  "easy",
  "Adding a non-volatile solute to a solvent",
  ["lowers the freezing point", "raises the freezing point", "leaves the freezing point unchanged", "equals the boiling point"],
  0,
  "The solid solvent is in equilibrium with a solution of lower chemical potential, so the freezing point falls.",
);
q(
  "freezing-depression",
  "easy",
  "The molal freezing-point depression constant $K_f$ is also called the",
  ["cryoscopic constant", "ebullioscopic constant", "Henry constant", "Faraday constant"],
  0,
  "$K_f$ is the cryoscopic constant of the solvent.",
);
q(
  "freezing-depression",
  "easy",
  "$\\Delta T_f$ for a dilute non-electrolyte equals",
  ["$K_f \\times$ molality", "$K_b \\times$ molarity", "$K_f / m$", "$\\pi V$"],
  0,
  "The working relation is $\\Delta T_f = K_f m$.",
);
q(
  "freezing-depression",
  "easy",
  "Antifreeze in a car radiator works by",
  [
    "depressing the freezing point of water",
    "raising $K_H$ of air",
    "increasing the vapour pressure of ice",
    "nucleating ice crystals",
  ],
  0,
  "Ethylene glycol is a non-volatile solute that lowers the freezing point of the coolant.",
);
q(
  "freezing-depression",
  "easy",
  "$K_f$ of water is about",
  ["1.86 K kg mol⁻¹", "0.52 K kg mol⁻¹", "0.0821 L atm K⁻¹ mol⁻¹", "100 °C"],
  0,
  "The cryoscopic constant of water is 1.86 K kg mol⁻¹.",
);
q(
  "freezing-depression",
  "easy",
  "Freezing-point depression is a",
  ["colligative property", "collisional nuclear effect", "surface-tension effect only", "colour property"],
  0,
  "It depends on the number of solute particles in a given amount of solvent.",
);
q(
  "freezing-depression",
  "easy",
  "At the freezing point of a dilute solution, the solid that separates is generally",
  ["pure solid solvent", "pure solid solute", "a 1:1 compound always", "ice that contains all the solute"],
  0,
  "The solute stays in the liquid; the first solid is almost always the pure solvent.",
);
q(
  "freezing-depression",
  "easy",
  "A larger $K_f$ at the same molality produces",
  ["a larger depression", "a smaller depression", "no change", "an elevation instead"],
  0,
  "$\\Delta T_f$ scales with $K_f$ when m is fixed.",
);
q(
  "freezing-depression",
  "easy",
  "Common salt is scattered on icy roads because NaCl",
  ["lowers the melting point of ice", "raises the boiling point of ice", "oxidises ice", "absorbs all sunlight"],
  0,
  "Dissolved ions depress the freezing point, so ice melts at the ambient winter temperature.",
);
q(
  "freezing-depression",
  "easy",
  "The unit of $K_f$ is",
  ["K kg mol⁻¹", "L atm mol⁻¹", "mol L⁻¹", "joule only"],
  0,
  "The same dimensions as $K_b$: temperature over molality.",
);
q(
  "freezing-depression",
  "easy",
  "Camphor is a popular cryoscopic solvent because it has",
  ["a very large $K_f$", "a zero $K_f$", "no melting point", "$K_H = 0$"],
  0,
  "A large cryoscopic constant magnifies $\\Delta T_f$ and makes molar-mass measurements easier.",
);
q(
  "freezing-depression",
  "medium",
  "A 0.25 m aqueous glucose solution ($K_f = 1.86$ K kg mol⁻¹) freezes lower than 0 °C by",
  ["0.465 K", "1.86 K", "0.25 K", "7.44 K"],
  0,
  "$\\Delta T_f = 1.86 \\times 0.25 = 0.465$ K.",
);
q(
  "freezing-depression",
  "medium",
  "Ethylene glycol 12.4 g (62 g mol⁻¹) dissolved in 200 g water ($K_f = 1.86$) gives $\\Delta T_f$ of",
  ["1.86 K", "0.93 K", "3.72 K", "0.186 K"],
  0,
  "n = 0.20 mol in 0.200 kg, so m = 1.0 mol kg⁻¹ and $\\Delta T_f = 1.86$ K.",
);
q(
  "freezing-depression",
  "medium",
  "A solution freezes at −0.372 °C. With $K_f = 1.86$ K kg mol⁻¹ the molality of the non-electrolyte is",
  ["0.20 m", "0.372 m", "1.86 m", "0.50 m"],
  0,
  "$m = 0.372 / 1.86 = 0.20$ mol kg⁻¹.",
);
q(
  "freezing-depression",
  "medium",
  "Urea versus NaCl, both 0.10 molal in water: the larger freezing-point depression is shown by",
  ["NaCl, which supplies more particles", "urea", "the two matching exactly", "neither sample freezing"],
  0,
  "NaCl gives two ions, so i ≈ 2 and $\\Delta T_f$ is about twice that of urea.",
);
q(
  "freezing-depression",
  "medium",
  "A solute (M = 128 g mol⁻¹), 6.4 g, in 100 g of a solvent ($K_f = 5.0$ K kg mol⁻¹) depresses the freezing point by",
  ["2.5 K", "5.0 K", "0.50 K", "1.28 K"],
  0,
  "n = 0.050 mol in 0.100 kg, so m = 0.50 mol kg⁻¹ and $\\Delta T_f = 5.0 \\times 0.50 = 2.5$ K.",
);
q(
  "freezing-depression",
  "hard",
  "A 0.050 m AlCl3 solution, taken as fully split (i = 4) in water ($K_f = 1.86$ K kg mol⁻¹), has $\\Delta T_f$ nearest",
  ["0.372 K", "0.093 K", "1.86 K", "0.744 K"],
  0,
  "$\\Delta T_f = 4 \\times 1.86 \\times 0.050 = 0.372$ K.",
);
q(
  "freezing-depression",
  "hard",
  "Acetic acid in benzene is 60% dimerised. For a 0.20 m solution ($K_f$ of benzene = 5.12 K kg mol⁻¹), $\\Delta T_f$ is nearest",
  ["0.72 K", "1.02 K", "0.20 K", "2.56 K"],
  0,
  "For dimerisation $i = 1 - \\alpha/2 = 0.70$; $\\Delta T_f = 0.70 \\times 5.12 \\times 0.20 \\approx 0.72$ K.",
);

// —— osmotic-pressure: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "osmotic-pressure",
  "easy",
  "Osmosis is the spontaneous flow of solvent through a semipermeable membrane toward the",
  ["more concentrated solution", "less concentrated solution", "vapour phase", "undissolved solid solute"],
  0,
  "Solvent moves to dilute the side with the higher solute concentration.",
);
q(
  "osmotic-pressure",
  "easy",
  "The extra pressure that must be applied on the solution to stop osmosis is called the",
  ["osmotic pressure", "vapour pressure", "Henry pressure", "atmospheric pressure only"],
  0,
  "That balancing pressure is the definition of osmotic pressure $\\pi$.",
);
q(
  "osmotic-pressure",
  "easy",
  "van’t Hoff wrote the dilute-solution law in the form",
  ["$\\pi = CRT$", "$\\pi = K_H x$", "$\\pi = K_b m$", "$\\pi = p^\\circ x$"],
  0,
  "C is the molarity, R the gas constant and T the absolute temperature.",
);
q(
  "osmotic-pressure",
  "easy",
  "Two solutions that have equal osmotic pressure at the same temperature are called",
  ["isotonic", "hypertonic", "hypotonic", "azeotropic"],
  0,
  "Isotonic solutions produce no net solvent flow across a semipermeable membrane.",
);
q(
  "osmotic-pressure",
  "easy",
  "A hypotonic solution, relative to a cell, has",
  ["lower osmotic pressure", "higher osmotic pressure", "identical $\\pi$", "zero solvent"],
  0,
  "Water then enters the cell; the external solution is hypotonic.",
);
q(
  "osmotic-pressure",
  "easy",
  "Reverse osmosis is used in",
  ["desalination of sea water", "measuring $K_b$ only", "making azeotropes", "recording NMR spectra"],
  0,
  "Pressure greater than $\\pi$ drives solvent from the brine through a membrane, leaving salts behind.",
);
q(
  "osmotic-pressure",
  "easy",
  "In $\\pi = CRT$, the symbol C stands for",
  ["molarity of the solute", "molality", "mole fraction", "mass percent"],
  0,
  "Osmotic pressure uses the molar concentration (mol L⁻¹), not molality.",
);
q(
  "osmotic-pressure",
  "easy",
  "Osmotic pressure is a",
  ["colligative property", "collisional nuclear property", "surface colour", "magnetic property"],
  0,
  "For a given solvent it depends on the number of solute particles per unit volume.",
);
q(
  "osmotic-pressure",
  "easy",
  "A semipermeable membrane allows",
  [
    "solvent molecules to pass but not the solute",
    "both solute and solvent to pass freely",
    "only ions to pass",
    "only proteins to pass",
  ],
  0,
  "That selective permeability is what makes osmosis (and $\\pi$) observable.",
);
q(
  "osmotic-pressure",
  "easy",
  "Plant cells placed in a hypertonic solution undergo",
  ["plasmolysis", "bursting", "no change at all", "photosynthesis only"],
  0,
  "Water leaves the cell, the protoplast shrinks, and plasmolysis is observed.",
);
q(
  "osmotic-pressure",
  "easy",
  "Berkeley and Hartley devised a laboratory method to measure",
  ["osmotic pressure", "$K_H$", "mass percent", "electron spin"],
  0,
  "Their apparatus applies a measured pressure to just stop osmosis.",
);
q(
  "osmotic-pressure",
  "easy",
  "At constant temperature, osmotic pressure of a dilute non-electrolyte is proportional to",
  ["the molar concentration", "the square of the concentration", "1/C", "the solvent $K_b$"],
  0,
  "$\\pi = CRT$ at fixed T is a direct proportion between $\\pi$ and C.",
);
q(
  "osmotic-pressure",
  "medium",
  "A 0.10 M non-electrolyte at 300 K (R = 0.0821 L atm K⁻¹ mol⁻¹) has $\\pi$ nearest",
  ["2.46 atm", "0.082 atm", "3.00 atm", "24.6 atm"],
  0,
  "$\\pi = 0.10 \\times 0.0821 \\times 300 = 2.46$ atm.",
);
q(
  "osmotic-pressure",
  "medium",
  "Glucose 18 g (180 g mol⁻¹) in 1.0 L at 27 °C (R = 0.0821 L atm K⁻¹ mol⁻¹) shows $\\pi$ of",
  ["2.46 atm", "0.82 atm", "18 atm", "0.10 atm"],
  0,
  "C = 0.10 mol L⁻¹, T = 300 K, so $\\pi = 0.10 \\times 0.0821 \\times 300 = 2.46$ atm.",
);
q(
  "osmotic-pressure",
  "medium",
  "Human blood is approximately isotonic with",
  ["0.91% (w/v) NaCl", "10% NaCl", "pure water", "5 M urea"],
  0,
  "Physiological saline (~0.91% NaCl, about 0.16 M) matches the osmotic pressure of blood.",
);
q(
  "osmotic-pressure",
  "medium",
  "A 2.0 g sample of a polymer in 1.0 L of solution at 300 K shows $\\pi = 4.1 \\times 10^{-4}$ atm (R = 0.082 L atm K⁻¹ mol⁻¹). Molar mass is nearest",
  ["1.2 × 10⁵ g mol⁻¹", "1.2 × 10³ g mol⁻¹", "2.0 × 10⁴ g mol⁻¹", "8.2 × 10² g mol⁻¹"],
  0,
  "C = $\\pi / RT$ = 4.1 × 10⁻⁴ / (0.082 × 300) = 1.67 × 10⁻⁵ mol L⁻¹; M = 2.0 / 1.67 × 10⁻⁵ ≈ 1.2 × 10⁵.",
);
q(
  "osmotic-pressure",
  "medium",
  "Red blood cells swell and may burst when placed in",
  ["pure water, which is hypotonic", "0.91% saline", "concentrated brine", "absolute ethanol"],
  0,
  "Water rushes in because $\\pi$ outside is far smaller than $\\pi$ of the cytoplasm (haemolysis).",
);
q(
  "osmotic-pressure",
  "medium",
  "At 273 K a solution with C = 0.50 mol L⁻¹ (R = 0.0821 L atm K⁻¹ mol⁻¹) has osmotic pressure nearest",
  ["11.2 atm", "0.50 atm", "22.4 atm", "1.00 atm"],
  0,
  "$\\pi = 0.50 \\times 0.0821 \\times 273 \\approx 11.2$ atm.",
);
q(
  "osmotic-pressure",
  "hard",
  "Urea 3.0 g (60 g mol⁻¹) occupies 250 mL of solution at 27 °C. Using R = 0.0821 L atm K⁻¹ mol⁻¹, $\\pi$ is nearest",
  ["4.9 atm", "2.5 atm", "0.82 atm", "12 atm"],
  0,
  "C = 0.050 / 0.250 = 0.20 M; T = 300 K; $\\pi = 0.20 \\times 0.0821 \\times 300 \\approx 4.9$ atm.",
);
q(
  "osmotic-pressure",
  "hard",
  "An aqueous NaCl solution that is 0.10 M and fully ionised (i = 2) at 300 K (R = 0.0821 L atm K⁻¹ mol⁻¹) has $\\pi$ nearest",
  ["4.93 atm", "2.46 atm", "0.20 atm", "8.21 atm"],
  0,
  "$\\pi = iCRT = 2 \\times 0.10 \\times 0.0821 \\times 300 = 4.93$ atm.",
);

// —— vanthoff-abnormal: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "vanthoff-abnormal",
  "easy",
  "The van’t Hoff factor i is the ratio of",
  [
    "the observed colligative effect to the effect calculated for no ionisation",
    "molarity to molality",
    "$K_H$ to p",
    "$K_b$ to $K_f$",
  ],
  0,
  "i = $\\Delta T_{\\mathrm{obs}} / \\Delta T_{\\mathrm{calc}}$ (and likewise for $\\pi$ or relative lowering).",
);
q(
  "vanthoff-abnormal",
  "easy",
  "For a non-electrolyte that neither associates nor dissociates, i is",
  ["1", "0", "2", "0.5"],
  0,
  "One formula unit still gives one particle, so the factor is unity.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "Complete dissociation of K2SO4 in water gives i equal to",
  ["3", "2", "1", "4"],
  0,
  "K2SO4 → 2 K⁺ + SO₄²⁻, three ions, so i = 3 when $\\alpha = 1$.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "Association of solute molecules makes the observed molar mass",
  ["larger than the true formula mass", "smaller than the true formula mass", "unchanged", "zero"],
  0,
  "Fewer particles are present, so the colligative effect is smaller and $M_{\\mathrm{obs}} = M / i$ is larger (i < 1).",
);
q(
  "vanthoff-abnormal",
  "easy",
  "Dissociation of a solute makes the observed molar mass",
  ["smaller than the true formula mass", "larger than the true formula mass", "infinite", "equal to $K_b$"],
  0,
  "More particles raise the colligative effect, so $M_{\\mathrm{obs}} = M / i$ falls below M.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "Abnormal molar mass arises when",
  [
    "the solute associates or dissociates",
    "the solvent is merely wet",
    "the temperature is 25 °C",
    "$K_H$ is large",
  ],
  0,
  "Either process changes the particle count, so the molar mass inferred from a colligative law is abnormal.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "The relation connecting i, the number of particles n from one formula unit, and the degree of dissociation $\\alpha$ is",
  ["$i = 1 + (n - 1)\\alpha$", "$i = n\\alpha$", "$i = 1 - n\\alpha$", "$i = \\alpha / n$"],
  0,
  "Each dissociated unit adds (n − 1) extra particles, so i − 1 = (n − 1)$\\alpha$.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "Benzoic acid in benzene often shows i less than 1 because it",
  ["dimerises", "ionises into four ions", "evaporates completely", "becomes a metal"],
  0,
  "Hydrogen-bonded dimers reduce the particle count, so i < 1 and $M_{\\mathrm{obs}}$ is high.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "For Al2(SO4)3, complete dissociation would give i of",
  ["5", "3", "2", "4"],
  0,
  "2 Al³⁺ + 3 SO₄²⁻ = five ions per formula unit.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "If i = 2 for a binary electrolyte AB, the degree of dissociation is",
  ["1 (complete)", "0.5", "0", "2"],
  0,
  "i = 1 + (2 − 1)$\\alpha$ = 1 + $\\alpha$, so i = 2 means $\\alpha = 1$.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "Observed $\\Delta T_f$ divided by the $\\Delta T_f$ calculated with the theoretical molar mass equals",
  ["i", "$K_b$", "$K_f$", "$\\pi$"],
  0,
  "That ratio is the definition of the van’t Hoff factor from freezing-point data.",
);
q(
  "vanthoff-abnormal",
  "easy",
  "K4[Fe(CN)6] on complete ionisation yields particles numbering",
  ["5", "4", "2", "1"],
  0,
  "Four K⁺ ions plus [Fe(CN)6]⁴⁻ give five particles, so i = 5 when fully split.",
);
q(
  "vanthoff-abnormal",
  "medium",
  "A binary electrolyte is 60% dissociated. The van’t Hoff factor is",
  ["1.60", "2.00", "0.60", "1.00"],
  0,
  "i = 1 + (2 − 1)(0.60) = 1.60.",
);
q(
  "vanthoff-abnormal",
  "medium",
  "Acetic acid appears to have molar mass 120 g mol⁻¹ in benzene (true M = 60). Then i equals",
  ["0.50", "2.0", "1.0", "1.5"],
  0,
  "i = $M_{\\mathrm{true}} / M_{\\mathrm{obs}} = 60/120 = 0.50$ (essentially complete dimerisation).",
);
q(
  "vanthoff-abnormal",
  "medium",
  "BaCl2 is 80% dissociated. With n = 3, i is",
  ["2.60", "3.00", "0.80", "1.80"],
  0,
  "i = 1 + (3 − 1)(0.80) = 2.60.",
);
q(
  "vanthoff-abnormal",
  "medium",
  "A solute that should give $\\Delta T_b = 0.20$ K actually gives 0.30 K. The van’t Hoff factor is",
  ["1.5", "0.67", "2.0", "0.20"],
  0,
  "i = 0.30 / 0.20 = 1.5.",
);
q(
  "vanthoff-abnormal",
  "medium",
  "Observed molar mass of NaCl in water is 30 g mol⁻¹ (formula mass 58.5). The factor i is nearest",
  ["1.95", "0.51", "3.00", "1.00"],
  0,
  "i = 58.5 / 30 = 1.95, close to complete dissociation into two ions.",
);
q(
  "vanthoff-abnormal",
  "medium",
  "For dimerisation with $\\alpha = 0.40$, i equals",
  ["0.80", "1.40", "0.40", "2.00"],
  0,
  "i = 1 − $\\alpha$(1 − 1/n) = 1 − 0.40/2 = 0.80.",
);
q(
  "vanthoff-abnormal",
  "hard",
  "A 0.10 m aqueous Ca(NO3)2 solution is 70% dissociated. Using $K_f = 1.86$ K kg mol⁻¹, the freezing-point depression is nearest",
  ["0.45 K", "0.19 K", "0.56 K", "1.86 K"],
  0,
  "n = 3, i = 1 + 2 × 0.70 = 2.40; $\\Delta T_f = 2.40 \\times 1.86 \\times 0.10 = 0.446$ K ≈ 0.45 K.",
);
q(
  "vanthoff-abnormal",
  "hard",
  "A 0.050 M weak electrolyte is 40% dissociated into two ions. At 300 K (R = 0.0821 L atm K⁻¹ mol⁻¹), osmotic pressure is nearest",
  ["1.72 atm", "1.23 atm", "0.050 atm", "2.46 atm"],
  0,
  "i = 1.40; $\\pi = iCRT = 1.40 \\times 0.050 \\times 0.0821 \\times 300 \\approx 1.72$ atm.",
);

// —— miscibility-azeotrope: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "miscibility-azeotrope",
  "easy",
  "Two liquids that dissolve in each other in all proportions are called",
  ["completely miscible", "immiscible", "partially miscible", "always azeotropic"],
  0,
  "Complete miscibility means a single liquid phase at every composition.",
);
q(
  "miscibility-azeotrope",
  "easy",
  "Phenol and water below the consolute temperature form",
  ["two liquid layers (partially miscible)", "a single ideal gas", "a solid alloy", "an azeotrope only"],
  0,
  "They are the usual Intermediate example of a pair with a limited mutual solubility.",
);
q(
  "miscibility-azeotrope",
  "easy",
  "An azeotrope is a constant-boiling mixture whose vapour has",
  [
    "the same composition as the boiling liquid",
    "a composition richer in the less volatile component always",
    "zero pressure",
    "only water",
  ],
  0,
  "Liquid and vapour compositions coincide, so simple distillation does not change the composition.",
);
q(
  "miscibility-azeotrope",
  "easy",
  "Minimum-boiling azeotropes arise from",
  [
    "positive deviations from Raoult’s law",
    "negative deviations from Raoult’s law",
    "strictly ideal behaviour",
    "Henry’s law for a solid",
  ],
  0,
  "A maximum in the p–x curve corresponds to a minimum in the boiling-point curve.",
);
q(
  "miscibility-azeotrope",
  "easy",
  "Maximum-boiling azeotropes arise from",
  [
    "negative deviations from Raoult’s law",
    "positive deviations from Raoult’s law",
    "$\\Delta H_{\\mathrm{mix}} = 0$",
    "a large $K_H$",
  ],
  0,
  "A minimum in p versus x is a maximum on the T–x boiling diagram.",
);
q(
  "miscibility-azeotrope",
  "easy",
  "Ethanol and water form a well-known",
  ["minimum-boiling azeotrope", "maximum-boiling azeotrope", "ideal solution at all x", "solid solution"],
  0,
  "The ~95.6% ethanol azeotrope boils below the boiling points of both pure liquids.",
);
q(
  "miscibility-azeotrope",
  "easy",
  "Aqueous hydrochloric acid forms a well-known",
  ["maximum-boiling azeotrope", "minimum-boiling azeotrope", "gas–gas mixture only", "colloid"],
  0,
  "About 20.2% HCl boils higher than either pure water or pure HCl (negative deviation).",
);
q(
  "miscibility-azeotrope",
  "medium",
  "Fractional distillation cannot yield both pure components from",
  ["an azeotropic mixture", "an ideal benzene–toluene mix", "a dilute urea solution", "a gas–solid alloy"],
  0,
  "At the azeotropic composition, liquid and vapour are identical, so further enrichment stops.",
);
q(
  "miscibility-azeotrope",
  "medium",
  "The ethanol–water azeotrope (about 95.6% ethanol) boils",
  [
    "below the boiling point of either pure liquid",
    "above both pure boiling points",
    "at 100 °C only",
    "at 0 °C",
  ],
  0,
  "It is a minimum-boiling (positive-deviation) azeotrope.",
);
q(
  "miscibility-azeotrope",
  "medium",
  "The HCl–water azeotrope (about 20.2% HCl) boils",
  ["above 100 °C", "below 50 °C", "at the boiling point of pure HCl", "at 0 °C"],
  0,
  "Maximum-boiling azeotropes boil higher than either pure component; aqueous HCl azeotrope boils near 108.6 °C.",
);
q(
  "miscibility-azeotrope",
  "medium",
  "Completely immiscible liquids such as water and chlorobenzene distill at a temperature",
  [
    "lower than the boiling point of either pure liquid (steam distillation)",
    "higher than both boiling points",
    "equal to the arithmetic mean of the two boiling points",
    "fixed by $K_H$ alone",
  ],
  0,
  "Each liquid exerts its own $p^\\circ$; the total reaches 1 atm below either normal boiling point.",
);
q(
  "miscibility-azeotrope",
  "hard",
  "A dilute aqueous HCl solution (weaker than the azeotrope) is fractionally distilled. Because the system has a maximum-boiling azeotrope, the first distillate is",
  [
    "nearly pure water, while the residue approaches the azeotrope",
    "nearly anhydrous HCl from the first drop",
    "the 20% azeotrope from the start",
    "ethanol",
  ],
  0,
  "On the water-rich side the more volatile vapour is almost pure water; the flask liquid moves toward the higher-boiling azeotrope.",
);

const expected = {
  "types-solubility": { total: 14, easy: 8, medium: 5, hard: 1 },
  "concentration-terms": { total: 24, easy: 14, medium: 7, hard: 3 },
  "henrys-law": { total: 12, easy: 7, medium: 4, hard: 1 },
  "raoult-vapour": { total: 22, easy: 13, medium: 7, hard: 2 },
  "ideal-nonideal": { total: 16, easy: 10, medium: 5, hard: 1 },
  "relative-lowering": { total: 16, easy: 10, medium: 5, hard: 1 },
  "boiling-elevation": { total: 18, easy: 11, medium: 5, hard: 2 },
  "freezing-depression": { total: 18, easy: 11, medium: 5, hard: 2 },
  "osmotic-pressure": { total: 20, easy: 12, medium: 6, hard: 2 },
  "vanthoff-abnormal": { total: 20, easy: 12, medium: 6, hard: 2 },
  "miscibility-azeotrope": { total: 12, easy: 7, medium: 4, hard: 1 },
};

const problems = [];
if (questions.length !== 192) problems.push(`count ${questions.length} !== 192`);
if (questions[0]?.id !== "che-so-101") problems.push(`first id ${questions[0]?.id}`);
if (questions.at(-1)?.id !== "che-so-292") problems.push(`last id ${questions.at(-1)?.id}`);

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
