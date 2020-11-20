module.exports = {
  collectCoverageFrom: [
    '<rootDir>/server/**/*.ts',
    '<rootDir>/client/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/*.{ts,tsx}',
    '!<rootDir>/src/testing/**/*.{ts,tsx}',
    '!<rootDir>/src/types/**/*.ts',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest.mockFile.js',
    '\\.scss$': 'identity-obj-proxy',
    '@/(.*)$': '<rootDir>/src/$1',
    '@server/(.*)$': '<rootDir>/server/$1',
    '@client/(.*)$': '<rootDir>/client/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setupTests.js'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
