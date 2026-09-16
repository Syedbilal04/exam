import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "chemistry-stoichiometry";

const COMPOUNDS = [
  { name: "CaCO3", molarMass: 100 },
  { name: "CO2", molarMass: 44 },
  { name: "H2O", molarMass: 18 },
  { name: "O2", molarMass: 32 },
  { name: "N2", molarMass: 28 },
  { name: "Fe", molarMass: 56 },
  { name: "SO2", molarMass: 64 },
  { name: "CH4", molarMass: 16 },
  { name: "NaOH", molarMass: 40 },
  { name: "H2", molarMass: 2 },
];

const REACTIONS = [
  { equation: "C + O2 -> CO2", reactant: "C", reactantM: 12, product: "CO2", productM: 44, stoichR: 1, stoichP: 1 },
  { equation: "2H2 + O2 -> 2H2O", reactant: "H2", reactantM: 2, product: "H2O", productM: 18, stoichR: 2, stoichP: 2 },
  { equation: "N2 + 3H2 -> 2NH3", reactant: "N2", reactantM: 28, product: "NH3", productM: 17, stoichR: 1, stoichP: 2 },
  { equation: "S + O2 -> SO2", reactant: "S", reactantM: 32, product: "SO2", productM: 64, stoichR: 1, stoichP: 1 },
  { equation: "CaCO3 -> CaO + CO2", reactant: "CaCO3", reactantM: 100, product: "CO2", productM: 44, stoichR: 1, stoichP: 1 },
  { equation: "2H2O2 -> 2H2O + O2", reactant: "H2O2", reactantM: 34, product: "O2", productM: 32, stoichR: 2, stoichP: 1 },
  { equation: "CH4 + 2O2 -> CO2 + 2H2O", reactant: "CH4", reactantM: 16, product: "CO2", productM: 44, stoichR: 1, stoichP: 1 },
  { equation: "2Mg + O2 -> 2MgO", reactant: "Mg", reactantM: 24, product: "MgO", productM: 40, stoichR: 2, stoichP: 2 },
  { equation: "CaO + H2O -> Ca(OH)2", reactant: "CaO", reactantM: 56, product: "Ca(OH)2", productM: 74, stoichR: 1, stoichP: 1 },
  { equation: "2SO2 + O2 -> 2SO3", reactant: "SO2", reactantM: 64, product: "SO3", productM: 80, stoichR: 2, stoichP: 2 },
];

function toMoles(n) {
  const compound = COMPOUNDS[n % COMPOUNDS.length];
  const moles = 1 + (n % 5);
  const mass = moles * compound.molarMass;
  const inputs = { mass, molarMass: compound.molarMass };
  const value = compute("molesFromMass", inputs);
  return draft({
    key: `mol-${compound.name}-${mass}`,
    chapterId,
    stem: `How many moles are present in ${mass} g of ${compound.name}? The molar mass of ${compound.name} is ${compound.molarMass} g mol^-1.`,
    formula: "molesFromMass",
    inputs,
    unit: "mol",
    wrongValues: [mass, compound.molarMass, mass + compound.molarMass],
    explanation: `n = m/M = ${mass}/${compound.molarMass} = ${value} mol.`,
    mustInclude: [`${mass} g`, `${compound.molarMass} g mol^-1`],
  });
}

function toMass(n) {
  const compound = COMPOUNDS[n % COMPOUNDS.length];
  const moles = 2 + (n % 4);
  const inputs = { moles, molarMass: compound.molarMass };
  const value = compute("massFromMoles", inputs);
  return draft({
    key: `mass-${compound.name}-${moles}`,
    chapterId,
    stem: `The mass of ${moles} mol of ${compound.name} is how many grams? The molar mass of ${compound.name} is ${compound.molarMass} g mol^-1.`,
    formula: "massFromMoles",
    inputs,
    unit: "g",
    wrongValues: [moles, compound.molarMass, moles + compound.molarMass],
    explanation: `m = nM = (${moles})(${compound.molarMass}) = ${value} g.`,
    mustInclude: [`${moles} mol`, `${compound.molarMass} g mol^-1`],
  });
}

function productMass(n) {
  const reaction = REACTIONS[n % REACTIONS.length];
  const k = 1 + (n % 4);
  const massReactant = reaction.stoichR * k * reaction.reactantM;
  const inputs = {
    massReactant,
    molarReactant: reaction.reactantM,
    molarProduct: reaction.productM,
    stoichReactant: reaction.stoichR,
    stoichProduct: reaction.stoichP,
  };
  const value = compute("productMass", inputs);
  return draft({
    key: `prod-${reaction.equation}-${massReactant}`,
    chapterId,
    stem: `For ${reaction.equation}, what mass of ${reaction.product} is obtained from ${massReactant} g of ${reaction.reactant}? Molar masses: ${reaction.reactant} = ${reaction.reactantM} g mol^-1, ${reaction.product} = ${reaction.productM} g mol^-1.`,
    formula: "productMass",
    inputs,
    unit: "g",
    wrongValues: [massReactant, reaction.productM, reaction.reactantM],
    explanation: `${massReactant} g of ${reaction.reactant} is ${massReactant / reaction.reactantM} mol. The equation gives ${value} g of ${reaction.product}.`,
    mustInclude: [reaction.equation, `${massReactant} g`],
  });
}

function reactantMass(n) {
  const reaction = REACTIONS[n % REACTIONS.length];
  const k = 1 + (n % 4);
  const massProduct = reaction.stoichP * k * reaction.productM;
  const inputs = {
    massProduct,
    molarProduct: reaction.productM,
    molarReactant: reaction.reactantM,
    stoichProduct: reaction.stoichP,
    stoichReactant: reaction.stoichR,
  };
  const value = compute("reactantMass", inputs);
  return draft({
    key: `reac-${reaction.equation}-${massProduct}`,
    chapterId,
    stem: `For ${reaction.equation}, what mass of ${reaction.reactant} is required to produce ${massProduct} g of ${reaction.product}? Molar masses: ${reaction.reactant} = ${reaction.reactantM} g mol^-1, ${reaction.product} = ${reaction.productM} g mol^-1.`,
    formula: "reactantMass",
    inputs,
    unit: "g",
    wrongValues: [massProduct, reaction.reactantM, reaction.productM],
    explanation: `${massProduct} g of ${reaction.product} is ${massProduct / reaction.productM} mol. The equation requires ${value} g of ${reaction.reactant}.`,
    mustInclude: [reaction.equation, `${massProduct} g`],
  });
}

export const subjectId = "chemistry";
export const file = "chemistry-stoichiometry.json";
export const idPrefix = "gen-che-sto";

export function generate() {
  return [
    ...fill(10, toMoles),
    ...fill(10, toMass),
    ...fill(10, productMass),
    ...fill(10, reactantMass),
  ];
}
