// eslint-disable-next-line import/no-extraneous-dependencies
require('@testing-library/jest-dom/extend-expect');

process.env.NODE_ENV = 'test';
process.env.APP_URL = 'https://account.app';
process.env.APP_API_URL = 'https://api.account.app';

if (typeof global.URL.createObjectURL === 'undefined') {
  // eslint-disable-next-line no-undef
  Object.defineProperty(global.URL, 'createObjectURL', { value: jest.fn() });
}

if (typeof global.fetch === 'undefined') {
  // eslint-disable-next-line no-undef
  global.fetch = jest.fn();
}
