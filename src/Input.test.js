import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

const defaultProps = { secretWord: 'party' };

const setup = () => {
  return shallow(<Input {...defaultProps} />);
}

test('Input component render without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('Does not warning with expected props', () => {
  const expectedProps = { secretWord: 'party' };
  checkProps(Input, expectedProps);
});

describe('State controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    wrapper = setup();
  });
  test('State updated with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('State updated with empty value with click event', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate("click", { preventDefault: () => {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});