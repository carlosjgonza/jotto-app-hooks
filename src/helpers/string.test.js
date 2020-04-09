import stringsModule from './string';
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {},
}

test('Returns correct submit string for english', () => {
  const string = getStringByLanguage('en', 'submit', strings);
  expect(string).toBe('submit');
});

test('Returns correct submit string for emoji', () => {
  const string = getStringByLanguage('emoji', 'submit', strings);
  expect(string).toBe('🚀');
});

test('Returns english submit string when language doesn\'t exists', () => {
  const string = getStringByLanguage('noALanguage', 'submit', strings);
  expect(string).toBe('submit');
});

test('Returns english submit string when submit key does not exists for language', () => {
  const string = getStringByLanguage('mermish', 'submit', strings);
  expect(string).toBe('submit');
});