import React from 'react';
import { shallow, mount } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

// A functional component that calls useSuccess for our tests
const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
}

test('useGuessedWords throws error when not wrapper in GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});

test('useSuccess doesn\'t throw error when wrapped in SuccessProvider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    )
  }).not.toThrow();
});