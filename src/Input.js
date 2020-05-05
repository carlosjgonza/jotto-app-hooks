import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/LanguageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/string';

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();

  const handleClick = (ev) => {
    // TODO - Update guessedWords
    // Check against secretWord and update success if its required
    if(currentGuess === secretWord) setSuccess(true);
    // Clear input box
    setCurrentGuess('');

    ev.preventDefault();
  }

  if (success) return null;

  return (
    <div data-test='component-input'>
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(ev) => setCurrentGuess(ev.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(ev) => handleClick(ev)}
        >
          { stringsModule.getStringByLanguage(language, 'submit') }
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input;