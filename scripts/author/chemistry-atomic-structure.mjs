/**
 * Writes content/seed/chemistry__atomic-structure.json
 * TSBIE Intermediate 1st year — Atomic Structure (original practice MCQs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { item, pack } from "../lib/author-chem.mjs";
import { stemsClash } from "../lib/stems.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const outFile = path.join(root, "content", "seed", "chemistry__atomic-structure.json");
const stemsFile = path.join(root, "scripts", ".bank-stems.json");

const chapterId = "chemistry-atomic-structure";
const prefix = "che-as";
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

// —— particles-models: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "particles-models",
  "easy",
  "The charge carried by one electron is",
  ["+1.6 × 10⁻¹⁹ C", "−1.6 × 10⁻¹⁹ C", "1.6 × 10⁻¹⁹ u", "zero"],
  1,
  "The electron is a negatively charged particle of magnitude 1.6 × 10⁻¹⁹ C.",
);
q(
  "particles-models",
  "easy",
  "Cathode rays in a discharge tube led J.J. Thomson to identify the",
  ["proton", "neutron", "electron", "nucleus"],
  2,
  "Cathode rays are streams of electrons; Thomson measured their charge-to-mass ratio.",
);
q(
  "particles-models",
  "easy",
  "Positive rays (canal rays) studied by Goldstein are linked in the textbook with the discovery of the",
  ["electron", "proton", "neutron", "photon"],
  1,
  "Canal rays are positively charged and the lightest such particle is identified as the proton.",
);
q(
  "particles-models",
  "easy",
  "James Chadwick established the neutron by bombarding beryllium with",
  ["electrons", "protons", "alpha particles", "infrared photons"],
  2,
  "Be struck by α-particles yields carbon and a penetrating neutral particle, the neutron.",
);
q(
  "particles-models",
  "easy",
  "Atomic number Z of an atom equals the number of",
  ["neutrons in the nucleus", "protons in the nucleus", "nucleons only", "electrons minus protons"],
  1,
  "Z is the proton count; in a neutral atom it also equals the electron count.",
);
q(
  "particles-models",
  "easy",
  "Mass number A of a nuclide is the total of",
  ["protons only", "electrons plus protons", "protons plus neutrons", "neutrons only"],
  2,
  "A counts nucleons: protons + neutrons.",
);
q(
  "particles-models",
  "easy",
  "Thomson pictured the atom as",
  [
    "a tiny positive nucleus with empty space around it",
    "a uniform positive sphere with embedded electrons",
    "electrons moving in fixed circular orbits",
    "a cloud of neutrons only",
  ],
  1,
  "The plum-pudding model spreads positive charge through the atom with electrons embedded in it.",
);
q(
  "particles-models",
  "easy",
  "Rutherford inferred that an atom is mostly empty space because",
  [
    "every alpha particle bounced straight back",
    "most alpha particles passed through the gold foil undeflected",
    "cathode rays bent in a magnetic field",
    "canal rays had a large e/m value",
  ],
  1,
  "Only a few alphas were scattered strongly, so the atom is empty except for a tiny massive nucleus.",
);
q(
  "particles-models",
  "easy",
  "The electrical charge on a neutron is",
  ["+1 unit", "−1 unit", "zero", "+2 units"],
  2,
  "The neutron is electrically neutral.",
);
q(
  "particles-models",
  "easy",
  "Isobars are nuclides that share the same",
  [
    "atomic number but different mass number",
    "mass number but different atomic number",
    "number of neutrons and protons",
    "number of electrons only",
  ],
  1,
  "Isobars have equal A but different Z (for example ⁴⁰Ar and ⁴⁰Ca).",
);
q(
  "particles-models",
  "medium",
  "Thomson found the specific charge of cathode-ray particles to be",
  [
    "independent of the residual gas in the tube",
    "proportional to the atomic mass of the gas",
    "zero in every experiment",
    "equal to that of the proton",
  ],
  0,
  "e/m of cathode rays is the same for all gases, showing they are a common constituent of matter.",
);
q(
  "particles-models",
  "medium",
  "Millikan obtained the magnitude of the electronic charge with the",
  ["gold-foil scattering arrangement", "oil-drop experiment", "canal-ray e/m tube", "X-ray powder method"],
  1,
  "Charged oil droplets in an electric field gave the elementary charge 1.6 × 10⁻¹⁹ C.",
);
q(
  "particles-models",
  "medium",
  "The nucleus of an ordinary atom contains",
  ["electrons and protons", "protons and neutrons", "neutrons and electrons", "only electrons"],
  1,
  "Nucleons (protons and neutrons) sit in the nucleus; electrons occupy the extra-nuclear region.",
);
q(
  "particles-models",
  "medium",
  "A key failure of Rutherford's nuclear model is that it cannot explain",
  [
    "the existence of a dense nucleus",
    "why the atom should emit a line spectrum and remain stable",
    "large-angle alpha scattering",
    "why most of the mass is central",
  ],
  1,
  "A classical orbiting electron would radiate continuously and spiral in; a discrete spectrum is also unexplained.",
);
q(
  "particles-models",
  "medium",
  "Compared with an electron, a proton has",
  [
    "the same mass and opposite charge",
    "nearly 1836 times greater mass and opposite charge",
    "smaller mass and the same charge",
    "identical mass and charge",
  ],
  1,
  "The proton is much heavier and carries charge +e opposite to the electron.",
);
q(
  "particles-models",
  "hard",
  "Among electron, proton, neutron and α-particle, the specific charge e/m is largest for the",
  ["proton", "neutron", "electron", "α-particle"],
  2,
  "The electron has the smallest mass of the charged particles listed, so e/m is greatest.",
);

// —— planck-photoelectric: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "planck-photoelectric",
  "easy",
  "According to Planck, the energy of one quantum of radiation is",
  ["h/ν", "hν", "h/λ", "λν"],
  1,
  "Planck wrote E = hν, with h Planck's constant and ν the frequency.",
);
q(
  "planck-photoelectric",
  "easy",
  "Energy of a photon increases when you raise its",
  ["wavelength", "frequency", "speed in vacuum", "beam intensity only"],
  1,
  "E = hν, so a higher frequency (shorter wavelength) photon is more energetic.",
);
q(
  "planck-photoelectric",
  "easy",
  "The photoelectric effect is the ejection of electrons from a metal surface by",
  [
    "heating the metal in the dark",
    "incident electromagnetic radiation of sufficient frequency",
    "a beam of slow neutrons",
    "audible sound waves",
  ],
  1,
  "Photons above the threshold frequency knock electrons out of the metal.",
);
q(
  "planck-photoelectric",
  "easy",
  "Below the threshold frequency, photoemission from a metal",
  [
    "still occurs if the lamp is made extremely bright",
    "does not occur no matter how intense the light",
    "occurs after a long delay",
    "occurs only for infrared lamps",
  ],
  1,
  "Each photon must supply at least the work function; intensity cannot replace frequency.",
);
q(
  "planck-photoelectric",
  "easy",
  "The work function of a metal is the minimum energy needed to",
  [
    "ionise a free gaseous atom of that element",
    "just free an electron from the metal surface",
    "promote an electron from n=1 to n=2 in hydrogen",
    "break a metal–metal bond in the bulk crystal",
  ],
  1,
  "φ is the binding energy of the least tightly held conduction electron in the metal.",
);
q(
  "planck-photoelectric",
  "easy",
  "Einstein wrote the photoelectric energy balance as KEmax equal to",
  ["hν + φ", "hν − φ", "φ − hν", "hν × φ"],
  1,
  "The leftover photon energy after paying the work function appears as kinetic energy of the photoelectron.",
);
q(
  "planck-photoelectric",
  "easy",
  "Planck's quantum idea and the photoelectric effect together show that radiation has",
  [
    "only wave character",
    "particle character in addition to wave character",
    "neither wave nor particle character",
    "rest mass equal to an electron",
  ],
  1,
  "Photons explain discrete energy exchange, while interference still requires waves.",
);
q(
  "planck-photoelectric",
  "medium",
  "A photon of frequency 5.0 × 10¹⁴ Hz carries energy (h = 6.626 × 10⁻³⁴ J s) closest to",
  ["3.3 × 10⁻¹⁹ J", "3.3 × 10⁻¹⁵ J", "1.3 × 10⁻⁴⁸ J", "6.6 × 10⁻²⁰ J"],
  0,
  "E = hν = 6.626 × 10⁻³⁴ × 5.0 × 10¹⁴ = 3.31 × 10⁻¹⁹ J.",
);
q(
  "planck-photoelectric",
  "medium",
  "Visible light of wavelength 400 nm carries energy per photon of about (use 1240 eV·nm)",
  ["1.6 eV", "3.1 eV", "4.9 eV", "6.2 eV"],
  1,
  "E = 1240/400 = 3.1 eV.",
);
q(
  "planck-photoelectric",
  "medium",
  "Keeping frequency above threshold, a brighter lamp mainly increases the",
  [
    "kinetic energy of each photoelectron",
    "number of photoelectrons emitted per second",
    "threshold frequency of the metal",
    "work function",
  ],
  1,
  "Intensity raises the photon arrival rate, hence the photocurrent, not KEmax.",
);
q(
  "planck-photoelectric",
  "medium",
  "If the fastest photoelectrons have kinetic energy 1.8 eV, the stopping potential is",
  ["1.8 V", "3.6 V", "0.9 V", "1.8 × 10⁻¹⁹ V"],
  0,
  "KEmax = eVs, so Vs in volts equals the kinetic energy in electron-volts.",
);
q(
  "planck-photoelectric",
  "hard",
  "Light of wavelength 300 nm strikes a surface whose work function is 2.0 eV. Using E(eV) = 1240/λ(nm), the maximum kinetic energy of photoelectrons is",
  ["2.13 eV", "4.13 eV", "2.0 eV", "6.13 eV"],
  0,
  "Photon energy is 1240/300 = 4.13 eV, so KEmax = 4.13 − 2.0 = 2.13 eV.",
);

// —— hydrogen-spectrum: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "hydrogen-spectrum",
  "easy",
  "Lyman lines of hydrogen arise from jumps that finish at",
  ["n = 1", "n = 2", "n = 3", "n = 4"],
  0,
  "The Lyman series is n₂ = 2, 3, 4, … → n₁ = 1.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "The Lyman series of hydrogen is observed in the",
  ["visible", "infrared", "ultraviolet", "microwave"],
  2,
  "Transitions to n = 1 are high-energy and fall in the ultraviolet.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "Paschen lines correspond to electron jumps ending at",
  ["n = 1", "n = 2", "n = 3", "n = 4"],
  2,
  "Paschen series: n₂ = 4, 5, 6, … → n₁ = 3, in the infrared.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "The Brackett series of hydrogen terminates at",
  ["n = 2", "n = 3", "n = 4", "n = 5"],
  2,
  "Brackett lines end on n = 4.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "Pfund transitions of the hydrogen atom end on the level",
  ["n = 3", "n = 4", "n = 5", "n = 6"],
  2,
  "Pfund series: n₂ → n₁ = 5.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "Wave number of a hydrogen line is given by Rydberg as",
  ["R(n₁² − n₂²)", "R(1/n₁² − 1/n₂²)", "R(n₁ + n₂)", "R n₁²/n₂²"],
  1,
  "1/λ = R(1/n₁² − 1/n₂²) with n₂ > n₁.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "A hydrogen discharge tube produces",
  ["a continuous rainbow with no gaps", "a discrete line spectrum", "only X-rays", "only radio waves"],
  1,
  "Bound-level jumps give sharp lines rather than a continuum.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "An emission line appears when an electron in hydrogen",
  [
    "jumps to a higher orbit by absorbing a photon",
    "falls to a lower orbit and a photon is released",
    "stays in the same orbit forever",
    "collides with a neutron",
  ],
  1,
  "The energy difference is carried away as an emitted photon.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "Balmer lines are produced when the electron lands on",
  ["the ground level n = 1", "the level n = 2", "the level n = 3", "the ionisation continuum"],
  1,
  "Balmer series terminates at n = 2.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "The first line of the Lyman series comes from the jump",
  ["3 → 2", "2 → 1", "4 → 2", "5 → 4"],
  1,
  "The lowest-energy Lyman photon is n = 2 to n = 1.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "The hydrogen series found in the infrared and ending at n = 3 is called",
  ["Lyman", "Balmer", "Paschen", "Pfund"],
  2,
  "Paschen is the n₁ = 3 infrared series.",
);
q(
  "hydrogen-spectrum",
  "easy",
  "The Rydberg constant R has the SI unit",
  ["s⁻¹", "m⁻¹", "J", "eV"],
  1,
  "R is a wave number constant, so its SI unit is m⁻¹.",
);
q(
  "hydrogen-spectrum",
  "medium",
  "When an electron drops from n = 4 to the ground state of hydrogen, the number of possible spectral lines is",
  ["3", "4", "6", "8"],
  2,
  "From level n the line count is n(n − 1)/2 = 4 × 3/2 = 6.",
);
q(
  "hydrogen-spectrum",
  "medium",
  "The longest-wavelength Lyman photon is emitted in the transition",
  ["∞ → 1", "3 → 1", "2 → 1", "4 → 2"],
  2,
  "Among Lyman lines, 2 → 1 has the smallest ΔE and therefore the longest λ.",
);
q(
  "hydrogen-spectrum",
  "medium",
  "The series limit of Balmer radiation corresponds to a jump from",
  ["n = 3 to n = 2", "n = ∞ to n = 2", "n = 2 to n = 1", "n = ∞ to n = 1"],
  1,
  "The series limit is ionisation into that series: n = ∞ → n = 2.",
);
q(
  "hydrogen-spectrum",
  "medium",
  "For hydrogen, the wave number of the 4 → 2 line equals",
  ["R/4", "3R/16", "5R/36", "15R/16"],
  1,
  "ν̄ = R(1/4 − 1/16) = 3R/16.",
);
q(
  "hydrogen-spectrum",
  "medium",
  "Hydrogen atoms excited to n = 5 can emit how many different lines while returning toward n = 1?",
  ["4", "8", "10", "15"],
  2,
  "Total lines = 5 × 4/2 = 10.",
);
q(
  "hydrogen-spectrum",
  "medium",
  "The red H-alpha line of the Balmer series is the",
  ["3 → 2 transition", "4 → 2 transition", "2 → 1 transition", "5 → 3 transition"],
  0,
  "Hα is the first Balmer member, n = 3 to n = 2.",
);
q(
  "hydrogen-spectrum",
  "hard",
  "Using 1/λ = R(1/n₁² − 1/n₂²) with R = 1.097 × 10⁷ m⁻¹, the 3 → 2 hydrogen wavelength is closest to",
  ["121 nm", "486 nm", "656 nm", "1875 nm"],
  2,
  "1/λ = 5R/36 so λ = 36/(5R) ≈ 6.56 × 10⁻⁷ m = 656 nm.",
);
q(
  "hydrogen-spectrum",
  "hard",
  "The ratio of wave numbers of the first Lyman line to the first Balmer line of hydrogen is",
  ["4/5", "27/5", "5/27", "3/4"],
  1,
  "First Lyman is 3R/4 and first Balmer is 5R/36; the ratio is (3/4) ÷ (5/36) = 27/5.",
);

// —— bohr-model: 28 (17 easy, 8 medium, 3 hard) ——
q(
  "bohr-model",
  "easy",
  "Bohr required that a stationary orbit satisfy mvr equal to",
  ["nh", "nh/2π", "h/2πn", "n²h"],
  1,
  "Angular momentum is quantised as mvr = nh/2π, n = 1, 2, 3, …",
);
q(
  "bohr-model",
  "easy",
  "For hydrogen, Bohr orbit radius grows with n according to",
  ["n", "n²", "1/n", "1/n²"],
  1,
  "rₙ = n² a₀, so radius ∝ n².",
);
q(
  "bohr-model",
  "easy",
  "Total energy of the hydrogen electron in Bohr theory varies as",
  ["n²", "−1/n²", "1/n", "−n"],
  1,
  "Eₙ = −13.6/n² eV, so energy ∝ −1/n².",
);
q(
  "bohr-model",
  "easy",
  "The lowest Bohr level of hydrogen lies at",
  ["0 eV", "−13.6 eV", "−3.4 eV", "+13.6 eV"],
  1,
  "The n = 1 energy is −13.6 eV by definition of the Rydberg for hydrogen.",
);
q(
  "bohr-model",
  "easy",
  "Bohr assumed that an electron in an allowed orbit",
  ["radiates continuously", "does not radiate energy", "spirals into the nucleus", "has zero angular momentum"],
  1,
  "Stationary orbits are non-radiating by postulate.",
);
q(
  "bohr-model",
  "easy",
  "A photon is emitted in Bohr's picture when the electron",
  [
    "moves within one orbit",
    "jumps from a higher orbit to a lower one",
    "is at rest at the nucleus",
    "absorbs a neutron",
  ],
  1,
  "hν equals the difference of the two stationary-state energies.",
);
q(
  "bohr-model",
  "easy",
  "The first Bohr radius of hydrogen is about",
  ["0.529 Å", "5.29 Å", "0.0529 Å", "52.9 Å"],
  0,
  "a₀ = 0.529 Å (52.9 pm).",
);
q(
  "bohr-model",
  "easy",
  "In hydrogen, the n = 2 Bohr energy is",
  ["−13.6 eV", "−6.8 eV", "−3.40 eV", "−1.51 eV"],
  2,
  "E₂ = −13.6/4 = −3.40 eV.",
);
q(
  "bohr-model",
  "easy",
  "The energy of hydrogen's third Bohr orbit equals",
  ["−1.51 eV", "−3.4 eV", "−0.85 eV", "−13.6 eV"],
  0,
  "E₃ = −13.6/9 ≈ −1.51 eV.",
);
q(
  "bohr-model",
  "easy",
  "Speed of the electron in Bohr orbits of hydrogen falls as",
  ["n", "n²", "1/n", "1/n²"],
  2,
  "vₙ ∝ Z/n, so for hydrogen v ∝ 1/n.",
);
q(
  "bohr-model",
  "easy",
  "To strip the electron from ground-state hydrogen you must supply",
  ["3.4 eV", "10.2 eV", "13.6 eV", "1.51 eV"],
  2,
  "Ionisation from n = 1 to n = ∞ requires 13.6 eV.",
);
q(
  "bohr-model",
  "easy",
  "For a hydrogen-like ion, Eₙ is proportional to",
  ["Z", "Z²", "1/Z", "1/Z²"],
  1,
  "Eₙ = −13.6 Z²/n² eV.",
);
q(
  "bohr-model",
  "easy",
  "Bohr radius of a hydrogen-like ion shrinks with atomic number as",
  ["Z", "Z²", "1/Z", "1/Z²"],
  2,
  "rₙ = n² a₀/Z, so radius ∝ 1/Z.",
);
q(
  "bohr-model",
  "easy",
  "The hydrogen-like ion He⁺ has nuclear charge number Z equal to",
  ["1", "2", "3", "4"],
  1,
  "Helium has two protons, so He⁺ is a one-electron ion with Z = 2.",
);
q(
  "bohr-model",
  "easy",
  "Bohr's theory does not succeed for",
  ["the H atom", "the He⁺ ion", "the Li²⁺ ion", "a helium atom with two electrons"],
  3,
  "The simple Bohr model is for one-electron species; multi-electron atoms need a better treatment.",
);
q(
  "bohr-model",
  "easy",
  "In a Bohr orbit the kinetic energy of the electron equals",
  ["the total energy", "−(total energy)", "twice the total energy", "zero"],
  1,
  "KE = −E and PE = 2E, so KE = +13.6 Z²/n² eV.",
);
q(
  "bohr-model",
  "easy",
  "Hydrogen's n = 4 level has energy",
  ["−0.85 eV", "−3.4 eV", "−2.27 eV", "−13.6 eV"],
  0,
  "E₄ = −13.6/16 = −0.85 eV.",
);
q(
  "bohr-model",
  "medium",
  "The third Bohr orbit of hydrogen is larger than the first by a factor of",
  ["3", "6", "9", "27"],
  2,
  "r ∝ n², so r₃/r₁ = 9.",
);
q(
  "bohr-model",
  "medium",
  "A hydrogen electron falling from n = 2 to n = 1 releases",
  ["3.4 eV", "10.2 eV", "13.6 eV", "1.89 eV"],
  1,
  "ΔE = 13.6 − 3.4 = 10.2 eV.",
);
q(
  "bohr-model",
  "medium",
  "Angular momentum of the electron in hydrogen's second Bohr orbit is",
  ["h/2π", "h/π", "2h", "3h/2π"],
  1,
  "L = n h/2π = 2h/2π = h/π.",
);
q(
  "bohr-model",
  "medium",
  "Ground-state energy of He⁺ is",
  ["−13.6 eV", "−27.2 eV", "−54.4 eV", "−122.4 eV"],
  2,
  "E = −13.6 Z²/n² = −13.6 × 4 = −54.4 eV.",
);
q(
  "bohr-model",
  "medium",
  "The n = 1 radius of He⁺ compared with hydrogen's first radius is",
  ["twice as large", "the same", "half as large", "four times as large"],
  2,
  "r ∝ 1/Z, so He⁺ (Z = 2) has r₁ = a₀/2.",
);
q(
  "bohr-model",
  "medium",
  "Ionisation energy of Li²⁺ in its ground state is",
  ["13.6 eV", "54.4 eV", "122.4 eV", "40.8 eV"],
  2,
  "IE = 13.6 Z² = 13.6 × 9 = 122.4 eV for Z = 3.",
);
q(
  "bohr-model",
  "medium",
  "The electron speed in hydrogen's first Bohr orbit is about",
  ["2.18 × 10⁶ m s⁻¹", "3.00 × 10⁸ m s⁻¹", "2.18 × 10⁸ m s⁻¹", "2.18 × 10⁴ m s⁻¹"],
  0,
  "v₁ = 2.18 × 10⁶ m s⁻¹ (about c/137).",
);
q(
  "bohr-model",
  "medium",
  "Potential energy of the electron in a Bohr orbit is",
  [
    "equal to the kinetic energy",
    "−2 times the kinetic energy",
    "+2 times the kinetic energy",
    "−1/2 of the kinetic energy",
  ],
  1,
  "PE = −2 KE, and total E = KE + PE = −KE.",
);
q(
  "bohr-model",
  "hard",
  "How many times is the n = 4 hydrogen orbit farther from the nucleus than the ground orbit?",
  ["4", "8", "16", "64"],
  2,
  "r₄/r₁ = 16 because radius scales as n².",
);
q(
  "bohr-model",
  "hard",
  "The photon emitted when hydrogen goes from n = 3 to n = 1 has energy",
  ["12.09 eV", "10.2 eV", "1.89 eV", "13.6 eV"],
  0,
  "ΔE = 13.6(1 − 1/9) = 13.6 × 8/9 = 12.09 eV.",
);
q(
  "bohr-model",
  "hard",
  "The time period of revolution in Bohr orbits of hydrogen varies as",
  ["n", "n²", "n³", "1/n"],
  2,
  "T = 2πr/v with r ∝ n² and v ∝ 1/n, so T ∝ n³.",
);

// —— debroglie-heisenberg: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "debroglie-heisenberg",
  "easy",
  "de Broglie related wavelength of a material particle to its mass and speed by",
  ["λ = mv/h", "λ = h/mv", "λ = hmv", "λ = m/hv"],
  1,
  "λ = h/p = h/mv for a non-relativistic particle.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "An electron is treated as both particle and wave because",
  [
    "it has a rest mass of zero",
    "it shows diffraction as well as charge and mass",
    "it is a photon",
    "it never has momentum",
  ],
  1,
  "Charge, mass and collisions are particle properties; crystal diffraction is wave behaviour.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "Diffraction of electrons from a nickel crystal, shown by Davisson and Germer, proved that",
  [
    "electrons are positively charged",
    "electrons have wave nature",
    "protons are heavier than neutrons",
    "photons have rest mass",
  ],
  1,
  "The observed diffraction pattern matches the de Broglie wavelength of the electrons.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "Heisenberg's principle says one cannot simultaneously know, with arbitrary precision, a particle's",
  ["mass and charge", "position and momentum", "energy and rest mass", "spin and charge"],
  1,
  "Δx · Δp ≥ h/4π; a sharp position forces a spread in momentum.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "A cricket ball has a de Broglie wavelength that is",
  ["of order metres", "of order ångströms", "unobservably tiny", "equal to its diameter"],
  2,
  "Large mv makes λ = h/mv negligible, so matter waves are not seen for everyday objects.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "If the momentum of a particle is doubled, its de Broglie wavelength",
  ["doubles", "halves", "becomes four times", "is unchanged"],
  1,
  "λ ∝ 1/p, so doubling p halves λ.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "Waves associated with moving material particles are called",
  ["electromagnetic waves", "sound waves", "matter waves", "thermal waves"],
  2,
  "de Broglie matter waves are not electromagnetic; they are associated with the particle's momentum.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "An equivalent statement of the uncertainty principle uses the pair",
  ["ΔE and Δt", "Δm and Δq", "ΔT and ΔV", "Δn and Δl"],
  0,
  "ΔE · Δt ≥ h/4π is the energy–time form of the uncertainty principle.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "de Broglie proposed wave character for",
  ["only photons", "all material particles in motion", "only nuclei", "only α-particles"],
  1,
  "Any particle with momentum p has wavelength h/p.",
);
q(
  "debroglie-heisenberg",
  "easy",
  "At the same speed, a proton's de Broglie wavelength compared with an electron's is",
  ["larger", "smaller", "equal", "infinite"],
  1,
  "The proton is far heavier, so at equal v its momentum is larger and λ is smaller.",
);
q(
  "debroglie-heisenberg",
  "medium",
  "An electron accelerated through 100 V has de Broglie wavelength about (λ in Å ≈ 12.27/√V)",
  ["0.12 Å", "1.23 Å", "12.3 Å", "122 Å"],
  1,
  "√100 = 10, so λ ≈ 12.27/10 = 1.23 Å.",
);
q(
  "debroglie-heisenberg",
  "medium",
  "For an electron given 150 eV of kinetic energy, λ ≈ 12.27/√V Å is nearest to",
  ["0.50 Å", "1.00 Å", "2.00 Å", "12.3 Å"],
  1,
  "√150 ≈ 12.25, so λ ≈ 12.27/12.25 ≈ 1.00 Å.",
);
q(
  "debroglie-heisenberg",
  "medium",
  "In Bohr's orbit of quantum number n, the circumference equals",
  ["λ", "nλ", "λ/n", "2nλ"],
  1,
  "Standing-wave condition: 2πr = nλ.",
);
q(
  "debroglie-heisenberg",
  "medium",
  "If the uncertainty in position of an electron is 10⁻¹⁰ m, the minimum uncertainty in momentum is of order (use h/4π ≈ 5.3 × 10⁻³⁵ J s)",
  ["5.3 × 10⁻²⁵ kg m s⁻¹", "5.3 × 10⁻³⁵ kg m s⁻¹", "5.3 × 10⁻⁴⁵ kg m s⁻¹", "5.3 × 10⁻¹⁵ kg m s⁻¹"],
  0,
  "Δp ≥ (h/4π)/Δx = 5.3 × 10⁻³⁵ / 10⁻¹⁰ = 5.3 × 10⁻²⁵ kg m s⁻¹.",
);
q(
  "debroglie-heisenberg",
  "medium",
  "Electrons leaving a 25 V gun have de Broglie wavelength close to",
  ["0.49 Å", "2.45 Å", "12.3 Å", "25 Å"],
  1,
  "λ ≈ 12.27/√25 = 12.27/5 = 2.45 Å.",
);
q(
  "debroglie-heisenberg",
  "hard",
  "A particle's position is uncertain by 0.1 Å. The minimum Δv for an electron (m ≈ 9.1 × 10⁻³¹ kg, h/4π ≈ 5.3 × 10⁻³⁵) is nearest",
  ["5.8 × 10⁵ m s⁻¹", "5.8 × 10⁶ m s⁻¹", "5.8 × 10⁷ m s⁻¹", "5.8 × 10¹ m s⁻¹"],
  1,
  "Δx = 10⁻¹¹ m, so Δp ≥ 5.3 × 10⁻²⁴ kg m s⁻¹ and Δv ≥ Δp/m ≈ 5.8 × 10⁶ m s⁻¹.",
);

// —— quantum-mechanical: 8 (5 easy, 2 medium, 1 hard) ——
q(
  "quantum-mechanical",
  "easy",
  "An orbit in Bohr theory is a definite path, whereas an orbital is",
  [
    "also a sharp circular track",
    "a region of space with high probability of finding the electron",
    "a nucleus",
    "a photon orbit",
  ],
  1,
  "Orbitals come from the wave-mechanical probability distribution, not a fixed trajectory.",
);
q(
  "quantum-mechanical",
  "easy",
  "The quantity |ψ|² at a point gives",
  [
    "the charge of the electron",
    "the probability density of the electron",
    "the mass of the nucleus",
    "the spin only",
  ],
  1,
  "|ψ|² dV is the chance of finding the electron in that volume element.",
);
q(
  "quantum-mechanical",
  "easy",
  "An atomic orbital may be described as",
  [
    "a circular wire around the nucleus",
    "the wave-mechanical region where the electron is likely to be",
    "the path of a proton",
    "a spectral line",
  ],
  1,
  "Each solution of the wave equation (with quantum numbers n, l, mₗ) is an orbital.",
);
q(
  "quantum-mechanical",
  "easy",
  "Schrödinger's wave equation is the starting point of the",
  [
    "Bohr circular-orbit model",
    "quantum mechanical model of the atom",
    "plum-pudding model",
    "canal-ray experiment",
  ],
  1,
  "The quantum mechanical model treats the electron as a wave whose allowed states solve Schrödinger's equation.",
);
q(
  "quantum-mechanical",
  "easy",
  "The quantum mechanical picture was needed because",
  [
    "Bohr orbits could not be reconciled with the wave nature of the electron",
    "hydrogen has no spectrum",
    "electrons have no charge",
    "nuclei do not exist",
  ],
  0,
  "de Broglie waves and uncertainty rule out a thin classical track around the nucleus.",
);
q(
  "quantum-mechanical",
  "medium",
  "Unlike a Bohr orbit, a 2p orbital",
  [
    "has a sharply fixed radius and no angular dependence",
    "has a probability distribution with a nodal plane",
    "is occupied by protons",
    "cannot hold electrons",
  ],
  1,
  "p orbitals have an angular node (a plane of zero probability) through the nucleus.",
);
q(
  "quantum-mechanical",
  "medium",
  "The wave function ψ itself is",
  [
    "equal to the energy in eV",
    "not directly observable, though |ψ|² is physically meaningful",
    "the atomic number",
    "always zero",
  ],
  1,
  "ψ may be complex; only |ψ|² is the observable probability density.",
);
q(
  "quantum-mechanical",
  "hard",
  "A node in an orbital is a surface where",
  [
    "|ψ|² is maximum",
    "the probability of finding the electron is zero",
    "the nucleus sits only if Z > 1",
    "spin is forced to be +1/2",
  ],
  1,
  "ψ = 0 on a node, so the electron is never found there.",
);

// —— quantum-numbers: 24 (14 easy, 7 medium, 3 hard) ——
q(
  "quantum-numbers",
  "easy",
  "The principal quantum number n primarily indicates",
  ["orbital shape", "size and energy of the shell", "spin direction", "orientation only"],
  1,
  "n labels the shell and largely sets the energy and radial size.",
);
q(
  "quantum-numbers",
  "easy",
  "For a given n, the azimuthal quantum number l may be",
  ["1, 2, 3, … n", "0, 1, 2, … (n − 1)", "−n to +n", "±1/2"],
  1,
  "l runs from 0 up to n − 1.",
);
q(
  "quantum-numbers",
  "easy",
  "The magnetic quantum number mₗ runs over",
  ["0 to n", "−l through 0 to +l", "1 to 2l", "±1/2 only"],
  1,
  "There are 2l + 1 values of mₗ for a given l.",
);
q(
  "quantum-numbers",
  "easy",
  "The spin quantum number of an electron is",
  ["0 or 1", "+1/2 or −1/2", "1, 2 or 3", "n − 1"],
  1,
  "An electron is a spin-1/2 particle, so mₛ = ±1/2.",
);
q(
  "quantum-numbers",
  "easy",
  "When n = 1, the only allowed subshell is",
  ["1s", "1p", "1d", "2s"],
  0,
  "For n = 1, l can only be 0, which is the 1s orbital.",
);
q(
  "quantum-numbers",
  "easy",
  "The subshell with l = 2 is labelled",
  ["s", "p", "d", "f"],
  2,
  "s, p, d, f correspond to l = 0, 1, 2, 3.",
);
q(
  "quantum-numbers",
  "easy",
  "The number of orbitals in a shell of quantum number n is",
  ["n", "2n", "n²", "2n²"],
  2,
  "Each shell has n² orbitals (and therefore 2n² electrons at most).",
);
q(
  "quantum-numbers",
  "easy",
  "Maximum electrons in a subshell of quantum number l equal",
  ["2l + 1", "4l + 2", "2n²", "n²"],
  1,
  "A subshell has 2l + 1 orbitals and two electrons per orbital, so 4l + 2.",
);
q(
  "quantum-numbers",
  "easy",
  "The magnetic quantum number mₗ decides",
  ["the spin of the electron", "the orientation of the orbital in space", "the nuclear charge", "the mass number"],
  1,
  "Different mₗ values are the different spatial orientations of a given subshell.",
);
q(
  "quantum-numbers",
  "easy",
  "For the L shell (n = 2), allowed l values are",
  ["0 only", "0 and 1", "0, 1 and 2", "1 and 2"],
  1,
  "l = 0 (2s) and l = 1 (2p).",
);
q(
  "quantum-numbers",
  "easy",
  "A d subshell (l = 2) contains how many orbitals?",
  ["3", "5", "7", "9"],
  1,
  "2l + 1 = 5 orbitals in a d subshell.",
);
q(
  "quantum-numbers",
  "easy",
  "A 4s electron has n and l equal to",
  ["4 and 0", "4 and 1", "3 and 0", "4 and 2"],
  0,
  "s means l = 0; the leading number is n = 4.",
);
q(
  "quantum-numbers",
  "easy",
  "For a 3d electron the pair (n, l) is",
  ["(3, 1)", "(3, 2)", "(3, 3)", "(4, 2)"],
  1,
  "3d means n = 3 and l = 2.",
);
q(
  "quantum-numbers",
  "easy",
  "The letter f stands for l equal to",
  ["1", "2", "3", "4"],
  2,
  "f subshells have l = 3 and seven orbitals.",
);
q(
  "quantum-numbers",
  "medium",
  "Possible mₗ values for a 2p electron are",
  ["−1, 0, +1", "−2, −1, 0, +1, +2", "0, 1, 2", "only 0"],
  0,
  "For l = 1, mₗ = −1, 0, +1 (the three p orbitals).",
);
q(
  "quantum-numbers",
  "medium",
  "Which set (n, l, mₗ, mₛ) is not allowed?",
  ["(2, 1, −1, +1/2)", "(3, 2, +2, −1/2)", "(2, 0, 0, +1/2)", "(3, 3, 0, +1/2)"],
  3,
  "l cannot equal n; the maximum l is n − 1, so (3, 3, …) is forbidden.",
);
q(
  "quantum-numbers",
  "medium",
  "How many electrons can have n = 3 and l = 1?",
  ["2", "6", "10", "18"],
  1,
  "That is the 3p subshell, which holds 4l + 2 = 6 electrons.",
);
q(
  "quantum-numbers",
  "medium",
  "The 4d subshell consists of",
  ["3 orbitals", "5 orbitals", "7 orbitals", "10 orbitals"],
  1,
  "Any d subshell (l = 2) has five orbitals.",
);
q(
  "quantum-numbers",
  "medium",
  "A valid quantum-number set for a 4d electron is",
  ["n = 4, l = 0, mₗ = 0", "n = 4, l = 2, mₗ = +1", "n = 4, l = 1, mₗ = 0", "n = 3, l = 2, mₗ = +3"],
  1,
  "4d requires n = 4 and l = 2, with mₗ between −2 and +2.",
);
q(
  "quantum-numbers",
  "medium",
  "How many orbitals belong to the N shell (n = 4)?",
  ["4", "8", "16", "32"],
  2,
  "Number of orbitals = n² = 16 (electron capacity would be 32).",
);
q(
  "quantum-numbers",
  "medium",
  "Electrons with n = 3, l = 2 and mₛ = +1/2 cannot exceed",
  ["2", "3", "5", "10"],
  2,
  "The 3d subshell has five orbitals; each can take one electron of a given spin.",
);
q(
  "quantum-numbers",
  "hard",
  "In the n = 4 shell, the number of electrons that can have mₛ = +1/2 is",
  ["8", "16", "32", "4"],
  1,
  "There are n² = 16 orbitals, and each may hold one electron of spin +1/2.",
);
q(
  "quantum-numbers",
  "hard",
  "The set n = 2, l = 1, mₗ = +2, mₛ = +1/2 is illegal because",
  ["n cannot be 2", "l cannot be 1 when n = 2", "mₗ exceeds l", "mₛ cannot be +1/2"],
  2,
  "For l = 1 the only mₗ values are −1, 0, +1.",
);
q(
  "quantum-numbers",
  "hard",
  "How many electrons in an atom may have n = 4, l = 2 and mₗ = 0?",
  ["1", "2", "6", "10"],
  1,
  "Those labels pick out one 4d orbital, which holds two electrons of opposite spin.",
);

// —— orbital-shapes-nodes: 14 (8 easy, 4 medium, 2 hard) ——
q(
  "orbital-shapes-nodes",
  "easy",
  "The shape of an s orbital is",
  ["dumb-bell", "spherical", "double dumb-bell", "planar"],
  1,
  "s orbitals are spherically symmetric about the nucleus.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "A p orbital is typically described as",
  ["spherical", "dumb-bell shaped", "tetrahedral", "a linear nucleus"],
  1,
  "Each p orbital has two lobes on opposite sides of the nucleus.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "Most d orbitals have the appearance of",
  ["a sphere", "a four-lobed (double dumb-bell) figure", "a straight line", "a cube"],
  1,
  "Four of the five d orbitals are four-lobed; d_z² is a doughnut-plus-lobes shape.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "The pₓ orbital has its lobes along",
  ["the y-axis", "the x-axis", "the z-axis", "no axis"],
  1,
  "The subscript names the axis along which the p orbital points.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "The p subshell contains",
  ["one orbital", "three orbitals", "five orbitals", "seven orbitals"],
  1,
  "pₓ, pᵧ and p_z make three orbitals.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "How many orbitals are present in any d subshell?",
  ["3", "5", "7", "9"],
  1,
  "l = 2 gives 2l + 1 = 5 d orbitals.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "A nodal surface is where the electron probability is",
  ["maximum", "zero", "equal to 1", "equal to 1/2"],
  1,
  "On a node ψ = 0, so |ψ|² = 0.",
);
q(
  "orbital-shapes-nodes",
  "easy",
  "Relative to 1s, the 2s orbital has",
  ["no spherical node", "one spherical node", "two spherical nodes", "three nodal planes"],
  1,
  "Radial nodes = n − l − 1 = 2 − 0 − 1 = 1 for 2s.",
);
q(
  "orbital-shapes-nodes",
  "medium",
  "The number of radial nodes in an orbital is",
  ["n − l − 1", "n − 1", "l", "n + l"],
  0,
  "Radial (spherical) nodes equal n − l − 1.",
);
q(
  "orbital-shapes-nodes",
  "medium",
  "Angular nodes in an orbital equal",
  ["n − l − 1", "l", "n − 1", "2l"],
  1,
  "The number of angular nodes is the azimuthal quantum number l.",
);
q(
  "orbital-shapes-nodes",
  "medium",
  "Total nodes of an orbital (radial + angular) equal",
  ["n", "n − 1", "l − 1", "2n"],
  1,
  "(n − l − 1) + l = n − 1.",
);
q(
  "orbital-shapes-nodes",
  "medium",
  "A 3p orbital has radial and angular nodes equal to",
  ["0 and 1", "1 and 1", "2 and 1", "1 and 0"],
  1,
  "Radial = 3 − 1 − 1 = 1; angular = l = 1.",
);
q(
  "orbital-shapes-nodes",
  "hard",
  "For a 4d orbital the radial-node count is",
  ["0", "1", "2", "3"],
  1,
  "n − l − 1 = 4 − 2 − 1 = 1.",
);
q(
  "orbital-shapes-nodes",
  "hard",
  "In a 3d orbital you find",
  [
    "two radial nodes and no angular node",
    "no radial node and two angular nodes",
    "one radial and one angular node",
    "three radial nodes",
  ],
  1,
  "Radial = 3 − 2 − 1 = 0; angular = 2.",
);

// —— aufbau-pauli-hund: 18 (11 easy, 5 medium, 2 hard) ——
q(
  "aufbau-pauli-hund",
  "easy",
  "The Aufbau principle says electrons occupy",
  [
    "higher energy orbitals first",
    "the lowest available energy orbitals first",
    "only d orbitals",
    "only vacant nuclei",
  ],
  1,
  "Orbitals are filled in order of increasing energy.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "Pauli's exclusion rule forbids two electrons in an atom from having",
  ["the same n", "all four quantum numbers identical", "opposite spins", "different mₗ"],
  1,
  "Each electron in an atom must have a unique (n, l, mₗ, mₛ) set.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "When degenerate orbitals are available, Hund's rule prefers",
  [
    "pairing in one orbital first",
    "maximum unpaired electrons with parallel spins",
    "emptying all orbitals",
    "opposite spins in different subshells only",
  ],
  1,
  "Electrons occupy separate equal-energy orbitals singly and with parallel spins before pairing.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "(n + l) rule is used to decide",
  ["nuclear charge", "the order of filling of orbitals", "the mass number", "the work function"],
  1,
  "The subshell with smaller n + l fills first; if tied, smaller n fills first.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "In a neutral atom 4s is filled before 3d because",
  [
    "4s has higher n + l",
    "4s has lower energy (smaller n + l) than 3d",
    "3d cannot hold electrons",
    "4s is a d orbital",
  ],
  1,
  "4s has n + l = 4 while 3d has n + l = 5, so 4s lies lower for the isolated atom.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "Between 3p and 4s, the orbital occupied earlier is",
  ["4s", "3p", "3d", "4p"],
  1,
  "Both have n + l = 4, but 3p has smaller n, so it fills first.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "A single orbital can hold at most",
  ["1 electron", "2 electrons of opposite spin", "2 electrons of same spin", "4 electrons"],
  1,
  "Pauli allows two electrons per orbital only if their spins are opposite.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "Hund's rule applies to orbitals that are",
  ["of widely different energy", "degenerate (same energy)", "in different atoms", "inside the nucleus"],
  1,
  "It governs filling of a set of equal-energy orbitals such as the three 2p orbitals.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "Nitrogen's 2p³ configuration, by Hund, has unpaired electrons numbering",
  ["1", "2", "3", "0"],
  2,
  "Each of the three 2p orbitals gets one electron, all with parallel spins.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "The filling sequence 1s, 2s, 2p, 3s, 3p continues with",
  ["3d", "4s", "4p", "4d"],
  1,
  "After 3p comes 4s, then 3d.",
);
q(
  "aufbau-pauli-hund",
  "easy",
  "Extra stability of half-filled subshells is often invoked to explain",
  [
    "why neon is a gas",
    "exceptions such as chromium's configuration",
    "why hydrogen has one electron",
    "the charge of the proton",
  ],
  1,
  "Cr is 4s¹ 3d⁵ so that 3d is exactly half filled.",
);
q(
  "aufbau-pauli-hund",
  "medium",
  "After 4s, the next subshell to fill in Aufbau order is",
  ["4p", "3d", "5s", "4d"],
  1,
  "The order is 4s, 3d, 4p.",
);
q(
  "aufbau-pauli-hund",
  "medium",
  "For 5s and 4d the (n + l) values are respectively",
  ["5 and 6", "6 and 5", "5 and 5", "4 and 6"],
  0,
  "5s: 5 + 0 = 5; 4d: 4 + 2 = 6, so 5s fills first.",
);
q(
  "aufbau-pauli-hund",
  "medium",
  "Ground-state carbon (2p²) has how many unpaired electrons according to Hund?",
  ["0", "1", "2", "4"],
  2,
  "The two 2p electrons occupy different orbitals with parallel spins.",
);
q(
  "aufbau-pauli-hund",
  "medium",
  "Oxygen (2p⁴) has unpaired electrons equal to",
  ["0", "1", "2", "4"],
  2,
  "Two 2p electrons pair in one orbital and the other two stay unpaired: ↑↓ ↑ ↑.",
);
q(
  "aufbau-pauli-hund",
  "medium",
  "For carbon 2p², the Hund-violating arrangement is",
  [
    "two electrons in different 2p orbitals with parallel spins",
    "both electrons paired in one 2p orbital with the others empty",
    "two electrons in different orbitals",
    "an empty 2s orbital",
  ],
  1,
  "Pairing in one orbital while degenerate partners are vacant violates Hund's rule.",
);
q(
  "aufbau-pauli-hund",
  "hard",
  "The correct Hund filling of 2p⁴ is",
  ["↑↓ ↑↓  (two orbitals only)", "↑↓ ↑ ↑", "↑ ↑ ↑ ↑", "↑↓ ↑↓ ↑↓"],
  1,
  "Four 2p electrons: one orbital paired and two orbitals singly occupied.",
);
q(
  "aufbau-pauli-hund",
  "hard",
  "4p and 3d have n + l equal to 5; the one filled first is",
  ["4p because n is larger", "3d because n is smaller", "they fill together equally", "4d"],
  1,
  "On an (n + l) tie the subshell with smaller n is filled first, so 3d before 4p.",
);

// —— configuration-exceptions: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "configuration-exceptions",
  "easy",
  "Ground-state hydrogen is",
  ["1s¹", "1s²", "2s¹", "1p¹"],
  0,
  "Hydrogen has a single electron in 1s.",
);
q(
  "configuration-exceptions",
  "easy",
  "Helium's ground configuration is",
  ["1s¹", "1s²", "1s² 2s¹", "2s²"],
  1,
  "Both electrons occupy 1s with opposite spins.",
);
q(
  "configuration-exceptions",
  "easy",
  "Carbon (Z = 6) has the ground configuration",
  ["1s² 2s² 2p¹", "1s² 2s² 2p²", "1s² 2s¹ 2p³", "1s² 2p⁴"],
  1,
  "After 1s² 2s² the remaining two electrons enter 2p.",
);
q(
  "configuration-exceptions",
  "easy",
  "The ground configuration of nitrogen (Z = 7) is",
  ["1s² 2s² 2p³", "1s² 2s² 2p⁴", "1s² 2s¹ 2p⁴", "1s² 2p⁵"],
  0,
  "Seven electrons: 1s² 2s² 2p³ (half-filled 2p).",
);
q(
  "configuration-exceptions",
  "easy",
  "Oxygen (Z = 8) is represented in the ground state by",
  ["1s² 2s² 2p³", "1s² 2s² 2p⁴", "1s² 2s² 2p⁵", "1s² 2p⁶"],
  1,
  "Eight electrons give 1s² 2s² 2p⁴.",
);
q(
  "configuration-exceptions",
  "easy",
  "Neon (Z = 10) has the closed-shell configuration",
  ["1s² 2s² 2p⁴", "1s² 2s² 2p⁶", "1s² 2s² 2p⁶ 3s¹", "2p⁸"],
  1,
  "Neon completes the n = 2 shell: 1s² 2s² 2p⁶.",
);
q(
  "configuration-exceptions",
  "easy",
  "Sodium (Z = 11) is written as",
  ["[Ne] 3s¹", "[Ne] 3s²", "[He] 2s¹", "[Ar] 4s¹"],
  0,
  "The extra electron beyond neon occupies 3s.",
);
q(
  "configuration-exceptions",
  "easy",
  "Chlorine (Z = 17) has the valence configuration",
  ["3s² 3p³", "3s² 3p⁵", "3s² 3p⁶", "3s¹ 3p⁶"],
  1,
  "Cl is [Ne] 3s² 3p⁵, one electron short of argon.",
);
q(
  "configuration-exceptions",
  "easy",
  "Potassium (Z = 19) places its last electron in",
  ["3d", "4s", "4p", "3p"],
  1,
  "After argon, 4s fills before 3d, so K is [Ar] 4s¹.",
);
q(
  "configuration-exceptions",
  "easy",
  "Calcium (Z = 20) has the condensed ground configuration",
  ["[Ar] 4s¹", "[Ar] 4s²", "[Ar] 3d²", "[Ar] 4s² 3d¹"],
  1,
  "Both extra electrons occupy 4s: [Ar] 4s².",
);
q(
  "configuration-exceptions",
  "easy",
  "Chromium (Z = 24) is an exception with configuration",
  ["[Ar] 4s² 3d⁴", "[Ar] 4s¹ 3d⁵", "[Ar] 4s² 3d⁵", "[Ar] 3d⁶"],
  1,
  "Cr is 4s¹ 3d⁵, giving a half-filled d set.",
);
q(
  "configuration-exceptions",
  "easy",
  "Copper (Z = 29) is correctly written as",
  ["[Ar] 4s² 3d⁹", "[Ar] 4s¹ 3d¹⁰", "[Ar] 4s² 3d¹⁰", "[Ar] 3d⁹"],
  1,
  "Cu is 4s¹ 3d¹⁰, a fully filled d subshell.",
);
q(
  "configuration-exceptions",
  "medium",
  "Iron (Z = 26) has the ground configuration",
  ["[Ar] 4s² 3d⁶", "[Ar] 4s¹ 3d⁷", "[Ar] 4s² 3d⁵", "[Ar] 3d⁸"],
  0,
  "Fe follows Aufbau as 4s² 3d⁶.",
);
q(
  "configuration-exceptions",
  "medium",
  "Manganese (Z = 25) is",
  ["[Ar] 4s² 3d⁴", "[Ar] 4s² 3d⁵", "[Ar] 4s¹ 3d⁶", "[Ar] 3d⁷"],
  1,
  "Mn is 4s² 3d⁵.",
);
q(
  "configuration-exceptions",
  "medium",
  "The ground configuration of zinc (Z = 30) is",
  ["[Ar] 4s¹ 3d¹⁰", "[Ar] 4s² 3d¹⁰", "[Ar] 4s² 3d⁸", "[Ar] 3d¹⁰ 4p²"],
  1,
  "Zn completes 3d and 4s: [Ar] 4s² 3d¹⁰.",
);
q(
  "configuration-exceptions",
  "medium",
  "Fe²⁺ is formed from Fe by loss of two 4s electrons, leaving",
  ["3d⁶", "3d⁴", "3d⁶ 4s²", "3d⁵ 4s¹"],
  0,
  "Transition-metal cations lose ns electrons first; Fe²⁺ is 3d⁶.",
);
q(
  "configuration-exceptions",
  "medium",
  "The cuprous ion Cu⁺ has the configuration",
  ["3d⁹", "3d¹⁰", "3d⁸ 4s²", "3d⁹ 4s¹"],
  1,
  "Cu is 4s¹ 3d¹⁰; losing the 4s electron leaves 3d¹⁰.",
);
q(
  "configuration-exceptions",
  "medium",
  "Cr³⁺ has how many 3d electrons?",
  ["1", "3", "5", "6"],
  1,
  "Cr is 4s¹ 3d⁵; Cr³⁺ loses 4s¹ and two 3d electrons, leaving 3d³.",
);
q(
  "configuration-exceptions",
  "hard",
  "Chromium prefers 4s¹ 3d⁵ rather than 4s² 3d⁴ because",
  [
    "4s cannot hold two electrons",
    "a half-filled 3d⁵ set is extra stable",
    "3d is always filled before 4s in every atom",
    "Z = 24 is a noble gas",
  ],
  1,
  "Exchange energy / half-filled subshell stability favours 3d⁵ 4s¹.",
);
q(
  "configuration-exceptions",
  "hard",
  "Copper(II) ion Cu²⁺ has the d-electron count",
  ["d⁸", "d⁹", "d¹⁰", "d⁷"],
  1,
  "From 4s¹ 3d¹⁰, Cu²⁺ loses the 4s electron and one 3d electron, leaving 3d⁹.",
);

// —— unpaired-magnetic: 10 (6 easy, 3 medium, 1 hard) ——
q(
  "unpaired-magnetic",
  "easy",
  "A species is paramagnetic when it has",
  ["all electrons paired", "one or more unpaired electrons", "no electrons", "only protons"],
  1,
  "Unpaired spins give a net magnetic moment and paramagnetism.",
);
q(
  "unpaired-magnetic",
  "easy",
  "A diamagnetic atom or ion has",
  ["unpaired electrons", "all electrons paired", "an odd atomic number always", "a half-filled d shell"],
  1,
  "Paired electrons cancel magnetic moments, producing diamagnetism.",
);
q(
  "unpaired-magnetic",
  "easy",
  "Ground-state nitrogen atom is paramagnetic with unpaired electrons numbering",
  ["1", "2", "3", "5"],
  2,
  "2p³ with Hund filling leaves three unpaired electrons.",
);
q(
  "unpaired-magnetic",
  "easy",
  "Neon is diamagnetic because",
  [
    "it has three unpaired electrons",
    "its 2p subshell is completely filled and paired",
    "it has 10 neutrons",
    "it is a gas",
  ],
  1,
  "1s² 2s² 2p⁶ has no unpaired electron.",
);
q(
  "unpaired-magnetic",
  "easy",
  "The oxygen atom (2p⁴) is paramagnetic with",
  ["0 unpaired electrons", "1 unpaired electron", "2 unpaired electrons", "4 unpaired electrons"],
  2,
  "2p⁴ is ↑↓ ↑ ↑, so two electrons remain unpaired.",
);
q(
  "unpaired-magnetic",
  "easy",
  "The Zn²⁺ ion with a 3d¹⁰ set is",
  ["strongly paramagnetic", "diamagnetic", "has five unpaired electrons", "a 3d⁹ ion"],
  1,
  "A filled 3d¹⁰ set is fully paired, so Zn²⁺ is diamagnetic.",
);
q(
  "unpaired-magnetic",
  "medium",
  "Mn²⁺ (d⁵) has unpaired electrons equal to",
  ["1", "3", "5", "7"],
  2,
  "High-spin d⁵ places one electron in each of the five 3d orbitals.",
);
q(
  "unpaired-magnetic",
  "medium",
  "Cu⁺ is diamagnetic because its configuration is",
  ["3d⁹", "3d¹⁰", "3d⁸ 4s¹", "4s¹ 3d⁹"],
  1,
  "3d¹⁰ has all electrons paired.",
);
q(
  "unpaired-magnetic",
  "medium",
  "Co²⁺ (3d⁷) has unpaired electrons",
  ["1", "3", "5", "7"],
  1,
  "d⁷ high-spin is ↑↓ ↑↓ ↑ ↑ ↑, leaving three unpaired electrons.",
);
q(
  "unpaired-magnetic",
  "hard",
  "Ni²⁺ (3d⁸) is paramagnetic. Its spin-only magnetic moment √n(n+2) BM with n unpaired is",
  ["1.73", "2.83", "3.87", "4.90"],
  1,
  "3d⁸ has two unpaired electrons, so μ = √(2 × 4) = √8 = 2.83 BM.",
);

const expected = {
  "particles-models": { total: 16, easy: 10, medium: 5, hard: 1 },
  "planck-photoelectric": { total: 12, easy: 7, medium: 4, hard: 1 },
  "hydrogen-spectrum": { total: 20, easy: 12, medium: 6, hard: 2 },
  "bohr-model": { total: 28, easy: 17, medium: 8, hard: 3 },
  "debroglie-heisenberg": { total: 16, easy: 10, medium: 5, hard: 1 },
  "quantum-mechanical": { total: 8, easy: 5, medium: 2, hard: 1 },
  "quantum-numbers": { total: 24, easy: 14, medium: 7, hard: 3 },
  "orbital-shapes-nodes": { total: 14, easy: 8, medium: 4, hard: 2 },
  "aufbau-pauli-hund": { total: 18, easy: 11, medium: 5, hard: 2 },
  "configuration-exceptions": { total: 20, easy: 12, medium: 6, hard: 2 },
  "unpaired-magnetic": { total: 10, easy: 6, medium: 3, hard: 1 },
};

const problems = [];
if (questions.length !== 186) problems.push(`count ${questions.length} !== 186`);
if (questions[0]?.id !== "che-as-101") problems.push(`first id ${questions[0]?.id}`);
if (questions.at(-1)?.id !== "che-as-286") problems.push(`last id ${questions.at(-1)?.id}`);

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
