/**
 * Writes content/seed/chemistry__electrochemistry-kinetics.json
 * TSBIE Intermediate 2nd year — Electrochemistry and Chemical Kinetics
 * (original practice MCQs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { item, pack } from "../lib/author-chem.mjs";
import { stemsClash } from "../lib/stems.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const outFile = path.join(root, "content", "seed", "chemistry__electrochemistry-kinetics.json");
const stemsFile = path.join(root, "scripts", ".bank-stems.json");

const chapterId = "chemistry-electrochemistry-and-chemical-kinetics";
const prefix = "che-ek";
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

// —— conductance: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "conductance",
  "easy",
  "Electrical conductance of a solution is defined as the",
  [
    "reciprocal of its resistance",
    "product of resistance and cell constant",
    "same quantity as resistivity",
    "reciprocal of molar conductivity",
  ],
  0,
  "Conductance $G = 1/R$. A smaller resistance means the solution conducts more readily.",
);
q(
  "conductance",
  "easy",
  "The SI unit used for electrical conductance is the",
  ["siemens (S)", "ohm ($\\Omega$)", "farad (F)", "tesla (T)"],
  0,
  "Siemens is the reciprocal ohm. Older texts also write mho for the same unit.",
);
q(
  "conductance",
  "easy",
  "Specific conductivity $\\kappa$ of an electrolyte solution is the conductance of",
  [
    "a unit cube of the solution between opposite faces",
    "one mole of solute placed between inert plates",
    "the salt bridge alone",
    "a metallic wire of the same length",
  ],
  0,
  "$\\kappa$ is intensive: it is $G$ measured for unit length and unit cross-section of solution.",
);
q(
  "conductance",
  "easy",
  "The cell constant of a conductivity cell equals",
  [
    "distance between electrodes divided by electrode area",
    "electrode area divided by distance between electrodes",
    "resistance multiplied by current",
    "molar conductivity divided by $\\kappa$",
  ],
  0,
  "Cell constant $= \\ell/A$. It converts the measured conductance into specific conductivity.",
);
q(
  "conductance",
  "easy",
  "Specific conductivity is obtained from the measured conductance $G$ by writing",
  ["$\\kappa = G \\times (\\ell/A)$", "$\\kappa = G \\times A/\\ell$", "$\\kappa = G^2 \\times \\ell/A$", "$\\kappa = (\\ell/A)/G$"],
  0,
  "Because $G = \\kappa A/\\ell$, rearranging gives $\\kappa = G \\times$ cell constant.",
);
q(
  "conductance",
  "easy",
  "Molar conductivity $\\Lambda_m$ is related to specific conductivity and molar concentration $c$ by",
  ["$\\Lambda_m = \\kappa/c$", "$\\Lambda_m = \\kappa \\times c$", "$\\Lambda_m = c/\\kappa$", "$\\Lambda_m = \\kappa + c$"],
  0,
  "In SI, $\\Lambda_m = \\kappa/c$. In older cgs usage one writes $\\Lambda_m = 1000\\,\\kappa/M$ with $M$ in mol L$^{-1}$.",
);
q(
  "conductance",
  "easy",
  "As an aqueous electrolyte is made more dilute, its specific conductivity $\\kappa$ generally",
  [
    "falls because fewer ions occupy each cubic centimetre",
    "rises because every ion becomes heavier",
    "stays fixed at the value of pure water",
    "becomes equal to $\\Lambda_m^\\circ$",
  ],
  0,
  "Dilution lowers the number of charge carriers per unit volume, so $\\kappa$ decreases even though ions may move more freely.",
);
q(
  "conductance",
  "easy",
  "The usual laboratory unit of cell constant is",
  ["cm$^{-1}$", "S cm$^2$ mol$^{-1}$", "ohm", "mol L$^{-1}$"],
  0,
  "$\\ell/A$ has dimensions of inverse length, so cm$^{-1}$ or m$^{-1}$.",
);
q(
  "conductance",
  "easy",
  "For a strong electrolyte such as KCl, further dilution produces",
  [
    "only a modest further rise in $\\Lambda_m$",
    "a sudden drop of $\\Lambda_m$ to zero",
    "no change at all in $\\Lambda_m$",
    "a collapse of $\\kappa$ to a negative value",
  ],
  0,
  "Strong electrolytes are already fully ionised; $\\Lambda_m$ creeps up mainly because interionic drag weakens.",
);
q(
  "conductance",
  "easy",
  "Metallic conduction differs from electrolytic conduction in that metals carry current by",
  [
    "mobile electrons, without chemical change of the conductor",
    "migration of cations and anions that are discharged at electrodes",
    "protons hopping through a salt bridge only",
    "neutral solvent molecules drifting in the field",
  ],
  0,
  "A metal conducts via its electron gas. An electrolyte conducts by ion movement and is chemically changed at the electrodes.",
);
q(
  "conductance",
  "medium",
  "A conductivity cell of constant $1.5\\ \\mathrm{cm^{-1}}$ reads $G = 0.020\\ \\mathrm{S}$ for a solution. The specific conductivity is",
  ["$0.030\\ \\mathrm{S\\ cm^{-1}}$", "$0.013\\ \\mathrm{S\\ cm^{-1}}$", "$0.075\\ \\mathrm{S\\ cm^{-1}}$", "$1.5\\ \\mathrm{S\\ cm^{-1}}$"],
  0,
  "$\\kappa = G \\times (\\ell/A) = 0.020 \\times 1.5 = 0.030\\ \\mathrm{S\\ cm^{-1}}$.",
);
q(
  "conductance",
  "medium",
  "If $\\kappa = 0.0050\\ \\mathrm{S\\ cm^{-1}}$ for a $0.020\\ \\mathrm{M}$ solution, $\\Lambda_m$ in S cm$^2$ mol$^{-1}$ equals",
  ["250", "0.25", "4.0", "100"],
  0,
  "$\\Lambda_m = 1000\\,\\kappa/c = 1000 \\times 0.0050 / 0.020 = 250\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$.",
);
q(
  "conductance",
  "medium",
  "A 0.10 M KCl standard with $\\kappa = 0.0129\\ \\mathrm{S\\ cm^{-1}}$ shows $R = 86\\ \\Omega$ in a cell. The cell constant is nearest",
  ["$1.11\\ \\mathrm{cm^{-1}}$", "$0.15\\ \\mathrm{cm^{-1}}$", "$86\\ \\mathrm{cm^{-1}}$", "$0.0129\\ \\mathrm{cm^{-1}}$"],
  0,
  "$G = 1/86\\ \\mathrm{S}$, so $\\ell/A = \\kappa/G = 0.0129 \\times 86 \\approx 1.11\\ \\mathrm{cm^{-1}}$.",
);
q(
  "conductance",
  "medium",
  "Comparing $\\kappa$ and $\\Lambda_m$ as a strong electrolyte is diluted, the typical pattern is that",
  [
    "$\\kappa$ decreases while $\\Lambda_m$ increases",
    "both $\\kappa$ and $\\Lambda_m$ fall sharply",
    "both $\\kappa$ and $\\Lambda_m$ rise equally",
    "$\\Lambda_m$ falls while $\\kappa$ stays constant",
  ],
  0,
  "Fewer ions per cm$^3$ lower $\\kappa$, but each mole of electrolyte contributes more free ionic mobility, so $\\Lambda_m$ rises.",
);
q(
  "conductance",
  "medium",
  "The slight increase of $\\Lambda_m$ of NaCl on dilution is attributed mainly to",
  [
    "weaker interionic attractions, so ions migrate faster",
    "fresh ionisation of previously undissociated NaCl molecules",
    "a change in the Faraday constant",
    "conversion of NaCl into a weak electrolyte",
  ],
  0,
  "NaCl is already fully dissociated. Dilution reduces ion-atmosphere drag (Debye–Hückel–Onsager), raising molar conductivity a little.",
);
q(
  "conductance",
  "hard",
  "A 0.050 M solution in a cell of constant $1.20\\ \\mathrm{cm^{-1}}$ has $R = 50\\ \\Omega$. $\\Lambda_m$ of the solute is",
  [
    "$480\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$",
    "$24\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$",
    "$0.48\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$",
    "$1200\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$",
  ],
  0,
  "$\\kappa = (1/50)\\times 1.20 = 0.024\\ \\mathrm{S\\ cm^{-1}}$; then $\\Lambda_m = 1000\\times 0.024/0.050 = 480\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$.",
);

// —— kohlrausch: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "kohlrausch",
  "easy",
  "Kohlrausch's law of independent migration states that $\\Lambda_m^\\circ$ of an electrolyte is",
  [
    "the sum of the limiting ionic conductivities of its cation and anion",
    "equal to the product $\\lambda_+^\\circ \\times \\lambda_-^\\circ$",
    "independent of the identities of the two ions",
    "measurable only for metals, not for salts",
  ],
  0,
  "At infinite dilution each ion migrates independently, so $\\Lambda_m^\\circ = \\nu_+\\lambda_+^\\circ + \\nu_-\\lambda_-^\\circ$.",
);
q(
  "kohlrausch",
  "easy",
  "For a 1:1 salt MX the limiting molar conductivity may be written",
  [
    "$\\Lambda_m^\\circ = \\lambda^\\circ(\\mathrm{M}^+) + \\lambda^\\circ(\\mathrm{X}^-)$",
    "$\\Lambda_m^\\circ = \\lambda^\\circ(\\mathrm{M}^+)/\\lambda^\\circ(\\mathrm{X}^-)$",
    "$\\Lambda_m^\\circ = \\lambda^\\circ(\\mathrm{M}^+) - \\lambda^\\circ(\\mathrm{X}^-)$",
    "$\\Lambda_m^\\circ = 2\\lambda^\\circ(\\mathrm{M}^+)$ always",
  ],
  0,
  "One mole of MX yields one mole of each ion, so the ionic contributions simply add.",
);
q(
  "kohlrausch",
  "easy",
  "Limiting molar conductivity of a weak electrolyte such as ethanoic acid is obtained by",
  [
    "combining $\\Lambda_m^\\circ$ values of suitable strong electrolytes, not by plotting $\\Lambda_m$ versus $\\sqrt{c}$",
    "extrapolating a Kohlrausch $\\sqrt{c}$ graph of the weak acid itself",
    "measuring $\\kappa$ of distilled water alone",
    "equating $\\Lambda_m$ at 1 M to $\\Lambda_m^\\circ$",
  ],
  0,
  "A weak acid is far from fully ionised even when dilute, so the $\\sqrt{c}$ plot does not give a reliable intercept.",
);
q(
  "kohlrausch",
  "easy",
  "Degree of dissociation of a weak electrolyte is estimated from conductivities as",
  ["$\\alpha = \\Lambda_m / \\Lambda_m^\\circ$", "$\\alpha = \\Lambda_m^\\circ / \\Lambda_m$", "$\\alpha = \\Lambda_m \\times \\Lambda_m^\\circ$", "$\\alpha = \\kappa / \\Lambda_m$"],
  0,
  "At a given concentration the fraction ionised is the ratio of the observed molar conductivity to the infinite-dilution value.",
);
q(
  "kohlrausch",
  "easy",
  "A practical use of Kohlrausch's law is the evaluation of",
  [
    "$\\Lambda_m^\\circ$ of a poorly conducting weak acid from data on strong salts and acids",
    "the Faraday constant from a copper voltameter",
    "the order of a homogeneous reaction",
    "the standard hydrogen electrode potential",
  ],
  0,
  "Typical combination: $\\Lambda_m^\\circ(\\mathrm{CH_3COOH}) = \\Lambda_m^\\circ(\\mathrm{CH_3COONa}) + \\Lambda_m^\\circ(\\mathrm{HCl}) - \\Lambda_m^\\circ(\\mathrm{NaCl})$.",
);
q(
  "kohlrausch",
  "easy",
  "Limiting molar conductivity $\\Lambda_m^\\circ$ refers to the molar conductivity",
  [
    "extrapolated to infinite dilution, where ions no longer hinder one another",
    "measured in a saturated solution",
    "of the solid crystal before it dissolves",
    "at the boiling point of the solvent only",
  ],
  0,
  "Infinite dilution removes ion–ion interactions, so each ion contributes its characteristic $\\lambda^\\circ$.",
);
q(
  "kohlrausch",
  "easy",
  "Among common aqueous ions, the unusually large $\\lambda^\\circ$ belongs to",
  [
    "$\\mathrm{H}^+$ (and also $\\mathrm{OH}^-$)",
    "$\\mathrm{Li}^+$ only, because it is the lightest metal ion",
    "$\\mathrm{ClO_4}^-$ because it is bulky",
    "every alkali-metal cation equally",
  ],
  0,
  "Grotthuss proton/hydroxide hopping through the hydrogen-bond network gives $\\mathrm{H}^+$ and $\\mathrm{OH}^-$ exceptional mobility.",
);
q(
  "kohlrausch",
  "medium",
  "Given $\\Lambda_m^\\circ/\\mathrm{S\\ cm^2\\ mol^{-1}}$ of CH$_3$COONa = 91, HCl = 426 and NaCl = 126, $\\Lambda_m^\\circ$ of CH$_3$COOH is",
  ["391", "643", "209", "335"],
  0,
  "$\\Lambda_m^\\circ(\\mathrm{HOAc}) = 91 + 426 - 126 = 391\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$ by Kohlrausch combination.",
);
q(
  "kohlrausch",
  "medium",
  "A weak acid has $\\Lambda_m = 16\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$ and $\\Lambda_m^\\circ = 400\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$. Its degree of dissociation is",
  ["0.040", "0.40", "25", "0.0040"],
  0,
  "$\\alpha = \\Lambda_m/\\Lambda_m^\\circ = 16/400 = 0.040$.",
);
q(
  "kohlrausch",
  "medium",
  "Which set of limiting molar conductivities yields $\\Lambda_m^\\circ$ of NH$_4$OH?",
  [
    "$\\Lambda_m^\\circ(\\mathrm{NH_4Cl}) + \\Lambda_m^\\circ(\\mathrm{NaOH}) - \\Lambda_m^\\circ(\\mathrm{NaCl})$",
    "$\\Lambda_m^\\circ(\\mathrm{NH_4Cl}) - \\Lambda_m^\\circ(\\mathrm{NaOH})$",
    "$\\Lambda_m^\\circ(\\mathrm{NaOH})$ alone",
    "$\\Lambda_m^\\circ(\\mathrm{HCl}) + \\Lambda_m^\\circ(\\mathrm{NaOH})$",
  ],
  0,
  "Adding NH$_4$Cl and NaOH supplies NH$_4^+$ and OH$^-$; subtracting NaCl removes the spectator Na$^+$ and Cl$^-$.",
);
q(
  "kohlrausch",
  "medium",
  "For a weak monobasic acid, $K_a$ is related to the conductivity ratio $\\alpha$ and the molarity $c$ by",
  ["$K_a \\approx \\alpha^2 c$", "$K_a = \\alpha / c$", "$K_a = \\alpha^2 / c$", "$K_a = c / \\alpha^2$"],
  0,
  "Ostwald dilution: $K_a = \\alpha^2 c /(1-\\alpha) \\approx \\alpha^2 c$ when $\\alpha \\ll 1$.",
);
q(
  "kohlrausch",
  "hard",
  "Ethanoic acid at $0.010\\ \\mathrm{M}$ has $\\Lambda_m = 16.0$ and $\\Lambda_m^\\circ = 390\\ \\mathrm{S\\ cm^2\\ mol^{-1}}$. $K_a$ is nearest",
  [
    "$1.7 \\times 10^{-5}$",
    "$4.1 \\times 10^{-2}$",
    "$1.6 \\times 10^{-3}$",
    "$3.9 \\times 10^{-1}$",
  ],
  0,
  "$\\alpha = 16/390 \\approx 0.041$; then $K_a \\approx \\alpha^2 c = (0.041)^2 \\times 0.010 \\approx 1.7 \\times 10^{-5}$.",
);

// —— cells-emf: 22 (13 easy, 7 medium, 2 hard) ——
q(
  "cells-emf",
  "easy",
  "A galvanic (voltaic) cell is a device that",
  [
    "converts chemical energy of a spontaneous redox change into electrical energy",
    "uses an external battery to force a non-spontaneous reaction",
    "stores charge on two metal plates like a capacitor",
    "measures conductance of an electrolyte only",
  ],
  0,
  "In a galvanic cell a spontaneous cell reaction drives electrons through an external circuit.",
);
q(
  "cells-emf",
  "easy",
  "Inside a working galvanic cell, the cathode is the electrode at which",
  [
    "reduction of the oxidant takes place",
    "the reductant loses electrons",
    "the salt bridge is oxidised",
    "current is carried by neutrons",
  ],
  0,
  "By definition the cathode is the reduction site. In a galvanic cell it is the positive terminal.",
);
q(
  "cells-emf",
  "easy",
  "The salt bridge in a galvanic cell is provided mainly to",
  [
    "maintain electrical neutrality in the two half-cells",
    "supply the electrons that travel in the wire",
    "raise the standard electrode potentials",
    "keep the two metals from touching the solution",
  ],
  0,
  "Ions from the bridge migrate to cancel charge build-up so the cell can continue to operate.",
);
q(
  "cells-emf",
  "easy",
  "The standard hydrogen electrode is assigned, by convention, an $E^\\circ$ of",
  ["$0.00\\ \\mathrm{V}$", "$+1.00\\ \\mathrm{V}$", "$-0.76\\ \\mathrm{V}$", "$+0.34\\ \\mathrm{V}$"],
  0,
  "SHE ($a_{\\mathrm{H}^+} = 1$, $p_{\\mathrm{H_2}} = 1\\ \\mathrm{bar}$) is the reference zero of the $E^\\circ$ scale.",
);
q(
  "cells-emf",
  "easy",
  "Standard cell EMF is obtained from standard reduction potentials as",
  [
    "$E^\\circ_{\\mathrm{cell}} = E^\\circ_{\\mathrm{cathode}} - E^\\circ_{\\mathrm{anode}}$",
    "$E^\\circ_{\\mathrm{cell}} = E^\\circ_{\\mathrm{anode}} - E^\\circ_{\\mathrm{cathode}}$",
    "$E^\\circ_{\\mathrm{cell}} = E^\\circ_{\\mathrm{cathode}} \\times E^\\circ_{\\mathrm{anode}}$",
    "$E^\\circ_{\\mathrm{cell}} = E^\\circ_{\\mathrm{cathode}} + 2E^\\circ_{\\mathrm{anode}}$",
  ],
  0,
  "Equivalently $E^\\circ_{\\mathrm{cell}} = E^\\circ_{\\mathrm{red}}(\\mathrm{oxidant}) + E^\\circ_{\\mathrm{ox}}(\\mathrm{reductant})$.",
);
q(
  "cells-emf",
  "easy",
  "In standard cell notation the electrode written on the left is the",
  ["anode (oxidation half-cell)", "cathode (reduction half-cell)", "salt bridge", "inert voltmeter terminal"],
  0,
  "The IUPAC line diagram is anode | anodic electrolyte || cathodic electrolyte | cathode.",
);
q(
  "cells-emf",
  "easy",
  "The line diagram of the Daniell cell is customarily written",
  [
    "$\\mathrm{Zn}|\\mathrm{Zn^{2+}}||\\mathrm{Cu^{2+}}|\\mathrm{Cu}$",
    "$\\mathrm{Cu}|\\mathrm{Cu^{2+}}||\\mathrm{Zn^{2+}}|\\mathrm{Zn}$",
    "$\\mathrm{Zn}|\\mathrm{Cu}||\\mathrm{Zn^{2+}}|\\mathrm{Cu^{2+}}$",
    "$\\mathrm{Pt}|\\mathrm{H_2}||\\mathrm{Zn^{2+}}|\\mathrm{Zn}$",
  ],
  0,
  "Zinc is oxidised (left) and Cu$^{2+}$ is reduced on copper (right).",
);
q(
  "cells-emf",
  "easy",
  "A positive value of $E^\\circ_{\\mathrm{cell}}$ means that, under standard conditions, the cell reaction is",
  [
    "spontaneous (product-favoured)",
    "at equilibrium already",
    "impossible in either direction",
    "always endothermic",
  ],
  0,
  "$\\Delta G^\\circ = -nFE^\\circ$; a positive $E^\\circ$ makes $\\Delta G^\\circ$ negative, so the written reaction proceeds spontaneously.",
);
q(
  "cells-emf",
  "easy",
  "In the external metallic circuit of a galvanic cell, electrons travel",
  [
    "from the anode toward the cathode",
    "from the cathode toward the anode",
    "through the salt bridge as free electrons",
    "in both directions at equal speed",
  ],
  0,
  "Oxidation releases electrons at the anode; they flow through the wire to the cathode, where reduction consumes them.",
);
q(
  "cells-emf",
  "easy",
  "Standard electrode potential is an intensive quantity, so doubling the size of a half-cell",
  [
    "leaves $E^\\circ$ unchanged",
    "doubles $E^\\circ$",
    "halves $E^\\circ$",
    "makes $E^\\circ$ equal to $2F$",
  ],
  0,
  "Potential does not scale with the amount of electrode or electrolyte, unlike extensive $\\Delta G$.",
);
q(
  "cells-emf",
  "easy",
  "Among several half-cells, the strongest oxidising agent is the couple with the",
  [
    "most positive standard reduction potential",
    "most negative standard reduction potential",
    "largest number of electrons in the half-reaction",
    "smallest ionic charge",
  ],
  0,
  "A large positive $E^\\circ$ means the oxidised form is readily reduced, i.e. it is a strong oxidant.",
);
q(
  "cells-emf",
  "easy",
  "A gas electrode such as the hydrogen electrode employs platinum chiefly as",
  [
    "an inert surface on which the redox couple can exchange electrons",
    "the species that is oxidised in place of hydrogen",
    "a source of H$^+$ ions",
    "the salt-bridge filling",
  ],
  0,
  "Pt is chemically inert here; it provides a conducting surface for $\\mathrm{H^+} / \\mathrm{H_2}$.",
);
q(
  "cells-emf",
  "easy",
  "The EMF of a cell is the potential difference measured when",
  [
    "no current is drawn (open-circuit condition)",
    "a very large current is forced through the cell",
    "the cell is short-circuited with a copper wire",
    "the salt bridge is removed",
  ],
  0,
  "EMF is the reversible, zero-current voltage. A working current produces an IR drop, so the measured voltage is smaller.",
);
q(
  "cells-emf",
  "medium",
  "If $E^\\circ(\\mathrm{Cu^{2+}/Cu}) = +0.34\\ \\mathrm{V}$ and $E^\\circ(\\mathrm{Zn^{2+}/Zn}) = -0.76\\ \\mathrm{V}$, $E^\\circ$ of the Daniell cell is",
  ["$1.10\\ \\mathrm{V}$", "$0.42\\ \\mathrm{V}$", "$-1.10\\ \\mathrm{V}$", "$0.34\\ \\mathrm{V}$"],
  0,
  "$E^\\circ_{\\mathrm{cell}} = 0.34 - (-0.76) = 1.10\\ \\mathrm{V}$.",
);
q(
  "cells-emf",
  "medium",
  "For the couples $\\mathrm{Ag^+/Ag}$ ($E^\\circ = +0.80\\ \\mathrm{V}$) and $\\mathrm{Zn^{2+}/Zn}$ ($E^\\circ = -0.76\\ \\mathrm{V}$), the anode of the spontaneous cell is",
  ["zinc metal", "silver metal", "the Ag$^+$ solution", "an inert platinum foil only"],
  0,
  "The more negative couple is oxidised: Zn dissolves at the anode while Ag$^+$ is reduced.",
);
q(
  "cells-emf",
  "medium",
  "The strongest reducing agent among Zn, Cu, Ag and H$_2$ (use $E^\\circ$: Zn $-0.76$, H $0.00$, Cu $+0.34$, Ag $+0.80\\ \\mathrm{V}$) is",
  ["zinc", "silver", "copper", "hydrogen gas"],
  0,
  "The most negative reduction potential belongs to Zn$^{2+}$/Zn, so metallic zinc is the strongest reductant of the set.",
);
q(
  "cells-emf",
  "medium",
  "The standard Gibbs energy change of a cell reaction is related to $E^\\circ$ by",
  [
    "$\\Delta G^\\circ = -nFE^\\circ$",
    "$\\Delta G^\\circ = nFE^\\circ$",
    "$\\Delta G^\\circ = -E^\\circ / nF$",
    "$\\Delta G^\\circ = nF / E^\\circ$",
  ],
  0,
  "Electrical work available from a reversible cell is $nFE$; that work equals $-\\Delta G$.",
);
q(
  "cells-emf",
  "medium",
  "The notation $\\mathrm{Pt}|\\mathrm{Fe^{2+},Fe^{3+}}||\\mathrm{Ag^+}|\\mathrm{Ag}$ implies that the cell reaction is",
  [
    "$\\mathrm{Fe^{2+} + Ag^+ \\rightarrow Fe^{3+} + Ag}$",
    "$\\mathrm{Fe^{3+} + Ag \\rightarrow Fe^{2+} + Ag^+}$",
    "$\\mathrm{Fe^{2+} + Ag \\rightarrow Fe^{3+} + Ag^+}$",
    "$\\mathrm{2Fe^{3+} + Ag^+ \\rightarrow 2Fe^{2+} + Ag}$",
  ],
  0,
  "Left-hand side is oxidised (Fe$^{2+} \\to$ Fe$^{3+}$) and right-hand side is reduced (Ag$^+ \\to$ Ag).",
);
q(
  "cells-emf",
  "medium",
  "In an electrolytic cell, as opposed to a galvanic cell, the anode is",
  [
    "the positive electrode, still the site of oxidation",
    "the negative electrode, the site of reduction",
    "always made of zinc",
    "unnecessary if a salt bridge is present",
  ],
  0,
  "Oxidation is always anodic. An external source makes the electrolytic anode positive, whereas a galvanic anode is negative.",
);
q(
  "cells-emf",
  "medium",
  "A large positive $E^\\circ_{\\mathrm{cell}}$ corresponds to",
  [
    "a large equilibrium constant for the cell reaction",
    "a vanishingly small $K$",
    "$K$ exactly equal to 1",
    "no relation at all to $K$",
  ],
  0,
  "$\\Delta G^\\circ = -RT\\ln K = -nFE^\\circ$, so a sizable positive $E^\\circ$ means $K \\gg 1$.",
);
q(
  "cells-emf",
  "hard",
  "For Zn–Cu with $E^\\circ = 1.10\\ \\mathrm{V}$ and $n = 2$, $\\Delta G^\\circ$ is nearest ($F = 96500\\ \\mathrm{C\\ mol^{-1}}$)",
  [
    "$-212\\ \\mathrm{kJ\\ mol^{-1}}$",
    "$-106\\ \\mathrm{kJ\\ mol^{-1}}$",
    "$+212\\ \\mathrm{kJ\\ mol^{-1}}$",
    "$-1.10\\ \\mathrm{kJ\\ mol^{-1}}$",
  ],
  0,
  "$\\Delta G^\\circ = -2 \\times 96500 \\times 1.10 = -212300\\ \\mathrm{J\\ mol^{-1}} \\approx -212\\ \\mathrm{kJ\\ mol^{-1}}$.",
);
q(
  "cells-emf",
  "hard",
  "Couples: $\\mathrm{Ni^{2+}/Ni} = -0.25\\ \\mathrm{V}$, $\\mathrm{Ag^+/Ag} = +0.80\\ \\mathrm{V}$. The spontaneous standard cell and its $E^\\circ$ are",
  [
    "Ni anode, Ag cathode; $1.05\\ \\mathrm{V}$",
    "Ag anode, Ni cathode; $1.05\\ \\mathrm{V}$",
    "Ni anode, Ag cathode; $0.55\\ \\mathrm{V}$",
    "Ag anode, Ni cathode; $0.55\\ \\mathrm{V}$",
  ],
  0,
  "Ni is the better reductant, so it is the anode. $E^\\circ = 0.80 - (-0.25) = 1.05\\ \\mathrm{V}$.",
);

// —— nernst: 18 (11 easy, 5 medium, 2 hard) ——
q(
  "nernst",
  "easy",
  "The Nernst equation for a cell reaction with reaction quotient $Q$ is",
  [
    "$E = E^\\circ - (RT/nF)\\ln Q$",
    "$E = E^\\circ + (RT/nF)\\ln Q$",
    "$E = E^\\circ - nF\\ln Q$",
    "$E = (RT/nF)\\ln Q$ only",
  ],
  0,
  "The correction term subtracts a quantity that grows with $Q$, so the cell voltage falls as products accumulate.",
);
q(
  "nernst",
  "easy",
  "At $298\\ \\mathrm{K}$ the Nernst factor $2.303RT/F$ is close to",
  ["$0.059\\ \\mathrm{V}$", "$0.059\\ \\mathrm{mV}$", "$8.314\\ \\mathrm{V}$", "$96500\\ \\mathrm{V}$"],
  0,
  "Intermediate problems therefore write $E = E^\\circ - (0.059/n)\\log Q$ at 25 °C.",
);
q(
  "nernst",
  "easy",
  "When every species in the cell reaction is in its standard state, $Q = 1$ and therefore",
  ["$E = E^\\circ$", "$E = 0$ always", "$E = 0.059\\ \\mathrm{V}$", "$E = -E^\\circ$"],
  0,
  "The log term vanishes at $Q = 1$, recovering the standard EMF.",
);
q(
  "nernst",
  "easy",
  "A concentration cell that uses the same couple on both sides has",
  [
    "$E^\\circ = 0$, but a non-zero $E$ if the two concentrations differ",
    "$E^\\circ$ equal to twice a single-electrode potential",
    "no possible EMF under any condition",
    "$E$ independent of both concentrations",
  ],
  0,
  "The two standard potentials cancel. The remaining voltage comes only from the concentration (activity) ratio.",
);
q(
  "nernst",
  "easy",
  "As the reaction quotient $Q$ of a galvanic cell increases, the cell EMF generally",
  ["decreases", "increases without limit", "jumps discontinuously to $E^\\circ$", "becomes independent of $n$"],
  0,
  "$E = E^\\circ - (RT/nF)\\ln Q$, so a larger $Q$ reduces $E$. At equilibrium $Q = K$ and $E = 0$.",
);
q(
  "nernst",
  "easy",
  "For the half-cell $\\mathrm{M}^{n+} + n\\,e^- \\rightarrow \\mathrm{M}(s)$, the Nernst expression at 298 K is",
  [
    "$E = E^\\circ + (0.059/n)\\log[\\mathrm{M}^{n+}]$",
    "$E = E^\\circ - (0.059/n)\\log[\\mathrm{M}^{n+}]$",
    "$E = E^\\circ + 0.059\\,n\\,[\\mathrm{M}^{n+}]$",
    "$E = (0.059/n)/[\\mathrm{M}^{n+}]$",
  ],
  0,
  "Solid metal has activity 1, so $Q = 1/[\\mathrm{M}^{n+}]$ and the sign of the log term flips.",
);
q(
  "nernst",
  "easy",
  "The integer $n$ that appears in the Nernst equation is the",
  [
    "number of moles of electrons transferred in the balanced cell reaction",
    "number of ions in the salt bridge",
    "atomic number of the anode metal",
    "order of the electrode reaction",
  ],
  0,
  "$n$ comes from the balanced redox equation (for Daniell, $n = 2$).",
);
q(
  "nernst",
  "easy",
  "When a galvanic cell has run down to equilibrium, the Nernst voltage satisfies",
  ["$E = 0$ and $Q = K$", "$E = E^\\circ$ and $Q = 0$", "$E = \\infty$", "$E = -nF$"],
  0,
  "No further driving force remains ($E = 0$), which forces $Q$ to equal the equilibrium constant $K$.",
);
q(
  "nernst",
  "easy",
  "The potential of a hydrogen electrode at 298 K, $p_{\\mathrm{H_2}} = 1\\ \\mathrm{bar}$, varies with pH as",
  [
    "$E = -0.059\\,\\mathrm{pH}$",
    "$E = +0.059\\,\\mathrm{pH}$",
    "$E = 0.059/\\mathrm{pH}$",
    "$E = 1.23 - 0.059\\,\\mathrm{pH}$",
  ],
  0,
  "$E = 0.059\\log[\\mathrm{H}^+] = -0.059\\,\\mathrm{pH}$ when hydrogen is at unit pressure.",
);
q(
  "nernst",
  "easy",
  "Raising the concentration of a product ion in the cell reaction, other terms fixed, will",
  [
    "lower the cell EMF",
    "raise $E^\\circ$",
    "leave both $E$ and $Q$ unchanged",
    "reverse the definition of the anode",
  ],
  0,
  "Products appear in the numerator of $Q$. A larger $Q$ makes $(RT/nF)\\ln Q$ larger and $E$ smaller.",
);
q(
  "nernst",
  "easy",
  "Absolute temperature enters the Nernst equation because",
  [
    "the $RT/nF$ prefactor, and therefore the size of the $\\log Q$ correction, depends on $T$",
    "Faraday's constant itself is proportional to $T$",
    "$n$ changes with temperature",
    "standard potentials are defined only at 0 K",
  ],
  0,
  "At higher $T$ a given $Q$ shifts $E$ farther from $E^\\circ$. $E^\\circ$ itself may also change with $T$, but that is a separate effect.",
);
q(
  "nernst",
  "medium",
  "A Daniell cell with $E^\\circ = 1.10\\ \\mathrm{V}$ has $[\\mathrm{Zn^{2+}}] = 0.10\\ \\mathrm{M}$ and $[\\mathrm{Cu^{2+}}] = 1.0\\ \\mathrm{M}$. $E$ at 298 K is nearest",
  ["$1.13\\ \\mathrm{V}$", "$1.07\\ \\mathrm{V}$", "$0.10\\ \\mathrm{V}$", "$1.16\\ \\mathrm{V}$"],
  0,
  "$E = 1.10 - (0.059/2)\\log(0.10/1.0) = 1.10 + 0.0295 = 1.13\\ \\mathrm{V}$.",
);
q(
  "nernst",
  "medium",
  "For $\\mathrm{Cu}|\\mathrm{Cu^{2+}}(0.010\\ \\mathrm{M})||\\mathrm{Cu^{2+}}(1.0\\ \\mathrm{M})|\\mathrm{Cu}$ at 298 K the EMF is",
  ["$0.059\\ \\mathrm{V}$", "$0.029\\ \\mathrm{V}$", "$0.118\\ \\mathrm{V}$", "$0.34\\ \\mathrm{V}$"],
  0,
  "$E^\\circ = 0$ and $n = 2$, so $E = (0.059/2)\\log(1.0/0.010) = 0.0295 \\times 2 = 0.059\\ \\mathrm{V}$.",
);
q(
  "nernst",
  "medium",
  "Take $E^\\circ(\\mathrm{Zn^{2+}/Zn}) = -0.76\\ \\mathrm{V}$. At $[\\mathrm{Zn^{2+}}] = 0.010\\ \\mathrm{M}$ and 298 K the zinc electrode potential is nearest",
  ["$-0.82\\ \\mathrm{V}$", "$-0.70\\ \\mathrm{V}$", "$-0.76\\ \\mathrm{V}$", "$+0.76\\ \\mathrm{V}$"],
  0,
  "$E = -0.76 + (0.059/2)\\log(0.010) = -0.76 + 0.0295\\times(-2) = -0.82\\ \\mathrm{V}$.",
);
q(
  "nernst",
  "medium",
  "Starting from a standard Daniell cell, diluting only the Cu$^{2+}$ half-cell tenfold at 298 K changes $E$ by about",
  [
    "a decrease of $0.030\\ \\mathrm{V}$",
    "an increase of $0.059\\ \\mathrm{V}$",
    "a decrease of $0.76\\ \\mathrm{V}$",
    "no change, because $E^\\circ$ is fixed",
  ],
  0,
  "$Q$ rises by 10, so $\\Delta E = -(0.059/2)\\log 10 \\approx -0.030\\ \\mathrm{V}$.",
);
q(
  "nernst",
  "medium",
  "A hydrogen electrode ($p_{\\mathrm{H_2}} = 1\\ \\mathrm{bar}$) dipping into $0.0010\\ \\mathrm{M}$ HCl at 298 K develops a potential of",
  ["$-0.177\\ \\mathrm{V}$", "$0.000\\ \\mathrm{V}$", "$-0.059\\ \\mathrm{V}$", "$+0.177\\ \\mathrm{V}$"],
  0,
  "$[\\mathrm{H}^+] = 10^{-3}$, so $E = 0.059\\log(10^{-3}) = -0.177\\ \\mathrm{V}$.",
);
q(
  "nernst",
  "hard",
  "For $\\mathrm{Zn}|\\mathrm{Zn^{2+}}(0.10\\ \\mathrm{M})||\\mathrm{Cu^{2+}}(0.0010\\ \\mathrm{M})|\\mathrm{Cu}$ with $E^\\circ = 1.10\\ \\mathrm{V}$, $E$ at 298 K is",
  ["$1.041\\ \\mathrm{V}$", "$1.159\\ \\mathrm{V}$", "$0.041\\ \\mathrm{V}$", "$1.10\\ \\mathrm{V}$"],
  0,
  "$Q = 0.10/0.0010 = 100$; $E = 1.10 - (0.059/2)\\log 100 = 1.10 - 0.059 = 1.041\\ \\mathrm{V}$.",
);
q(
  "nernst",
  "hard",
  "A Cu concentration cell shows $E = 0.0295\\ \\mathrm{V}$ at 298 K. The ratio $[\\mathrm{Cu^{2+}}]_{\\mathrm{cathode}}/[\\mathrm{Cu^{2+}}]_{\\mathrm{anode}}$ is",
  ["10", "2", "100", "0.10"],
  0,
  "$E = (0.059/2)\\log(c_c/c_a) = 0.0295$ implies $\\log(c_c/c_a) = 1$, so the concentration ratio is 10.",
);

// —— electrolysis-faraday: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "electrolysis-faraday",
  "easy",
  "Faraday's first law of electrolysis states that the mass deposited is proportional to the",
  [
    "quantity of electricity passed through the electrolyte",
    "square of the applied voltage only",
    "volume of the voltameter",
    "atmospheric pressure in the laboratory",
  ],
  0,
  "$m = ZQ = ZIt$. Charge (current × time) fixes how much material is liberated.",
);
q(
  "electrolysis-faraday",
  "easy",
  "Faraday's second law compares two electrolytes carrying the same charge and says the liberated masses are proportional to their",
  [
    "chemical equivalent masses (molar mass / n-factor)",
    "densities in the solid state",
    "boiling points",
    "specific conductivities",
  ],
  0,
  "Equal charge liberates equal numbers of equivalents, so $m_1/m_2 = E_1/E_2$.",
);
q(
  "electrolysis-faraday",
  "easy",
  "One faraday of charge liberates from an electrolyte",
  [
    "one gram-equivalent of the substance",
    "one gram-molecule regardless of $n$",
    "exactly one gram of any metal",
    "22.4 L of every gas at STP",
  ],
  0,
  "1 F deposits 1 equivalent: 108 g Ag, 31.75 g Cu, 9 g Al, 11.2 L H$_2$ at STP, and so on.",
);
q(
  "electrolysis-faraday",
  "easy",
  "The charge carried by one mole of electrons is called",
  [
    "one faraday",
    "one ampere",
    "one siemens",
    "one equivalent conductivity",
  ],
  0,
  "$F = N_A e \\approx 96500\\ \\mathrm{C\\ mol^{-1}}$. It is the charge needed to reduce one mole of a univalent ion.",
);
q(
  "electrolysis-faraday",
  "easy",
  "Electrolysis of molten sodium chloride yields, as the electrode products,",
  [
    "sodium metal at the cathode and chlorine gas at the anode",
    "hydrogen at the cathode and oxygen at the anode",
    "chlorine at both electrodes",
    "solid NaCl crystals on the anode",
  ],
  0,
  "In the melt the only ions are Na$^+$ and Cl$^-$, so Na and Cl$_2$ are discharged.",
);
q(
  "electrolysis-faraday",
  "easy",
  "When aqueous CuSO$_4$ is electrolysed with copper electrodes, the anode reaction is",
  [
    "dissolution of copper metal as Cu$^{2+}$",
    "evolution of oxygen from water",
    "deposition of solid sulphur",
    "reduction of Cu$^{2+}$ to Cu",
  ],
  0,
  "A copper anode is oxidised in preference to water or sulphate, so the anode loses mass while copper plates at the cathode.",
);
q(
  "electrolysis-faraday",
  "easy",
  "Preferential discharge at an electrode is decided by",
  [
    "the ion that is most easily reduced (or oxidised) under the prevailing conditions",
    "the ion present in the largest catalogue mass only",
    "the colour of the electrolyte",
    "the cell constant of the vessel",
  ],
  0,
  "The couple with the more favourable discharge potential (including overvoltage and concentration) is liberated first.",
);
q(
  "electrolysis-faraday",
  "easy",
  "The quantity of electricity $Q$ that flows in time $t$ at a steady current $I$ is",
  ["$Q = It$", "$Q = I/t$", "$Q = t/I$", "$Q = I + t$"],
  0,
  "Current is charge per unit time, so charge is the product $It$ (amperes × seconds = coulombs).",
);
q(
  "electrolysis-faraday",
  "easy",
  "Electrolysis of acidified water with inert electrodes liberates",
  [
    "hydrogen at the cathode and oxygen at the anode, in a 2 : 1 volume ratio",
    "oxygen at the cathode and hydrogen at the anode",
    "only hydrogen, because oxygen stays dissolved",
    "chlorine and sodium",
  ],
  0,
  "2 H$_2$O → 2 H$_2$ + O$_2$. Two moles of hydrogen appear for each mole of oxygen.",
);
q(
  "electrolysis-faraday",
  "easy",
  "During electrolysis the cathode is still defined as the electrode at which",
  [
    "reduction occurs",
    "oxidation occurs",
    "the external battery is connected to earth",
    "no ion can be discharged",
  ],
  0,
  "The cathode/anode labels follow the chemistry (reduction/oxidation), not the galvanic sign convention.",
);
q(
  "electrolysis-faraday",
  "easy",
  "Electrochemical equivalent $Z$ of a substance equals",
  [
    "molar mass divided by $nF$",
    "molar mass multiplied by $nF$",
    "$nF$ alone",
    "cell constant divided by $\\kappa$",
  ],
  0,
  "$m = ZQ$ with $Z = M/(nF)$, so $Z$ is the mass liberated by one coulomb.",
);
q(
  "electrolysis-faraday",
  "easy",
  "To deposit one mole of aluminium from Al$^{3+}$ one must pass a charge of",
  ["$3F$", "$1F$", "$2F$", "$F/3$"],
  0,
  "Each Al$^{3+}$ ion consumes three electrons, so 1 mol Al requires $3 \\times 96500\\ \\mathrm{C}$.",
);
q(
  "electrolysis-faraday",
  "medium",
  "A 1.0 A current sent for 965 s through aqueous AgNO$_3$ deposits silver (Ag = 108) amounting to",
  ["$1.08\\ \\mathrm{g}$", "$10.8\\ \\mathrm{g}$", "$0.108\\ \\mathrm{g}$", "$108\\ \\mathrm{g}$"],
  0,
  "$m = (108/96500) \\times 1.0 \\times 965 = 1.08\\ \\mathrm{g}$.",
);
q(
  "electrolysis-faraday",
  "medium",
  "How many coulombs are required to plate 0.50 mol of copper from Cu$^{2+}$?",
  ["$96500\\ \\mathrm{C}$", "$48250\\ \\mathrm{C}$", "$193000\\ \\mathrm{C}$", "$0.50\\ \\mathrm{C}$"],
  0,
  "Each mole of Cu$^{2+}$ needs 2 mol electrons, so 0.50 mol needs $1.0\\,F = 96500\\ \\mathrm{C}$.",
);
q(
  "electrolysis-faraday",
  "medium",
  "A 2.0 A current flows for 965 s through acidified water. The STP volume of H$_2$ evolved is nearest",
  ["$0.224\\ \\mathrm{L}$", "$22.4\\ \\mathrm{L}$", "$0.112\\ \\mathrm{L}$", "$2.24\\ \\mathrm{L}$"],
  0,
  "$Q = 1930\\ \\mathrm{C} = 0.020\\ \\mathrm{mol\\ e^-}$; $2\\,e^- \\to 1\\ \\mathrm{H_2}$, so $0.010\\ \\mathrm{mol} = 0.224\\ \\mathrm{L}$ at STP.",
);
q(
  "electrolysis-faraday",
  "medium",
  "To deposit 0.216 g of Ag (Ag = 108) from AgNO$_3$ at 0.50 A, the time required is",
  ["386 s", "193 s", "965 s", "1930 s"],
  0,
  "$Q = m \\times F / M = 0.216 \\times 96500 / 108 = 193\\ \\mathrm{C}$; $t = Q/I = 193/0.50 = 386\\ \\mathrm{s}$.",
);
q(
  "electrolysis-faraday",
  "medium",
  "The same charge that deposits 1.08 g of silver will deposit, from Cu$^{2+}$ (Cu = 63.5), a copper mass of",
  ["$0.318\\ \\mathrm{g}$", "$1.08\\ \\mathrm{g}$", "$0.635\\ \\mathrm{g}$", "$2.16\\ \\mathrm{g}$"],
  0,
  "Equivalents: $E(\\mathrm{Ag}) = 108$, $E(\\mathrm{Cu}) = 31.75$. $m_{\\mathrm{Cu}} = 1.08 \\times 31.75/108 = 0.318\\ \\mathrm{g}$.",
);
q(
  "electrolysis-faraday",
  "medium",
  "If 0.635 g of copper is plated from CuSO$_4$ in 1930 s, the steady current used was",
  ["$1.0\\ \\mathrm{A}$", "$0.50\\ \\mathrm{A}$", "$2.0\\ \\mathrm{A}$", "$0.10\\ \\mathrm{A}$"],
  0,
  "$Q = (0.635 \\times 2 \\times 96500)/63.5 = 1930\\ \\mathrm{C}$; $I = Q/t = 1930/1930 = 1.0\\ \\mathrm{A}$.",
);
q(
  "electrolysis-faraday",
  "hard",
  "A current of 2.0 A is passed for 30 min through molten Al$_2$O$_3$ (Al = 27). The mass of aluminium liberated is",
  ["$0.336\\ \\mathrm{g}$", "$1.008\\ \\mathrm{g}$", "$0.112\\ \\mathrm{g}$", "$9.00\\ \\mathrm{g}$"],
  0,
  "$Q = 2.0 \\times 1800 = 3600\\ \\mathrm{C}$. $m = (27 \\times 3600)/(3 \\times 96500) \\approx 0.336\\ \\mathrm{g}$.",
);
q(
  "electrolysis-faraday",
  "hard",
  "The same current flows for the same time through AgNO$_3$ and then, separately, through AuCl$_3$ (Au = 197). If 1.08 g Ag is deposited, the gold deposited is nearest",
  ["$0.657\\ \\mathrm{g}$", "$1.97\\ \\mathrm{g}$", "$0.328\\ \\mathrm{g}$", "$3.00\\ \\mathrm{g}$"],
  0,
  "Equal charge means equal equivalents: $m_{\\mathrm{Au}}/m_{\\mathrm{Ag}} = (197/3)/108$, so $m_{\\mathrm{Au}} = 1.08 \\times 197/(3 \\times 108) = 0.657\\ \\mathrm{g}$.",
);

// —— batteries-corrosion: 10 (6 easy, 3 medium, 1 hard) ——
q(
  "batteries-corrosion",
  "easy",
  "A primary electrochemical cell is one that",
  [
    "cannot be recharged by reversing the current",
    "is recharged simply by plugging it into the mains",
    "has no electrode at all",
    "works only as an electrolytic cell",
  ],
  0,
  "Once the reductant and oxidant of a dry cell or button cell are spent, the cell is discarded.",
);
q(
  "batteries-corrosion",
  "easy",
  "A secondary cell differs from a primary cell in that it",
  [
    "can be recharged because the cell reaction is reversible",
    "never involves a redox change",
    "has $E = 0$ at all times",
    "must be discarded after a single use",
  ],
  0,
  "Lead–acid and Ni–Cd cells are secondary batteries: charging drives the discharge reaction backwards.",
);
q(
  "batteries-corrosion",
  "easy",
  "The common dry cell (Leclanché) uses a zinc cup as the anode and, as the cathode depolariser,",
  [
    "manganese dioxide packed around a carbon rod",
    "lead dioxide on a lead grid",
    "porous platinum and hydrogen gas",
    "solid sodium chloride only",
  ],
  0,
  "Zn is oxidised; MnO$_2$ is reduced at the carbon collector in the NH$_4$Cl / ZnCl$_2$ paste.",
);
q(
  "batteries-corrosion",
  "easy",
  "A hydrogen–oxygen fuel cell is designed so that the reactants are",
  [
    "fed continuously, and the cell can run as long as fuel and oxidant are supplied",
    "sealed once and for all inside a closed can",
    "generated only by charging overnight",
    "the same as those of a lead storage battery",
  ],
  0,
  "A fuel cell is a galvanic cell with continuous feeds; it is not a store of a finite charge like a battery.",
);
q(
  "batteries-corrosion",
  "easy",
  "Rusting of iron is classified as an electrochemical process because it involves",
  [
    "local anodic oxidation of Fe and cathodic reduction of dissolved oxygen",
    "a purely mechanical wearing away of the metal",
    "melting of iron below 100 °C",
    "photochemical cleavage of Fe–Fe bonds only",
  ],
  0,
  "Different surface spots act as tiny galvanic cells in the presence of a water film containing O$_2$.",
);
q(
  "batteries-corrosion",
  "easy",
  "Ordinary rusting of iron requires, besides the metal itself,",
  [
    "both moisture and oxygen",
    "oxygen in a completely dry atmosphere only",
    "a vacuum and ultraviolet light",
    "solid NaCl with no water at all",
  ],
  0,
  "Water provides the ionic medium; oxygen is the cathodic oxidant. Dry iron in air rusts extremely slowly.",
);
q(
  "batteries-corrosion",
  "medium",
  "During discharge of a lead storage battery the electrolyte H$_2$SO$_4$ is consumed and the product deposited on both plates is",
  [
    "lead(II) sulphate",
    "lead metal only",
    "lead dioxide only",
    "elemental sulphur",
  ],
  0,
  "Pb + PbO$_2$ + 2 H$_2$SO$_4$ → 2 PbSO$_4$ + 2 H$_2$O. Charging reverses this reaction and regenerates acid.",
);
q(
  "batteries-corrosion",
  "medium",
  "The only chemical product of a hydrogen–oxygen fuel cell operating with an alkaline or acid electrolyte is",
  ["water", "carbon dioxide", "ammonia", "hydrogen peroxide exclusively"],
  0,
  "H$_2$ is oxidised and O$_2$ is reduced; their combination yields H$_2$O (and electrical work).",
);
q(
  "batteries-corrosion",
  "medium",
  "A buried iron pipeline is protected by attaching blocks of zinc or magnesium because those metals",
  [
    "act as sacrificial anodes and corrode in preference to iron",
    "raise the $E^\\circ$ of iron above that of oxygen",
    "convert iron into stainless steel",
    "absorb all moisture from the soil",
  ],
  0,
  "Zn and Mg are more active (more negative $E^\\circ$) than Fe, so they oxidise first and the pipeline becomes cathodic.",
);
q(
  "batteries-corrosion",
  "hard",
  "On a rusting iron surface the anodic half-change is Fe → Fe$^{2+}$ + 2 e$^-$. The matching cathodic process in a neutral water film is",
  [
    "$\\mathrm{O_2 + 2H_2O + 4e^- \\rightarrow 4OH^-}$",
    "$\\mathrm{Fe^{2+} + 2e^- \\rightarrow Fe}$",
    "$\\mathrm{2H_2O \\rightarrow O_2 + 4H^+ + 4e^-}$",
    "$\\mathrm{Zn^{2+} + 2e^- \\rightarrow Zn}$",
  ],
  0,
  "Dissolved oxygen is reduced to hydroxide. Fe$^{2+}$ and OH$^-$ then form rust (hydrated Fe$_2$O$_3$) after further oxidation.",
);

// —— rate-law: 18 (11 easy, 5 medium, 2 hard) ——
q(
  "rate-law",
  "easy",
  "The instantaneous rate of consumption of a reactant A is written",
  [
    "$-\\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t$",
    "$+\\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t$",
    "$[\\mathrm{A}] \\times t$",
    "$\\Delta G / \\Delta t$",
  ],
  0,
  "Concentration of a reactant falls, so the minus sign makes the rate a positive quantity.",
);
q(
  "rate-law",
  "easy",
  "A rate law such as rate $= k[\\mathrm{A}]^x[\\mathrm{B}]^y$ must be established by",
  [
    "experiment (initial rates or isolation methods)",
    "copying the stoichiometric coefficients in every case",
    "the equilibrium constant alone",
    "the molecular mass of the product",
  ],
  0,
  "Orders $x$ and $y$ equal stoichiometric numbers only for an elementary step, not for an arbitrary overall equation.",
);
q(
  "rate-law",
  "easy",
  "The rate constant $k$ of a given reaction, at fixed temperature, does not depend on",
  [
    "the concentrations of the reactants",
    "the presence of a catalyst (which actually changes $k$)",
    "temperature (which actually changes $k$)",
    "the activation energy (which actually enters $k$)",
  ],
  0,
  "$k$ is independent of concentration. It does depend on $T$, $E_a$ and catalysis; the wording isolates the concentration independence.",
);
q(
  "rate-law",
  "easy",
  "Dimensions of $k$ for a zero-order reaction (rate in mol L$^{-1}$ s$^{-1}$) are",
  [
    "mol L$^{-1}$ s$^{-1}$",
    "s$^{-1}$",
    "L mol$^{-1}$ s$^{-1}$",
    "L$^2$ mol$^{-2}$ s$^{-1}$",
  ],
  0,
  "Rate $= k$ when the order is zero, so $k$ carries the same units as the rate itself.",
);
q(
  "rate-law",
  "easy",
  "A second-order rate constant (concentration in mol L$^{-1}$, time in s) has the unit",
  ["L mol$^{-1}$ s$^{-1}$", "s$^{-1}$", "mol L$^{-1}$ s$^{-1}$", "L$^2$ mol$^{-2}$ s$^{-1}$"],
  0,
  "Rate $= k[\\mathrm{A}]^2$ (or $k[\\mathrm{A}][\\mathrm{B}]$) forces $k$ to have units (concentration)$^{-1}$ (time)$^{-1}$.",
);
q(
  "rate-law",
  "easy",
  "Average rate over a finite interval is computed as",
  [
    "change in concentration divided by the elapsed time",
    "the slope of the tangent at one instant only",
    "the equilibrium constant divided by time",
    "the activation energy divided by $RT$",
  ],
  0,
  "Average rate $= \\Delta[\\mathrm{ ]}/\\Delta t$. Instantaneous rate is the derivative (tangent slope).",
);
q(
  "rate-law",
  "easy",
  "For $2\\mathrm{N_2O_5} \\to 4\\mathrm{NO_2} + \\mathrm{O_2}$, the rate of appearance of NO$_2$ compared with the rate of disappearance of N$_2$O$_5$ is",
  ["twice as large", "the same", "half as large", "four times smaller"],
  0,
  "Rate of reaction $= -\\tfrac12 \\mathrm{d}[\\mathrm{N_2O_5}]/\\mathrm{d}t = +\\tfrac14 \\mathrm{d}[\\mathrm{NO_2}]/\\mathrm{d}t$, so $-\\mathrm{d}[\\mathrm{N_2O_5}]/\\mathrm{d}t = \\tfrac12 \\mathrm{d}[\\mathrm{NO_2}]/\\mathrm{d}t$.",
);
q(
  "rate-law",
  "easy",
  "For an elementary bimolecular collision A + B → products, the rate law is expected to be",
  [
    "rate $= k[\\mathrm{A}][\\mathrm{B}]$",
    "rate $= k$ only",
    "rate $= k[\\mathrm{A}]^2[\\mathrm{B}]^2$",
    "rate $= k / [\\mathrm{A}][\\mathrm{B}]$",
  ],
  0,
  "In an elementary step the molecularity and the order coincide, so each reactant appears to the first power.",
);
q(
  "rate-law",
  "easy",
  "When a multi-step mechanism has one distinctly slow step, the observed rate law is usually that of the",
  [
    "rate-determining (slow) step, after any pre-equilibria are substituted",
    "fastest step alone, ignoring the slow one",
    "overall stoichiometry in every case",
    "reverse reaction only",
  ],
  0,
  "The bottleneck step limits the flux. Intermediates in that step are rewritten using faster equilibria if needed.",
);
q(
  "rate-law",
  "easy",
  "Raising the temperature of a typical thermally activated reaction increases $k$ because",
  [
    "a larger fraction of collisions then exceeds the activation barrier",
    "concentrations in the rate law are redefined",
    "the stoichiometric coefficients change",
    "the Faraday constant grows with $T$",
  ],
  0,
  "Arrhenius behaviour: $k = A e^{-E_a/RT}$ grows rapidly as $T$ rises.",
);
q(
  "rate-law",
  "easy",
  "The rate of the reaction $a\\mathrm{A} \\to$ products is defined so that",
  [
    "rate $= -\\tfrac1a \\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t$",
    "rate $= -a\\,\\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t$",
    "rate $= +a[\\mathrm{A}]$",
    "rate $= [\\mathrm{A}]^a$ with no $k$",
  ],
  0,
  "Dividing by the stoichiometric coefficient makes the rate the same whichever species is monitored.",
);
q(
  "rate-law",
  "medium",
  "If rate $= k[\\mathrm{A}]^2$ and [A] is doubled at constant $T$, the instantaneous rate becomes",
  ["four times the original rate", "twice the original rate", "unchanged", "half the original rate"],
  0,
  "Second order in A: $(2)^2 = 4$, so the rate quadruples.",
);
q(
  "rate-law",
  "medium",
  "A reaction has rate $= 2.0 \\times 10^{-4}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$ when [A] = 0.10 M and is first order in A only. $k$ equals",
  [
    "$2.0 \\times 10^{-3}\\ \\mathrm{s^{-1}}$",
    "$2.0 \\times 10^{-5}\\ \\mathrm{s^{-1}}$",
    "$2.0 \\times 10^{-4}\\ \\mathrm{L\\ mol^{-1}\\ s^{-1}}$",
    "$0.10\\ \\mathrm{s^{-1}}$",
  ],
  0,
  "$k = \\mathrm{rate}/[\\mathrm{A}] = 2.0 \\times 10^{-4}/0.10 = 2.0 \\times 10^{-3}\\ \\mathrm{s^{-1}}$.",
);
q(
  "rate-law",
  "medium",
  "For rate $= k[\\mathrm{A}][\\mathrm{B}]$ the unit of $k$ (conc. in mol L$^{-1}$) is",
  ["L mol$^{-1}$ s$^{-1}$", "s$^{-1}$", "mol L$^{-1}$ s$^{-1}$", "L$^2$ mol$^{-2}$ s$^{-1}$"],
  0,
  "Two concentration factors sit with $k$, so $k$ is second-order: L mol$^{-1}$ s$^{-1}$.",
);
q(
  "rate-law",
  "medium",
  "In $2\\mathrm{A} + \\mathrm{B} \\to \\mathrm{C}$, if A disappears at $6.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$, C appears at",
  [
    "$3.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
    "$6.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
    "$1.2 \\times 10^{-2}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
    "$1.5 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
  ],
  0,
  "Rate $= -\\tfrac12 \\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t = +\\mathrm{d}[\\mathrm{C}]/\\mathrm{d}t$, so d[C]/dt is half of 6.0 × 10$^{-3}$.",
);
q(
  "rate-law",
  "medium",
  "Holding [B] fixed, [A] is doubled and the initial rate becomes four times larger. The order with respect to A is",
  ["2", "1", "0", "4"],
  0,
  "rate ∝ [A]$^x$ and $4 = 2^x$ implies $x = 2$.",
);
q(
  "rate-law",
  "hard",
  "Two runs at the same [B]: [A] = 0.10 M gives rate $1.2 \\times 10^{-4}$; [A] = 0.20 M gives rate $4.8 \\times 10^{-4}$. Order in A and the factor by which rate changes if both [A] and [B] are doubled (order in B is 1) are",
  [
    "2 and a factor of 8",
    "1 and a factor of 4",
    "2 and a factor of 4",
    "0 and a factor of 2",
  ],
  0,
  "Rate ×4 when [A] ×2 ⇒ order 2 in A. Overall rate $= k[\\mathrm{A}]^2[\\mathrm{B}]$, so doubling both species multiplies the rate by $4 \\times 2 = 8$.",
);
q(
  "rate-law",
  "hard",
  "Rate $= k[\\mathrm{NO}]^2[\\mathrm{O_2}]$ with $k = 1.0 \\times 10^3\\ \\mathrm{L^2\\ mol^{-2}\\ s^{-1}}$. If [NO] = 0.020 M and [O$_2$] = 0.010 M, the rate is",
  [
    "$4.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
    "$4.0 \\times 10^{-6}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
    "$2.0 \\times 10^{-4}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
    "$1.0 \\times 10^{-2}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$",
  ],
  0,
  "Rate $= 1.0 \\times 10^3 \\times (0.020)^2 \\times 0.010 = 1.0 \\times 10^3 \\times 4.0 \\times 10^{-6} = 4.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ s^{-1}}$.",
);

// —— order-molecularity: 14 (8 easy, 5 medium, 1 hard) ——
q(
  "order-molecularity",
  "easy",
  "The order of a reaction may be zero or fractional, whereas molecularity is",
  [
    "a positive integer (1, 2 or occasionally 3) for an elementary step",
    "always equal to zero",
    "allowed to be negative for unimolecular decays",
    "undefined for every elementary reaction",
  ],
  0,
  "Order is experimental and can be 0, ½, 1, 2, …. Molecularity counts the molecules in one elementary act and is a small integer.",
);
q(
  "order-molecularity",
  "easy",
  "Molecularity of an elementary step is the",
  [
    "number of species that collide (or decompose) in that single step",
    "sum of the stoichiometric coefficients of the overall equation always",
    "same as the activation energy in kJ",
    "number of products formed",
  ],
  0,
  "Unimolecular = one species rearranges; bimolecular = two species collide, and so on.",
);
q(
  "order-molecularity",
  "easy",
  "Overall order is obtained from a rate law rate $= k[\\mathrm{A}]^x[\\mathrm{B}]^y$ as",
  ["$x + y$", "$x - y$", "$x \\times y$", "$x / y$"],
  0,
  "Overall order is the sum of the concentration exponents in the experimental rate law.",
);
q(
  "order-molecularity",
  "easy",
  "A pseudo-first-order reaction is typically a bimolecular process run with",
  [
    "one reactant in large excess, so that its concentration stays nearly constant",
    "both reactants at identical micromolar levels",
    "no solvent present",
    "a catalyst that raises the molecularity to four",
  ],
  0,
  "Ester hydrolysis in water is the classic case: [H$_2$O] is huge and is absorbed into an effective first-order $k$.",
);
q(
  "order-molecularity",
  "easy",
  "Molecularity is a meaningful idea only for",
  [
    "an elementary step",
    "every complex multi-step reaction as a whole",
    "equilibrium constants",
    "conductivity experiments",
  ],
  0,
  "A complex reaction is a sequence of elementary steps; it has an order but not a single molecularity.",
);
q(
  "order-molecularity",
  "easy",
  "Decomposition of a single gaseous molecule in one elementary act is described as",
  ["unimolecular", "bimolecular", "zero-order by definition", "termolecular only"],
  0,
  "One reactant species appears in the elementary step, so the molecularity is one.",
);
q(
  "order-molecularity",
  "easy",
  "A bimolecular elementary reaction involves",
  [
    "a collision between two species (like or unlike)",
    "the simultaneous meeting of four molecules",
    "no collision at all",
    "only a change of solvent polarity",
  ],
  0,
  "Two particles must encounter each other; the step is first order in each (or second order in one if they are identical).",
);
q(
  "order-molecularity",
  "easy",
  "Ammonia decomposition on a tungsten surface at high pressure is a familiar textbook example of a",
  [
    "zero-order reaction",
    "third-order gas reaction",
    "unimolecular reaction in the gas phase only",
    "reaction with no rate constant",
  ],
  0,
  "The surface is saturated, so the rate becomes independent of the NH$_3$ pressure: order zero.",
);
q(
  "order-molecularity",
  "medium",
  "The experimental law rate $= k[\\mathrm{H_2}][\\mathrm{Br_2}]^{1/2}$ has overall order",
  ["1.5", "2", "0.5", "1"],
  0,
  "Exponents add: $1 + 1/2 = 3/2$.",
);
q(
  "order-molecularity",
  "medium",
  "Acid-catalysed hydrolysis of methyl acetate in a large excess of water is treated as",
  [
    "pseudo first order in the ester",
    "second order in water",
    "zero order in the ester",
    "third order overall under all conditions",
  ],
  0,
  "[H$_2$O] is essentially constant, so the observed rate is first order in ester only.",
);
q(
  "order-molecularity",
  "medium",
  "For a reaction that proceeds by several elementary steps, the overall order",
  [
    "need not equal the molecularity of any one step, and is found only by experiment",
    "is always equal to the number of steps",
    "must equal the molecularity of the last step",
    "is undefined if a catalyst is present",
  ],
  0,
  "Order is a property of the observed rate law. Molecularity belongs to individual steps.",
);
q(
  "order-molecularity",
  "medium",
  "Termolecular elementary steps are rare because",
  [
    "a simultaneous collision of three molecules is statistically improbable",
    "three molecules can never share electrons",
    "the collision theory forbids $n = 3$ exactly",
    "Faraday's laws prohibit them",
  ],
  0,
  "Two-body collisions are common; a third body arriving in the same instant is unlikely, so $n = 3$ steps are scarce.",
);
q(
  "order-molecularity",
  "medium",
  "A rate constant reported as L$^2$ mol$^{-2}$ s$^{-1}$ indicates that the reaction is",
  [
    "third order overall",
    "first order overall",
    "zero order overall",
    "fractional order of ½",
  ],
  0,
  "Units of $k$ are (conc.)$^{1-n}$ (time)$^{-1}$. L$^2$ mol$^{-2}$ s$^{-1}$ corresponds to $n = 3$.",
);
q(
  "order-molecularity",
  "hard",
  "Mechanism: fast equilibrium A + B ⇌ I, followed by slow I → P. The observed order in A and the molecularity of the slow step are",
  [
    "first order in A, and unimolecular",
    "second order in A, and bimolecular",
    "zero order in A, and termolecular",
    "first order in A, and bimolecular",
  ],
  0,
  "The RDS is unimolecular in I. Substituting [I] = $K[\\mathrm{A}][\\mathrm{B}]$ makes the rate first order in A (and in B).",
);

// —— integrated-half-life: 24 (14 easy, 7 medium, 3 hard) ——
q(
  "integrated-half-life",
  "easy",
  "The integrated first-order rate law is commonly written",
  [
    "$\\ln([\\mathrm{A}]_0/[\\mathrm{A}]) = kt$",
    "$[\\mathrm{A}] = [\\mathrm{A}]_0 - kt$",
    "$1/[\\mathrm{A}] - 1/[\\mathrm{A}]_0 = kt$",
    "$[\\mathrm{A}]^2 = kt$",
  ],
  0,
  "Integration of $-\\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t = k[\\mathrm{A}]$ yields a linear plot of $\\ln[\\mathrm{A}]$ versus $t$.",
);
q(
  "integrated-half-life",
  "easy",
  "For a zero-order decay the concentration falls linearly according to",
  [
    "$[\\mathrm{A}] = [\\mathrm{A}]_0 - kt$",
    "$\\ln[\\mathrm{A}] = \\ln[\\mathrm{A}]_0 - kt$",
    "$1/[\\mathrm{A}] = 1/[\\mathrm{A}]_0 + kt$",
    "$[\\mathrm{A}] = [\\mathrm{A}]_0 e^{+kt}$",
  ],
  0,
  "Rate $= k$ (constant), so [A] drops at a constant slope $-k$ until the reactant is exhausted.",
);
q(
  "integrated-half-life",
  "easy",
  "The integrated law for a simple second-order reaction 2A → products is",
  [
    "$1/[\\mathrm{A}] - 1/[\\mathrm{A}]_0 = kt$",
    "$\\ln([\\mathrm{A}]_0/[\\mathrm{A}]) = kt$",
    "$[\\mathrm{A}] = [\\mathrm{A}]_0 - kt$",
    "$[\\mathrm{A}]_0 - [\\mathrm{A}] = k\\ln t$",
  ],
  0,
  "Integration of $-\\mathrm{d}[\\mathrm{A}]/\\mathrm{d}t = k[\\mathrm{A}]^2$ produces the reciprocal-concentration relation.",
);
q(
  "integrated-half-life",
  "easy",
  "A hallmark of first-order kinetics is that the half-life",
  [
    "does not depend on the starting concentration",
    "is proportional to $[\\mathrm{A}]_0$",
    "is inversely proportional to $[\\mathrm{A}]_0$",
    "grows as $[\\mathrm{A}]_0^2$",
  ],
  0,
  "$t_{1/2} = \\ln 2 / k$ contains no $[\\mathrm{A}]_0$. Each successive half-life has the same duration.",
);
q(
  "integrated-half-life",
  "easy",
  "Zero-order half-life grows when the initial concentration is raised because",
  [
    "$t_{1/2} = [\\mathrm{A}]_0 / (2k)$",
    "$t_{1/2} = \\ln 2 / k$",
    "$t_{1/2} = 1 / (k[\\mathrm{A}]_0)$",
    "$t_{1/2}$ is independent of $[\\mathrm{A}]_0$",
  ],
  0,
  "A constant rate needs longer to consume half of a larger starting amount.",
);
q(
  "integrated-half-life",
  "easy",
  "For the second-order process 2A → products, half-life and initial concentration are related by",
  [
    "$t_{1/2} = 1 / (k[\\mathrm{A}]_0)$",
    "$t_{1/2} = \\ln 2 / k$",
    "$t_{1/2} = [\\mathrm{A}]_0 / (2k)$",
    "$t_{1/2} = k[\\mathrm{A}]_0$",
  ],
  0,
  "Set [A] = [A]$_0$/2 in $1/[\\mathrm{A}] - 1/[\\mathrm{A}]_0 = kt$ to obtain $t_{1/2} = 1/(k[\\mathrm{A}]_0)$.",
);
q(
  "integrated-half-life",
  "easy",
  "After $n$ successive half-lives of a first-order reaction the fraction of reactant left is",
  ["$(1/2)^n$", "$n/2$", "$1/n$", "$2^n$"],
  0,
  "Each half-life halves what remains, so the leftover fraction is $2^{-n}$.",
);
q(
  "integrated-half-life",
  "easy",
  "A straight line is obtained when $\\ln[\\mathrm{A}]$ is plotted against time for a reaction that is",
  ["first order in A", "zero order in A", "second order in A", "third order in A"],
  0,
  "The first-order integrated law is $\\ln[\\mathrm{A}] = \\ln[\\mathrm{A}]_0 - kt$.",
);
q(
  "integrated-half-life",
  "easy",
  "A plot of [A] versus time is linear with a negative slope when the reaction is",
  ["zero order in A", "first order in A", "second order in A", "fractional order ½"],
  0,
  "[A] = [A]$_0 - kt$ is the equation of a straight line of slope $-k$.",
);
q(
  "integrated-half-life",
  "easy",
  "A graph of $1/[\\mathrm{A}]$ versus time is a straight line when the decay of A is",
  ["second order", "first order", "zero order", "a pure nuclear explosion"],
  0,
  "The second-order integrated law is linear in $1/[\\mathrm{A}]$, with slope $k$.",
);
q(
  "integrated-half-life",
  "easy",
  "When a first-order reaction has consumed 75% of the reactant, the number of half-lives that have elapsed is",
  ["two", "one", "three", "four"],
  0,
  "75% consumed means 25% remains, which is $(1/2)^2$ of the start, i.e. two half-lives.",
);
q(
  "integrated-half-life",
  "easy",
  "Radioactive disintegration is treated kinetically as",
  [
    "first order in the amount of nuclide",
    "zero order in every case",
    "second order in the daughter nuclide",
    "third order in the neutron number",
  ],
  0,
  "Each nucleus decays independently, so the rate is proportional to the number remaining: first-order kinetics.",
);
q(
  "integrated-half-life",
  "easy",
  "The half-life of a zero-order reaction with rate constant $k$ equals",
  [
    "$[\\mathrm{A}]_0/(2k)$",
    "$\\ln 2 / k$",
    "$1/(k[\\mathrm{A}]_0)$",
    "$2k/[\\mathrm{A}]_0$",
  ],
  0,
  "Set $[\\mathrm{A}] = [\\mathrm{A}]_0/2$ in $[\\mathrm{A}] = [\\mathrm{A}]_0 - kt$ to obtain $t_{1/2} = [\\mathrm{A}]_0/(2k)$.",
);
q(
  "integrated-half-life",
  "easy",
  "A first-order process never quite reaches 100% conversion because",
  [
    "the rate keeps falling as [A] falls, so a finite time cannot exhaust the last traces",
    "the integrated law forbids $t > t_{1/2}$",
    "zero-order kinetics take over near the end",
    "$k$ becomes infinite as [A] approaches zero",
  ],
  0,
  "[A] = [A]$_0 e^{-kt}$ approaches zero only as $t \\to \\infty$. In practice the reactant becomes undetectable, but the law has no finite finish time.",
);
q(
  "integrated-half-life",
  "medium",
  "A first-order gas reaction has $k = 1.386 \\times 10^{-2}\\ \\mathrm{min^{-1}}$. Its half-life is",
  ["50 min", "0.693 min", "72 min", "100 min"],
  0,
  "$t_{1/2} = 0.693/k = 0.693/(1.386 \\times 10^{-2}) = 50\\ \\mathrm{min}$.",
);
q(
  "integrated-half-life",
  "medium",
  "If 60% of a first-order reactant remains after 20 min, the leftover fraction after a further 20 min is nearest",
  ["0.36", "0.60", "0.16", "0.48"],
  0,
  "First order: the same time interval multiplies [A] by the same factor 0.60, so $0.60 \\times 0.60 = 0.36$.",
);
q(
  "integrated-half-life",
  "medium",
  "How long does a first-order reaction of half-life 15 min take to reach 75% completion?",
  ["30 min", "15 min", "45 min", "7.5 min"],
  0,
  "75% completion is two half-lives, so $2 \\times 15 = 30\\ \\mathrm{min}$.",
);
q(
  "integrated-half-life",
  "medium",
  "From a measured first-order half-life of 46.2 min one obtains $k$ equal to",
  [
    "$1.50 \\times 10^{-2}\\ \\mathrm{min^{-1}}$",
    "$46.2\\ \\mathrm{min^{-1}}$",
    "$0.693\\ \\mathrm{min^{-1}}$",
    "$3.00 \\times 10^{-2}\\ \\mathrm{min^{-1}}$",
  ],
  0,
  "$k = 0.693/t_{1/2} = 0.693/46.2 = 1.50 \\times 10^{-2}\\ \\mathrm{min^{-1}}$.",
);
q(
  "integrated-half-life",
  "medium",
  "A zero-order reaction with $k = 2.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ min^{-1}}$ and $[\\mathrm{A}]_0 = 0.20\\ \\mathrm{M}$ is complete after",
  ["100 min", "50 min", "200 min", "0.10 min"],
  0,
  "Completion means $[\\mathrm{A}] = 0$, so $t = [\\mathrm{A}]_0/k = 0.20/(2.0 \\times 10^{-3}) = 100\\ \\mathrm{min}$.",
);
q(
  "integrated-half-life",
  "medium",
  "Starting from a first-order sample, the number of half-lives needed to leave only one-eighth of the reactant is",
  ["3", "2", "4", "8"],
  0,
  "$(1/2)^n = 1/8$ gives $n = 3$.",
);
q(
  "integrated-half-life",
  "medium",
  "For 2A → products, $k = 0.50\\ \\mathrm{L\\ mol^{-1}\\ min^{-1}}$ and $[\\mathrm{A}]_0 = 0.20\\ \\mathrm{M}$. The half-life is",
  ["10 min", "1.4 min", "0.10 min", "20 min"],
  0,
  "$t_{1/2} = 1/(k[\\mathrm{A}]_0) = 1/(0.50 \\times 0.20) = 10\\ \\mathrm{min}$.",
);
q(
  "integrated-half-life",
  "hard",
  "A first-order isomerisation has $t_{1/2} = 20\\ \\mathrm{min}$. The time required for 87.5% conversion is",
  ["60 min", "40 min", "20 min", "80 min"],
  0,
  "87.5% converted leaves 12.5% = $1/8$, which is three half-lives: $3 \\times 20 = 60\\ \\mathrm{min}$.",
);
q(
  "integrated-half-life",
  "hard",
  "Half-life of a gaseous decay is 40 min at 0.80 bar initial pressure and 80 min at 0.40 bar. The order and $k$ (from the 0.80 bar run, treating concentration as proportional to $p$) are consistent with",
  [
    "second order, because $t_{1/2}$ doubles when $p_0$ is halved",
    "first order, because $t_{1/2}$ is independent of $p_0$",
    "zero order, because $t_{1/2}$ halves when $p_0$ is halved",
    "third order, because $t_{1/2} \\propto p_0^2$",
  ],
  0,
  "Second-order $t_{1/2} \\propto 1/[\\mathrm{A}]_0$. Halving the initial pressure doubles the half-life, which matches the data.",
);
q(
  "integrated-half-life",
  "hard",
  "A first-order hydrolysis has $k = 2.303 \\times 10^{-3}\\ \\mathrm{s^{-1}}$. The percentage of reactant still left after 1000 s is nearest",
  ["10%", "50%", "1%", "90%"],
  0,
  "$\\log([\\mathrm{A}]_0/[\\mathrm{A}]) = kt/2.303 = 1.00$, so $[\\mathrm{A}]/[\\mathrm{A}]_0 = 0.10$ (10% remains).",
);

// —— arrhenius-ea: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "arrhenius-ea",
  "easy",
  "Activation energy $E_a$ of a reaction is the",
  [
    "minimum extra energy that colliding molecules must possess if they are to react",
    "heat released when products form",
    "same quantity as $\\Delta H$ of the reaction",
    "Faraday constant multiplied by $T$",
  ],
  0,
  "$E_a$ is the barrier height on the reaction profile. Only collisions that clear that barrier can form products.",
);
q(
  "arrhenius-ea",
  "easy",
  "For a typical activated reaction, raising the temperature causes the rate constant to",
  [
    "increase",
    "decrease toward zero",
    "become equal to the Faraday constant",
    "lose its units",
  ],
  0,
  "The Boltzmann factor $e^{-E_a/RT}$ grows as $T$ grows, so $k$ rises (often steeply).",
);
q(
  "arrhenius-ea",
  "easy",
  "A plot of $\\ln k$ versus $1/T$ for an Arrhenius reaction is a straight line whose slope equals",
  ["$-E_a/R$", "$E_a/R$", "$-R/E_a$", "$A$"],
  0,
  "$\\ln k = \\ln A - E_a/RT$, so the slope versus $1/T$ is $-E_a/R$.",
);
q(
  "arrhenius-ea",
  "easy",
  "In $k = A e^{-E_a/RT}$ the pre-exponential factor $A$ is interpreted as",
  [
    "a frequency (or collision) factor, the value $k$ would have if every collision were successful",
    "the activation energy in joules",
    "the gas constant",
    "the equilibrium constant $K_c$",
  ],
  0,
  "$A$ absorbs the collision frequency and a steric factor. It has the same units as $k$.",
);
q(
  "arrhenius-ea",
  "easy",
  "A catalyst speeds a reaction primarily by",
  [
    "providing an alternative path with a lower activation energy",
    "raising the temperature of the surroundings",
    "increasing $\\Delta G^\\circ$ of the reaction",
    "changing the stoichiometric coefficients",
  ],
  0,
  "A lower $E_a$ increases the fraction of successful collisions. $\\Delta H$ and the position of equilibrium stay the same.",
);
q(
  "arrhenius-ea",
  "easy",
  "Threshold energy in collision theory is",
  [
    "the minimum relative kinetic energy that a collision must have to be potentially reactive",
    "the average kinetic energy of the whole sample",
    "equal to $RT$ at every temperature",
    "the energy of the products minus $E_a$",
  ],
  0,
  "Molecules that meet with energy below the threshold simply bounce apart; those above it may react if oriented properly.",
);
q(
  "arrhenius-ea",
  "easy",
  "Activation energies of ordinary laboratory reactions are usually quoted in",
  ["kJ mol$^{-1}$", "volts", "siemens", "atomic mass units"],
  0,
  "$E_a$ is a molar energy barrier, typically tens to a few hundred kJ mol$^{-1}$.",
);
q(
  "arrhenius-ea",
  "easy",
  "Between two reactions at the same $T$, the one with the larger $E_a$ is",
  [
    "more sensitive to a change of temperature",
    "always faster at every temperature",
    "unaffected by heating",
    "required to have a negative $A$ factor",
  ],
  0,
  "d ln $k$ / d$T$ = $E_a/RT^2$, so a higher barrier means a steeper rise of $k$ with $T$.",
);
q(
  "arrhenius-ea",
  "easy",
  "The two-temperature form of the Arrhenius equation is",
  [
    "$\\log(k_2/k_1) = (E_a/2.303R)(1/T_1 - 1/T_2)$",
    "$\\log(k_2/k_1) = (E_a/R)(T_2 - T_1)$",
    "$k_2/k_1 = E_a (T_2 - T_1)$",
    "$\\log(k_2/k_1) = 2.303R / E_a$",
  ],
  0,
  "Subtracting $\\ln k = \\ln A - E_a/RT$ at two temperatures eliminates $A$ and gives that working equation.",
);
q(
  "arrhenius-ea",
  "easy",
  "In the formal high-temperature limit of the Arrhenius expression, $k$ approaches",
  [
    "the pre-exponential factor $A$",
    "zero",
    "the Faraday constant",
    "$E_a$ itself",
  ],
  0,
  "As $T \\to \\infty$, $e^{-E_a/RT} \\to 1$, so $k \\to A$. Real molecules decompose before that limit is reached.",
);
q(
  "arrhenius-ea",
  "medium",
  "A reaction has $k = 2.0 \\times 10^{-3}\\ \\mathrm{s^{-1}}$ at 300 K and $8.0 \\times 10^{-3}\\ \\mathrm{s^{-1}}$ at 320 K. $E_a$ is nearest",
  ["55 kJ mol$^{-1}$", "8.3 kJ mol$^{-1}$", "220 kJ mol$^{-1}$", "2.0 kJ mol$^{-1}$"],
  0,
  "$\\log 4 = 0.602 = (E_a/19.15)(1/300 - 1/320)$; $1/300 - 1/320 = 2.08 \\times 10^{-4}$, so $E_a \\approx 55\\ \\mathrm{kJ\\ mol^{-1}}$.",
);
q(
  "arrhenius-ea",
  "medium",
  "If $E_a = 57.4\\ \\mathrm{kJ\\ mol^{-1}}$, the factor by which $k$ grows when $T$ goes from 300 K to 310 K is nearest",
  ["2", "10", "0.5", "100"],
  0,
  "$\\log(k_2/k_1) = (57400/19.15)(10/93000) \\approx 0.32$, so $k_2/k_1 \\approx 2$. This is the familiar “about double per 10 K” case.",
);
q(
  "arrhenius-ea",
  "medium",
  "Given $k = 1.0 \\times 10^{-4}\\ \\mathrm{s^{-1}}$ at 300 K and $E_a = 38.3\\ \\mathrm{kJ\\ mol^{-1}}$, $k$ at 310 K is nearest",
  [
    "$1.6 \\times 10^{-4}\\ \\mathrm{s^{-1}}$",
    "$1.0 \\times 10^{-5}\\ \\mathrm{s^{-1}}$",
    "$3.8 \\times 10^{-2}\\ \\mathrm{s^{-1}}$",
    "$1.0 \\times 10^{-4}\\ \\mathrm{s^{-1}}$",
  ],
  0,
  "$\\log(k_2/k_1) = (38300/19.15)(10/93000) \\approx 0.215$, so $k_2 \\approx 1.6 \\times 10^{-4}\\ \\mathrm{s^{-1}}$.",
);
q(
  "arrhenius-ea",
  "medium",
  "On an Arrhenius plot of $\\ln k$ versus $1/T$ the intercept (extrapolated to $1/T = 0$) equals",
  ["$\\ln A$", "$-E_a$", "$A$", "$E_a/R$"],
  0,
  "$\\ln k = \\ln A - (E_a/R)(1/T)$. The intercept of that straight line is $\\ln A$.",
);
q(
  "arrhenius-ea",
  "medium",
  "Two reactions have similar $A$ factors. At a given temperature the slower one is the one with",
  [
    "the higher activation energy",
    "the lower activation energy",
    "the larger $n$ in the Nernst equation",
    "the smaller Faraday equivalent",
  ],
  0,
  "$k = A e^{-E_a/RT}$ falls exponentially as $E_a$ rises, so the higher barrier is slower if $A$ is comparable.",
);
q(
  "arrhenius-ea",
  "hard",
  "From $k(300\\ \\mathrm{K}) = 1.0 \\times 10^{-4}\\ \\mathrm{s^{-1}}$ and $k(310\\ \\mathrm{K}) = 2.0 \\times 10^{-4}\\ \\mathrm{s^{-1}}$, $k$ at 320 K is nearest",
  [
    "$3.8 \\times 10^{-4}\\ \\mathrm{s^{-1}}$",
    "$4.0 \\times 10^{-5}\\ \\mathrm{s^{-1}}$",
    "$2.0 \\times 10^{-3}\\ \\mathrm{s^{-1}}$",
    "$1.0 \\times 10^{-4}\\ \\mathrm{s^{-1}}$",
  ],
  0,
  "First $E_a$ from the 300/310 pair ($k$ doubles in 10 K, $E_a \\approx 53.6\\ \\mathrm{kJ\\ mol^{-1}}$), then $\\log(k_{320}/k_{300}) \\approx 0.58$, so $k_{320} \\approx 3.8 \\times 10^{-4}\\ \\mathrm{s^{-1}}$.",
);

// —— rate-factors: 10 (6 easy, 3 medium, 1 hard) ——
q(
  "rate-factors",
  "easy",
  "Increasing the concentration of a reactant that appears in the rate law generally",
  [
    "increases the reaction rate",
    "decreases $k$ at constant $T$",
    "stops the reaction completely",
    "changes $\\Delta H$ of the reaction",
  ],
  0,
  "Rate $= k[\\mathrm{A}]^x\\ldots$ grows with [A] whenever the order $x$ is positive.",
);
q(
  "rate-factors",
  "easy",
  "Heating a reaction mixture of thermally activated molecules typically",
  [
    "speeds the reaction because more molecules clear the energy barrier",
    "always shifts the equilibrium constant to 1",
    "lowers $E_a$ of an uncatalysed path",
    "has no kinetic effect below 100 °C",
  ],
  0,
  "Temperature enters $k$ through the Arrhenius factor. Equilibrium may also shift, but that is a separate thermodynamic effect.",
);
q(
  "rate-factors",
  "easy",
  "Adding a suitable catalyst to a reacting mixture",
  [
    "increases the rate by opening a lower-energy path",
    "is consumed as a stoichiometric reactant",
    "alters the value of $\\Delta H$ for the net reaction",
    "can change a first-order law into Faraday's law",
  ],
  0,
  "The catalyst is regenerated. It does not change the thermodynamics of the net reaction, only how fast equilibrium is reached.",
);
q(
  "rate-factors",
  "easy",
  "For a reaction between a solid and a gas or liquid, grinding the solid into a powder",
  [
    "raises the rate by exposing a larger surface",
    "lowers the rate because grains are smaller",
    "changes the stoichiometric equation",
    "removes the need for a collision",
  ],
  0,
  "Heterogeneous rates scale with the available surface. A powder offers far more area than a single lump of equal mass.",
);
q(
  "rate-factors",
  "easy",
  "Ionic reactions in water are often much faster than reactions of covalent organic molecules because",
  [
    "ions need little bond-breaking to meet, whereas covalent bonds must usually be broken and remade",
    "ions have no charge",
    "organic molecules never collide",
    "water cannot solvate ions",
  ],
  0,
  "The nature of the reactants matters: many aqueous ion combinations are essentially encounter-controlled, unlike typical covalent substitutions.",
);
q(
  "rate-factors",
  "easy",
  "Raising the pressure of a gaseous reactant (at fixed $T$) often increases the rate because",
  [
    "the concentration of that gas rises, and rate laws depend on concentration",
    "pressure changes the Faraday constant",
    "gases become solids above 2 atm",
    "molecularity becomes zero",
  ],
  0,
  "For an ideal gas, concentration $= p/RT$. A higher partial pressure therefore feeds the rate law.",
);
q(
  "rate-factors",
  "medium",
  "Marble chips dissolve in acid more slowly than an equal mass of marble powder because the chips have",
  [
    "a smaller surface area available for collision with H$^+$",
    "a different chemical formula",
    "zero activation energy",
    "a larger $E^\\circ$ as a galvanic anode",
  ],
  0,
  "The heterogeneous rate is surface-limited. Powdering increases the area and therefore the observed rate.",
);
q(
  "rate-factors",
  "medium",
  "A catalyst that accelerates both the forward and reverse steps equally will",
  [
    "leave $\\Delta H$ and the equilibrium constant unchanged",
    "make $\\Delta H$ more negative",
    "shift $K$ toward products at every temperature",
    "destroy the reverse reaction",
  ],
  0,
  "Equilibrium composition is fixed by $\\Delta G^\\circ$. The catalyst shortens the time needed to reach that same composition.",
);
q(
  "rate-factors",
  "medium",
  "A photochemical reaction differs from an ordinary thermal reaction in that its rate",
  [
    "depends on the intensity (and wavelength) of the absorbed light",
    "is completely independent of photon energy",
    "can never involve a chain of radicals",
    "always follows Faraday's second law",
  ],
  0,
  "Absorption of a suitable photon supplies the activation; brighter light of the right colour produces more excited molecules per second.",
);
q(
  "rate-factors",
  "hard",
  "A gas-phase reaction is first order in A. Doubling the partial pressure of A at constant $T$ and then raising $T$ so that $k$ also doubles will multiply the rate by",
  ["4", "2", "1", "8"],
  0,
  "First-order rate $= k[\\mathrm{A}]$. Doubling [A] (via $p_A$) doubles the rate; doubling $k$ doubles it again, so the net factor is 4.",
);

// —— collision-qual: 5 (3 easy, 2 medium, 0 hard) ——
q(
  "collision-qual",
  "easy",
  "According to collision theory, a chemically effective encounter must supply at least the",
  [
    "threshold (activation) energy",
    "lattice energy of a salt",
    "Faraday equivalent of the product",
    "standard EMF of a Daniell cell",
  ],
  0,
  "Only collisions whose relative kinetic energy exceeds $E_a$ can cross the barrier into products.",
);
q(
  "collision-qual",
  "easy",
  "Besides enough energy, colliding molecules must also have a suitable",
  [
    "orientation of the reactive parts toward each other",
    "nuclear spin of every proton",
    "colour in the visible spectrum",
    "negative activation energy",
  ],
  0,
  "A steric (orientation) requirement means that a sideways or backside-wrong hit wastes the energy of an otherwise hot collision.",
);
q(
  "collision-qual",
  "easy",
  "An effective collision is one that",
  [
    "has both sufficient energy and the correct geometry, and therefore leads to product",
    "occurs at the wall of the vessel only",
    "involves the solvent but never the solute",
    "always produces light",
  ],
  0,
  "Collision theory writes rate ∝ (collision frequency) × (energy factor) × (steric factor).",
);
q(
  "collision-qual",
  "medium",
  "Most collisions in a gas-phase sample do not yield product because",
  [
    "they lack either the required energy or the required orientation (or both)",
    "molecules never touch one another",
    "the collision frequency is exactly zero",
    "Faraday's first law forbids gas reactions",
  ],
  0,
  "The exponential energy factor $e^{-E_a/RT}$ is usually ≪ 1, and the steric factor is also less than 1, so only a tiny fraction of hits succeed.",
);
q(
  "collision-qual",
  "medium",
  "The steric factor $P$ introduced in collision theory is less than one when",
  [
    "only some geometries of an otherwise energetic collision can lead to reaction",
    "every collision is chemically productive",
    "$E_a$ is exactly zero",
    "the reaction is zero order",
  ],
  0,
  "$P$ (also called the probability factor) corrects the simple hard-sphere collision rate for orientation and other restrictions.",
);

const expected = {
  conductance: { total: 16, easy: 10, medium: 5, hard: 1 },
  kohlrausch: { total: 12, easy: 7, medium: 4, hard: 1 },
  "cells-emf": { total: 22, easy: 13, medium: 7, hard: 2 },
  nernst: { total: 18, easy: 11, medium: 5, hard: 2 },
  "electrolysis-faraday": { total: 20, easy: 12, medium: 6, hard: 2 },
  "batteries-corrosion": { total: 10, easy: 6, medium: 3, hard: 1 },
  "rate-law": { total: 18, easy: 11, medium: 5, hard: 2 },
  "order-molecularity": { total: 14, easy: 8, medium: 5, hard: 1 },
  "integrated-half-life": { total: 24, easy: 14, medium: 7, hard: 3 },
  "arrhenius-ea": { total: 16, easy: 10, medium: 5, hard: 1 },
  "rate-factors": { total: 10, easy: 6, medium: 3, hard: 1 },
  "collision-qual": { total: 5, easy: 3, medium: 2, hard: 0 },
};

const problems = [];
if (questions.length !== 185) problems.push(`count ${questions.length} !== 185`);
if (questions[0]?.id !== "che-ek-101") problems.push(`first id ${questions[0]?.id}`);
if (questions.at(-1)?.id !== "che-ek-285") problems.push(`last id ${questions.at(-1)?.id}`);

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
