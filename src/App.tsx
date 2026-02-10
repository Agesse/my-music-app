import { createSignal, onMount, Show } from 'solid-js';
import type { Component } from 'solid-js';
import { Chord, generate7thChord } from './modules/chords.module';
import Piano from "./components/Piano";

const App: Component = () => {
  // *** SIGNAUX ***
  const [chord, setChord] = createSignal<Chord>(generate7thChord())
  const [showSoluce, setShowSoluce] = createSignal(false)
  const [chordSolution, setChordSolution] = createSignal("");

  function _generateNewChord(fromBtn = false) {
    setShowSoluce(false)
    if (fromBtn) document.getElementById("chord-name")?.focus();
    setChord(generate7thChord());
  }

  function _verifyChord() {
    setShowSoluce(true)
    document.getElementById("chord-name")?.focus();
    setChordSolution(chord().notes.join(" - "));
  }

  onMount(() => {
    _generateNewChord();
  })

  return (
    <>
      <header role="banner" class="header">
        <h1 class="title">
          Accords de jazz
        </h1>
        <p class="subtitle">
          Devine les accords de septième&nbsp;!
        </p>
      </header>

      <main role="main" class="main">
        <Show when={!showSoluce()}>
          <div class="content">
            <h2 id="chord-name" class="chord-name" tabindex="-1">{chord().name}</h2>
            <img width="144" height="185" alt="" class="question-img" src="/img/question.svg" />
          </div>

          <button type="button"
            class="button-fullwidth"
            onclick={_verifyChord}
          >
            Réponse
          </button>
        </Show>

        <Show when={showSoluce()}>
          <div class="content">
            <h2 id="chord-name" class="chord-name-soluce" tabindex="-1">{chord().name}</h2>
            <p class="chord-notes-soluce">{chordSolution()}</p>
            <div class="keyboard-soluce">
              <Piano notes={chord().notes} />
            </div>
          </div>

          <button type="button"
            class="button-fullwidth"
            onclick={[_generateNewChord, true]}
          >
            Accord suivant
          </button>
        </Show>
      </main>
    </>
  );
};

export default App;
