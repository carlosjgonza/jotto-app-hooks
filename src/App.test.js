import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup funtion for app component
 * @returns {ReactWrapper}
 */
const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  // Use mount, because useEffect is not called on `shallow`
  return mount(<App />);
}

test('App renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord calls on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test('getSecretWord does not update on App update', () => {
    const wrapper = setup();
    // Clear mock method because is executed on mount
    mockGetSecretWord.mockClear();

    // Wrapper.update() doesn't trigger update
    // issue in github (from https://github.com/airbnb/enzyme/issues/2091)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
