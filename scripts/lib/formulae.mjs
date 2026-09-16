/**
 * The only place a numerical answer is calculated. Generators pick inputs and
 * call this; the writer calls it again and refuses to emit a paper item whose
 * key does not match.
 */

function integer(name, value) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} did not produce a positive integer (${value})`);
  }
  return value;
}

export function compute(formula, inputs) {
  switch (formula) {
    case "displacementFromRest":
      return integer(formula, (inputs.a * inputs.t * inputs.t) / 2);
    case "velocityUat":
      return integer(formula, inputs.u + inputs.a * inputs.t);
    case "displacementFromVelocities":
      return integer(formula, ((inputs.u + inputs.v) * inputs.t) / 2);
    case "finalSpeed":
      return integer(
        formula,
        Math.sqrt(inputs.u * inputs.u + 2 * inputs.a * inputs.s),
      );
    case "distanceForFinalSpeed": {
      const numerator = inputs.v * inputs.v - inputs.u * inputs.u;
      if (numerator % (2 * inputs.a) !== 0) {
        throw new Error(`${formula} inputs do not divide`);
      }
      return integer(formula, numerator / (2 * inputs.a));
    }
    case "ohmCurrent":
    case "ohmResistance":
    case "ohmVoltage":
      if (inputs.v % inputs.r !== 0 && formula === "ohmCurrent") {
        throw new Error("current is not an integer");
      }
      if (formula === "ohmCurrent") return integer(formula, inputs.v / inputs.r);
      if (formula === "ohmResistance") return integer(formula, inputs.v / inputs.i);
      return integer(formula, inputs.i * inputs.r);
    case "seriesCurrent": {
      const resistance = inputs.r1 + inputs.r2;
      if (inputs.v % resistance !== 0) throw new Error("series current is not an integer");
      return integer(formula, inputs.v / resistance);
    }
    case "parallelResistance": {
      const numerator = inputs.r1 * inputs.r2;
      const denominator = inputs.r1 + inputs.r2;
      if (numerator % denominator !== 0) {
        throw new Error("parallel resistance is not an integer");
      }
      return integer(formula, numerator / denominator);
    }
    case "molesFromMass":
      if (inputs.mass % inputs.molarMass !== 0) throw new Error("moles are not an integer");
      return integer(formula, inputs.mass / inputs.molarMass);
    case "massFromMoles":
      return integer(formula, inputs.moles * inputs.molarMass);
    case "productMass": {
      if (inputs.massReactant % inputs.molarReactant !== 0) {
        throw new Error("reactant moles are not an integer");
      }
      const moles = inputs.massReactant / inputs.molarReactant;
      if ((moles * inputs.stoichProduct) % inputs.stoichReactant !== 0) {
        throw new Error("product moles are not an integer");
      }
      return integer(
        formula,
        ((moles * inputs.stoichProduct) / inputs.stoichReactant) * inputs.molarProduct,
      );
    }
    case "reactantMass": {
      if (inputs.massProduct % inputs.molarProduct !== 0) {
        throw new Error("product moles are not an integer");
      }
      const moles = inputs.massProduct / inputs.molarProduct;
      if ((moles * inputs.stoichReactant) % inputs.stoichProduct !== 0) {
        throw new Error("reactant moles are not an integer");
      }
      return integer(
        formula,
        ((moles * inputs.stoichReactant) / inputs.stoichProduct) * inputs.molarReactant,
      );
    }
    case "parabola":
      return integer(
        formula,
        inputs.a * inputs.x * inputs.x + inputs.b * inputs.x + inputs.c,
      );
    case "circleRadius":
      return integer(formula, inputs.r);
    case "force":
      return integer(formula, inputs.m * inputs.a);
    case "acceleration":
      if (inputs.f % inputs.m !== 0) throw new Error("acceleration is not an integer");
      return integer(formula, inputs.f / inputs.m);
    case "massFromForce":
      if (inputs.f % inputs.a !== 0) throw new Error("mass is not an integer");
      return integer(formula, inputs.f / inputs.a);
    case "momentum":
      return integer(formula, inputs.m * inputs.v);
    case "kineticEnergy":
      if ((inputs.m * inputs.v * inputs.v) % 2 !== 0) {
        throw new Error("kinetic energy is not an integer");
      }
      return integer(formula, (inputs.m * inputs.v * inputs.v) / 2);
    case "potentialEnergy":
      return integer(formula, inputs.m * inputs.g * inputs.h);
    case "work":
      return integer(formula, inputs.f * inputs.s);
    case "power":
      if (inputs.w % inputs.t !== 0) throw new Error("power is not an integer");
      return integer(formula, inputs.w / inputs.t);
    case "derivativePower":
      return integer(
        formula,
        inputs.a * inputs.n * inputs.x ** (inputs.n - 1),
      );
    case "sumOfRoots":
      return integer(formula, inputs.p + inputs.q);
    case "productOfRoots":
      return integer(formula, inputs.p * inputs.q);
    case "mirrorImageDistance": {
      const gap = inputs.u - inputs.f;
      if (gap <= 0 || (inputs.f * inputs.u) % gap !== 0) {
        throw new Error("image distance is not a positive integer");
      }
      return integer(formula, (inputs.f * inputs.u) / gap);
    }
    default:
      throw new Error(`unknown formula "${formula}"`);
  }
}
