import React from 'react';

import './App.css';
import hookActions from './actions/hookActions';
import LanguageContext from './contexts/LanguageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import LanguagePicker from './LanguagePicker';
import Input from './Input';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';

/**
 * Reducer to update state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains `type` and `payload` properties for the state update (like using redux)
 * @returns {object} - new state
 */
function reducer(state, action) {
  switch(action.type) {
    case 'setSecretWord':
      return {...state, secretWord: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en'
  });

  const setSecretWord = (secretWord) => dispatch({
    type: 'setSecretWord',
    payload: secretWord,
  });

  const setLanguage = (language) => dispatch({
    type: 'setLanguage',
    payload: language,
  });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord)
  }, []);

  return state.secretWord ? (
    <div className="container" data-test="component-app">
      <LanguageContext.Provider value={state.language}>
        <h1>Jotto</h1>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </LanguageContext.Provider>
    </div>
  ) : (
    <div className="container" data-test="spinner">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p>Loading secret word</p>
    </div>
  );
}

export default App;
