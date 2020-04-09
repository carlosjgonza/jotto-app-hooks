import React from 'react';
import { shallow } from 'enzyme';

import LanguagePicker from './LanguagePicker';
import { findByTestAttr, checkProps } from '../test/testUtils';

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
}

test('Renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-language-picker');
  expect(component.exists()).toBe(true);
});

test('Doesn\'t not throw warning with expected props', () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test('Calls setLanguage prop upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');

  expect(mockSetLanguage).toHaveBeenCalled();
});

test('Renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});