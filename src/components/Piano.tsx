import { onMount, type Component, type JSX } from 'solid-js';
import { normalizeNoteToSharp } from "../modules/chords.module";

export type PianoProps = {
  notes: string[];
} & JSX.HTMLAttributes<HTMLElement>;

const Piano: Component<PianoProps> = (props) => {
  // *** PROPRIETES ***
  /** Notes de l'accord */
  const notes = props.notes;

  // *** VARIABLES INTERNES ***
  const WHITE_STYLE = "fill:var(--secondary-color);";
  const BLACK_STYLE = "fill:var(--secondary-color);stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1";
  let pitch: number;

  /** 
   * On normalise la 1ère note de l'accord pour savoir sur quelle touche du piano elle doit démarrer
   * Les accords commençant par les touches G, A et B sont affichés sous le C medium
   */
  function _getBasePitch() {
    const chordBaseKey = normalizeNoteToSharp(notes[0])[0];
    if (chordBaseKey === "A" || chordBaseKey === "B" || chordBaseKey === "G") pitch = 0;
    else pitch = 1;
  }

  /**
   * L'octave change :
   * - Après une touche de A car la tierce supérieure sera un C
   * - Après une touche de B car la tierce supérieure sera un D
   * - Quand la touche actuelle est un C qui vient après un G
   * @param currentKey Touche du piano courante de l'accord
   * @param prevKey Touche du piano précédente de l'accord
   */
  function _checkPitchChange(currentKey: string, prevKey?: string) {
    if (prevKey) {
      const currentBaseKey = currentKey[0];
      const prevBaseKey = prevKey[0];
      if (prevBaseKey === "A" || prevBaseKey === "B" || (prevBaseKey && currentBaseKey === "C")) pitch++;
    }
  }

  /** Pour chaque note de l'accord, change le visuel de la touche clavier correspondante */
  function _colorNotes() {
    let prevKey;
    for (let note of notes) {
      const currentKey = normalizeNoteToSharp(note);
      _checkPitchChange(currentKey, prevKey);

      const $note = document.getElementById(`key-${currentKey}${pitch}`)!;
      if (currentKey.includes("sharp")) $note.setAttribute("style", BLACK_STYLE);
      else $note.setAttribute("style", WHITE_STYLE);

      prevKey = currentKey;
    }
  }

  onMount(() => {
    _getBasePitch();
    _colorNotes();
  });

  return (
    <>
      <svg
        viewBox="0 0 144.13791 41.78056"
        id="piano-keyboard"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <g
          id="layer1"
          transform="translate(0.1041764,0.10417625)">
          <rect
            style="fill:#f9f9f9;stroke:#1a1a1a;stroke-width:1.2;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
            id="rect1"
            width="142.93791"
            height="40.580559"
            x="0.49582362"
            y="0.49582377" />
          <g
            id="white-notes"
            style="fill:#f9f9f9">
            <rect
              style="fill:#f9f9f9;"
              id="key-F0"
              width="9.1584558"
              height="33.922863"
              x="0.86450773"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-G0"
              width="9.1584558"
              height="33.922863"
              x="10.389508"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-A0"
              width="9.1584558"
              height="33.922863"
              x="19.914507"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-B0"
              width="9.1584558"
              height="33.922863"
              x="29.439505"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-C1"
              width="9.1584558"
              height="33.922863"
              x="38.964504"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-D1"
              width="9.1584558"
              height="33.922863"
              x="48.489506"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-E1"
              width="9.1584558"
              height="33.922863"
              x="58.014507"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-F1"
              width="9.1584558"
              height="33.922863"
              x="67.539505"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-G1"
              width="9.1584558"
              height="33.922863"
              x="77.064499"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-A1"
              width="9.1584558"
              height="33.922863"
              x="86.589493"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-B1"
              width="9.1584558"
              height="33.922863"
              x="96.114487"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-C2"
              width="9.1584558"
              height="33.922863"
              x="105.63947"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-D2"
              width="9.1584558"
              height="33.922863"
              x="115.16446"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-E2"
              width="9.1584558"
              height="33.922863"
              x="124.68945"
              y="6.8703489" />
            <rect
              style="fill:#f9f9f9;"
              id="key-F2"
              width="9.1584558"
              height="33.922863"
              x="134.21448"
              y="6.8703489" />
          </g>
          <g
            id="g35">
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 10.083732,0.49582376 V 41.076382"
              id="path1" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 19.608734,0.49582376 V 41.076382"
              id="path2" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 29.133735,0.49582376 V 41.076382"
              id="path3" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 38.658737,0.49582376 V 41.076382"
              id="path4" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 48.183739,0.49582376 V 41.076382"
              id="path5" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 57.70874,0.49582376 V 41.076382"
              id="path6" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 67.233742,0.49582376 V 41.076382"
              id="path7" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 76.758744,0.49582376 V 41.076382"
              id="path8" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 86.283744,0.49582376 V 41.076382"
              id="path16" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 95.808744,0.49582376 V 41.076382"
              id="path17" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 105.33374,0.49582376 V 41.076382"
              id="path18" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 114.85874,0.49582376 V 41.076382"
              id="path19" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 124.38374,0.49582376 V 41.076382"
              id="path20" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 133.90874,0.49582376 V 41.076382"
              id="path21" />
          </g>
          <g
            id="black-notes"
            style="fill:#1a1a1a">
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-F-sharp0"
              width="5.9363465"
              height="22.28525"
              x="7.0322876"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-G-sharp0"
              width="5.9363465"
              height="22.28525"
              x="16.557287"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-A-sharp0"
              width="5.9363465"
              height="22.28525"
              x="26.082285"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-C-sharp1"
              width="5.9363465"
              height="22.28525"
              x="45.132286"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-D-sharp1"
              width="5.9363465"
              height="22.28525"
              x="54.657288"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-F-sharp1"
              width="5.9363465"
              height="22.28525"
              x="73.707283"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-G-sharp1"
              width="5.9363465"
              height="22.28525"
              x="83.232277"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-A-sharp1"
              width="5.9363465"
              height="22.28525"
              x="92.757271"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-C-sharp2"
              width="5.9363465"
              height="22.28525"
              x="111.80727"
              y="4.1999907" />
            <rect
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.7;stroke-opacity:1"
              id="key-D-sharp2"
              width="5.9363465"
              height="22.28525"
              x="121.33225"
              y="4.1999907" />
          </g>
          <g
            id="g34">
            <rect
              style="fill:#1a1a1a;stroke:none;stroke-width:6.84736;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none"
              id="rect33"
              width="3.0514462"
              height="22.28525"
              x="140.38229"
              y="4.1999907" />
            <path
              style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:7;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none"
              d="M 0.4958236,4.1999906 H 143.74504"
              id="path15" />
          </g>
          <rect
            style="fill:none;stroke:#1a1a1a;stroke-width:1.2;stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none"
            id="rect37"
            width="142.93791"
            height="40.580559"
            x="0.49582362"
            y="0.49582377" />
        </g>
      </svg>
    </>
  );
};

export default Piano;
