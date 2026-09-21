/**
 * Writes content/seed/chemistry__periodicity.json
 * TSBIE Intermediate 1st year — Classification of Elements and Periodicity (original practice MCQs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { item, pack } from "../lib/author-chem.mjs";
import { stemsClash } from "../lib/stems.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");
const outFile = path.join(root, "content", "seed", "chemistry__periodicity.json");
const stemsFile = path.join(root, "scripts", ".bank-stems.json");

const chapterId = "chemistry-classification-of-elements-and-periodicity-in-properties";
const prefix = "che-pe";
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

// —— historical-classification: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "historical-classification",
  "easy",
  "Dobereiner arranged chemically similar elements into sets of three that he called",
  ["octaves", "triads", "periods", "blocks"],
  1,
  "Each Dobereiner triad contains three related elements, with the middle one intermediate in properties.",
);
q(
  "historical-classification",
  "easy",
  "In a Dobereiner triad the atomic mass of the middle element is approximately",
  [
    "the product of the other two atomic masses",
    "the arithmetic mean of the other two atomic masses",
    "twice the atomic mass of the lightest member",
    "equal to the atomic number of the heaviest member",
  ],
  1,
  "The middle atomic mass is close to the average of the first and third members.",
);
q(
  "historical-classification",
  "easy",
  "Newlands noticed that every eighth element resembled the first and named this regularity the",
  ["law of octaves", "law of triads", "modern periodic law", "octet rule of Lewis"],
  0,
  "He compared the repeating chemical likeness to the octaves of a musical scale.",
);
q(
  "historical-classification",
  "easy",
  "Newlands' arrangement gave a useful resemblance of properties only as far as the element",
  ["helium", "calcium", "iron", "iodine"],
  1,
  "Beyond calcium the octave pattern broke down as many new elements were fitted in.",
);
q(
  "historical-classification",
  "easy",
  "Mendeleev's periodic law stated that the properties of elements are a periodic function of their",
  ["atomic numbers", "atomic masses", "mass numbers only", "neutron counts"],
  1,
  "Mendeleev ordered the then-known elements by increasing atomic mass and found a repeating pattern.",
);
q(
  "historical-classification",
  "easy",
  "A distinctive feature of Mendeleev's table was that he",
  [
    "placed isotopes in separate groups",
    "left vacant places for elements still undiscovered",
    "arranged elements strictly by atomic number",
    "refused to predict any new element",
  ],
  1,
  "Gaps such as those for eka-aluminium and eka-silicon were later filled by gallium and germanium.",
);
q(
  "historical-classification",
  "easy",
  "A recognised limitation of Mendeleev's classification is the uncertain position of",
  ["alkali metals", "isotopes of the same element", "halogens", "alkaline earth metals"],
  1,
  "Isotopes have different atomic masses but identical chemistry, so a mass-based table cannot place them uniquely.",
);
q(
  "historical-classification",
  "medium",
  "The element Mendeleev called eka-aluminium was later isolated and named",
  ["scandium", "gallium", "germanium", "silicon"],
  1,
  "Eka-aluminium occupies the place under aluminium and matches gallium in properties and atomic mass.",
);
q(
  "historical-classification",
  "medium",
  "Eka-silicon of Mendeleev's table corresponds to the later-discovered element",
  ["tin", "lead", "germanium", "carbon"],
  2,
  "Germanium fills the gap Mendeleev left beneath silicon and agrees with his predicted properties.",
);
q(
  "historical-classification",
  "medium",
  "Tellurium was placed before iodine in Mendeleev's table even though Te has the greater atomic mass so that",
  [
    "tellurium would sit with the noble gases",
    "chemically similar elements remained in the same group",
    "iodine would have a lower atomic number",
    "the table would contain only eight periods",
  ],
  1,
  "Chemical analogy (Te with O, S, Se; I with F, Cl, Br) was given priority over a strict mass sequence.",
);
q(
  "historical-classification",
  "medium",
  "In the triad lithium–sodium–potassium the atomic mass of sodium is close to",
  [
    "the difference of the atomic masses of Li and K",
    "the mean of the atomic masses of lithium and potassium",
    "twice the atomic mass of potassium",
    "the atomic number of lithium",
  ],
  1,
  "Li (7), Na (23) and K (39) illustrate Dobereiner's mean-mass rule for a triad.",
);
q(
  "historical-classification",
  "hard",
  "Argon (atomic mass about 40) sits before potassium (about 39) in the older table because",
  [
    "argon has the smaller atomic number, which Mendeleev already used",
    "chemical properties forced the placement; atomic number later justified it",
    "potassium is a noble gas",
    "argon has fewer neutrons than potassium",
  ],
  1,
  "Mass inversion of the Ar–K pair is an anomalous pair of Mendeleev's table, resolved by Moseley's atomic-number order.",
);

// —— modern-law-table: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "modern-law-table",
  "easy",
  "The modern periodic law states that properties of elements are a periodic function of their",
  ["atomic masses", "atomic numbers", "mass numbers", "neutron-to-proton ratios"],
  1,
  "After Moseley, atomic number Z replaced atomic mass as the classifying index.",
);
q(
  "modern-law-table",
  "easy",
  "Henry Moseley's X-ray studies showed that the correct basis for classifying elements is",
  ["atomic mass", "atomic number", "density", "atomic volume"],
  1,
  "The frequency of characteristic X-rays varies regularly with Z, not with A.",
);
q(
  "modern-law-table",
  "easy",
  "The long form of the periodic table is constructed primarily on the basis of",
  ["atomic volumes of Lothar Meyer", "electronic configurations of the elements", "boiling points only", "natural abundances"],
  1,
  "Each period begins when a new principal shell starts to fill and ends at a noble-gas configuration.",
);
q(
  "modern-law-table",
  "easy",
  "In the long form of the periodic table the number of vertical groups is",
  ["seven", "eight", "sixteen", "eighteen"],
  3,
  "IUPAC numbers the groups from 1 to 18 in the 18-column table.",
);
q(
  "modern-law-table",
  "easy",
  "The long form of the periodic table contains how many horizontal periods?",
  ["five", "six", "seven", "eighteen"],
  2,
  "Periods 1 to 7 run from hydrogen to the heaviest known elements.",
);
q(
  "modern-law-table",
  "easy",
  "A horizontal row of the periodic table is called a",
  ["group", "period", "block", "family of isotopes"],
  1,
  "Elements in one period have the same valence principal quantum number.",
);
q(
  "modern-law-table",
  "easy",
  "A vertical column of the periodic table is called a",
  ["period", "group", "series of isobars", "shell"],
  1,
  "A group collects elements with the same valence-shell configuration and similar chemistry.",
);
q(
  "modern-law-table",
  "easy",
  "Elements of one group show similar chemical properties mainly because they have",
  [
    "the same mass number",
    "the same valence-shell electronic configuration",
    "identical atomic radii",
    "the same number of neutrons",
  ],
  1,
  "Valence configuration repeats down a group (for example ns¹ for alkali metals).",
);
q(
  "modern-law-table",
  "easy",
  "The period number of an element equals the",
  [
    "number of valence electrons",
    "principal quantum number of its valence shell",
    "atomic number divided by two",
    "group number in every case",
  ],
  1,
  "Period 3 elements have n = 3 as the outer shell, period 4 have n = 4, and so on.",
);
q(
  "modern-law-table",
  "easy",
  "IUPAC temporary names for elements with Z greater than 100 are built from",
  [
    "the discoverer's surname only",
    "Latin roots of the digits of the atomic number",
    "the atomic mass rounded to an integer",
    "the name of the mineral in which they occur",
  ],
  1,
  "Each digit 0–9 has a Latin stem (nil, un, bi, …) so Z = 107 is unnilseptium until a permanent name is approved.",
);
q(
  "modern-law-table",
  "medium",
  "Isotopes of one element occupy a single position in the modern table because they share the",
  ["mass number", "atomic number", "neutron number", "atomic mass exactly"],
  1,
  "The modern law uses Z; isotopes differ in N and A but not in Z or chemistry.",
);
q(
  "modern-law-table",
  "medium",
  "The argon–potassium pair is placed in the order Ar then K once elements are arranged by",
  ["atomic mass", "atomic number", "density", "atomic volume"],
  1,
  "Z(Ar) = 18 and Z(K) = 19, so the modern sequence matches chemical groups even though A(Ar) > A(K).",
);
q(
  "modern-law-table",
  "medium",
  "A group-2 (alkaline earth) atom has how many valence electrons in the ns subshell?",
  ["one", "two", "three", "eight"],
  1,
  "The configuration ends in ns², so the group number in the s-block equals the valence-electron count.",
);
q(
  "modern-law-table",
  "medium",
  "Lanthanoids and actinoids are written as two separate rows beneath the main table so that",
  [
    "they are excluded from the periodic law",
    "the 18-column long form remains compact",
    "they can be treated as noble gases",
    "their atomic numbers can be ignored",
  ],
  1,
  "Inserting fourteen extra cells into periods 6 and 7 would make those rows awkwardly wide.",
);
q(
  "modern-law-table",
  "medium",
  "The fourteen lanthanoids still belong chemically to which period of the long form table?",
  ["period 4", "period 5", "period 6", "period 7"],
  2,
  "They follow lanthanum in period 6; actinoids similarly belong to period 7.",
);
q(
  "modern-law-table",
  "hard",
  "Moseley found that the square root of the characteristic X-ray frequency varies linearly with atomic number as $\\sqrt{\\nu}=a(Z-b)$. This showed that",
  [
    "atomic mass is still the fundamental index",
    "Z, not A, is the property that orders the elements",
    "neutrons determine chemical behaviour",
    "X-rays arise from valence-shell jumps only",
  ],
  1,
  "A plot of $\\sqrt{\\nu}$ against Z is a straight line; plots against atomic mass are irregular, so Z is the true periodic argument.",
);

// —— periods-groups-blocks: 20 (12 easy, 6 medium, 2 hard) ——
q(
  "periods-groups-blocks",
  "easy",
  "Alkali metals and alkaline earth metals together constitute the",
  ["p-block", "s-block", "d-block", "f-block"],
  1,
  "Their differentiating electron enters the ns subshell (groups 1 and 2).",
);
q(
  "periods-groups-blocks",
  "easy",
  "The p-block of the long form table begins at boron and ends at",
  ["the alkaline earth metals", "the noble gases of each period", "the lanthanoids", "hydrogen only"],
  1,
  "Groups 13–18 are p-block; the last member of each of these periods is a noble gas.",
);
q(
  "periods-groups-blocks",
  "easy",
  "d-block elements are those whose differentiating electron enters a",
  ["ns subshell", "np subshell", "penultimate (n−1)d subshell", "(n−2)f subshell"],
  2,
  "That is the definition of the transition series occupying groups 3–12.",
);
q(
  "periods-groups-blocks",
  "easy",
  "Lanthanoids and actinoids together constitute the",
  ["s-block", "p-block", "d-block", "f-block"],
  3,
  "Their differentiating electron enters the (n−2)f subshell; they are the inner transition elements.",
);
q(
  "periods-groups-blocks",
  "easy",
  "Hydrogen and helium are the only two members of the",
  ["second period", "first period", "d-block", "halogen family"],
  1,
  "Period 1 fills the 1s subshell and therefore contains just H and He.",
);
q(
  "periods-groups-blocks",
  "easy",
  "A short period of eight members starts at lithium and ends at",
  ["argon", "neon", "sodium", "fluorine"],
  1,
  "Period 2 fills 2s and 2p (2 + 6 = 8 elements) from Li to Ne.",
);
q(
  "periods-groups-blocks",
  "easy",
  "Sodium through argon form the second short period, matching the length of the",
  ["lithium–neon row", "potassium–krypton row", "scandium–zinc row", "cerium–lutetium row"],
  0,
  "Period 3 also has eight elements (3s and 3p); 3d is not yet available.",
);
q(
  "periods-groups-blocks",
  "easy",
  "Filling of 4s, 3d and 4p subshells produces the first long period of",
  ["eight elements", "ten elements", "eighteen elements", "thirty-two elements"],
  2,
  "2 + 10 + 6 = 18 elements from potassium to krypton.",
);
q(
  "periods-groups-blocks",
  "easy",
  "Group 1 elements other than hydrogen are collectively called",
  ["alkaline earth metals", "alkali metals", "chalcogens", "pnictogens"],
  1,
  "Li, Na, K, Rb, Cs and Fr are the alkali metals.",
);
q(
  "periods-groups-blocks",
  "easy",
  "Beryllium, magnesium, calcium, strontium, barium and radium are the",
  ["alkali metals", "alkaline earth metals", "halogens", "coinage metals"],
  1,
  "They form group 2 and have the valence configuration ns².",
);
q(
  "periods-groups-blocks",
  "easy",
  "Fluorine, chlorine, bromine, iodine and astatine belong to the",
  ["noble-gas family", "halogen family", "alkali-metal family", "coinage-metal family"],
  1,
  "Group 17 elements are the halogens (salt-formers).",
);
q(
  "periods-groups-blocks",
  "easy",
  "Neon, argon, krypton, xenon and radon occupy the",
  ["first vertical column", "last vertical column of the long form table", "f-block", "middle of the d-block"],
  1,
  "They are the noble gases of group 18 (helium is also placed there).",
);
q(
  "periods-groups-blocks",
  "medium",
  "Main-group (representative) elements are those belonging to the",
  ["d-block only", "s- and p-blocks", "f-block only", "inner transition series"],
  1,
  "s- and p-block elements have their last electron in an ns or np orbital and show the classic group valences.",
);
q(
  "periods-groups-blocks",
  "medium",
  "An element is classed as a transition metal if it has an incomplete d subshell in the",
  [
    "nucleus",
    "free atom or in any of its common ions",
    "noble-gas core only",
    "f subshell exclusively",
  ],
  1,
  "IUPAC uses the incomplete-(n−1)d criterion; Zn²⁺ (d¹⁰) is often set aside as a typical transition ion.",
);
q(
  "periods-groups-blocks",
  "medium",
  "Inner transition metals are distinguished from the d-block by the filling of an",
  ["ns subshell", "np subshell", "f subshell", "1s subshell"],
  2,
  "Lanthanoids fill 4f and actinoids fill 5f, so they are the f-block (inner transition) series.",
);
q(
  "periods-groups-blocks",
  "medium",
  "Including the fourteen lanthanoids, the sixth period contains",
  ["eight elements", "eighteen elements", "thirty-two elements", "ten elements"],
  2,
  "Period 6 fills 6s, 4f, 5d and 6p: 2 + 14 + 10 + 6 = 32.",
);
q(
  "periods-groups-blocks",
  "medium",
  "Boron heads group 13; the remaining members of that group are best described as",
  ["noble gases", "metals", "halogens", "actinoids"],
  1,
  "Al, Ga, In and Tl are metals; boron is the non-metallic/metalloid head of the group.",
);
q(
  "periods-groups-blocks",
  "medium",
  "Helium is placed with the noble gases even though its configuration is $1s^{2}$ because",
  [
    "it has an incomplete p subshell",
    "it has a closed shell and is chemically inert",
    "it is an alkali metal",
    "its atomic number is eighteen",
  ],
  1,
  "A filled 1s shell gives helium the noble-gas chemistry of group 18, not the s-block reactivity of group 2.",
);
q(
  "periods-groups-blocks",
  "hard",
  "The fourth period contains eighteen elements because the subshells that fill in that period are",
  ["4s and 4p only", "4s, 3d and 4p", "5s, 4d and 5p", "4f and 5d only"],
  1,
  "Capacity 2 + 10 + 6 = 18; 4f is not occupied until period 6.",
);
q(
  "periods-groups-blocks",
  "hard",
  "The f-block is printed below the main table because inserting the fourteen lanthanoids into period 6 would",
  [
    "violate the modern periodic law",
    "make that row awkwardly wide",
    "change their atomic numbers",
    "turn them into s-block metals",
  ],
  1,
  "The two-row footnote is a display convention; chemically the lanthanoids still belong in period 6.",
);

// —— atomic-ionic-radius: 22 (13 easy, 7 medium, 2 hard) ——
q(
  "atomic-ionic-radius",
  "easy",
  "On moving from left to right across a period, the atomic radius of the elements generally",
  ["increases", "decreases", "remains exactly constant", "becomes infinite"],
  1,
  "Rising effective nuclear charge pulls the same-shell electrons inward, so the atom shrinks.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "On descending a group, the atomic radius of the elements generally",
  ["decreases", "increases", "becomes zero", "is independent of the new shell"],
  1,
  "Each step down adds a principal shell, which outweighs the extra nuclear charge.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "A cation is always smaller than the parent atom from which it is formed because",
  [
    "a new shell is added",
    "electrons are lost and the remaining cloud is held more tightly",
    "nuclear charge decreases",
    "the ion gains extra shielding",
  ],
  1,
  "Fewer electrons and a higher Zeff/electron ratio contract the ion relative to the atom.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "An anion is always larger than the parent atom from which it is formed because",
  [
    "nuclear charge increases",
    "extra electrons raise inter-electronic repulsion and the cloud expands",
    "a shell is completely removed",
    "the ion has fewer electrons than the atom",
  ],
  1,
  "The added electron(s) swell the electron cloud, so r(anion) > r(atom).",
);
q(
  "atomic-ionic-radius",
  "easy",
  "The covalent radius of an atom is half the internuclear distance in a",
  [
    "heteronuclear ionic crystal",
    "homonuclear single-bonded molecule",
    "van der Waals contact between two non-bonded atoms",
    "metallic unit cell only",
  ],
  1,
  "In Cl₂, for example, r(cov) = ½ d(Cl–Cl).",
);
q(
  "atomic-ionic-radius",
  "easy",
  "For the same element the van der Waals radius compared with the covalent radius is",
  ["smaller", "larger", "exactly equal", "undefined"],
  1,
  "van der Waals contact is a non-bonded approach, so the apparent radius is greater than the bonded covalent radius.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "The steady rise of effective nuclear charge across a period pulls the electron cloud inward and therefore",
  ["expands the atom", "shrinks the atom", "adds a new shell", "creates an anion"],
  1,
  "Zeff increases left to right while n stays the same, so atomic size falls.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "Addition of a new principal shell is the main reason atomic size",
  ["falls across a period", "grows down a group", "is identical for all metals", "vanishes for noble gases"],
  1,
  "The extra shell lies farther from the nucleus, so group radii increase top to bottom.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "Metallic radius is half the distance between neighbouring nuclei in a",
  ["gaseous homonuclear molecule", "metallic crystal", "van der Waals dimer", "hydrated ion"],
  1,
  "It is the radius used for metals in the close-packed or body-centred lattice.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "Isoelectronic species are atoms or ions that contain",
  ["the same number of protons", "the same number of electrons", "the same mass number", "identical nuclear charges"],
  1,
  "N³⁻, O²⁻, F⁻, Ne, Na⁺ and Mg²⁺ are a familiar isoelectronic set (10 electrons).",
);
q(
  "atomic-ionic-radius",
  "easy",
  "In an isoelectronic series the ionic radius falls as the",
  ["nuclear charge falls", "nuclear charge rises", "mass number falls", "neutron count rises"],
  1,
  "More protons pull the same number of electrons more tightly, so size decreases with Z.",
);
q(
  "atomic-ionic-radius",
  "easy",
  "The fluoride ion is larger than a neutral fluorine atom because of",
  [
    "loss of the 2p electron",
    "extra electron–electron repulsion in F⁻",
    "a decrease in nuclear charge",
    "lanthanoid contraction",
  ],
  1,
  "Adding one electron to F expands the 2p cloud, so r(F⁻) > r(F).",
);
q(
  "atomic-ionic-radius",
  "easy",
  "Sodium ion is smaller than a sodium atom because",
  [
    "a 3p electron is added",
    "the entire 3s electron has been removed",
    "nuclear charge of Na⁺ is smaller",
    "Na⁺ has one extra shell",
  ],
  1,
  "Na is [Ne] 3s¹; Na⁺ is a compact neon-like core with higher Zeff per electron.",
);
q(
  "atomic-ionic-radius",
  "medium",
  "Among Li, Na, K and Rb, the atom with the largest covalent radius is",
  ["lithium", "sodium", "potassium", "rubidium"],
  3,
  "Size increases down group 1 as extra shells are added; Rb is the heaviest of the four.",
);
q(
  "atomic-ionic-radius",
  "medium",
  "Among Na, Mg, Al and Si, the smallest atomic radius belongs to",
  ["sodium", "magnesium", "aluminium", "silicon"],
  3,
  "Across period 3, Zeff rises and size falls, so Si is the smallest of this set.",
);
q(
  "atomic-ionic-radius",
  "medium",
  "The correct order of ionic radii is",
  ["Mg²⁺ > Na⁺ > F⁻ > O²⁻", "O²⁻ > F⁻ > Na⁺ > Mg²⁺", "Na⁺ > O²⁻ > F⁻ > Mg²⁺", "F⁻ > O²⁻ > Mg²⁺ > Na⁺"],
  1,
  "These four ions are isoelectronic (10 e⁻); radius falls as Z rises from 8 (O) to 12 (Mg).",
);
q(
  "atomic-ionic-radius",
  "medium",
  "Gallium has an atomic radius close to that of aluminium because of",
  [
    "a sudden drop in nuclear charge",
    "the intervening 3d contraction",
    "lanthanoid contraction in period 4",
    "the absence of a 4p subshell",
  ],
  1,
  "Poorly shielding 3d¹⁰ electrons raise Zeff on Ga and cancel the expected size increase down the group.",
);
q(
  "atomic-ionic-radius",
  "medium",
  "Among the isoelectronic set S²⁻, Cl⁻, K⁺ and Ca²⁺, the smallest species is",
  ["S²⁻", "Cl⁻", "K⁺", "Ca²⁺"],
  3,
  "All have 18 electrons; Ca²⁺ has the largest nuclear charge (Z = 20) and therefore the most contracted cloud.",
);
q(
  "atomic-ionic-radius",
  "medium",
  "The covalent radius of silicon is larger than that of carbon because silicon",
  [
    "has fewer electrons",
    "has one extra principal shell",
    "has a greater Zeff in the same shell",
    "is a halogen",
  ],
  1,
  "C is period 2 and Si is period 3; the added n = 3 shell makes Si larger.",
);
q(
  "atomic-ionic-radius",
  "medium",
  "The size order Li⁺ > Be²⁺ > B³⁺ holds because",
  [
    "electron count rises along the series",
    "nuclear charge rises while the electron count stays two",
    "a new shell is added at each step",
    "these ions are not isoelectronic",
  ],
  1,
  "All three are 1s² species; higher Z pulls the same two electrons closer.",
);
q(
  "atomic-ionic-radius",
  "hard",
  "Zirconium and hafnium have nearly identical atomic radii because of",
  ["alkali-metal contraction", "lanthanoid contraction", "an extra 4s shell on Hf", "a fall in Z from Zr to Hf"],
  1,
  "The 14 poorly shielding 4f electrons inserted before Hf shrink it so that r(Hf) ≈ r(Zr).",
);
q(
  "atomic-ionic-radius",
  "hard",
  "Fe²⁺ is larger than Fe³⁺ because removal of an extra electron",
  [
    "adds a new shell",
    "raises Zeff and shrinks the remaining 3d cloud",
    "lowers the nuclear charge",
    "converts iron into a noble gas",
  ],
  1,
  "Both ions are iron, but Fe³⁺ has fewer electrons and a higher charge density, so it is the smaller cation.",
);

// —— ionization-enthalpy: 24 (14 easy, 7 medium, 3 hard) ——
q(
  "ionization-enthalpy",
  "easy",
  "Ionisation enthalpy is the energy needed to remove an electron from an isolated gaseous atom in its",
  ["first excited state only", "ground state", "metallic crystal", "aqueous solution"],
  1,
  "The textbook definition uses the ground-state gaseous atom: M(g) → M⁺(g) + e⁻.",
);
q(
  "ionization-enthalpy",
  "easy",
  "The first ionisation enthalpy refers to removal of an electron from the",
  ["uninegative ion", "neutral gaseous atom", "dipositive cation", "solid metal lattice"],
  1,
  "IE₁ is for M(g); IE₂ is for M⁺(g), and so on.",
);
q(
  "ionization-enthalpy",
  "easy",
  "First ionisation enthalpy generally increases from left to right across a",
  ["group", "period", "f-block row only", "set of isotopes"],
  1,
  "Zeff rises and size falls across a period, so the outer electron is harder to remove.",
);
q(
  "ionization-enthalpy",
  "easy",
  "First ionisation enthalpy generally decreases from top to bottom in a",
  ["period", "group", "isoelectronic pair", "triad of identical Z"],
  1,
  "The valence electron is farther from the nucleus and more shielded in the heavier congener.",
);
q(
  "ionization-enthalpy",
  "easy",
  "Ionisation enthalpies of elements are commonly expressed in",
  ["kelvin", "kilojoules per mole", "atmospheres", "cubic centimetres"],
  1,
  "TSBIE tables quote ΔᵢH in kJ mol⁻¹ (sometimes also in eV per atom).",
);
q(
  "ionization-enthalpy",
  "easy",
  "Noble gases have exceptionally high ionisation enthalpies because of their",
  ["half-filled d subshells", "closed-shell configurations", "very large atomic radii", "metallic bonding"],
  1,
  "A complete ns² np⁶ (or 1s² for He) set is especially stable, so removal of an electron costs a lot of energy.",
);
q(
  "ionization-enthalpy",
  "easy",
  "In any period the alkali metal has the",
  [
    "highest first ionisation enthalpy",
    "lowest first ionisation enthalpy",
    "same IE as the noble gas",
    "negative ionisation enthalpy",
  ],
  1,
  "The single ns¹ electron is large, weakly held and easily lost.",
);
q(
  "ionization-enthalpy",
  "easy",
  "The second ionisation enthalpy of an element compared with its first is always",
  ["smaller", "larger", "equal", "negative"],
  1,
  "The second electron is taken from a already positive ion, so IE₂ > IE₁ in every case.",
);
q(
  "ionization-enthalpy",
  "easy",
  "Metals typically have lower ionisation enthalpies than the non-metals of the",
  ["same group only", "same period", "f-block exclusively", "gaseous state only"],
  1,
  "Left-hand (metallic) elements are larger and have smaller Zeff, so they lose electrons more readily.",
);
q(
  "ionization-enthalpy",
  "easy",
  "Inner-electron screening reduces the effective nuclear charge and thereby",
  ["raises ionisation enthalpy", "lowers ionisation enthalpy", "creates a new period", "removes the nucleus"],
  1,
  "A well-shielded valence electron feels less pull and is easier to remove.",
);
q(
  "ionization-enthalpy",
  "easy",
  "A smaller atomic radius generally corresponds to a",
  ["lower ionisation enthalpy", "higher ionisation enthalpy", "zero ionisation enthalpy", "negative electron count"],
  1,
  "The outer electron is closer to the nucleus and more tightly bound in a smaller atom.",
);
q(
  "ionization-enthalpy",
  "easy",
  "Successive ionisation enthalpies of an atom increase because the cation left behind",
  [
    "holds its remaining electrons more tightly",
    "gains a new shell",
    "becomes electrically neutral",
    "has a smaller nuclear charge",
  ],
  0,
  "Each removal raises the charge on the ion and shrinks the cloud, so the next IE is larger.",
);
q(
  "ionization-enthalpy",
  "easy",
  "The process whose enthalpy change is the first ionisation enthalpy is",
  [
    "$\\mathrm{M}^{+}(g)+e^{-}\\rightarrow \\mathrm{M}(g)$",
    "$\\mathrm{M}(g)\\rightarrow \\mathrm{M}^{+}(g)+e^{-}$",
    "$\\mathrm{M}(g)+e^{-}\\rightarrow \\mathrm{M}^{-}(g)$",
    "$\\mathrm{M}(s)\\rightarrow \\mathrm{M}(g)$",
  ],
  1,
  "IE₁ is defined for the isolated gaseous atom losing one electron.",
);
q(
  "ionization-enthalpy",
  "easy",
  "Among the period-2 elements, the highest first ionisation enthalpy belongs to",
  ["lithium", "fluorine", "neon", "carbon"],
  2,
  "Neon is the noble gas of that period and has the most tightly held closed-shell electrons.",
);
q(
  "ionization-enthalpy",
  "medium",
  "Beryllium has a higher first ionisation enthalpy than boron because Be has a",
  ["half-filled 2p set", "filled 2s subshell", "larger atomic radius than Li", "vacant 1s orbital"],
  1,
  "Removing an electron from stable 2s² (Be) costs more than removing the single 2p electron of B.",
);
q(
  "ionization-enthalpy",
  "medium",
  "Nitrogen has a higher first ionisation enthalpy than oxygen because N has a",
  ["filled 2s² 2p⁶ shell", "half-filled 2p³ set", "larger nuclear charge than O", "d-orbital vacancy"],
  1,
  "The extra stability of half-filled 2p³ outweighs the one-unit rise in Z from N to O.",
);
q(
  "ionization-enthalpy",
  "medium",
  "Magnesium shows a higher first ionisation enthalpy than aluminium, an exception similar to",
  ["Na versus Ar", "Be versus B", "F versus Ne", "K versus Ca"],
  1,
  "Mg (3s²) is harder to ionise than Al (3p¹), just as Be (2s²) is harder than B (2p¹).",
);
q(
  "ionization-enthalpy",
  "medium",
  "Phosphorus has a higher first ionisation enthalpy than sulphur because of the extra stability of the",
  ["filled 3s² 3p⁶ set", "half-filled 3p³ configuration", "empty 3d subshell of S", "metallic bond in phosphorus"],
  1,
  "P is 3p³; the paired 3p⁴ electron of S is easier to remove, so IE(P) > IE(S).",
);
q(
  "ionization-enthalpy",
  "medium",
  "Between lithium and beryllium, beryllium has the greater first ionisation enthalpy because of its",
  ["lower Zeff and 2p¹ configuration", "higher Zeff and 2s² configuration", "much larger radius", "noble-gas core of argon"],
  1,
  "Be is smaller, has one extra proton and a filled 2s pair, so IE₁(Be) > IE₁(Li).",
);
q(
  "ionization-enthalpy",
  "medium",
  "The second ionisation enthalpy of sodium is very large because the second electron must be taken from the",
  ["3s¹ valence orbital", "neon-like 2p⁶ core", "4s subshell", "empty 3d set"],
  1,
  "After loss of 3s¹, Na⁺ is isoelectronic with Ne; breaking that closed shell requires a large IE₂.",
);
q(
  "ionization-enthalpy",
  "medium",
  "First ionisation enthalpy falls in the order Li > Na > K because",
  [
    "nuclear charge falls down the group",
    "atomic size increases down the group",
    "the number of valence electrons increases",
    "they become noble gases",
  ],
  1,
  "The ns¹ electron is farther from the nucleus and more shielded in Na and K than in Li.",
);
q(
  "ionization-enthalpy",
  "hard",
  "Although oxygen has a higher nuclear charge than nitrogen, its first ionisation enthalpy is lower because",
  [
    "oxygen has the larger atomic radius",
    "the extra electron in 2p⁴ is paired and is easier to remove",
    "nitrogen has a filled 2p⁶ shell",
    "oxygen lacks a 2s subshell",
  ],
  1,
  "Size would suggest IE(O) > IE(N), but pairing repulsion in 2p⁴ reverses the trend.",
);
q(
  "ionization-enthalpy",
  "hard",
  "Boron has a lower first ionisation enthalpy than beryllium even though B is smaller, because",
  [
    "the 2p electron of B is shielded by 2s² and is easier to remove than a 2s electron of Be",
    "boron has a noble-gas configuration",
    "beryllium has a half-filled 2p set",
    "nuclear charge falls from Be to B",
  ],
  0,
  "The two trends conflict: smaller size would raise IE, but the change of subshell (2s → 2p) lowers it, and the subshell effect wins.",
);
q(
  "ionization-enthalpy",
  "hard",
  "For magnesium, the jump between IE₂ and IE₃ is much larger than between IE₁ and IE₂ because the third electron",
  [
    "comes from the 3s subshell",
    "comes from the neon core",
    "is a 3p electron of Al",
    "enters a 4s orbital",
  ],
  1,
  "Mg is 3s², so IE₁ and IE₂ remove valence electrons; IE₃ must break the 2p⁶ core and is therefore very large.",
);

// —— electron-gain: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "electron-gain",
  "easy",
  "Electron gain enthalpy is the enthalpy change when an electron is added to a neutral gaseous atom to form a",
  ["cation", "uninegative ion", "crystal lattice", "hydrated proton"],
  1,
  "The defining process is X(g) + e⁻ → X⁻(g); ΔegH is usually negative when energy is released.",
);
q(
  "electron-gain",
  "easy",
  "A more negative electron gain enthalpy means a greater tendency of the atom to",
  ["lose a proton", "accept an electron", "form a cation", "expand its nucleus"],
  1,
  "The more energy released on adding an electron, the more favourable the gain.",
);
q(
  "electron-gain",
  "easy",
  "Halogens have the most negative electron gain enthalpies in their respective periods because they",
  [
    "have empty valence shells",
    "are one electron short of a noble-gas configuration",
    "are the largest atoms of the period",
    "cannot form anions",
  ],
  1,
  "Adding one electron completes ns² np⁶ and releases a large amount of energy.",
);
q(
  "electron-gain",
  "easy",
  "Noble-gas atoms have positive electron gain enthalpies because the extra electron must",
  ["pair in a half-filled p set", "enter a new shell", "remove a proton", "form a metallic bond"],
  1,
  "The incoming electron is added to a higher-n orbital against a closed shell, so energy must be supplied.",
);
q(
  "electron-gain",
  "easy",
  "Electron gain enthalpy generally becomes more negative on moving from left to right in a",
  ["group", "period", "set of isotopes", "metallic crystal"],
  1,
  "Zeff rises and the vacancy is closer to the nucleus, so electron attachment is more exothermic.",
);
q(
  "electron-gain",
  "easy",
  "On moving down a halogen group, electron gain enthalpy generally becomes less negative after",
  ["fluorine", "chlorine", "astatine", "helium"],
  1,
  "Cl has the most negative value; Br and I are less exothermic as the added electron is farther from the nucleus.",
);
q(
  "electron-gain",
  "easy",
  "Among the first two halogens, the more negative electron gain enthalpy belongs to",
  ["fluorine", "chlorine", "neon", "sodium"],
  1,
  "Cl is more exothermic than F, a well-known exception to the simple down-group trend.",
);
q(
  "electron-gain",
  "easy",
  "The second electron gain enthalpy of an atom is always",
  ["more negative than the first", "positive", "zero", "equal to the first"],
  1,
  "A negative ion must accept another electron, so energy is required and ΔegH₂ > 0.",
);
q(
  "electron-gain",
  "easy",
  "Conversion of O⁻(g) to O²⁻(g) is endothermic because a negative ion must",
  ["lose two protons", "accept another electron against its own charge", "enter the 1s shell", "become a cation"],
  1,
  "Electron–electron repulsion in O⁻ makes the second attachment unfavourable; oxides form in the lattice, not as free O²⁻(g).",
);
q(
  "electron-gain",
  "easy",
  "Electron affinity is often quoted as the negative of the",
  ["ionisation enthalpy", "electron gain enthalpy", "electronegativity", "atomic radius"],
  1,
  "Many older tables list EA as a positive number equal to −ΔegH when attachment is exothermic.",
);
q(
  "electron-gain",
  "medium",
  "Fluorine has a less negative electron gain enthalpy than chlorine because the compact 2p cloud of F suffers",
  [
    "almost no inter-electronic repulsion",
    "strong electron–electron repulsion when an extra electron is added",
    "a vacant 3d subshell",
    "lanthanoid contraction",
  ],
  1,
  "The incoming electron is forced into a very small 2p orbital already crowded with electrons.",
);
q(
  "electron-gain",
  "medium",
  "Among F, Cl, Br and I, the most negative electron gain enthalpy belongs to",
  ["fluorine", "chlorine", "bromine", "iodine"],
  1,
  "Chlorine combines a high Zeff with a large enough 3p orbital to avoid the extreme repulsion seen in F.",
);
q(
  "electron-gain",
  "medium",
  "Nitrogen has a near-zero or slightly positive electron gain enthalpy because its 2p subshell is already",
  ["empty", "half filled", "completely filled", "a d subshell"],
  1,
  "Adding an electron to 2p³ forces pairing and destroys the half-filled stability, so attachment is unfavourable.",
);
q(
  "electron-gain",
  "medium",
  "Beryllium and magnesium have unfavourable (near-zero or positive) electron gain enthalpies because they possess",
  ["half-filled 2p sets", "filled ns² subshells", "incomplete 1s shells", "seven valence electrons"],
  1,
  "The extra electron would have to enter a higher np orbital against a closed s pair.",
);
q(
  "electron-gain",
  "medium",
  "Among carbon, nitrogen, oxygen and fluorine, the most negative electron gain enthalpy is that of",
  ["carbon", "nitrogen", "oxygen", "fluorine"],
  3,
  "Fluorine is one electron short of neon and, despite the F/Cl anomaly, is still the most exothermic of this period-2 set.",
);
q(
  "electron-gain",
  "hard",
  "Chlorine outruns fluorine in electron gain enthalpy because the incoming electron enters a larger 3p orbital with less repulsion, even though fluorine has the",
  [
    "lower electronegativity",
    "higher electronegativity and higher Zeff",
    "greater number of shells",
    "smaller nuclear charge",
  ],
  1,
  "Two trends compete: F is smaller and more electronegative, yet inter-electronic repulsion in the compact 2p cloud makes ΔegH(F) less negative than ΔegH(Cl).",
);

// —— electronegativity: 16 (10 easy, 5 medium, 1 hard) ——
q(
  "electronegativity",
  "easy",
  "Electronegativity is the tendency of an atom in a chemical bond to attract the",
  ["nucleus of the other atom", "shared electron pair towards itself", "entire molecule into the lattice", "neutrons of the partner"],
  1,
  "It is a bonded-atom property, not an isolated-atom energy.",
);
q(
  "electronegativity",
  "easy",
  "The most widely used numerical scale of electronegativity is the",
  ["Mulliken scale only", "Pauling scale", "Celsius scale", "Rydberg scale"],
  1,
  "Pauling assigned fluorine the value 4.0 and built the rest of the scale from bond-energy data.",
);
q(
  "electronegativity",
  "easy",
  "Fluorine is the most electronegative element, with a Pauling value of about",
  ["1.0", "2.1", "3.0", "4.0"],
  3,
  "χ(F) = 4.0 is the reference maximum on the Pauling scale.",
);
q(
  "electronegativity",
  "easy",
  "Electronegativity of representative elements generally increases from left to right across a",
  ["group", "period", "lanthanoid row only", "set of isotopes"],
  1,
  "Zeff rises and size falls, so the bonded atom pulls the shared pair more strongly.",
);
q(
  "electronegativity",
  "easy",
  "Electronegativity of representative elements generally decreases from top to bottom in a",
  ["period", "group", "isoelectronic anion pair", "triad of identical mass"],
  1,
  "The bonding electrons are farther from the nucleus in the heavier congener.",
);
q(
  "electronegativity",
  "easy",
  "Among the alkali metals, the member with a particularly low electronegativity is",
  ["lithium", "sodium", "caesium", "beryllium"],
  2,
  "Cs is large and weakly attracting; it is one of the most electropositive metals.",
);
q(
  "electronegativity",
  "easy",
  "Electronegativity is a bonding property of an atom in a molecule, not an isolated-atom energy like",
  ["atomic number", "ionisation enthalpy", "mass number", "neutron count"],
  1,
  "IE and electron gain enthalpy refer to gaseous atoms or ions; χ is defined for an atom already in a bond.",
);
q(
  "electronegativity",
  "easy",
  "A large electronegativity difference between two bonded atoms favours",
  ["pure covalent character", "ionic character", "metallic bonding only", "no bond at all"],
  1,
  "The shared pair is strongly displaced toward the more electronegative atom, approaching ion formation.",
);
q(
  "electronegativity",
  "easy",
  "After fluorine, the next most electronegative element is",
  ["chlorine", "oxygen", "nitrogen", "neon"],
  1,
  "Pauling values: F (4.0) > O (3.5) > N ≈ Cl (about 3.0).",
);
q(
  "electronegativity",
  "easy",
  "Metals are characterised by low electronegativity values compared with",
  ["noble-gas cores", "non-metals", "their own cations only", "neutrons"],
  1,
  "Low χ and low IE together describe the electropositive, electron-losing behaviour of metals.",
);
q(
  "electronegativity",
  "medium",
  "Electronegativity falls in the order N > P > As because",
  [
    "atomic size increases down group 15",
    "nuclear charge falls down the group",
    "they become alkali metals",
    "the number of valence electrons decreases",
  ],
  0,
  "The bonded pair is held farther from the nucleus in the larger P and As atoms.",
);
q(
  "electronegativity",
  "medium",
  "In period 2 the electronegativity order is",
  ["F < O < N < C", "C < N < O < F", "N < C < F < O", "O < C < N < F"],
  1,
  "χ rises steadily across the period as Zeff increases and radius falls.",
);
q(
  "electronegativity",
  "medium",
  "Fluorine is more electronegative than chlorine, bromine and iodine because of its",
  [
    "larger size and lower Zeff",
    "small size and high effective nuclear charge",
    "half-filled 3d subshell",
    "metallic character",
  ],
  1,
  "The shared pair in an F–X bond sits closest to a compact, highly charged fluorine atom.",
);
q(
  "electronegativity",
  "medium",
  "On the Mulliken scale, electronegativity is taken as the average of",
  [
    "atomic radius and density",
    "ionisation enthalpy and electron gain enthalpy (in suitable units)",
    "mass number and atomic number",
    "melting point and boiling point",
  ],
  1,
  "Mulliken wrote χ ∝ (IE + EA)/2, combining the two isolated-atom energies that measure electron holding and accepting.",
);
q(
  "electronegativity",
  "medium",
  "The H–F bond is more polar than the H–Cl bond because fluorine is",
  [
    "less electronegative than chlorine",
    "more electronegative than chlorine",
    "larger than chlorine",
    "a metal",
  ],
  1,
  "The greater χ(F) − χ(H) gap displaces the shared pair more strongly toward fluorine.",
);
q(
  "electronegativity",
  "hard",
  "Fluorine outranks chlorine in electronegativity even though Cl has more protons, because the bonding pair in an F–X bond is",
  [
    "farther from the F nucleus",
    "much closer to the small, poorly shielded fluorine atom",
    "held only by London forces",
    "shared equally in every case",
  ],
  1,
  "Size and Zeff on the valence shell dominate χ; the extra protons of Cl are offset by an extra shielding shell.",
);

// —— valence-ox-states: 14 (8 easy, 5 medium, 1 hard) ——
q(
  "valence-ox-states",
  "easy",
  "Valence electrons of an atom are those present in its",
  ["innermost shell", "outermost shell", "nucleus", "neutron cloud"],
  1,
  "Chemical valence is decided by the electrons in the highest principal shell.",
);
q(
  "valence-ox-states",
  "easy",
  "Alkali metals exhibit a characteristic valence of",
  ["one", "two", "three", "seven"],
  0,
  "Each atom has a single ns¹ electron, which it loses (or shares) in compounds.",
);
q(
  "valence-ox-states",
  "easy",
  "Halogens commonly exhibit a valence of one, corresponding to the oxidation state",
  ["+7 in every ionic salt", "−1 in simple ionic compounds", "+1 only", "zero in all molecules"],
  1,
  "Gain of one electron completes the octet and gives X⁻ (fluoride, chloride, …).",
);
q(
  "valence-ox-states",
  "easy",
  "The characteristic oxidation state of alkali metals in their compounds is",
  ["−1", "+1", "+2", "+7"],
  1,
  "Loss of the single valence electron leaves a noble-gas cation M⁺.",
);
q(
  "valence-ox-states",
  "easy",
  "For many p-block elements the highest oxidation state equals the",
  [
    "number of neutrons",
    "number of valence electrons (the old group number)",
    "period number",
    "mass number minus Z",
  ],
  1,
  "Group 15 can reach +5, group 16 +6 and group 17 +7 when all valence electrons are involved.",
);
q(
  "valence-ox-states",
  "easy",
  "Carbon is tetravalent in the great majority of its stable compounds because it has",
  ["two valence electrons", "four valence electrons", "six valence electrons", "no valence electrons"],
  1,
  "The 2s² 2p² set provides four electrons for four covalent bonds (as in CH₄).",
);
q(
  "valence-ox-states",
  "easy",
  "Transition metals are noted for showing",
  ["only the oxidation state +1", "variable oxidation states", "no cations at all", "a unique oxidation state of −4"],
  1,
  "Both ns and (n−1)d electrons can take part in bonding, so several OS are common.",
);
q(
  "valence-ox-states",
  "easy",
  "In most of its compounds oxygen exhibits the oxidation state",
  ["+2", "−2", "+6", "0 only"],
  1,
  "Oxygen is highly electronegative and usually completes its octet by gaining or sharing two electrons.",
);
q(
  "valence-ox-states",
  "medium",
  "Nitrogen can show oxidation states ranging from −3 in ammonia to +5 in",
  ["nitrogen gas", "nitric acid", "hydrazine", "the nitride ion"],
  1,
  "HNO₃ and nitrates use all five valence electrons of N; NH₃ uses the −3 state.",
);
q(
  "valence-ox-states",
  "medium",
  "Manganese attains its highest oxidation state of +7 in the",
  ["manganous ion Mn²⁺", "permanganate ion", "manganese metal", "MnO solid only"],
  1,
  "In MnO₄⁻ the seven 4s and 3d electrons of Mn are all involved in bonding.",
);
q(
  "valence-ox-states",
  "medium",
  "Sulphur can show the +6 state in SO₃, whereas oxygen rarely exceeds −2, because sulphur has",
  ["a smaller size than oxygen", "vacant 3d orbitals", "fewer valence electrons", "no p orbitals"],
  1,
  "The 3d orbitals of S allow expansion of the octet; second-period O cannot do this.",
);
q(
  "valence-ox-states",
  "medium",
  "Chlorine exhibits odd positive oxidation states +1, +3, +5 and +7 in addition to",
  ["+8", "−1", "−7", "+2 only"],
  1,
  "The −1 state is the halide; the odd positive states appear in oxoacids and oxides as 3s and 3p (and 3d) electrons are unpaired.",
);
q(
  "valence-ox-states",
  "medium",
  "Group-14 elements typically form tetravalent compounds, matching",
  ["two valence electrons", "four valence electrons", "six valence electrons", "a noble-gas vacancy of one"],
  1,
  "The valence configuration ns² np² supplies four electrons for four bonds (CCl₄, SiCl₄, …).",
);
q(
  "valence-ox-states",
  "hard",
  "Among the 3d metals, the highest oxidation state is +7, shown by manganese, equal to the total of its",
  ["3p electrons only", "4s and 3d electrons", "4p electrons", "neutrons in ⁵⁵Mn"],
  1,
  "Mn is 4s² 3d⁵; using all seven electrons gives Mn(VII) as in KMnO₄. Iron does not reach +8 in ordinary compounds.",
);

// —— metallic-character: 14 (8 easy, 5 medium, 1 hard) ——
q(
  "metallic-character",
  "easy",
  "Metallic character of elements increases on moving",
  ["across a period from left to right", "down a group", "from Cs to Li", "from Na to Cl"],
  1,
  "Size grows and IE falls down a group, so the atom loses electrons more readily.",
);
q(
  "metallic-character",
  "easy",
  "Metallic character of elements decreases on moving from left to right across a",
  ["group", "period", "set of isotopes", "noble-gas family"],
  1,
  "IE and electronegativity rise across a period, so electron loss becomes less favourable.",
);
q(
  "metallic-character",
  "easy",
  "Metals tend to lose valence electrons and form",
  ["anions", "cations", "noble-gas atoms of lower Z", "free neutrons"],
  1,
  "Electropositive behaviour is the chemical signature of metallic character.",
);
q(
  "metallic-character",
  "easy",
  "Non-metals tend to gain electrons and form anions or",
  ["metallic lattices", "covalent molecules", "only monatomic cations", "bare nuclei"],
  1,
  "High IE and high electronegativity favour electron gain or sharing rather than cation formation.",
);
q(
  "metallic-character",
  "easy",
  "Metalloids show a mixture of",
  ["only ionic bonding", "metallic and non-metallic properties", "no electrical conductivity ever", "f-block chemistry only"],
  1,
  "Elements on the p-block staircase (B, Si, Ge, As, Sb, Te) are the usual metalloids.",
);
q(
  "metallic-character",
  "easy",
  "In the third period the most metallic element is",
  ["chlorine", "silicon", "sodium", "argon"],
  2,
  "Na stands at the left of period 3 and has the lowest IE of that row.",
);
q(
  "metallic-character",
  "easy",
  "In the second period the most non-metallic element is",
  ["lithium", "carbon", "fluorine", "beryllium"],
  2,
  "Fluorine has the highest electronegativity and a very high IE among the period-2 non-nobles.",
);
q(
  "metallic-character",
  "easy",
  "The reducing power of alkali metals increases down the group, in parallel with",
  ["ionisation enthalpy", "metallic character", "electronegativity", "electron gain enthalpy becoming more negative"],
  1,
  "The heavier alkali metal loses its ns¹ electron more easily and is therefore the stronger reductant.",
);
q(
  "metallic-character",
  "medium",
  "Metallic character in the set Na, Mg, Al decreases from",
  ["aluminium to sodium", "sodium to aluminium", "magnesium to sodium", "aluminium to argon"],
  1,
  "Across period 3 the atoms become smaller and harder to ionise, so metallic character falls Na > Mg > Al.",
);
q(
  "metallic-character",
  "medium",
  "Among Li, Na and K, potassium is the most metallic because it has the",
  ["smallest size and highest IE", "largest size and the lowest ionisation enthalpy", "highest electronegativity", "closed 3p⁶ valence shell"],
  1,
  "Down group 1, size rises and IE falls, so K loses its 4s electron most readily of the three.",
);
q(
  "metallic-character",
  "medium",
  "Lithium shows a diagonal resemblance in several of its compounds to",
  ["sodium", "magnesium", "potassium", "fluorine"],
  1,
  "Li and Mg have similar charge-to-radius ratios, so their oxides, fluorides and carbonates behave alike.",
);
q(
  "metallic-character",
  "medium",
  "Silicon is classified as a metalloid, sitting on the diagonal staircase of the",
  ["s-block", "p-block", "f-block", "noble-gas column"],
  1,
  "Si lies between the metal Al and the non-metal P and shows intermediate electrical and chemical behaviour.",
);
q(
  "metallic-character",
  "medium",
  "Caesium is more metallic than lithium because the valence electron of Cs is",
  [
    "closer to the nucleus and harder to lose",
    "farther from the nucleus and more easily lost",
    "a 2s electron",
    "part of a filled p⁶ set",
  ],
  1,
  "The 6s electron of Cs is highly shielded, so Cs has a very low IE and extreme metallic character.",
);
q(
  "metallic-character",
  "hard",
  "Aluminium is distinctly more metallic than boron, even though both head group 13, because Al is",
  [
    "smaller and has a higher ionisation enthalpy",
    "larger and has a much lower ionisation enthalpy",
    "a noble gas",
    "an f-block element",
  ],
  1,
  "Two trends reinforce: down the group size rises and IE falls, turning the head (B, a non-metal/metalloid) into a metal (Al).",
);

// —— anomalous-first: 12 (7 easy, 4 medium, 1 hard) ——
q(
  "anomalous-first",
  "easy",
  "The first element of a p-block or s-block group differs markedly from the",
  ["noble gases only", "heavier members of that group", "isotopes of hydrogen", "inner transition metals alone"],
  1,
  "Li, Be, B, C, N, O and F are the classic anomalous first members.",
);
q(
  "anomalous-first",
  "easy",
  "The anomalous behaviour of the first element is largely due to its",
  ["large size and low electronegativity", "small size and high electronegativity", "empty 4f subshell", "very low ionisation enthalpy"],
  1,
  "A compact valence shell and high χ (and IE) set the head element apart from its congeners.",
);
q(
  "anomalous-first",
  "easy",
  "Second-period elements lack vacant d orbitals, so they cannot",
  [
    "form any covalent bond",
    "expand their octet the way heavier congeners can",
    "show a +1 oxidation state",
    "exist as isolated atoms",
  ],
  1,
  "N, O and F are limited to an octet; P, S and Cl can use 3d orbitals in PF₅, SF₆, ClF₃, and so on.",
);
q(
  "anomalous-first",
  "easy",
  "Lithium differs from the rest of the alkali metals in several properties, including the low solubility of its",
  ["chloride only", "fluoride and carbonate", "all nitrates", "hydride vapour"],
  1,
  "LiF and Li₂CO₃ resemble the corresponding magnesium salts more than those of Na or K.",
);
q(
  "anomalous-first",
  "easy",
  "Lithium shows a diagonal relationship with",
  ["sodium", "magnesium", "caesium", "fluorine"],
  1,
  "The Li–Mg pair is the textbook diagonal relationship of group 1 / group 2.",
);
q(
  "anomalous-first",
  "easy",
  "Beryllium and aluminium form a well-known",
  ["inert-pair pair", "diagonal pair", "isotope pair", "noble-gas pair"],
  1,
  "Be and Al share amphoteric oxides, covalent chlorides and a similar charge-to-radius ratio.",
);
q(
  "anomalous-first",
  "easy",
  "Hydrogen bonding is important for the hydrides of nitrogen, oxygen and fluorine, the smallest and most electronegative",
  ["alkali metals", "first-row non-metals", "lanthanoids", "noble gases"],
  1,
  "Only N, O and F are small and electronegative enough for strong intermolecular hydrogen bonds.",
);
q(
  "anomalous-first",
  "medium",
  "Lithium burns in air to give mainly the monoxide Li₂O, whereas sodium readily forms the",
  ["hydride only", "peroxide", "ozonide exclusively", "nitride vapour"],
  1,
  "The small Li⁺ ion is stabilised by the small O²⁻ ion; larger Na⁺ prefers the peroxide O₂²⁻.",
);
q(
  "anomalous-first",
  "medium",
  "Carbon–carbon single bonds are much stronger than silicon–silicon bonds, so catenation is far more characteristic of",
  ["silicon", "carbon", "lead", "tin"],
  1,
  "The short, strong C–C bond and the inability of C to use d orbitals make long carbon chains uniquely stable.",
);
q(
  "anomalous-first",
  "medium",
  "Boron forms electron-deficient compounds such as B₂H₆, a behaviour not typical of",
  ["boron itself", "aluminium alkyls in the same simple way", "all p-block metals", "helium"],
  1,
  "Tiny boron has fewer valence orbitals than it needs for ordinary 2c–2e bonds, so it uses 3c–2e bridges.",
);
q(
  "anomalous-first",
  "medium",
  "Fluorine shows only the −1 oxidation state in its compounds, whereas chlorine can show",
  ["only −1 as well", "several positive oxidation states", "the +8 state in ClF₈", "no covalent compounds"],
  1,
  "F is the most electronegative element and has no vacant d orbitals, so it never takes a positive OS.",
);
q(
  "anomalous-first",
  "hard",
  "Lithium resembles magnesium more than sodium because Li⁺ and Mg²⁺ have similar charge-to-radius ratios, giving both a",
  ["low polarising power", "high polarising power", "closed 3d¹⁰ shell", "gaseous metallic lattice"],
  1,
  "The two ions polarise anions strongly, so their oxides, fluorides and organometallic compounds look alike — the diagonal relationship.",
);

// —— periodic-trends-general: 18 (11 easy, 5 medium, 2 hard) ——
q(
  "periodic-trends-general",
  "easy",
  "Periodicity of properties arises because similar valence-shell configurations recur at regular intervals of",
  ["atomic mass only", "atomic number", "neutron number", "mass defect"],
  1,
  "Each time a given ns / np pattern repeats, the chemistry of that group reappears.",
);
q(
  "periodic-trends-general",
  "easy",
  "Effective nuclear charge experienced by a valence electron is written $Z_{\\mathrm{eff}}=Z-\\sigma$, where $\\sigma$ is the",
  ["atomic mass", "screening constant", "mass number", "group number"],
  1,
  "Inner electrons cancel part of Z; the remainder is the effective nuclear charge felt by the outer electron.",
);
q(
  "periodic-trends-general",
  "easy",
  "Inner electrons shield valence electrons from the full attraction of the",
  ["neighbouring atoms", "nucleus", "neutron cloud", "crystal field"],
  1,
  "Screening (shielding) is the reason Zeff is smaller than Z.",
);
q(
  "periodic-trends-general",
  "easy",
  "Effective nuclear charge felt by the outermost electron",
  ["falls across a period", "increases across a period", "is zero for all metals", "equals the mass number"],
  1,
  "Electrons are added to the same shell, which screens poorly, so Zeff climbs left to right.",
);
q(
  "periodic-trends-general",
  "easy",
  "Down a group, the increase in shielding and the addition of shells outweigh the rise in nuclear charge, so",
  ["atomic size shrinks", "atomic size grows", "IE rises sharply", "all elements become noble gases"],
  1,
  "The net result is a larger, more loosely held valence electron in the heavier congener.",
);
q(
  "periodic-trends-general",
  "easy",
  "In a given period, a smaller atomic size is generally accompanied by a",
  ["smaller ionisation enthalpy", "larger ionisation enthalpy", "negative nuclear charge", "new f subshell"],
  1,
  "The outer electron is closer to the nucleus and harder to remove in the smaller atom.",
);
q(
  "periodic-trends-general",
  "easy",
  "Non-metallic character increases from left to right across a",
  ["group", "period", "set of alkali metals", "lanthanoid contraction pair"],
  1,
  "IE and electronegativity rise, so the tendency to gain or share electrons grows.",
);
q(
  "periodic-trends-general",
  "easy",
  "Melting points, boiling points and densities of elements also display",
  ["no variation with Z", "periodic variation", "a linear fall with mass number only", "identical values in every group"],
  1,
  "These bulk properties repeat in a rough pattern because bonding type and size are themselves periodic.",
);
q(
  "periodic-trends-general",
  "easy",
  "s-block elements are strongly electropositive metals, except for",
  ["sodium and potassium", "hydrogen and helium", "calcium and barium", "all of group 2"],
  1,
  "H and He are non-metals placed in period 1; the rest of the s-block are typical metals.",
);
q(
  "periodic-trends-general",
  "easy",
  "The p-block is the only block that contains metals, metalloids and non-metals in the",
  ["s-block groups", "same set of groups", "f-block rows", "first period alone"],
  1,
  "Group 14, for example, runs from non-metal C through metalloid Si/Ge to metals Sn and Pb.",
);
q(
  "periodic-trends-general",
  "easy",
  "Screening of the nuclear charge is poorer by d and f electrons than by",
  ["the nucleus itself", "s and p electrons of the same shell", "neutrons", "alpha particles"],
  1,
  "Penetrating s (and p) electrons cancel Z more effectively; d and f electrons leave a higher Zeff on the outside.",
);
q(
  "periodic-trends-general",
  "medium",
  "Neon has both a very small covalent radius and the highest first ionisation enthalpy of",
  ["period 3", "period 2", "the alkali metals", "the lanthanoids"],
  1,
  "Closed-shell compactness and maximum Zeff in that row make Ne the extreme of both trends.",
);
q(
  "periodic-trends-general",
  "medium",
  "From lithium to caesium, ionisation enthalpy falls while atomic radius rises, so the two trends reinforce the",
  ["decrease in metallic character", "increase in metallic character", "rise of electronegativity", "formation of noble gases"],
  1,
  "A larger, more loosely held ns¹ electron makes the heavier alkali metal more metallic.",
);
q(
  "periodic-trends-general",
  "medium",
  "Fluorine is more electronegative than chlorine, yet chlorine has the more negative electron gain enthalpy — a pair of trends that",
  ["always run in step", "do not run in step", "apply only to metals", "forbid any F–Cl bond"],
  1,
  "χ follows size/Zeff, while ΔegH of F is reduced by 2p–2p repulsion; the two properties therefore order F and Cl differently.",
);
q(
  "periodic-trends-general",
  "medium",
  "Na⁺ and neon are isoelectronic, but Na⁺ has the higher ionisation enthalpy because of its",
  ["smaller nuclear charge", "greater nuclear charge", "extra 3s electron", "f-block contraction"],
  1,
  "Both have 10 electrons; Z(Na⁺) = 11 > Z(Ne) = 10, so the Na⁺ cloud is more tightly bound.",
);
q(
  "periodic-trends-general",
  "medium",
  "The first ionisation enthalpy of gallium is slightly higher than that of aluminium because the poorly shielding 3d¹⁰ electrons",
  ["lower Zeff on Ga", "raise Zeff on Ga", "remove the 4p electron", "turn Ga into an alkali metal"],
  1,
  "d-block contraction increases Zeff and offsets the expected fall of IE down group 13.",
);
q(
  "periodic-trends-general",
  "hard",
  "Oxygen is smaller than nitrogen, which would suggest a higher IE for O, yet IE of O is lower than that of N because",
  [
    "oxygen has a half-filled 2p³ set",
    "the paired 2p⁴ electron of oxygen is easier to remove",
    "nitrogen has the larger nuclear charge",
    "oxygen lacks a 2s pair",
  ],
  1,
  "The size trend and the pairing-repulsion trend oppose each other; pairing wins, so IE(N) > IE(O).",
);
q(
  "periodic-trends-general",
  "hard",
  "Size decreases from Be to B, which would suggest a higher IE for B; the observed lower IE of B is due to",
  [
    "the ease of removing the 2p electron compared with Be 2s²",
    "a fall in nuclear charge from Be to B",
    "boron having a closed 2p⁶ shell",
    "beryllium being a halogen",
  ],
  0,
  "Again two trends conflict: smaller radius would raise IE, but the change of subshell (2s → 2p) lowers it.",
);

const expected = {
  "historical-classification": { total: 12, easy: 7, medium: 4, hard: 1 },
  "modern-law-table": { total: 16, easy: 10, medium: 5, hard: 1 },
  "periods-groups-blocks": { total: 20, easy: 12, medium: 6, hard: 2 },
  "atomic-ionic-radius": { total: 22, easy: 13, medium: 7, hard: 2 },
  "ionization-enthalpy": { total: 24, easy: 14, medium: 7, hard: 3 },
  "electron-gain": { total: 16, easy: 10, medium: 5, hard: 1 },
  "electronegativity": { total: 16, easy: 10, medium: 5, hard: 1 },
  "valence-ox-states": { total: 14, easy: 8, medium: 5, hard: 1 },
  "metallic-character": { total: 14, easy: 8, medium: 5, hard: 1 },
  "anomalous-first": { total: 12, easy: 7, medium: 4, hard: 1 },
  "periodic-trends-general": { total: 18, easy: 11, medium: 5, hard: 2 },
};

const problems = [];
if (questions.length !== 184) problems.push(`count ${questions.length} !== 184`);
if (questions[0]?.id !== "che-pe-101") problems.push(`first id ${questions[0]?.id}`);
if (questions.at(-1)?.id !== "che-pe-284") problems.push(`last id ${questions.at(-1)?.id}`);

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
