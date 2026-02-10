export type Chord = {
  name: string;
  notes: string[];
}

const BASE_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const ALTERATIONS = ["", "♯", "♭"];
const SEVENTH_CHORDS = [
  { str: "M7", intervals: [0, 4, 7, 11] },
  { str: "7", intervals: [0, 4, 7, 10] },
  { str: "m7", intervals: [0, 3, 7, 10] },
  { str: "m7(♭5)", intervals: [0, 3, 6, 10] },
];
const INTERVALS = {
  C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11
};

// Permet de forcer l'aléatoire à ne jamais donner deux fois le même accord de base
let previousBaseNote = "";

// ***** PUBLIC *****
/**
 * Génère un accord de septième au format string
 * @returns Accord de septième généré aléatoirement
 */
export function generate7thChord(): Chord {
  const alteration = ALTERATIONS[_getRandomInt(ALTERATIONS.length)];
  const seventhType = SEVENTH_CHORDS[_getRandomInt(SEVENTH_CHORDS.length)];
  let baseNote = BASE_NOTES[_getRandomInt(BASE_NOTES.length)];
  while (baseNote === previousBaseNote) {
    baseNote = BASE_NOTES[_getRandomInt(BASE_NOTES.length)];
  }
  previousBaseNote = baseNote;

  const stringChord = baseNote + alteration + seventhType.str;
  const noteChord = _stringToNoteChord(stringChord);
  return {
    name: stringChord,
    notes: noteChord
  };
}

/**
 * Convertit une note en sa version normalisée (sans altération ou un # maximum)
 * Exemples: Cb > B, Eb > D#, E## > F#, ...
 * @param note Note à convertir
 * @returns Note normalisée
 */
export function normalizeNoteToSharp(note: string): string {
  const SHARP_NAMES = [
    "C", "C-sharp", "D", "D-sharp", "E",
    "F", "F-sharp", "G", "G-sharp", "A",
    "A-sharp", "B"
  ];

  const match = note.match(/^([A-G])([♯♭]*)$/)!;
  const letter = match[1] as keyof typeof INTERVALS;
  const accidentals = match[2];

  let pitch = INTERVALS[letter];
  for (const acc of accidentals) {
    if (acc === "♯") pitch += 1;
    if (acc === "♭") pitch -= 1;
  }

  pitch = (pitch + 12) % 12;

  return SHARP_NAMES[pitch];
}

// ***** PRIVE *****
/**
 * Retourne les notes d'un accord
 * @param strChord Accord au format américain
 * @returns Liste des notes de l'accord
 */
function _stringToNoteChord(strChord: string) {
  const match = strChord.match(/^([A-G])([♯♭]?)(.*)$/)!;
  const rootLetter = match[1] as keyof typeof INTERVALS;
  const accidental = match[2];
  const type = match[3];

  // Hauteur réelle de la fondamentale
  let rootPitch = INTERVALS[rootLetter];
  if (accidental === "♯") rootPitch += 1;
  if (accidental === "♭") rootPitch -= 1;
  rootPitch = (rootPitch + 12) % 12;

  const rootIndex = BASE_NOTES.indexOf(rootLetter);
  const intervals = _getSeventhInterval(type);

  let notes = [];
  for (let i = 0, l = intervals.length; i < l; i++) {
    const interval = intervals[i];
    const targetLetter = BASE_NOTES[(rootIndex + i * 2) % 7] as keyof typeof INTERVALS;
    const naturalPitch = INTERVALS[targetLetter];
    const desiredPitch = (rootPitch + interval) % 12;

    let diff = (desiredPitch - naturalPitch + 12) % 12;
    if (diff > 6) diff -= 12;

    let accidental = "";
    if (diff === 1) accidental = "♯";
    if (diff === 2) accidental = "♯♯";
    if (diff === -1) accidental = "♭";
    if (diff === -2) accidental = "♭♭";

    notes.push(targetLetter + accidental);
  }
  return notes;
}

/**
 * A partir d'un type d'accord, retourne les intervals qui le compose
 * @param str Type d'accord (M7, m7, ...)
 * @returns Les intervals qui constituent l'accord
 */
function _getSeventhInterval(str: string): number[] {
  for (let sevChord of SEVENTH_CHORDS) {
    if (sevChord.str === str) return sevChord.intervals;
  }
  return [];
}

/**
 * Retourne un nombre aléatoire 0 < x < max
 * @param max Nombre maximal
 * @returns Nombre aléatoire entre 0 et max
 */
function _getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}