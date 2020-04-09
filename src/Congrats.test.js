import React from 'react';
import { mount } from 'enzyme';

import LanguageContext from './contexts/LanguageContext';
import Congrats from './Congrats';
import { findByTestAttr, checkProps } from '../test/testUtils';

const defaultProps = { success: false };

/**
 * Setup is a factory function to create a shallowWrapper for Congrats.
 * @function
 * @param {object} testValues - Context values specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false;

  return mount(
    <LanguageContext.Provider value={language}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  )
}

describe('LanguagePicker', () => {
  test('Correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });
  test('Correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

test('Renders without errors', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('Renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
test('Renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(1);
});
test('Does not warning with expected props', () => {
  const expectedProps = { success: true };
  checkProps(Congrats, expectedProps);
});