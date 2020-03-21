import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import App from './App';

/**
 * Setup funtion for app component
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<App />);
}

test('App renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
