import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import GuessedWords from './GuessedWords';

// guessedWords: Array of objects
// [
//   { guessedWord: "train", letterMatchCount: 3 },
//   { guessedWord: "agile", letterMatchCount: 1 },
// ],
// secretWord: string,
// success: boolean,

const defaultProps = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
};

/**
 * Setup is a factory function to create a shallowWrapper for GuessedWords
 * @function
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
}

test('Does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps);
});
describe('If there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test('Renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('Renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.length).toBe(1);
  });
});
describe('If there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test('Renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('Renders "Guessed Words" section', () => {
    const guessedWordsDiv = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsDiv.length).toBe(1);
  });
  test('Display correct number of guessed words', () => {
    const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});
describe('LanguagePicker', () => {
  test('Correctly renders "guess instructions" string in english', () => {
    const wrapper = setup({ guessedWords: [] });
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe('Try to guess the secret word!');
  });
  test('Correctly renders "guess instructions" string in emoji', () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;

    const wrapper = setup({ guessedWords: [] });
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe('🤔🤫🔤');
  });
});