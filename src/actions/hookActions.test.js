import moxios from 'moxios';

import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('Calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // Create mock for callback arg
    const mockSecretWord = jest.fn();

    await getSecretWord(mockSecretWord);

    expect(mockSecretWord).toHaveBeenCalledWith(secretWord);
  });
});