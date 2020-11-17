module.exports = {
  extends: ['@mrowa96/eslint-config-react/base'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'server/**/*.ts', 'client/**/*.ts', 'client/**/*.tsx'],
      extends: ['@mrowa96/eslint-config-react/typescript'],
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      extends: ['@mrowa96/eslint-config-react/typescript-test'],
    },
  ],
};
