import React from 'react';
import PropTypes from 'prop-types';

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const handleClick = (ev) => {
    // TODO - Update guessedWords
    // TODO - Check against secretWord and update success if its required
    setCurrentGuess('');

    ev.preventDefault();
  }
  return (
    <div data-test='component-input'>
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="Enter guess"
          value={currentGuess}
          onChange={(ev) => setCurrentGuess(ev.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(ev) => handleClick(ev)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input;