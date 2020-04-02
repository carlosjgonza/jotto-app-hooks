import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup funtion for app component
 * @param {string} secretWord - desired secretWord state for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord="party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ]);

  React.useReducer = mockUseReducer;

  // Use mount, because useEffect is not called on `shallow`
  return mount(<App />);
}

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

describe("Secret is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });

  test("Renders app when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.exists()).toBe(true);
  });
  test("Doesn't renders spinner when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, 'spinner');
    expect(component.exists()).toBe(false);
  });
});

describe("Secret is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test("Renders app when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.exists()).toBe(false);
  });
  test("Doesn't renders spinner when secretWord is not null", () => {
    const component = findByTestAttr(wrapper, 'spinner');
    expect(component.exists()).toBe(true);
  });
});