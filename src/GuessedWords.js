import React from 'react';

import guessedWordsContext from './contexts/guessedWordsContext';
import LanguageContext from './contexts/LanguageContext';
import stringsModule from './helpers/string';

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(LanguageContext);
  return (
    <div data-test="component-guessed-words">
      {
        guessedWords.length === 0 ?
        <span data-test="guess-instructions">
          { stringsModule.getStringByLanguage(language, 'guessPrompt') }
        </span> :
        <div data-test="guessed-words">
          <h3>{ stringsModule.getStringByLanguage(language, 'guessColumnHeader') }</h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>{ stringsModule.getStringByLanguage(language, 'guessedWords') }</th>
                <th>{ stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader') }</th>
              </tr>
            </thead>
            <tbody>
              {
                guessedWords.map((guessedWord, key) => (
                  <tr
                    data-test="guessed-word"
                    key={`word-${key}`}
                  >
                    <td>
                      { guessedWord.guessedWord }
                    </td>
                    <td>
                      { guessedWord.letterMatchCount }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default GuessedWords;