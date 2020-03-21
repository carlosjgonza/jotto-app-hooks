import React from 'react';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import './App.css';

function App() {
  const guessedWordsTest = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 }
  ];
  return (
    <div
      data-test="component-app"
      className="container"
    >
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords guessedWords={guessedWordsTest} />
    </div>
  );
}

export default App;
