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