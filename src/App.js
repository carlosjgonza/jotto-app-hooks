import React from 'react';

import './App.css';
import hookActions from './actions/hookActions';

import Input from './Input';

/**
 * Reducer to update state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains `type` and `payload` properties for the state update (like using redux)
 * @returns {object} - new state
 */
function reducer(state, action) {
  switch(action.type) {
    case 'setSecretWord':
      return {...state, secretWord: action.payload}
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
  });

  const setSecretWord = (secretWord) => dispatch({
    type: 'setSecretWord',
    payload: secretWord,
  });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord)
  }, []);

  return state.secretWord ? (
    <div className="container" data-test="component-app">
      <Input secretWord={state.secretWord} />
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
